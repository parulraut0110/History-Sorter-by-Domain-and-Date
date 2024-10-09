document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('historyByDomain', function(data) {
        const historyContainer = document.getElementById('historyContainer');
        const historyByDomain = data.historyByDomain;

        // Clear existing table rows
        historyContainer.innerHTML = '';

        // Create table headers
        const headerRow = document.createElement('tr');
        const domainHeader = document.createElement('th');
        domainHeader.textContent = 'Domain';
        const entriesHeader = document.createElement('th');
        entriesHeader.textContent = 'Entries';
        headerRow.appendChild(domainHeader);
        headerRow.appendChild(entriesHeader);
        historyContainer.appendChild(headerRow);

        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            historyContainer.innerHTML = '<tr><td>No history found.</td></tr>';
            return;
        }

        if (historyByDomain) {
            for (const domain in historyByDomain) {
                const domainRow = document.createElement('tr');
                const domainCell = document.createElement('td');
                domainCell.textContent = domain;

                const entriesCell = document.createElement('td');
                const entriesList = document.createElement('div');

                historyByDomain[domain].forEach(item => {
                    const urlDiv = document.createElement('a');
                    urlDiv.className = 'url';
                    urlDiv.href = item.url;
                    urlDiv.target = '_blank'; // Open in a new tab
                    urlDiv.innerHTML = `${item.title} (${new Date(item.lastVisitTime).toLocaleString()})`;
                    entriesList.appendChild(urlDiv);
                });

                entriesCell.appendChild(entriesList);
                domainRow.appendChild(domainCell);
                domainRow.appendChild(entriesCell);
                historyContainer.appendChild(domainRow);
            }
        } else {
            historyContainer.innerHTML = '<tr><td>No history found.</td></tr>';
        }
    });

    // Theme toggle functionality
    document.getElementById('lightTheme').addEventListener('click', function() {
        document.body.classList.remove('dark');
    });

    document.getElementById('darkTheme').addEventListener('click', function() {
        document.body.classList.add('dark');
    });
});
