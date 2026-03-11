const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const watch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: ["src/main.js"],
  bundle: true,
  outfile: "dist/assessment-v2.js",
  format: "iife",
  globalName: "ArchificialsAssessmentV2",
  target: ["es2020"],
  minify: !watch,
  sourcemap: watch ? "inline" : false,
  loader: { ".webp": "dataurl" },
  banner: {
    js: "/* Archificials Architecture Practice AI Readiness Assessment v2 | archificials.com */",
  },
};

async function build() {
  if (watch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log("Watching for changes...");
  } else {
    const result = await esbuild.build(buildOptions);
    const stat = fs.statSync("dist/assessment-v2.js");
    console.log(`Built dist/assessment-v2.js (${(stat.size / 1024).toFixed(1)}KB)`);
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
