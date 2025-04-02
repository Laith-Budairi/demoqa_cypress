const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Interactions - Sortable', () => {
    const url = config.e2e.baseUrl + "/interaction";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(4, 'item-0')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can sort list items', () => {
        cy.get('#demo-tabpane-list').first().within(() => {
            cy.get('.list-group-item').eq(0).move({
                deltaX: 50,
                deltaY: 50,
            })
        })
    })

})