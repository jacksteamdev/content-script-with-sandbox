import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Content Script with Sandbox",
  version: "1.0.0",
  content_scripts: [{ js: ["main.js"], matches: ["https://www.google.com/*"] }],
  sandbox: { pages: ["sandbox.html"] },
  web_accessible_resources: [
    { matches: ["https://www.google.com/*"], resources: ["sandbox.html"] },
  ],
});

export default defineConfig({
  plugins: [crx({ manifest })],
});
