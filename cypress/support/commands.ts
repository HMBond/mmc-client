Cypress.Commands.add('visitHost', () => {
  cy.visit(Cypress.env('CYPRESS_BASE_URL'));
});

Cypress.Commands.add('openSettingsDialog', () => {
  cy.get('button[aria-label="settings"]').click();
});

Cypress.Commands.add('getAllCheckboxes', () => {
  return cy.get('input[type=checkbox]');
});
