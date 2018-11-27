# Background apge와 통신하기


1. use getBackgroundPage
- popup.js
```javascript
let chromeBackgroundPage = chrome.extension.getBackgroundPage();
chromeBackgroundPage.deactivate();
```
- background.js
```javascript
function deactivate() {
    console.log("hihi");
}
```

2. use chrome.extension.onConnect.addListener
- popup.js
```javascript
let port = chrome.extension.connect({
    name: "scrapping_popup"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function (msg) {
    console.log("Background message recieved : " + msg); // Hi Popup.js
});
```
- background.js
```javascript
chrome.extension.onConnect.addListener(function (port) {
    console.log("popup Connected .....");
    console.log(port.name, port.sender.id); // scrapping_popup pdbjoogedmcnaaoifnbfjpkndmppcdfg
    port.onMessage.addListener(function (msg) {
        console.log("popup message recieved : " + msg); // Hi BackGround
        port.postMessage("Hi Popup.js");
    });
});
```


3. chrome.tabs.sendMessage
- popup.js
```javascript
chrome.storage.local.get({
    tab: ''
}, function (items) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        sendData.tab = items.tab;
        chrome.tabs.sendMessage(items.tab, sendData, function (response) {
            popup.sendToChromeReceive(sendData, response);
        });
    });
});
```
- contents.js
```javascript
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
}
```
