class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (typeof this.events[event] !== "object") {
            this.events[event] = [];
        }
        // this if right below is not needed if we want to allow adding multiple identical listeners
        if (!this.events[event].includes(listener)) {
            this.events[event].push(listener);
        }
    }

    off(event, listener) {
        if (typeof this.events[event] === "object") {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }

    // emit(event, ...args) {
    //     if (typeof this.events[event] === "object") {
    //         this.events[event].forEach((listener) => {
    //             console.log(listener.name)
    //             listener.apply(this, args);
    //         });
    //     }
    // }

    emit(event, ...args) {
        if (typeof this.events[event] === "object") {
            const removeFns = [];
            this.events[event].forEach((listener) => {
                if (listener.name == "remove") {
                    removeFns.push(listener);
                } else {
                    listener.apply(this, args);
                }
            });
            removeFns.forEach((remover) => {
                remover(this, args);
            });
        }
    }

    once(event, listener) {
        const remove = () => {
            this.off(event, listener);
            this.off(event, remove);
        };
        // first we should add listener and then the remover
        this.on(event, listener);
        this.on(event, remove);
    }
}

const emitter = new EventEmitter();

function logData(data) {
    console.log("[1] Data received:", data);
}

function logData2(data) {
    console.log("[2] Data received:", data);
}

function logData3(data) {
    console.log("[3] Data3 received:", data);
}

emitter.once("event1", logData2);
emitter.on('event1', logData)
emitter.once("event1", logData3);

emitter.emit("event1", "msg");
emitter.emit("event1", "msg2");
// console.log(emitter.events)

