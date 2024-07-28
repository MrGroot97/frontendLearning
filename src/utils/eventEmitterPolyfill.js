

export class Emitter {
    constructor() {
        // will do some initialization
        this._subriptions = new Map();
    }

    subscribe(eventName, callback) {
        if (typeof callback !== "function") {
            throw new TypeError("Callback should be a function");
        }

        if (!this._subriptions.has(eventName)) {
            this._subriptions.set(eventName, new Map());
        }
        const subscriptionId = Symbol();
        const eventSubscriptions = this._subriptions.get(eventName);
        eventSubscriptions.set(subscriptionId, callback);

        return {
            release: () => {
                if (!eventSubscriptions.has(subscriptionId)) {
                    throw new Error("Subscription already released");
                }
                eventSubscriptions.delete(subscriptionId);
            },
        };
    }

    emit(eventName, ...args) {
        const eventSubscriptions = this._subriptions.get(eventName);
        if (!eventSubscriptions) {
            throw new Error(
                `No subscriptions found with the name ${eventName}`
            );
        }
        eventSubscriptions.forEach((callback) => {
            callback(...args);
        });
    }
}

// usage
// let channel = ""
// const emitter = new Emitter();
// console.log({channel});
// const subscription = emitter.subscribe('modify',(link)=>{
//   channel = link;
//   console.log({"modified channel": channel});
// })
// emitter.emit('modify', 'https://www.google.com');
// console.log({channel});

// subscription.release();

// emitter.emit('modify', 'https://www.facebook.com');
// console.log({channel});
