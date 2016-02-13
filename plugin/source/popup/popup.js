import "babel-polyfill";
import getQuote from './helpers/fetch';

let symbol = 'aapl'
getQuote(symbol).then((data) => {
  document.write(data.name)
});