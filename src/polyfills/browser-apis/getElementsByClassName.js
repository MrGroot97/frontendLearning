//  similar to getElementById
function getElementsByClassName(className) {
    if(typeof className !== "string") {
        throw new TypeError("className should be a string");
    }
    const body = document.body;
    const elements = [];
    function traverseNode(node) {
        if(node.classList && node.classList.contains(className)) {
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

const elements = getElementsByClassName("test");
console.log(elements);
