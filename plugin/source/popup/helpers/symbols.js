import fetchQuote from '../../util/fetch';
import updateSymbols from '../../util/update';

function addSymbol(symbols, disabled) {
  const textField = document.getElementById('symbolValue');
  const toAdd = [textField.value];

  if (toAdd) {
    fetchQuote(toAdd).then(quote => {
      if (quote[0][1] !== 'N/A') {
        const symbol = textField.value.toUpperCase();
        const stock = [ symbol, ...quote ];
        textField.value = '';

        if (symbolNotFound(symbols, symbol)) {
          symbols.push(stock);
          chrome.storage.sync.set({ symbols });
          message.innerHTML = `${symbol} added successfully!`;
          displaySymbols(symbols);
          updateSymbols();
        }
      } else {
        message.innerHTML = 'Symbol could not be looked up! Try again';
        textField.value = '';
      }
    });
  }
}

function displaySymbols(symbols) {
  const display = document.getElementById('displaySymbols');
  const list = [];
  let html = '';

  if (display) {
    symbols.forEach((symbol) => {
      html += `<img src='assets/images/x.png' id='${symbol[0]}' class='cursor' /> <span class='symbol'>(${symbol[0]})</span><br />`;
    });
    display.innerHTML = '';
    display.innerHTML = html;
    attachHandlers(symbols);
  }
}

function symbolNotFound(collection, target) {
  let found = true;
  collection.some((symbol) => {
    if (symbol[0] === target) {
      found = false;
    }
  });
  return found;
}

function removeSymbol(symbol) {
  chrome.storage.sync.get('symbols', (storage) => {
    let symbols = storage.symbols;
    let remove;
    symbols.forEach((stock, index) => {
      if (stock[0] === symbol) {
        remove = index;
      }
    });
    symbols.splice(remove, 1);
    chrome.storage.sync.set({ symbols });
    if (symbols.length === 0) {
      chrome.storage.sync.set({ stocks: [] });
    }
    message.innerHTML = `${symbol} has been removed.`;
    displaySymbols(symbols);
  });
}

function attachHandlers(symbols) {
  symbols.forEach((symbol) => {
    document.getElementById(symbol[0]).addEventListener('click', removeSymbol.bind(this, symbol[0]));
  });
}

export { addSymbol, displaySymbols };