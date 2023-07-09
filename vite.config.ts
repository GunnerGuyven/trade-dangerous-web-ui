import { defineConfig } from "vite";
import treeSitterPlugin from "vite-plugin-tree-sitter";
//import arraybuffer from "vite-plugin-arraybuffer";

export default defineConfig({
  plugins: [
    //arraybuffer()
    treeSitterPlugin(["tree-sitter-sqlite"]),// { alwaysRebuild: true }),
  ],
});
