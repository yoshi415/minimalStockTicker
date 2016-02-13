import 'babel-polyfill';
import getQuote from '../util/fetch';

let symbols;

chrome.storage.sync.get('symbols', (storage) => {
  symbols = storage.symbols;
});