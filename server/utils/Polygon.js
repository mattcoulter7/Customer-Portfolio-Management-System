const fetch = require("node-fetch");

class PolygonRequests {
    constructor(apiKey) {
        this.baseURL = 'https://api.polygon.io'
        this.apiKey = apiKey;
    }

    HandleRequest(url) {
        try {
            return fetch(url)
                .then((resp) => {
                    if (resp.ok && resp.status == 200) {
                        return resp.json();
                    }
                }).catch(e => {
                    console.error(e);
                })
        } catch (e) {
            console.error(e);
        }
    }

    get GroupedDaily() {
        return (options = {}) => {
            options = {
                date: new Date(),
                adjusted: true,
                ...options
            }
            const url = `${this.baseURL}/v2/aggs/grouped/locale/us/market/stocks/${options.date.toLocaleDateString('fr-CA')}?adjusted=${options.adjusted}&apiKey=${this.apiKey}`;
            return this.HandleRequest(url);
        }
    }
}

class PolygonStockRequests extends PolygonRequests {
    constructor(code, apiKey) {
        super(apiKey);
        this.code = code;
    }

    GetDateString(date) {
        return date.toLocaleDateString('fr-CA', {
            timeZone: 'America/New_York'
        });
    }

    get Aggregates() {
        return (options = {}) => {
            options = {
                multiplier: 1,
                timespan: 'day',
                from: new Date(),
                to: new Date(),
                adjusted: true,
                sort: 'asc',
                limit: 5000,
                ...options
            }
            const url = `${this.baseURL}/v2/aggs/ticker/${this.code}/range/${options.multiplier}/day/${this.GetDateString(options.from)}/${this.GetDateString(options.to)}?adjusted=${options.adjusted}&sort=${options.sort}&limit=${options.limit}&apiKey=${this.apiKey}`
            return this.HandleRequest(url);
        }
    }

    get DailyOpenClose() {
        return (options = {}) => {
            options = {
                date: new Date(),
                adjusted: true,
                ...options
            }
            const url = `${this.baseURL}/v1/open-close/${this.code}/${this.GetDateString(options.date)}?adjusted=${options.adjusted}&apiKey=${this.apiKey}`;
            return this.HandleRequest(url);
        }
    }

    get PreviousClose() {
        return (options = {}) => {
            options = {
                adjusted: true,
                ...options
            }
            const url = `${this.baseURL}/v2/aggs/ticker/${this.code}/prev?adjusted=${options.adjusted}&apiKey=${this.apiKey}`;
            return this.HandleRequest(url);
        }
    }
}

module.exports = {
    PolygonRequests: PolygonRequests,
    PolygonStockRequests: PolygonStockRequests,
}