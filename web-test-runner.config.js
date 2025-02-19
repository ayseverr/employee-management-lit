import { playwrightLauncher } from '@web/test-runner-playwright';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

const browsers = {
  chromium: playwrightLauncher({ product: 'chromium' }),
  firefox: playwrightLauncher({ product: 'firefox' }),
  webkit: playwrightLauncher({ product: 'webkit' }),
};

const noBrowser = (b) => {
  throw new Error(`No browser configured named '${b}'; using defaults`);
};

let commandLineBrowsers;
try {
  commandLineBrowsers = process.env.BROWSERS?.split(',').map(
    (b) => browsers[b] ?? noBrowser(b)
  );
} catch (e) {
  console.warn(e);
}

export default {
  rootDir: '.',
  files: ['src/tests/**/*.test.js'],
  nodeResolve: {
    exportConditions: mode === 'dev' ? ['development'] : [],
  },
  testsStartTimeout: 60000,
  preserveSymlinks: true,
  // Change testRunnerHtml from a string to a function that returns the HTML content.
  testRunnerHtml: () => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Web Test Runner</title>
        <script>
          // Define a global process object before any modules load.
          window.process = { env: { NODE_ENV: 'test' } };
        </script>
      </head>
      <body></body>
    </html>
  `,
  browsers: commandLineBrowsers ?? Object.values(browsers),
  testFramework: {
    config: {
      ui: 'tdd',
      timeout: '60000',
    },
  },
  setup: 'src/tests/setup.js',
};
