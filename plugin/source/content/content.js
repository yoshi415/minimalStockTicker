import 'babel-polyfill';
import { createiFrame, removeiFrame, getiFrame } from './helpers/iframe';

chrome.storage.sync.get('stocks', (storage) => {
  if (storage.stocks) {
    createiFrame();
  }
});

chrome.storage.onChanged.addListener((changed) => {
  const iframe = getiFrame();
  if (changed.symbols) {
    if (!changed.symbols.newValue.length) {
      removeiFramea();
    }
  }
  // }
  if (!iframe) {
    createiFrame();
  }
});

function removeiFramea() {
  let iframe = document.getElementById('minimalStockTicker')
  iframe.remove();
  document.body.style['transform'] = 'translateY(0px)';
}