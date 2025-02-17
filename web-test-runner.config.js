import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true }),
  ],
  middleware: [
    (context, next) => {
      // 🔥 process objesini tanımla
      context.globalThis.process = { env: { NODE_ENV: 'test' } };
      return next();
    },
  ],
};