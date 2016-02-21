export default () => {
  document.body.style.position = "relative";
  document.getElementsByTagName('html')[0].style.top = '0px';
  document.getElementsByTagName('html')[0].style.marginTop = '30px';
  var frame = document.createElement("iframe");
  frame.setAttribute('src', "" + chrome.extension.getURL('stockTicker.html') + "");
  // frame.setAttribute('id', "stockTicker");
  frame.setAttribute('allowtransparency', "true");
  frame.setAttribute('width', '100%');
  frame.style.height = "30px";
  frame.style.border = "none";
  frame.style.position = "fixed";
  frame.style.top = "0px";
  frame.style.left = "0px";
  frame.style.marginBottom = "0px";
  frame.style.marginLeft = "0px";
  frame.style.zIndex = "10000000";
  frame.style.width = '100%';
  document.body.insertBefore(frame, document.body.firstChild);
}

function createiFrame(html) {
}