
export default function displayStocks(stocks=[], toggleColor) {
  let html = '';
  const last = stocks.length - 1;

  stocks.forEach((stock, index) => html += createSpan(stock, index, last, toggleColor));
  appendHTML(html);
}

function createSpan(stock, index, last, toggleColor) {
  const symbol = `<a class="stockLink" target="_blank" href="http://finance.yahoo.com/q?s=${stock[0]}">${stock[0]}</a>`;
  const price = Number(stock[1]).toFixed(2);
  let chg = removeQuotes(stock[2]);
  let date = removeQuotes(stock[3]);
  let time = removeQuotes(stock[4]);

  if (chg[0] === '-' ) {
    chg = '(' + chg.slice(1) + ')';
  }

  const link = `<a class="stockLink" target="_blank" href="http://finance.yahoo.com/q?s=${displaySymbol}">${displaySymbol}</a>`;

  let span = `<span class="stockFont"> ${link} ${price} <span class="`;

  if (!toggleColor) {
    span += chg[0] !== '(' ? 'positive' : 'negative';
  }

  span += `">${chg}</span>`
  span += index !== last ? ' |' : `<span id=time>Last update at ${time} on ${date}</span>`;
  span += '  </span>';

  return span;
}

function removeQuotes(string) {
  return string.slice(1, string.length -1);
}

function appendHTML(html) {
  const body = document.getElementsByTagName('body')[0];
  const stockToRemove = document.getElementById('stockSpan');
  const element = document.createElement('span');

  if (stockToRemove) {
    stockToRemove.remove();
  }

  element.setAttribute('id', 'stockSpan');
  element.innerHTML = html;
  body.insertBefore(element, body.firstChild);
}