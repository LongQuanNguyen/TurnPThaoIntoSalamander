let replaced = false;

document.getElementById('replaceButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: replaced ? "undoReplace" : "replaceWords"});
        replaced = !replaced;
    });
});