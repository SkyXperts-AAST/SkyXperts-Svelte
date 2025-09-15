import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const dev = process.argv.includes("dev");
const basePath = process.env.BASE_PATH ?? (dev ? "" : "/SkyXperts-Svelte");

export default {
  kit: {
    adapter: adapter({ fallback: "404.html" }),
    paths: { base: basePath },
    prerender: {
      // start crawl at the base (not at '/')
      entries: [`${basePath}/`],
    },
  },
};
