function getElementById(id) {
    if(typeof id !== "string") {
        throw new TypeError("id should be a string");
    }
    const body = document.body;
    const elements = [];
    function traverseNode(node) {
        if(node.id === id) {
            elements.push(node);
        }
        if(node.hasChildNodes()) {
            for(const child of node.childNodes) {
                traverseNode(child);
            }
        }
    }
    traverseNode(body);
    return elements;
}

const element = getElementById("test");
console.log(element);