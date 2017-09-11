const {
  FuseBox,
  SassPlugin,
  CSSPlugin,
} = require('fuse-box');

const path = require('path');

const basePath = 'app';
const distPath = 'dist';

const fuse = FuseBox.init({
  homeDir: basePath,
  output: `${distPath}/$name.js`,
  tsConfig: 'tsconfig.json',
  log: true,
  debug: true,
  cache: false,
  sourceMaps: {
    inline: false,
    sourceRoot: ``
  }
});

fuse.bundle(basePath)
  .plugin([
    SassPlugin({
      sourceMap: true,
      outputStyle: 'compressed'
    }),
    CSSPlugin({
      inject: file => `/${file}`,
      outFile: file => `${distPath}/${file}`
    })
  ])
  .target('browser')
  .instructions(`> index.ts`);

fuse.run();