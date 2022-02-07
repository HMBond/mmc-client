/// <reference types="cypress" />

afterEach(function () {
  // stop running tests if one fails
  if (this.currentTest.state === 'failed') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    Cypress.runner.stop();
  }
});

describe('Host system', () => {
  it('should have at least two available midi busses before running these tests', () => {
    cy.visitHost();
    cy.openSettingsDialog();
    cy.get('select#input-select').find('option').should('have.length.at.least', 2);
    cy.get('select#output-select').find('option').should('have.length.at.least', 2);
  });
});

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
