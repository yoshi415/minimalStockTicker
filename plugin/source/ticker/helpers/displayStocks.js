export default (stocks, toggleColor) => {
  let html = '';
  const last = stocks.length - 1;

  stocks.forEach((stock, index) => {
    html += createSpan(stock, index, last, toggleColor);
  })
  appendHTML(html);
}

function createSpan(stock, index, last, toggleColor) {
  const fields = stock.resource.fields;
  const symbol = `<a class="stockLink" target="_blank" href="http://finance.yahoo.com/q?s=${fields.symbol}">${fields.symbol}</a>`;
  const price = Number(fields.price).toFixed(2);
  const chg = Number(fields.chg_percent).toFixed(2);

  let span = `<span class="stockFont"> ${symbol} ${price} <span class="`;
  if (toggleColor) {
    span += chg[0] !== '-' ? 'positive' : 'negative';
  }
  span += `">${chg}%</span>`
  span += index !== last ? ' |' : getTime(fields);
  span += '  </span>';
  return span;
}

function getTime(fields){
  const date = new Date(fields.utctime);
  const day = date.toString().replace(/\S+\s(\S+)\s(\d+)\s.*/,'$1 $2');
  let hour = date.getHours();
  let minute = date.getMinutes();
  let moa = 'AM';
  minute = minute > 10 ? minute : '0' + minute;
  if (hour > 12) {
    hour = hour - 12;
    moa = 'PM';
  }
  return `<span id=time>Last update at ${hour}:${minute}${moa} on ${day}</span>`;
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
