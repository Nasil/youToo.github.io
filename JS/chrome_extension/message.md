- Background apge와 통신하기


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

- background.js
```javascript
chrome.extension.onConnect.addListener(function (port) {
    console.log("popup Connected .....");
    port.onMessage.addListener(function (msg) {
        console.log("popup message recieved : " + msg);
        port.postMessage("Hi Popup.js");
    });
});
```
- popup.js
```javascript
let port = chrome.extension.connect({
    name: "popup Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function (msg) {
    console.log("Background message recieved : " + msg);
});
```
