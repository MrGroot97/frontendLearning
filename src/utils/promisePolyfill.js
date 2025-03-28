

export function promiseAll(promiseArr){
    return new Promise((resolve,reject) => {
        const results = [];
        let settlepromisecount = 0;
        promiseArr.forEach((promise,idx)=>{
            promise
            .then((result)=>{
                results[idx] = result;
                settlepromisecount++;
                if(settlepromisecount === promiseArr.length){
                    resolve(results);
                }
            })
            .catch((error) =>{
                reject(error);
            })
        })
    })
}

export function promiseRace(promiseArr){
    return new Promise((resolve,reject) =>{
        promiseArr.forEach((promise)=>{
            promise
            .then((result)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(error);
            })
        })
    })
}

export function promiseAllSettled(promiseArr){
    if (!Array.isArray(promiseArr)) {
        throw new TypeError('Argument must be an array of promises');
    }
    return new Promise((resolve) => {
        const results = [];
        let settledpromisecount = 0;
        promiseArr.forEach((promise, idx) => {
            promise.then((result) =>{
                results[idx] = {status: 'fulfilled', value: result};
                settledpromisecount++;
                if(settledpromisecount === promiseArr.length){
                    resolve(results);
                }
            })
            .catch((error) =>{
                results[idx] = {status: 'rejected', reason: error};
                settledpromisecount++;
                if(settledpromisecount === promiseArr.length){
                    resolve(results);
                }
            })
        })
    })
}

export function promiseAllSettledV2(promiseArr){
    return Promise.all(promiseArr.map((promise) => {
        return promise.then((value) => {
            return {status: 'fulfilled', value};
        }).catch((reason) => {
            return {status: 'rejected', reason};
        });
    }));
}

export function promiseAny(promiseArr){
    if (!Array.isArray(promiseArr)) {
        throw new TypeError('Argument must be an array of promises');
    }
    return new Promise((resolve, reject) => {
        let rejectedPromiseCount = 0;
        promiseArr.forEach((promise) => {
            promise
                .then((result) => {
                    resolve(result);
                })
                // eslint-disable-next-line no-unused-vars
                .catch((error) => {
                    rejectedPromiseCount++;
                    if (rejectedPromiseCount === promiseArr.length) {
                        reject("All promises were rejected");
                    }
                });
        });
    })
}

// reference: https://medium.com/@manojsingh047/polyfill-for-javascript-promise-81053b284e37
export function myPromise(executor) {
    let onResolve = () => {};
    let onReject = () => {};
    let isFullfilled = false;
    let isRejected = false;
    let isCalled = false;
    let value, error;

    function resolve(val) {
        if (isCalled) return;
        isCalled = true;
        isFullfilled = true;
        value = val;
        if(typeof onResolve === 'function'){
            onResolve(value);
        }
    }

    function reject(err) {
        if (isCalled) return;
        isCalled = true;
        isRejected = true;
        error = err;
        if(typeof onReject === 'function'){
            onReject(error);
        }
    }

    this.then = function( thenHandler) {
        onResolve = thenHandler;
        if(!isCalled && isFullfilled){
            onResolve(value);
            isCalled = true;
        }
        return this;
    }

    this.catch = function(catchHandler){
        onReject = catchHandler;
        if(!isCalled && isRejected){
            onReject(error);
            isCalled = true;
        }
        return this;
    }

    executor(resolve,reject);
}
