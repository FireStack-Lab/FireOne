const { task, src } = require('gulp');
const del = require('del');
const fs = require('fs');
const path = require('path');

const packages = [
  'fireone-api',
  'fireone-assests',
  'fireone-contentscript',
  'fireone-background',
  'fireone-inpage',
  'fireone-ui',
  'fireone-utils',
];

task('cleanBrowser', async () => {
  await packages.map((p) => {
    const pathToLib = `packages/${p}/lib`;
    return del.sync([pathToLib]);
  });
});

task('cleanServer', async () => {
  await packages.map((p) => {
    const pathToLib = `packages/${p}/dist`;
    return del.sync([pathToLib]);
  });
});

task('cleanUnexpected', async () => {
  await packages.map((p) => {
    const pathToLib = `packages/${p}/tsconfig.tsbuildinfo`;
    return del.sync([pathToLib]);
  });
});

task('cleanDocs', async () => {
  await packages.map((p) => {
    const pathToLib = `docs/${p}`;
    return del.sync([pathToLib]);
  });
});
