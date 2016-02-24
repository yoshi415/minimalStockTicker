function createiFrame() {
  const exists = getiFrame();
  if (!exists) {
    document.body.style.position = 'relative';
    document.getElementsByTagName('html')[0].style.top = '0px';
    document.getElementsByTagName('html')[0].style.marginTop = '25px';
    const frame = document.createElement('iframe');
    frame.setAttribute('src', '' + chrome.extension.getURL('stockTicker.html'));
    frame.setAttribute('id', 'minimalStockTicker');
    // frame.setAttribute('width', '100%');
    // frame.style.width = '50%'
    frame.style.backgroundColor = 'lightgrey'
    frame.style.height = '25px';
    frame.style.border = 'none';
    frame.style.position = 'absolute';
    frame.style.top = '0px';
    frame.style.left = '0px';
    frame.style.marginTop = '0px';
    frame.style.marginBottom = '0px';
    // frame.style.marginLeft = '0px';
    frame.style.zIndex = '10000000';
    frame.style.width = '100%';
    // document.body.style['transform'] = 'translateY(25px)';
    document.documentElement.appendChild(frame, document.documentElement);
  }
}

function removeiFrame() {
  console.log('running')
  const iframe = getiFrame();
  console.log('iframe', iframe)
  iframe.remove();
  document.body.style['transform'] = 'translateY(0px)';
}

function getiFrame() {
  return document.getElementById('minimalStockTicker');
}

export { createiFrame, removeiFrame, getiFrame }