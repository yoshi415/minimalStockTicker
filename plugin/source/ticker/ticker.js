import displayStocks from './helpers/displayStocks';
import updateQuotes from '../util/update';

let toggleColor;
let stocks;

chrome.storage.sync.get([ 'stocks', 'toggleColor' ], (storage) => {
  if (storage.toggleColor === undefined) {
    toggleColor = false;
  }
  toggleColor = storage.toggleColor ? true : false;
  stocks = storage.stocks;
  displayStocks(stocks, toggleColor);
});

chrome.storage.onChanged.addListener((changed) => {
  if (changed.stocks) {
    stocks = changed.stocks.newValue;
    if (stocks.length !== 0) {
      displayStocks(stocks, toggleColor);
    }
  }
  if (changed.symbols) {
    let symbols = changed.symbols.newValue;
    if (symbols.length !== 0) {
      updateQuotes(symbols, toggleColor);
    }
  }
  if (changed.toggleColor) {
    displayStocks(stocks, changed.toggleColor.newValue);
  }
});