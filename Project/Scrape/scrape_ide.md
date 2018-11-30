# 스크래핑을 하기 위한 IDE 툴 제작

### 개발 배경
- 셀레니움 IDE를 사용하려고 했으나 업무의 입맛에 맞게 수정 변경 하기가 어려웠다.
- 셀레니움 IDE (https://github.com/SeleniumHQ/selenium-ide)
- 그래서 chrome extention을 직접 개발을 하기로 했다.  


### 크롬 확장 프로그램 (chrome extention)
- 사용자가 원하는 곳에 가서 클릭을 하면 xpath를 가져온다 (name, id, 절대경로, className 등등)
- url 싱크를 맞춰준다
- 활성화된 탭을 항상 알려준다
- 뒷단에서 서버 호출 하는 부분을 sniffing 한다 



![Alt text](https://github.com/Nasil/youToo.github.io/blob/master/Project/Scrape/url.png "Optional title")

- 팝업 화면은 업무 보안상 공개는 불가능 하나 core 부분 소스를 다음에도 유용하게 쓰기 위하여 남긴다.


#### 탭 url 관리
```
// url 이 변경 되는 경우 감지
chrome.tabs.onUpdated.addListener(function (tabs, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        saveActiveTab(tab);
    }
});

// 현재 실행되고 있는 탭 감지
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tabs) {
        if (tabs) {
            saveActiveTab(tabs);
        }
    });
});

// 현재 탭을 chrome.storage 에 저장하고 popup 창에 전송 
function saveActiveTab(curTab) {
    if (curTab.url && isSupportedProtocol(curTab.url)) {
        chrome.runtime.sendMessage({action: "changeUrl", url: curTab.url}, function (response) {});

        chrome.storage.local.set({
            url: curTab.url,
            tab: curTab.id
        }, function () {
            console.log('Change URl', curTab.url, curTab.id);
        });
    }
}

// 크롬 익스텐션 xpath 수집 실행 on/off
function toggle(tab) {
    if (isSupportedProtocol(tab.url)) {
        chrome.storage.local.set({url: tab.url, tab: tab.id}, function () {console.log(tab.url, tab.id);});
        if (!tabs[tab.id]) {
            tabs[tab.id] = Object.create(inspect);
            // xpath 수집
            inspect.toggleActivate(tab.id, 'activate', activeIcon);
            // 팝업
            inspect.loadPopup(tab.id);
        } else {
            inspect.toggleActivate(tab.id, 'deactivate', defaultIcon);
            for (let tabId in tabs) {
                if (tabId == tab.id) {
                    delete tabs[tabId];
                }
            }
        }
    }
}

// 유효성 검증
function isSupportedProtocol(urlString) {
    const supportedProtocols = ["https:", "http:", "file:"];
    const url = document.createElement('a');
    url.href = urlString;
    return supportedProtocols.indexOf(url.protocol) != -1;
}
```
