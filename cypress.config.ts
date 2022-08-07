import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      // modify config values
      config.defaultCommandTimeout = 4000;
      config.baseUrl = process.env.BASE_URL || 'http://localhost:3000';

      // modify env var value // don't add sensative env variables
      config.env.ENVIRONMENT = process.env.ENVIRONMENT;
      config.env.BASE_URL = process.env.BASE_URL;

      // IMPORTANT return the updated config object
      return config;
    },
  },
});
