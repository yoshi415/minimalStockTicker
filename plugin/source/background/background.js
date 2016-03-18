import updateQuotes from '../util/update';
import { checkDisabledOnUpdated, 
         checkDisabledOnActivated, 
         checkBlackListOnUpdated, 
         checkBlackListOnActivated 
       } from './helpers/disable';

chrome.alarms.create('update', {  periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  updateQuotes();
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  checkDisabledOnUpdated(tab);
  checkBlackListOnUpdated(tab);
});
chrome.tabs.onActivated.addListener(() => {
  checkDisabledOnActivated();
  checkBlackListOnActivated();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.disable) {
    checkBlackListOnActivated();
  }
});

chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(() => {
    chrome.storage.sync.get('symbols', (storage) => {
      if (storage.symbols && !storage.symbols.length) {
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            chrome.tabs.sendMessage(tab.id, { remove: true });
          });
        });
      }
    });
  });
});