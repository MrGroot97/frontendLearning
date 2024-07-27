export function getElementsByClassName(className) {
    const body = document.body; // we can also change our search to a specific element
    const elements = [];

    function traverseNode(node) {
        if (node.classList && node.classList.contains(className)) {
            elements.push(node);
        }

        if (node.hasChildNodes()) {
            for (const child of node.childNodes) {
                traverseNode(child);
            }
        }
    }
    traverseNode(body);
    return elements;
}