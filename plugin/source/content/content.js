import 'babel-polyfill';
import { createiFrame, removeiFrame, getiFrame } from './helpers/iframe';

let blacklisted;

chrome.storage.sync.get(['stocks', 'blacklisted'], (storage) => {
  blacklisted = storage.blacklisted || [];
  if (storage.stocks && checkBlacklist(blacklisted)) {
    createiFrame();
  }
});

chrome.storage.onChanged.addListener((changed) => {
  const iframe = getiFrame();
  if (changed.symbols) {
    if (!changed.symbols.newValue.length) {
      removeiFramea();
    }
  }
  if (!iframe && checkBlacklist(blacklisted)) {
    createiFrame();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.remove === true) {
    removeiFrame();
  }
});

function removeiFramea() {
  let iframe = document.getElementById('minimalStockTicker')
  iframe.remove();
  document.body.style.transform = 'translateY(0px)';
}

function checkBlacklist(list) {
  return list.indexOf(window.location.href) === -1;
}
