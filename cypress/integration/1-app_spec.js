describe('Loading the app', () => {
  it('Visits localhost', () => {
    cy.visit(`http://localhost:${Cypress.env('server_port')}`);
  });
});
