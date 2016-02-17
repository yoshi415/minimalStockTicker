import getQuote from '../../util/fetch';

export default (symbols) => {
  let html = '';
  const last = symbols.length - 1;

  getQuote(symbols).then((data) => {
    data.forEach((stock, index) => {
      html += createSpan(stock, index, last);
    })
    appendHTML(html);
  });
}

function createSpan(stock, index, last) {
  let symbol = stock.resource.fields;
  let sym = symbol.symbol;
  let price = Number(symbol.price).toFixed(2);
  let chg = Number(symbol.chg_percent).toFixed(2);
  let span = `<span> ${sym} ${price} ${chg}%`;
  if (index !== last) {
    span += ' |';
  }
  span += '  </span>';
  return span;
}

function appendHTML(html) {
  const body = document.getElementsByTagName('body')[0];
  let del = document.getElementById('deleteStock');
  let element = document.createElement('span');

  if (del) {
    del.remove();
  }
  element.setAttribute('id', 'deleteStock');
  element.innerHTML = html;
  body.insertBefore(element, body.firstChild);
}
