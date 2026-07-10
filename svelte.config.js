import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: true,
  },
  kit: {
    adapter: adapter(),
    alias: {
      $showcase: "src/showcase",
    },
  },
};

export default config;
