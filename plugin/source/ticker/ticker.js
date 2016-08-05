import displayStocks from './helpers/displayStocks';
import updateQuotes from '../util/update';

let toggleColor;
let stocks;

chrome.storage.sync.get([ 'symbols', 'stocks', 'toggleColor' ], (storage) => {
  if (storage.toggleColor === undefined) {
    toggleColor = false;
  }
  toggleColor = storage.toggleColor ? true : false;
  symbols = storage.symbols
  stocks = storage.stocks;
  displayStocks(stocks, toggleColor, symbols);
});

chrome.storage.onChanged.addListener(changed => {
  if (changed.stocks) {
    stocks = changed.stocks.newValue;
    if (stocks.length !== 0) {
      displayStocks(stocks, toggleColor);
    }
    chrome.storage.sync.get(['symbols'], storage => displayStocks(stocks, toggleColor, symbols))
  }
  if (changed.symbols) {
    let symbols = changed.symbols.newValue;
    console.log('symbols', symbols)
    if (symbols.length !== 0) {
      updateQuotes(symbols, toggleColor);
      displayStocks([], toggleColor, symbols)
    }
  }
  if (changed.toggleColor) {
    displayStocks(stocks, changed.toggleColor.newValue);
  }
});