import getQuote from '../util/fetch';

let symbols;
const message = document.getElementById('inputText');

chrome.storage.sync.get('symbols', (storage) => {
  symbols = storage.symbols || [];
  displaySymbols();
});
  init(); 

function init() {
  document.getElementById('symbolBtn').addEventListener('click', addSymbol);
  document.getElementById('symbolValue').addEventListener('keypress', returnSubmit);
}

chrome.storage.onChanged.addListener((storage) => {
  symbols = storage.symbols.newValue;
});

function addSymbol() {
  const textField = document.getElementById('symbolValue');
  const toAdd = [textField.value];

  if (toAdd) {
    getQuote(toAdd).then((quote) => {
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
  let remove = symbols.indexOf(symbol);
  symbols.splice(remove, 1);
  message.innerHTML = `${symbol} has been removed.`;
  displaySymbols();
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