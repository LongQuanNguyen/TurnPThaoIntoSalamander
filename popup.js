let replaced = false;

/**
 * Adds a click event listener to the 'replaceButton'.
 * When the button is clicked, it toggles the 'replaced' flag and sends a message to the content script.
 * The message tells the content script to either replace words with emojis or undo the replacement,
 * depending on the current state of the 'replaced' flag.
 */
document.getElementById('replaceButton').addEventListener('click', () => {
    replaced = !replaced;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {action: replaced ? 'replaceWords' : 'undoReplace'});
        }
    });
});