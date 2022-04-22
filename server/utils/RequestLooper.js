// class designed to cycle through an array of request functions

class RequestLooper {
    constructor(requests, requestCallback) {
        if (requests.length == 0) throw new Error("At least 1 request is required to loop");

        this.requests = requests; // array of requests that are continuously called
        this.requestCallback = requestCallback; // function called when request is finished (success)

        this.requestIndex = 0; // index of current request
        this.errors = []; // buffer of errors, cleared after every success
        this.errorTolerance = 3; // try the same request 3 times, otherwise move on

        this.cycle = null;
    }

    get CurrentRequest() {
        return this.requests[this.requestIndex];
    }

    IncrementRequestIndex() {
        this.requestIndex++;
        if (this.requestIndex > this.requests.length - 1) {
            this.requestIndex = 0;
        }
    }

    OnRequestSuccess(request, value) {
        this.IncrementRequestIndex();
        this.errors = [];
        this.requestCallback(request, value);
    }

    OnRequestFailure(request, reason) {
        this.errors.push(reason);
        let remainingAttempts = this.errorTolerance - this.errors.length;

        if (remainingAttempts <= 0) {
            this.errors = [];
            this.IncrementRequestIndex();
            console.error({
                error: 'The same request has errored more times than the configured error tolerance. This request will be skipped once.',
                request: request,
                reasons: this.errors
            });
            return;
        }

        console.warn({
            error: `An error occured when making a request. Retrying on next cycle`,
            request: request,
            reason: reason
        })
    }

    OnRequest(request) {
        request()
            .then((value) => {
                this.OnRequestSuccess(request, value);
            }).catch((reason) => {
                this.OnRequestFailure(request, reason)
            })
    }

    OnCycle() {
        this.OnRequest(this.CurrentRequest);
    }
}

module.exports = RequestLooper;