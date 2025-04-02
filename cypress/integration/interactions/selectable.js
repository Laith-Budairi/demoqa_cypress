const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Interactions - Sortable', () => {
    const url = config.e2e.baseUrl + "/interaction";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(4, 'item-1')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can select list items', () => {
        cy.get('#verticalListContainer').first().within(() => {
            cy.get('.list-group-item').eq(0).click()
            cy.get('.list-group-item').eq(0).should('have.class', 'active')
                .and('have.text', 'Cras justo odio')
        })
    })

    it('can select grid items', () => {
        cy.get('#demo-tab-grid').click()
        cy.get('#row1').children().first().click()
        cy.get('#row1').children().first().should('have.class', 'active')
            .and('have.text', 'One')
    })

})