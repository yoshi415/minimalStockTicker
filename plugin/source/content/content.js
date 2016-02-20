import 'babel-polyfill';
import displayStocks from './helpers/displayStocks';
import updateQuotes from '../util/update';

let stocks;

// chrome.storage.sync.get('stocks', (storage) => {
//   stocks = storage.stocks || [];
//   displayStocks(stocks);
// });
getStocks();

chrome.storage.onChanged.addListener((changed) => {
  let update = changed.stocks.newValue
  displayStocks(update);
});

function getStocks() {
  chrome.storage.sync.get('stocks', (storage) => {
    stocks = storage.stocks || [];
    displayStocks(stocks);
  });
}