import 'babel-polyfill';
import getQuotes from './helpers/getQuotes';

let symbols;

chrome.storage.sync.get('symbols', (storage) => {
  console.log('wut')
  symbols = storage.symbols || [];
  getQuotes(symbols);
  update(symbols);
});

chrome.storage.onChanged.addListener((changed) => {
  // update(changed.symbols.newValue);
});

function update(newValues) {
  setInterval(getQuotes.bind(this, newValues), 10000);
}