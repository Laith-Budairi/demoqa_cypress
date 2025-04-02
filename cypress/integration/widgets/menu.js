const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Widgets - menu', () => {
    const url = config.e2e.baseUrl + "/menu";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(3, 'item-7')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    //todo: fix
    it('can navigate through menus and sub menus', () => {
        cy.get('#nav').within(() => {
            cy.contains('Main Item 2').trigger('mouseover')
            cy.wait(500)
            // cy.get('a').contains('SUB SUB LIST »').trigger('mouseover');
            // cy.contains('Sub Sub Item 1').click();
            //
            // cy.url().should('include', '/expected-path');

        })
    })

})