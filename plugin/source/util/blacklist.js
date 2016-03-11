import blacklistedSites from './blacklistedSites';

function notBlacklisted(list) {
  let found;
  chrome.storage.sync.get('blacklisted', (storage) => {
    let blacklisted = storage.blacklisted || blacklistedSites;
    let found = blacklisted.indexOf(window.location.href) !== -1;
  });
  return true;
}

function manageBlacklist(list, add) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const url = tabs[0].url;

    if (add) {
      list.push(url);
    } else {
      const index = list.indexOf(url);
      list.splice(index, 1);
    }
    
    chrome.storage.sync.set({ blacklisted: list });
  });
  sendMessage();
}

function blacklist() {
  const blacklistBtn = document.getElementById('blacklist');

  chrome.storage.sync.get('blacklisted', (storage) => {
    let blacklisted = storage.blacklisted || [];
    const notFound = blacklisted.indexOf(window.location.href) === -1;

    if (notFound) {
      manageBlacklist(blacklisted, true);
      blacklistBtn.innerText = 'Un-Blacklist';
    } else {
      manageBlacklist(blacklisted, false);
      blacklist.innerText = 'Blacklist Site';
    }
  });
}

function sendMessage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { remove: true });
  });
}

export { blacklist, notBlacklisted };
