import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path, { join } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: vitePreprocess(),
    }),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.json'),
    }),
    UnoCSS(),

    {
      name: 'webpack-ignore',
      renderDynamicImport() {
        return {
          left: 'import(/*webpackIgnore: true*/',
          right: ')',
        };
      },
    },
  ],
  server: {
    host: '127.0.0.1',
  },
  build: {
    emptyOutDir: true,
    minify: false,
    target: 'es2017',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'sdk',
      // the proper extensions will be added
      fileName: 'sdk',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['rxjs'],
    },
  },
});
