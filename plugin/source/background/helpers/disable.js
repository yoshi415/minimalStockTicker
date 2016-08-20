const defaultDisabledSites = [
  "google.com/maps",
  "docs.google.com",
  "mail.google.com",
  "facebook",
  "8tracks",
  "pivotaltracker.com/signin",
  "linkedin"
];

function checkDisabledOnUpdated(tab) {
  const disabled = checkDisabledList(tab);
  chrome.storage.sync.set({ disabled });

  if (disabled) {
    disable(tab.id, 'disabled.html');
  }
}

function checkDisabledOnActivated() {
  chrome.tabs.query({ active: true, currentWindow: true}, (tab) => {
    const disabledPage = checkDisabledList(tab[0]);

    if (disabledPage) {
      disable(tab[0].id, 'disabled.html');
    }
  });
}

function checkDisabledList(tab) {
  let inList = false;

  defaultDisabledSites.forEach((text) => {
    if (~tab.url.indexOf(text)) {
      inList = true;
    }
  });
  return inList;
}

function checkBlackListOnUpdated(tab) {
  chrome.storage.sync.get('blacklisted', (storage) => {
    if (storage.blacklisted) {
      storage.blacklisted.forEach((site) => {
        if (~tab.url.indexOf(site)) {
          disable(tab.id, 'blacklisted.html');
        }
      });
    }
  });
}

function checkBlackListOnActivated() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    checkBlackListOnUpdated(tab[0]);
  });
}

function disable(id, html) {
  chrome.browserAction.setPopup({
    popup: html,
    tabId: id
  });
  chrome.browserAction.setIcon({
    path: { 19: 'assets/images/tickerDisabled48.png' },
    tabId: id
  });
}

export { checkDisabledOnUpdated, checkDisabledOnActivated, checkBlackListOnUpdated, checkBlackListOnActivated };