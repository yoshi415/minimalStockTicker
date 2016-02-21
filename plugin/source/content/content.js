import 'babel-polyfill';
import createiFrame from './helpers/iframe';

import displayStocks from './helpers/displayStocks';
import updateQuotes from '../util/update';

let stocks;

chrome.storage.sync.get('stocks', (storage) => {
  stocks = storage.stocks || [];
  displayStocks(stocks);
  // createiFrame();
});

chrome.storage.onChanged.addListener((changed) => {
  if (changed.stocks) {
    let updated = changed.stocks.newValue;
    displayStocks(updated);
  }
  if (changed.symbols) {
    let symbols = changed.symbols.newValue;
    updateQuotes(changed.symbols.newValue);
  }
});