import 'babel-polyfill';
import getQuotes from './helpers/getQuotes';

let symbols = { symbols: [ "MSFT", "LNKD", "FB", "GOOG" ] };

chrome.storage.sync.get('symbols', (storage) => {
  symbols = storage.symbols || symbols;
  getQuotes(symbols)
  update(symbols);
});

chrome.storage.onChanged.addListener((changed) => {
  // update(changed.symbols.newValue);
})

function update(newValues) {
  setInterval(getQuotes.bind(this, newValues), 10000);
}