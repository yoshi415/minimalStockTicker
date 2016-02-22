import 'babel-polyfill';
import createiFrame from './helpers/iframe';

chrome.storage.sync.get('stocks', (storage) => {
  if (storage.stocks) {
    createiFrame();
  }
});

chrome.storage.onChanged.addListener((changed) => {
  let iframe = document.getElementById('minimalStockTicker');
  if (!iframe) {
    createiFrame();
  }
});