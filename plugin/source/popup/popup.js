import { addSymbol, displaySymbols } from './helpers/symbols';

let symbols, blacklisted;
const message = document.getElementById('inputText');

document.getElementById('symbolValue').addEventListener('keypress', returnSubmit);
document.getElementById('blacklist').addEventListener('click', blacklist);
document.getElementById('colorToggle').addEventListener('click', toggleColor);
document.getElementById('unblacklist').addEventListener('click', unblacklist);

chrome.storage.sync.get([ 'symbols', 'blacklisted' ], (storage) => {
  symbols = storage.symbols || [];
  blacklisted = storage.blacklisted || [];
  displaySymbols(symbols);
  document.getElementById('symbolBtn').addEventListener('click', addSymbol.bind(this, symbols));
});

chrome.runtime.connect();

function toggleColor() {
  chrome.storage.sync.get('toggleColor', (storage) => {
    chrome.storage.sync.set({ toggleColor: !storage.toggleColor });
  });
}

function blacklist() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const hostname = getHostname(tabs);
    blacklisted.push(hostname);
    chrome.storage.sync.set({ blacklisted });
  });

  chrome.runtime.sendMessage({ disable: true });
  removeiFrame();
  window.close();
}

function unblacklist() {
  chrome.storage.sync.get('blacklisted', (storage) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
      blacklisted = storage.blacklisted;
      const index = blacklisted.indexOf(getHostname(tab));
      blacklisted.splice(index, 1);
      chrome.storage.sync.set({ blacklisted });

      chrome.browserAction.setPopup({
        popup: 'popup.html',
        tabId: tab[0].id
      });
      chrome.browserAction.setIcon({
        path: { 19: 'assets/images/ticker48.png' },
        tabId: tab[0].id
      });
    });
  });
  window.close();
}

function getHostname(tabs) {
  const a = document.createElement('a');
  a.href = tabs[0].url;
  return a.hostname;
}

function removeiFrame() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { remove: true });
  });
}

function returnSubmit(e) {
  if (e && e.keyCode === 13) {
    e.preventDefault();
    addSymbol(symbols);
  }
}