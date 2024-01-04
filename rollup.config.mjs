import copy from "rollup-plugin-copy";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import less from "rollup-plugin-less";

export default {
  input: "src/fvtt-sta.ts",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    copy({
      targets: [
        { src: "system.json", dest: "dist/" },
        { src: "template.json", dest: "dist/" },
        { src: "fonts/*", dest: "dist/fonts" },
        { src: "lang/*", dest: "dist/lang" },
        { src: "**/*.hbs", dest: "dist/templates" },
      ],
      flatten: false,
      copyOnce: true,
      copySync: true,
    }),
    less({
      output: "dist/fvtt-sta.css",
      watch: true,
    }),
    nodeResolve(),
    typescript(),
  ],
};