import updateQuotes from '../util/update';

const blacklisted = [
  "google",
  "facebook",
  "8tracks",
  "pivotaltracker.com/signin",
  "linkedin"
];

chrome.alarms.create('update', {  periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  updateQuotes();
});

chrome.tabs.onUpdated.addListener(checkURL);
chrome.tabs.onActivated.addListener(checkCurrTab);

function checkURL(tabId, info, tab) {
  let disabled = checkList(tab);
  chrome.storage.sync.set({ disabled });
  if (disabled) {
    disable(tab.id);
  }
}

function checkCurrTab(activeTab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    const hideMessage = checkList(tab[0]);
    if (hideMessage) {
      disable(tab[0].id);
    }
  });
}

function checkList(tab) {
  let inList = false;
  blacklisted.forEach((text) => {
    if (~tab.url.indexOf(text)) {
      inList = true;
    }
  });
  return inList;
}

function disable(id) {
  chrome.browserAction.setPopup({
    popup: "disabled.html",
    tabId: id
  });
  chrome.browserAction.setIcon({
    path: { 19: "assets/images/tickerDisabled48.png" },
    tabId: id
  });
}