// setInterval using setTimeout
function setInterval(callback, delay) {
    let timeId = null;
    const runner = () => {
        timeId = setTimeout(() => {
            callback();
            runner();
        }, delay);
    }
    runner();
    return {
        id: timeId,
        clearInterval: () => {
            clearTimeout(timeId);
        }
    }
}