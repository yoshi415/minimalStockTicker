import displayStocks from './helpers/displayStocks';
import updateQuotes from '../util/update';

chrome.storage.sync.get('stocks', (storage) => {
  displayStocks(storage.stocks);
});

chrome.storage.onChanged.addListener((changed) => {
  if (changed.stocks) {
    displayStocks(changed.stocks.newValue);
  }
  if (changed.symbols) {
    updateQuotes(changed.symbols.newValue);
  }
});