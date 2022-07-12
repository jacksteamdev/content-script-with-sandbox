# MV3 Content Script with Handlebars

This Chrome Extension example is an exploration of using Handlebars in an MV3 extension.

The CSP for MV3 extensions forbids the use of `unsafe-eval`, and Handlebars uses `Function.apply` in its build output.

See [Using eval in Chrome extensions - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/sandboxingEval/) for context. The Google example uses an iframe inside of an extension page to render a Handlebars template and send it in a window message to the extension page.

Our use case requires using Handlebars in a content script. The idea is to load an extension sandbox in an iframe, in a host page. The host page will request an updated render from the sandboxed page, and the sandboxed page will pass the rendered HTML back to the page.

I have concerns about securing the messages. It may be possible for a bad actor to impersonate these messages, causing undesired content to render.

## Conclusion

I invested about 2 hours on this and still haven't got the messages working the way I want. I suspect that there are some bugs in the passing of messages between an extension sandbox and a content script host page.

It may not be possible to secure these messages. If that is the case, then the best solution would be to move the sandbox into an extension page, and pass the rendered HTML from sandbox to extension page to content script. This is overly complex.

IMO, almost any project would benefit from adopting a modern framework that works in content scripts. React, Vue, and Svelte all work in MV3 Chrome Extensions.

## Development

This project is configured to use Vite and CRXJS, but extension sandboxes don't work very well with CRXJS. You can test this project out by simply installing the whole repo in Chrome as an upacked extension.
