describe('MIDI state', () => {
  before(() => {
    cy.visitHost();
    cy.openSettingsDialog();
  });

  it('should be persisted after browser reload', function () {
    cy.get('select#input-select')
      .find('option')
      .then((options) => {
        if (options.length < 2) {
          throw new Error('Environment system should provide as least two midi busses');
        }
      });
    selectSecondInputAndOutput();
    cy.reload();
    cy.openSettingsDialog();
    cy.get('@storedInputId').then((id) => {
      cy.get('select#input-select').invoke('val').should('equal', id);
    });
    cy.get('@storedOutputId').then((id) => {
      cy.get('select#output-select').invoke('val').should('equal', id);
    });
  });
});

function selectSecondInputAndOutput() {
  cy.get('select#input-select').select(1).invoke('val').as('storedInputId');
  cy.get('select#output-select').select(1).invoke('val').as('storedOutputId');
}
