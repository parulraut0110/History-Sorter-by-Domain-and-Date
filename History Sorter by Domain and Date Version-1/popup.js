document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('historyByDomain', function(data) {
        const historyContainer = document.getElementById('historyContainer');
        const historyByDomain = data.historyByDomain;

        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            historyContainer.textContent = 'Error retrieving history data.';
            return;
        }

        if (historyByDomain) {
            for (const domain in historyByDomain) {
                const domainDiv = document.createElement('div');
                domainDiv.className = 'domain';
                domainDiv.textContent = domain;

                historyByDomain[domain].forEach(item => {
                    const urlDiv = document.createElement('div');
                    urlDiv.className = 'url';
                    urlDiv.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a> (${new Date(item.lastVisitTime).toLocaleString()})`;
                    domainDiv.appendChild(urlDiv);
                });

                historyContainer.appendChild(domainDiv);
            }
        } else {
            historyContainer.textContent = 'No history found.';
        }
    });
});
