# MV3 Content Script with Handlebars

This Chrome Extension example is an exploration of using Handlebars in an MV3 extension.

The CSP for MV3 extensions forbids the use of `unsafe-eval`, and Handlebars uses `Function.apply` in its build output.

See [Using eval in Chrome extensions - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/sandboxingEval/) for context. The Google example uses an iframe inside of an extension page to render a Handlebars template and send it in a window message to the extension page.

Our use case requires using Handlebars in a content script.

## Development

This project is configured to use Vite and CRXJS, but extension sandboxes don't work very well with CRXJS. You can test this project out by simply installing the whole repo in Chrome as an upacked extension.
