function promiseAll(promises) {
    const results = [];
    let settledPromisesCount = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, idx) => {
            promise
                .then((result) => {
                    results[idx] = result;
                    settledPromisesCount++;
                    if (settledPromisesCount === promises.length) {
                        resolve(results);
                    }
                })
                .catch((error) => {
                    reject(error);
                })
        })
    })
}