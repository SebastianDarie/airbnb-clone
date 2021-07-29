import commonjs from '@rollup/plugin-commonjs';
import graphql from '@rollup/plugin-graphql';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { skypin } from 'rollup-plugin-skypin';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    // {
    //   file: pkg.main,
    //   format: 'cjs',
    // },
    // {
    //   file: 'dist/index.min.js',
    //   format: 'cjs',
    //   plugins: [terser()],
    // },
    {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      plugins: [terser()],
    },
  ],
  external: ['@apollo/client', 'graphql', 'react'],
  plugins: [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    commonjs(),
    graphql(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
};
