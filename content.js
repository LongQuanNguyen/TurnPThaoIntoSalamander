const replacements = {
    "Hoàng Thị Phương Thảo": "🦎",
    "Hoang Thi Phuong Thao": "🦎",
    "Phuong Thao": "🦎",
    "phuong thao": "🦎",
    "PT": "🦎",
    "pt": "🦎",
    "PThao": "🦎",
    "pthao": "🦎",
    "Pthao": "🦎",
    "Phương Thảo": "🦎",
    "phương thảo": "🦎",
    "Thảo": "🦎"
};

/**
 * Replaces words in the text nodes of the document with emojis.
 * The words to be replaced and their corresponding emojis are defined in the `replacements` object.
 * The function uses a TreeWalker to iterate over all text nodes in the document.
 * For each text node, it replaces each word that appears as a key in `replacements` with the corresponding value.
 */
function replaceWordsWithEmojis() {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walk.nextNode()) {
        let newText = node.nodeValue;
        for (const word in replacements) {
            const regex = new RegExp("\\b" + word + "\\b", "gi");
            newText = newText.replace(regex, replacements[word]);
        }
        node.nodeValue = newText;
    }
}

/**
 * Restores the original text of all text nodes that have been modified by the `replaceWordsWithEmojis` function.
 */
function undoReplace() {
    for (const {node, originalText} of originalNodes) {
        node.nodeValue = originalText;
    }
}

/**
 * Saving original state of all text nodes that have been modified.
 */
let originalNodes = [];

/**
 * Listens for messages from the popup script and calls the appropriate function based on the action in the message.
 * If the action is "replaceWords", it replaces words with emojis in all text nodes of the document.
 * If the action is "undoReplace", it restores the original text of all modified text nodes.
 * @param {Object} request - The message sent by the popup script.
 * @returns {void}
 */
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "replaceWords") {
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        originalNodes = [];
        while(node = walk.nextNode()) {
            originalNodes.push({node: node, originalText: node.nodeValue});
        }
        replaceWordsWithEmojis();
    } else if (request.action === "undoReplace") {
        undoReplace();
    }
});