/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      visitHost(): void;
      openSettingsDialog(): void;
      getAllCheckboxes(): Chainable;
    }
  }
}
