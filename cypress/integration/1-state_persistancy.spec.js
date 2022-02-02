describe('State', () => {
  it('should be persisted after page reload', () => {
    cy.visit(Cypress.env('host'));
    // open settings dialog
    cy.get('button[aria-label="settings"]').click();
    // check all checkboxes
    cy.contains('Show edit button').parent().find('input[type=checkbox]').check();

    cy.reload(true);

    // open settings dialog
    cy.get('button[aria-label="settings"]').click();
    // assert
    cy.contains('Show edit button').parent().find('input[type=checkbox]').should('be.checked');

    // reverse: uncheck all checkboxes
    cy.contains('Show edit button').parent().find('input[type=checkbox]').uncheck();

    cy.reload(true);

    // open settings dialog
    cy.get('button[aria-label="settings"]').click();
    // assert
    cy.contains('Show edit button').parent().find('input[type=checkbox]').should('not.be.checked');
  });
});
