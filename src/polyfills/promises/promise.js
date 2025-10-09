function promise(executor) {
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
        if (typeof onResolve === "function") {
            onResolve(value);
        }
    }

    function reject(err) {
        if (isCalled) return;
        isCalled = true;
        isRejected = true;
        error = err;
        if (typeof onReject === "function") {
            onReject(error);
        }
    }

    this.then = function(thenHandler) {
        onResolve = thenHandler;
        if (!isCalled && isFullfilled) {
            onResolve(value);
            isCalled = true;
        }
        return this;
    }

    this.catch = function(catchHandler) {
        onReject = catchHandler;
        if (!isCalled && isRejected) {
            onReject(error);
            isCalled = true;
        }
        return this;
    }

    executor(resolve, reject);
}