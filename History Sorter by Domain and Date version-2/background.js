chrome.history.search({ text: '', maxResults: 1000 }, function(data) {
    const historyByDomain = {};

    // Group history by domain
    data.forEach(item => {
        const url = new URL(item.url);
        const domain = url.hostname;

        if (!historyByDomain[domain]) {
            historyByDomain[domain] = [];
        }
        historyByDomain[domain].push({
            title: item.title,
            url: item.url,
            lastVisitTime: item.lastVisitTime
        });
    });

    // Sort the history by date for each domain
    for (const domain in historyByDomain) {
        historyByDomain[domain].sort((a, b) => b.lastVisitTime - a.lastVisitTime);
    }

    // Store the grouped and sorted history in local storage
    chrome.storage.local.set({ historyByDomain: historyByDomain });
});
