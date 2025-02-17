export default {
  port: 8000,
  nodeResolve: true,
  open: true,
  appIndex: "public/index.html",
  watch: true,
  rootDir: "./",
  moduleDirs: ["node_modules"],
  mimeTypes: {
    '**/*.js': 'application/javascript'
  }
};
