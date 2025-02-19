import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import summary from 'rollup-plugin-summary';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: 'src/main.js', // Main entry file
  output: {
    file: 'dist/bundle.js',
    format: 'es', 
    sourcemap: true,
  },
  plugins: [
    replace({
      preventAssignment: true,
      'Reflect.decorate': 'undefined',
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    resolve({
      browser: true, 
      extensions: ['.js', '.mjs'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', 
    }),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),

    serve({
      open: true,
      contentBase: ['public', 'dist'], 
      port: 8000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      }
    }),
    
    livereload({
      watch: ['public', 'dist'], 
    }),
  ],
};
