export default (stocks) => {
  let html = '';
  const last = stocks.length - 1;

  stocks.forEach((stock, index) => {
    html += createSpan(stock, index, last);
  })
  // createiFrame();
  appendHTML(html);
}

function createSpan(stock, index, last) {
  let symbol = stock.resource.fields;
  let sym = `<a class="stockLink" target="_blank" href="http://finance.yahoo.com/q?s=${symbol.symbol}">${symbol.symbol}</a>`;
  let price = Number(symbol.price).toFixed(2);
  let chg = Number(symbol.chg_percent).toFixed(2);

  let span = `<span class="stockFont"> ${sym} ${price} <span class="`;
  span += chg[1] !== '-' ? 'positive' : 'negative';
  span += `">${chg}</span>%`;
  if (index !== last) {
    span += ' |';
  }
  span += '  </span>';
  return span;
}

// function createiFrame(html) {
//   document.body.style.position = "relative";
//   document.getElementsByTagName('html')[0].style.top = '0px';
//   document.getElementsByTagName('html')[0].style.marginTop = '30px';
//   var frame = document.createElement("iframe");
//   frame.setAttribute('src', "" + chrome.extension.getURL('stockTicker.html') + "");
//   frame.setAttribute('id', "stockTicker");
//   frame.setAttribute('allowtransparency', "true");
//   frame.setAttribute('width', '100%');
//   frame.style.height = "30px";
//   frame.style.border = "none";
//   frame.style.position = "fixed";
//   frame.style.top = "0px";
//   frame.style.left = "0px";
//   frame.style.marginBottom = "0px";
//   frame.style.marginLeft = "0px";
//   frame.style.zIndex = "10000000";
//   frame.style.width = '100%';
//   document.body.insertBefore(frame, document.body.firstChild);
//   appendHTML(html);
// }

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
