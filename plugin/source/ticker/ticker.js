import displayStocks from './helpers/displayStocks';
import updateQuotes from '../util/update';
import removeiFrame from '../content/helpers/iframe';

chrome.storage.sync.get('stocks', (storage) => {
  displayStocks(storage.stocks);
});

chrome.storage.onChanged.addListener((changed) => {
  if (changed.stocks) {
    displayStocks(changed.stocks.newValue);
  }
  if (changed.symbols) {
    removeiFrame();
    // if (changed.symbols.newValue.length) {
    //   updateQuotes(changed.symbols.newValue);
    // } else {
    //   removeiFramea();
    // }
  }
});

function removeiFramea() {
  var iframe = document.getElementById('minimalStockTicker')
  // const iframe = getiFrame();
  iframe.remove();
  document.body.style['transform'] = 'translateY(0px)';
}