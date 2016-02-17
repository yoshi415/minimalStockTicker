import getQuote from '../../util/fetch';

export default (symbols) => {
  const stocks = [];
  let html = '';
  for (let symbol in symbols) {
    stocks.push(symbols[symbol]);
  }
  getQuote(stocks).then((data) => {
    console.log(data)
    data.forEach((stock) => {
      let symbol = stock.resource.fields;
      html += `<span> ${symbol.symbol} ${Number(symbol.price).toFixed(2)} ${Number(symbol.chg_percent).toFixed(2)}% |  </span>`
    })
    appendHTML(html);
  });
}

function appendHTML(html) {
  const body = document.getElementsByTagName('body')[0];
  let element = document.createElement('span');
  element.innerHTML = html;
  body.insertBefore(element, body.firstChild);
}
