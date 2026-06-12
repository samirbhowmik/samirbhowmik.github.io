// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://samirbhowmik.cc',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
