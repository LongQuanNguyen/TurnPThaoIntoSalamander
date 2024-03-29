const replacements = {
    "Hoàng Thị Phương Thảo": "🦎",
    "Hoang Thi Phuong Thao": "🦎",
    "Phương Thảo": "🦎",
    "phương thảo": "🦎",
    "Phuong Thao": "🦎",
    "phuong thao": "🦎",
    "PThao": "🦎",
    "pthao": "🦎",
    "Pthao": "🦎",
    "Thảo": "🦎",
    "Thao": "🦎",
    "thao": "🦎",
    "PT": "🦎",
    "pt": "🦎"
};

/**
 * Replaces words in the text nodes of the document with emojis.
 * The words to be replaced and their corresponding emojis are defined in the `replacements` object.
 * The function uses a TreeWalker to iterate over all text nodes in the document.
 * For each text node, it replaces each word that appears as a key in `replacements` with the corresponding value.
 * @param {Array} nodesArray - The array to store the original nodes.
 */
function replaceWordsWithEmojis(nodesArray) {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walk.nextNode()) {
        let newText = node.nodeValue;
        for (const word in replacements) {
            const regex = new RegExp("\\b" + word + "\\b", "gi");
            if (regex.test(newText)) {
                // Save the original state of the node before modifying it
                nodesArray.push({node: node, originalText: node.nodeValue});
                newText = newText.replace(regex, replacements[word]);
                node.nodeValue = newText;
            }
        }
    }
}

/**
 * Save the original state of all text nodes in the document.
 * @param {Array} nodesArray - The array to store the original nodes.
 */
function saveOriginalNodes(nodesArray) {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walk.nextNode()) {
        nodesArray.push({node: node, originalText: node.nodeValue});
    }
}

/**
 * Save the original state of all text nodes in the document.
 * @param {Array} nodesArray - The array to store the original nodes.
 */
function saveOriginalNodes(nodesArray) {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walk.nextNode()) {
        nodesArray.push({node: node, originalText: node.nodeValue});
    }
}

/**
 * Restores the original text of all text nodes that have been modified by the `replaceWordsWithEmojis` function.
 * @param {Array} nodesArray - The array of original text nodes.
 */
function undoReplace(nodesArray) {
    for (const {node, originalText} of nodesArray) {
        node.nodeValue = originalText;
    }
}


// EXECUTE


let originalNodes = [];
saveOriginalNodes(originalNodes);

//Listens for messages from the popup script and calls the appropriate function based on the action in the message.
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "replaceWords") {
        replaceWordsWithEmojis(originalNodes);
    } else if (request.action === "undoReplace") {
        undoReplace(originalNodes);
    }
});