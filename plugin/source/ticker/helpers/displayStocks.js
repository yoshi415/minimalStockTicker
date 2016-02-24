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
  let time = getTime(symbol)
  let sym = `<a class="stockLink" target="_blank" href="http://finance.yahoo.com/q?s=${symbol.symbol}">${symbol.symbol}</a>`;
  let price = Number(symbol.price).toFixed(2);
  let chg = Number(symbol.chg_percent).toFixed(2);

  let span = `<span class="stockFont"> ${sym} ${price} <span class="`;
  span += chg[0] !== '-' ? 'positive' : 'negative';
  span += `">${chg}%</span>`;
  if (index !== last) {
    span += ' |';
  } else {
    span += time;
  }
  span += '  </span>';
  return span;
}

function getTime(symbol){
  let date = new Date(symbol.utctime);
  let day = date.toString().replace(/\S+\s(\S+)\s(\d+)\s.*/,'$1 $2');
  let hour = date.getHours();
  let minute = date.getMinutes();
  minute = minute !== 0 ? minute : '00';
  let moa;
  if(hour > 12) {
    hour = hour - 12;
    moa = 'PM';
  } else{ 
    moa = 'AM';
  }
  return `<span id=time>Last update at ${hour}:${minute}${moa} on ${day}</span>`
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
  // let ticker = document.getElementById('minimalStockTicker');
  // ticker.innerHTML = html;
  body.insertBefore(element, body.firstChild);
}
