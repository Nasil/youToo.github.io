
# 탭 감지하기


## 1. 현재 실행되고 있는 탭 감지
```javascript
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tabs) {
        if (tabs) {
            console.log(tab);
        }
    });
});
```

## 2. url이 변경이 되어 있는지 감지
```javascript
chrome.tabs.onUpdated.addListener(function (tabs, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        saveActiveTab(tab);
    }
});
```
