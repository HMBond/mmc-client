/// <reference types="cypress" />

describe('State', () => {
  it('should be persisted after page reload', () => {
    cy.visitHost();
    // open settings dialog
    cy.openSettingsDialog();
    // check all checkboxes
    cy.get('input[type=checkbox]').check();
    cy.reload(true);
    // open settings dialog
    cy.openSettingsDialog();

    // assert
    cy.get('input[type=checkbox]').should('be.checked');

    // reverse: uncheck all checkboxes
    cy.get('input[type=checkbox]').uncheck();
    cy.reload(true);
    // open settings dialog
    cy.openSettingsDialog();

    // assert
    cy.get('input[type=checkbox]').should('not.be.checked');
  });
});
