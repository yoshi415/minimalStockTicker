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

function checkURL(tabId, info, tab) {
  let disabled = false;
  blacklisted.forEach((text) => {
    if (~tab.url.indexOf(text)) {
      disabled = true;
    }
  });
  chrome.storage.sync.set({ disabled });
}
