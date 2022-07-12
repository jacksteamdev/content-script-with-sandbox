(async () => {
  try {
    const url = new URL(chrome.runtime.getURL("sandbox.html"));
    console.log("content script origin", url.origin);
    const [iframe] = await Promise.all([
      injectIframe({ src: url.href }),
      // templateReady(),
    ]);
    console.log("SUCCESS iframe loaded");
    const dom = new DOMParser().parseFromString(
      await renderTemplate(iframe, url.origin)
    );
    document.body.append(dom.body.firstElementChild);
  } catch (error) {
    console.error(error);
  }
})();

/**
 * Send a message to an Iframe to render a Handlebars iframe.
 *
 * I'm concerned about the security of passing HTML back and forth using window.postMessage in a content script.
 *
 * @param {HTMLIframeElement} iframe Iframe containing Handlebars template
 * @param {string} targetOrigin The origin of the
 */
function renderTemplate(iframe, targetOrigin) {
  return new Promise((resolve, reject) => {
    window.addEventListener("message", (event) => {
      console.log("message", event);
      // Checking the origin here, so we know the extension page sent it
      if (
        event.origin === targetOrigin &&
        event.data.type === "template-rendered"
      )
        resolve(event.data.html);
    });

    iframe.contentWindow.postMessage({ type: "template-render" }, "*");
  }, false);
}

/**
 * Wait for the template script to load.
 *
 * @param {HTMLIframeElement} iframe Iframe containing Handlebars template
 * @param {string} targetOrigin The origin of the
 */
function templateReady(iframe, targetOrigin) {
  return new Promise((resolve, reject) => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "template-ready") resolve(event.data.html);
    });
  }, false);
}

/**
 * Creates an iframe element and appends it to the target element.
 *
 * @param {IframeHTMLAttributes} attrs Iframe attributes, e.g., `src`, `allow`, `style`
 * @param {HTMLElement} target Optional custom parent element. Default is `document.body`
 * @returns {Promise<HTMLIframeElement>} Resolves the iframe after if loads, or rejects if the iframe errors before the load event.
 */
function injectIframe(attrs, target = document.body) {
  return new Promise((resolve, reject) => {
    try {
      const iframe = document.createElement("iframe");
      for (const [key, value] of Object.entries(attrs))
        iframe.setAttribute(key, value);
      iframe.addEventListener("error", (error) => {
        reject(error);
      });
      iframe.addEventListener("load", () => {
        resolve(iframe);
      });
      console.log("appending iframe", iframe);
      target.append(iframe);
    } catch (error) {
      reject(error);
    }
  });
}
