// web-dev-server.config.mjs
import serve from 'rollup-plugin-serve';

export default {
  rootDir: 'public', // Serve files from the 'public' directory
  open: true, // Automatically open the browser
  watch: true, // Enable file watching
  nodeResolve: {
    exportConditions: ['development'], // Resolve modules for development
  },
  preserveSymlinks: true, // Preserve symlinks
  appIndex: 'index.html', // Serve 'index.html' as the entry point
};