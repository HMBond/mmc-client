/// <reference types="cypress" />

describe('MIDI state', () => {
  before(() => {
    cy.visitHost();
    cy.openSettingsDialog();
    selectSecondInputAndOutput();
    storeInputAndOutputId();
  });
  it('should be persisted after page reload', function () {
    cy.reload();
    cy.openSettingsDialog();
    cy.get('select#input-select').invoke('val').should('equal', this.secondInputId);
    cy.get('select#output-select').invoke('val').should('equal', this.secondOutputId);
  });
});

function selectSecondInputAndOutput() {
  cy.get('select#input-select').select(1).as('input-select-element');
  cy.get('select#output-select').select(1).as('output-select-element');
}

function storeInputAndOutputId() {
  cy.get('@input-select-element').invoke('val').as('secondInputId');
  cy.get('@output-select-element').invoke('val').as('secondOutputId');
}
