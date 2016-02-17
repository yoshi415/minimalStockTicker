import 'babel-polyfill';
import iframe from './helpers/iframe';
import getQuote from '../util/fetch';

let symbols;

chrome.storage.sync.get('symbols', (storage) => {
  symbols = storage.symbols;
  iframe(symbols)
});

// var change = 'chg_percent'
// var price = 'price'
// var css = document.body.style['transform'] = "translateY(50px)";