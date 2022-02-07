Cypress.Commands.add('visitHost', () => {
  cy.visit(Cypress.env('host'));
});

Cypress.Commands.add('openSettingsDialog', () => {
  cy.get('button[aria-label="settings"]').click();
});
