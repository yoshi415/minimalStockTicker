import fetchQuotes from './fetch';

export default function updateSymbols() {
  chrome.storage.sync.get('symbols', (storage) => {
    const toUpdate = [];

    if (storage.symbols) {
      storage.symbols.forEach(stock => toUpdate.push(stock[0]));
      fetchQuotes(toUpdate).then(symbols => chrome.storage.sync.set({ symbols }));
    }
  });
};
