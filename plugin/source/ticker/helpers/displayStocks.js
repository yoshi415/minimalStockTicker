export default (stocks, toggleColor, symbols) => {
  let html = '';
  if (symbols) {
    const last = symbols.length - 1;
    symbols.forEach((symbol, index) => html += createSpan(symbol, index, last, toggleColor))
  }

  if (html.length > 0) {
    appendHTML(html);
  }
}

function createSpan(symbol, index, last, toggleColor) {
  const [displaySymbol, price, change, date, time] = symbol;
  console.log('price', price);
  let chg = change.slice(1, change.length -1);
  if (chg[0] === '-') {
    chg = '(' + chg.slice(1) + ')';
  }
  const link = `<a class="stockLink" target="_blank" href="http://finance.yahoo.com/q?s=${displaySymbol}">${displaySymbol}</a>`;

  let span = `<span class="stockFont"> ${link} ${price} <span class="`;
  if (!toggleColor) {
    span += chg[0] !== '(' ? 'positive' : 'negative';
  }
  span += `">${chg}</span>`;
  span += index !== last ? ' |' : `<span id=time>Last update at ${time.slice(1, time.length - 2)} on ${date.slice(1, date.length - 1)}</span>`;
  span += '  </span>';
  return span;
}

function appendHTML(html) {
  const body = document.getElementsByTagName('body')[0];
  const del = document.getElementById('stockSpan');
  const element = document.createElement('span');

  if (del) {
    del.remove();
  }
  element.setAttribute('id', 'stockSpan');
  element.innerHTML = html;
  body.insertBefore(element, body.firstChild);
}