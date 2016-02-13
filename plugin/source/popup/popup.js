import 'babel-polyfill';
import getQuote from '../util/fetch';

let symbols;
const message = document.getElementById('inputText');

chrome.storage.sync.get('symbols', (storage) => {
  symbols = storage.symbols;
  init(); 
  displaySymbols();
});

function init() {
  document.getElementById('symbolBtn').addEventListener('click', addSymbol);
  document.getElementById('symbolValue').addEventListener('keypress', returnSubmit);
}

function addSymbol() {
  const textField = document.getElementById('symbolValue');
  const toAdd = textField.value;
  
  if (toAdd) {
    getQuote(toAdd).then((data) => {
      if (data) {
        const symbol = data.symbol.toUpperCase();
        symbols[data.name] = symbol;
        chrome.storage.sync.set({ symbols });
        message.innerHTML = `${symbol} added successfully!`;
        textField.value = '';
        displaySymbols();
      } else {
        message.innerHTML = 'Symbol does not exist!\n Please try again';
      }
    });
  }
}

function removeSymbol(symbol) {
  delete symbols[symbol];
  chrome.storage.sync.set({ symbols });
  displaySymbols();
}

function displaySymbols() {
  const display = document.getElementById('displaySymbols');
  const list = [];
  let html = '';

  for (var symbol in symbols) {
    list.push([symbol, symbols[symbol]]);
  }
  list.sort();
  list.forEach((symbol) => {
    html += `<input type='checkbox' id='${symbol[1]}'>${symbol[0]}</input><br />`;  
  });
  
  display.innerHTML = '';
  display.innerHTML = html;
  attachHandlers();
}

function attachHandlers() {
  for (let symbol in symbols) {
    document.getElementById(symbols[symbol]).addEventListener('click', removeSymbol.bind(this, symbol));
  }
}

function update(interval) {
  //update quotes
}

function returnSubmit(e) {
  if (e && e.keyCode === 13) {
    addSymbol();
  }
}