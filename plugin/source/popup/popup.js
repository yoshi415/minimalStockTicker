import fetchQuote from '../util/fetch';
import updateSymbols from '../util/update';

let symbols;
const message = document.getElementById('inputText');

document.getElementById('symbolBtn').addEventListener('click', addSymbol);
document.getElementById('symbolValue').addEventListener('keypress', returnSubmit);

chrome.storage.sync.get('symbols', (storage) => {
  symbols = storage.symbols || [];
  displaySymbols();
});

function addSymbol() {
  const textField = document.getElementById('symbolValue');
  const toAdd = [textField.value];

  if (toAdd) {
    fetchQuote(toAdd).then((quote) => {
      if (quote.length > 0) {
        const data = quote[0].resource.fields;
        const symbol = data.symbol.toUpperCase();
        const stock = [ symbol, data.name ]
        textField.value = '';

        if (symbolNotFound(symbols, symbol)) {
          symbols.push(stock);
          chrome.storage.sync.set({ symbols });
          message.innerHTML = `${symbol} added successfully!`;
          displaySymbols();
          updateSymbols();
        }
      } else {
        message.innerHTML = 'Symbol could not be looked up! Try again';
      }
    });
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

function displaySymbols() {
  const display = document.getElementById('displaySymbols');
  const list = [];
  let html = '';

  symbols.forEach((symbol) => {
    html += `<input type='checkbox' id='${symbol[0]}'>(${symbol[0]})  ${symbol[1]}</input><br />`;  
  });

  display.innerHTML = '';
  display.innerHTML = html;
  attachHandlers();
}

function removeSymbol(symbol) {
  chrome.storage.sync.get('symbols', (storage) => {
    symbols = storage.symbols;
    let remove;
    symbols.forEach((stock, index) => {
      if (stock[0] === symbol) {
        remove = index;
      }
    });
    let x = symbols.splice(remove, 1);
    chrome.storage.sync.set({ symbols });
    message.innerHTML = `${symbol} has been removed.`;
    displaySymbols();
  });
}

function attachHandlers() {
  symbols.forEach((symbol) => {
    document.getElementById(symbol[0]).addEventListener('click', removeSymbol.bind(this, symbol[0]));
  });
}

function returnSubmit(e) {
  if (e && e.keyCode === 13) {
    e.preventDefault();
    addSymbol();
  }
}