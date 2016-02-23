export default (stocks) => {
  let html = '';
  const last = stocks.length - 1;

  stocks.forEach((stock, index) => {
    html += createSpan(stock, index, last);
  })
  appendHTML(html);
}

function createSpan(stock, index, last) {
  let symbol = stock.resource.fields;
  let sym = `<a class="stockLink" target="_blank" href="http://finance.yahoo.com/q?s=${symbol.symbol}">${symbol.symbol}</a>`;
  let price = Number(symbol.price).toFixed(2);
  let chg = Number(symbol.chg_percent).toFixed(2);

  let span = `<span class="stockFont"> ${sym} ${price} <span class="`;
  span += chg[0] !== '-' ? 'positive' : 'negative';
  span += `">${chg}%</span>`;
  if (index !== last) {
    span += ' |';
  }
  span += '  </span>';
  return span;
}

function appendHTML(html) {
  const body = document.getElementsByTagName('body')[0];
  let del = document.getElementById('stockSpan');
  let element = document.createElement('span');

  if (del) {
    del.remove();
  }
  element.setAttribute('id', 'stockSpan');
  element.innerHTML = html;
  body.insertBefore(element, body.firstChild);
}
