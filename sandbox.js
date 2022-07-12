console.log("sandbox.js", location.origin);
window.addEventListener("message", (event) => {
  console.log("sandbox message", event);
  if (event.data.type === "template-render") {
    // TODO: do something with handlebars, for now, just return some html
    const html = `<h1>Something rendered and fancy</h1>`;
    event.source.postMessage({ type: "template-rendered", html }, "*");
  }
});

// window.parent.postMessage({ type: "template-ready" }, "*");
