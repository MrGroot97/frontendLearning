class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    subscribe(eventName, callback) {
        if(typeof callback !== "function") {
            throw new TypeError("Callback should be a function");
        }
        if(!this.events.has(eventName)) {
            this.events.set(eventName, new Map());
        }
        const subscriptionId = Symbol();
        const eventSubscriptions = this.events.get(eventName);
        eventSubscriptions.set(subscriptionId, callback);

        return {
            release: () => {
                if(!eventSubscriptions.has(subscriptionId)) {
                    throw new Error("Subscription already released");
                }
                eventSubscriptions.delete(subscriptionId);
            }
        }
    }

    emit(eventName, ...args) {
        const eventSubscriptions = this.events.get(eventName);
        if(!eventSubscriptions) {
            throw new Error(`No subscriptions found with the name ${eventName}`);
        }
        eventSubscriptions.forEach((callback) => {
            callback(...args);
        });
    }
}

const eventEmitter = new EventEmitter();
eventEmitter.subscribe("test", (data) => {
    console.log(data);
});
eventEmitter.emit("test", "Hello, world!");