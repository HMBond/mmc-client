/// <reference types="cypress" />

describe('State', () => {
  it('should be persisted after page reload', () => {
    cy.visitHost();
    cy.openSettingsDialog();
    cy.getAllCheckboxes().check();

    cy.reload(true);
    cy.openSettingsDialog();

    // assert
    cy.getAllCheckboxes().should('be.checked');

    cy.getAllCheckboxes().uncheck();

    cy.reload(true);
    cy.openSettingsDialog();

    // assert
    cy.getAllCheckboxes().should('not.be.checked');
  });
});
