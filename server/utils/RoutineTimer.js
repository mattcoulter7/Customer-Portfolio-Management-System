class RoutineTimer {
    constructor(onRunCallback,determineNextRun){
        this.onRunCallback = onRunCallback;
        this.determineNextRun = determineNextRun;
        
        this.lastRun = null;
        this.nextRun = this.determineNextRun();

        this.timer = null
    }

    ShouldRun(){
        if (!this.lastRun) return true; // should run when it has never run before
        if (!this.nextRun) return false; // should not run if it doesn't have a next run date
        return new Date().getTime() > this.nextRun.getTime();
    }

    Run(){
        this.onRunCallback();
        this.lastRun = new Date().getTime();
        this.nextRun = this.determineNextRun();
    }

    Start(){
        this.timer = setInterval(() => {
            if (this.ShouldRun()){
                this.Run();
            }
        },1000);
    }

    Stop(){
        this.timer = clearInterval(this.timer);
    }
}

module.exports = RoutineTimer;