const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Interactions - Sortable', () => {
    const url = config.e2e.baseUrl + "/interaction";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(4, 'item-3')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can drag box', () => {
        cy.get('#droppable').should('have.text', 'Drop here')
        cy.get('#draggable').drag('#droppable', {
            force: true
        })
        cy.get('#droppable').should('have.text', 'Dropped!')
        cy.get('#droppable').should('have.class', 'ui-state-highlight')
    })

})