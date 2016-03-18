import 'babel-polyfill';
import { createiFrame, removeiFrame, getiFrame } from './helpers/iframe';

let blacklisted, disabled;

chrome.storage.sync.get(['stocks', 'blacklisted', 'disabled'], (storage) => {
  blacklisted = storage.blacklisted || [];
  disabled = storage.disabled;
  if (storage.stocks && checkBlacklist(blacklisted) && !disabled) {
    createiFrame();
  }
});

chrome.storage.onChanged.addListener((changed) => {
  const iframe = getiFrame();
  if (!iframe && checkBlacklist(blacklisted) && !disabled) {
    createiFrame();
  }
  if (changed.symbols) {
    if (changed.symbols.newValue.length === 0) {
      removeiFrame();
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.remove === true) {
    removeiFrame();
  }
});

function checkBlacklist(list) {
  return list.indexOf(window.location.href) === -1;
}