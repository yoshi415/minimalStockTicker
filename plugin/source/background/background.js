import updateQuotes from '../util/update';

chrome.alarms.create('update', {  periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  updateQuotes();
});