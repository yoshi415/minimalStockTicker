import { addSymbol, displaySymbols } from './helpers/symbols';
import blacklistedSites from '../util/blacklistedSites';

let symbols, blacklisted;
const message = document.getElementById('inputText');

document.getElementById('symbolValue').addEventListener('keypress', returnSubmit);
document.getElementById('blacklist').addEventListener('click', blacklist);
document.getElementById('colorToggle').addEventListener('click', toggleColor);

chrome.storage.sync.get([ 'symbols', 'blacklisted' ], (storage) => {
  symbols = storage.symbols || [];
  blacklisted = storage.blacklisted || blacklistedSites;
  displaySymbols(symbols);
  document.getElementById('symbolBtn').addEventListener('click', addSymbol.bind(this, symbols));
});

function toggleColor() {
  chrome.storage.sync.get('toggleColor', (storage) => {
    chrome.storage.sync.set({ toggleColor: !storage.toggleColor });
  })
}

function blacklist() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => { 
    const url = tabs[0].url;
    blacklisted.push(url);
    chrome.storage.sync.set({ blacklisted })
  });
  removeiFrame();
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