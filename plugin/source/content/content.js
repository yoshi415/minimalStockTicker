import 'babel-polyfill';
import { createiFrame, removeiFrame, getiFrame } from './helpers/iframe';
import blacklistedSites from '../util/blacklistedSites';

let blacklisted, disabled;

chrome.storage.sync.get(['stocks', 'blacklisted', 'disabled'], (storage) => {
  blacklisted = storage.blacklisted || blacklistedSites;
  disabled = storage.disabled;
  if (storage.stocks && checkBlacklist(blacklisted) && !disabled) {
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
  if (!iframe && checkBlacklist(blacklisted) && !disabled) {
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
  return list.indexOf(window.location.host) === -1;
}
