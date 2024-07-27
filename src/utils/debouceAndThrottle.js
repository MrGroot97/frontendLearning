
export function debounce(cbFn, delay) {
    let timeout = null;
    return (...args) => {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() =>{
            cbFn(...args);
        }, delay);
    }
}

export function throttle(cbFn, delay) {
    let shouldWait = false;
    let waitingArgs;

    const timeOutFunc = () => {
        if(waitingArgs){
            cbFn(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeOutFunc, delay);
        } else {
            shouldWait = false;
        }
    }

    return (...args) => {
        if(shouldWait){
            waitingArgs = args;
            return;
        }

        cbFn(...args);
        shouldWait = true;

        setTimeout(timeOutFunc, delay);
    }
}
