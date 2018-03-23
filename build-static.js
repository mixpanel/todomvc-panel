const fs = require(`fs-extra`);
const path = require(`path`);

const OUTDIR = `static-out`;
const VENDOR_DEPS = [
  `todomvc-common/base.css`,
  `todomvc-app-css/index.css`,
  `@webcomponents/custom-elements/custom-elements.min.js`,
  `todomvc-common/base.js`,
];

fs.removeSync(OUTDIR);
fs.mkdirpSync(OUTDIR);
const html = fs.readFileSync(`index.html`)
  .toString()
  .replace(/node_modules/g, `vendor`)
  ;
fs.writeFileSync(path.join(OUTDIR, `index.html`), html);

for (const dep of VENDOR_DEPS) {
  fs.copySync(path.join(`node_modules`, dep), path.join(OUTDIR, `vendor`, dep));
}
fs.copySync(path.join(`js`, `build.js`), path.join(OUTDIR, `js`, `build.js`));
