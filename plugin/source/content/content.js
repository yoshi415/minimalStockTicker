import 'babel-polyfill';
import { createiFrame, removeiFrame, getiFrame } from './helpers/iframe';

chrome.storage.sync.get('stocks', (storage) => {
  if (storage.stocks) {
    createiFrame();
  }
});

chrome.storage.onChanged.addListener((changed) => {
  const iframe = getiFrame();
  // if (changed.stocks) {
  //   const stocksList = changed.stocks.newValue.length;
  //   console.log(changed.stocks.newValue)
  //   if (stocksList === 0) {
  //     removeiFrame();
  // console.log('removing')
  //   }
    
  // }
  if (!iframe) {
    createiFrame();
  }
});