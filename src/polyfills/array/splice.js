function splice(start, deleteCount, ...items) {
    // Handle negative start index
    if (start < 0) {
        start = this.length + start;
        if (start < 0) {
            start = 0;
        }
    }
    // Handle start index greater than the array length
    if (start > this.length) {
        start = this.length;
    }
    // Handle deleteCount for delete all elements after start index
    if (deleteCount === Infinity) {
        deleteCount = this.length - start;
    }
    // Limit deleteCount to the number of elements from start to the end of the array
    deleteCount = Math.min(deleteCount, this.length - start);
    // Array to store the deleted elements
    const deletedItems = [];
    // Remove elements
    for (let i = 0; i < deleteCount; i++) {
        deletedItems.push(this[start + i]);
    }
    // Array to hold the part of the array after the start index
    const afterStart = this.slice(start + deleteCount);
    // Modify the original array
    this.length = start;
    this.push(...items);
    this.push(...afterStart);
    return deletedItems;
}

Array.prototype.mySplice = splice;

const arr = [1, 2, 3, 4, 5];
console.log(arr.mySplice(1, 2, 6, 7)); // [2, 3]
console.log(arr); // [1, 6, 7, 4, 5]