function promiseAny(promises) {
    let rejectedPromiseCount = 0;
    const errors = [];
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            promise
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    rejectedPromiseCount++;
                    errors.push(error);
                })
                if (rejectedPromiseCount === promises.length) {
                    reject(new AggregateError(errors, "All promises were rejected"));
                }
        })
    })
}