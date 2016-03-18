import fetchQuotes from './fetch';

export default () => {
  chrome.storage.sync.get('symbols', (storage) => {
    let toUpdate = [];
    if (storage.symbols) {
      storage.symbols.forEach((stock) => {
        toUpdate.push(stock[0]);
      });
      fetchQuotes(toUpdate).then((stocks) => {
        chrome.storage.sync.set({ stocks });
      });
    }
  }); 
};
