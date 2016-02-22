export default () => {
  document.body.style.position = 'relative';
  document.getElementsByTagName('html')[0].style.top = '0px';
  document.getElementsByTagName('html')[0].style.marginTop = '25px';
  var frame = document.createElement('iframe');
  frame.setAttribute('src', '' + chrome.extension.getURL('stockTicker.html') + '');
  // frame.setAttribute('id', 'minimalStockTicker');
  frame.setAttribute('allowtransparency', 'true');
  frame.setAttribute('width', '100%');
  frame.style.height = '25px';
  frame.style.border = 'none';
  frame.style.position = 'fixed';
  frame.style.top = '0px';
  frame.style.left = '0px';
  frame.style.marginBottom = '0px';
  frame.style.marginLeft = '0px';
  frame.style.zIndex = '10000000';
  frame.style.width = '100%';
  // document.body.insertAdjacentHTML('beforebegin', frame)
  // document.body.insertBefore(frame, document.body.childNodes[0]);
  // document.body.style['transform'] = 'translateY(25px)';
  // document.body.insertBefore(frame, document.body.firstChild);
  document.documentElement.appendChild(frame, document.documentElement);
}