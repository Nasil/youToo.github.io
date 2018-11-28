(function () {
    //https://developer.chrome.com/extensions/webRequest
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "http://*/*",
            "https://*/*",
        ]
    };

    chrome.webRequest.onBeforeRequest.addListener((details) => {
        const {tabId, requestId} = details;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }
        if (details.method == "POST" || details.method == "PATCH") {
            console.log('formData', details.requestBody);
        }

        tabStorage[tabId].requests[requestId] = details;
        console.log('onBeforeRequest', tabStorage[tabId].requests[requestId]);
    }, networkFilters, ["blocking", "requestBody"]);

    chrome.webRequest.onCompleted.addListener((details) => {
        const {tabId, requestId} = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];

        Object.assign(request, details);
        console.log('onCompleted', tabStorage[tabId].requests[details.requestId]);
    }, networkFilters, ["responseHeaders"]);

    chrome.webRequest.onErrorOccurred.addListener((details) => {
        const {tabId, requestId} = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];
        Object.assign(request, details);
        console.log('onErrorOccurred', tabStorage[tabId].requests[requestId]);
    }, networkFilters);

    chrome.tabs.onActivated.addListener((tab) => {
        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        if (!tabStorage.hasOwnProperty(tabId)) {
            tabStorage[tabId] = {
                id: tabId,
                requests: {},
                registerTime: new Date().getTime()
            };
        }
    });
    chrome.tabs.onRemoved.addListener((tab) => {
        const tabId = tab.tabId;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }
        tabStorage[tabId] = null;
    });
}());
