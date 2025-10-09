// setTimeout using setInterval
function setTimeout(callback, delay) {
    const id = setInterval(() => {
        callback();
        clearInterval(id);
    }, delay);
    return {
        id,
        clearTimeout: () => {
            clearInterval(id);
        }
    }
}