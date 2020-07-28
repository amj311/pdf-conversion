class Stopwatch {
    constructor (name, autoStart = false) {
        this.name = name;
        this.startTime = null;
        this.stopTime = null;
        this.stamp = "[Stopwatch "+this.name+"]";
        if (autoStart) this.start();
    }
    
    log(msg) {
        console.log(this.stamp + ": " + msg)
    }

    start() {
        if (this.startTime) return this.log("Time has already started!")
        this.startTime = Date.now();
        setTimeout( () => this.log(`Starting time at `+this.startTime), 0)
    }

    getElapsedTime() {
        if (!this.startTime) return this.log("Time has not yet started!")
        let endTime = this.stopTime || Date.now();
        return endTime - this.startTime;
    }

    printElapsedTime() {
        this.log(`Elapsed time: `+this.getElapsedTime());
    }

    stop() {
        if (!this.startTime) return this.log("Time has not yet started!")
        this.stopTime = Date.now();
        this.log(`Stopping time at `+this.stopTime);
        this.printElapsedTime();
    }

}

 module.exports = Stopwatch;