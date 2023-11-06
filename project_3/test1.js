class TemperatureSensor {
    constructor() {
        this.temperatureLog = [];
    }

    recordTemperature(temp) {
        this.temperatureLog.push({ date: new Date(), temperature: temp });
    }

    getAverageTemperature() {
        const sum = this.temperatureLog.reduce((acc, record) => acc + record.temp, 0);
        return sum / this.temperatureLog.length;
    }

    getLastRecord() {
        return this.temperatureLog[this.temperatureLog.length - 1];
    }

    clearLog() {
        this.temperatureLog = [];
    }
}
