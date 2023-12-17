// javascript: (       )();
function xray() {
    const xray = document.createElement('style');
    xray.innerHTML = "*{background:#09367278!important;color:#0f0!important;outline:solid #f00 1px!important;}";
    const xraysInPage = [...document.body.getElementsByTagName("style")].filter(style => style.innerHTML === xray.innerHTML);
    if (xraysInPage.length > 0) {
        xraysInPage.forEach(style => document.body.removeChild(style));
    }
    else { document.body.appendChild(xray) }
}

