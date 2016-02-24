import displayStocks from './helpers/displayStocks';
import updateQuotes from '../util/update';

let toggleColor;
let stocks;

chrome.storage.sync.get([ 'stocks', 'toggleColor' ],(storage) => {
  if (storage.toggleColor === undefined) {
    toggleColor = true;
  }
  toggleColor = storage.toggleColor ? true : false;
  stocks = storage.stocks;
  displayStocks(stocks, toggleColor);
});

chrome.storage.onChanged.addListener((changed) => {
  if (changed.stocks) {
    stocks = changed.stocks.newValue;
    displayStocks(stocks, toggleColor);
  }
  if (changed.symbols) {
    updateQuotes(changed.symbols.newValue, toggleColor);
  }
  if (changed.toggleColor) {
    displayStocks(stocks, changed.toggleColor.newValue);
  }
});