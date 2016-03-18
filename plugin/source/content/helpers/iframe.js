import { iframeStyles, bodyStyles } from './iframeStyles';

function setStyles(element, styles) {
  for (let style in styles) {
    element[style] = styles[style];
  }
}

function createiFrame() {
  const exists = getiFrame();
  if (!exists) {
    const frame = document.createElement('iframe');
    frame.setAttribute('src', '' + chrome.extension.getURL('stockTicker.html'));
    frame.setAttribute('id', 'minimalStockTicker');
    setStyles(frame.style, iframeStyles);
    setStyles(document.body.style, bodyStyles);
    document.documentElement.appendChild(frame, document.documentElement);
  }
}

function removeiFrame() {
  const iframe = getiFrame();
  iframe.remove();
  // document.body.style.transform = 'translateY(0px)';
  document.body.style.marginTop = '0px';
}

function getiFrame() {
  return document.getElementById('minimalStockTicker');
}

export { createiFrame, removeiFrame, getiFrame }