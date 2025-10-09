class TabManager {
    constructor(initialTabs = [1, 2, 3, 4, 5]) {
        this.tabs = initialTabs;
    }

    // Method to add a tab at the end
    addTab() {
        const newTab = this.tabs.length + 1;
        this.tabs.push(newTab);
        console.log(`Tab ${newTab} added.`);
        return this.tabs;
    }

    // Method to delete a tab by its index
    deleteTab(index) {
        if (index < 0 || index >= this.tabs.length) {
            console.log("Invalid tab index.");
            return;
        }
        const removedTab = this.tabs.splice(index, 1);
        console.log(`Tab ${removedTab} deleted.`);
        return this.tabs;
    }

    // Method to move a tab from one position to another
    moveTab(fromIndex, toIndex) {
        if (
            fromIndex < 0 ||
            fromIndex >= this.tabs.length ||
            toIndex < 0 ||
            toIndex >= this.tabs.length
        ) {
            console.log("Invalid tab indices.");
            return;
        }
        const [movedTab] = this.tabs.splice(fromIndex, 1);
        this.tabs.splice(toIndex, 0, movedTab);
        console.log(`Tab ${movedTab} moved to position ${toIndex + 1}.`);
        return this.tabs;
    }

    // Method to print the current tabs order
    getTabs() {
        console.log("Current Tabs Order:", this.tabs);
    }
}

// Usage
const tabManager = new TabManager();
// tabManager.addTab(); // Tab 6 added.
// tabManager.deleteTab(2); // Tab 3 deleted.
// tabManager.moveTab(1, 3); // Tab 2 moved to position 4.
// tabManager.getTabs(); // Current Tabs Order: [1, 4, 5, 2, 6]
// tabManager.addTab(); // Tab 7 added.
// tabManager.getTabs(); // Current Tabs Order: [1, 4, 5, 2, 6, 7]



// // slice vs splice
// const fruits = ["apple", "banana", "orange", "mango"];

// const citrus = fruits.slice(2, 4);
// console.log(citrus); // ["orange", "mango"]
// console.log(fruits); // ["apple", "banana", "orange", "mango"] (original array unchanged)

// const removed = fruits.splice(1, 2, "grape", "kiwi");
// console.log(removed); // ["banana", "orange"] (removed elements)
// console.log(fruits); // ["apple", "grape", "kiwi", "mango"] (modified array)
