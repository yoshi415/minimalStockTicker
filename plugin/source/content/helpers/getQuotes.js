import getQuote from '../../util/fetch';

export default (symbols) => {
  const stocks = [];
  let html = '';
  for (let symbol in symbols) {
    stocks.push(symbols[symbol]);
  }
  getQuote(stocks).then((data) => {
    data.forEach((stock) => {
      let symbol = stock.resource.fields;
      let sym = symbol.symbol;
      let price = Number(symbol.price).toFixed(2);
      let chg = Number(symbol.chg_percent).toFixed(2);
      html += `<span> ${sym} ${price} ${chg}% |  </span>`;
    })
    appendHTML(html);
  });
}

function appendHTML(html) {
  const body = document.getElementsByTagName('body')[0];
  let del = document.getElementById('deleteStock');
  if (del) {
    del.remove();
  }
  let element = document.createElement('span');
  element.setAttribute('id', 'deleteStock');
  element.innerHTML = html;
  body.insertBefore(element, body.firstChild);
}
