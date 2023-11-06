class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (typeof this.events[event] === 'object') {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }

    emit(event, ...args) {
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach(listener => listener.apply(this, args));
        }
    }

    once(event, listener) {
        const remove = () => {
            this.off(event, listener);
            this.off(event, remove);
        };
        this.on(event, remove);
        this.on(event, listener);
    }
}

const emitter = new EventEmitter();

function logData(data) {
    console.log('Data received:', data);
}

