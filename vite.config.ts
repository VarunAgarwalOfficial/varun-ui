import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import { sveltePhosphorOptimize } from "phosphor-svelte/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      adapter: adapter(),
      alias: {
        $lib: "src/lib",
        $showcase: "src/showcase",
      },
      compilerOptions: {
        runes: true,
      },
    }),
    sveltePhosphorOptimize(),
  ],
});
