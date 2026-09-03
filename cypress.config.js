const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    specPattern: [
      "cypress/e2e/**/*.cy.js",
      "cypress/e2e/**/*.feature",
    ],
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Registramos o writer do Allure para gerar resultados consumidos pelo relatorio.
      allureWriter(on, config);

      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 800,
    // Retry em runMode reduz falhas intermitentes no CI sem mascarar problema local.
    retries: {
      runMode: 2,
      openMode: 0,
    },
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 120000,
    video: true,
    videoCompression: false,
    screenshotOnRunFailure: true,
  },
  env: {
    apiUrl: "https://jsonplaceholder.typicode.com",
    authApiUrl: "https://reqres.in/api",
    apiPerformanceThresholdMs: 1500,
  },
});
