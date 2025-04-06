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

    it('can navigate through menus and sub menus', () => {
        cy.get('#nav').within(() => {
            cy.contains('Main Item 2').parent().realHover(undefined).should('be.visible')
            cy.get('a').contains('SUB SUB LIST »').parent().realHover(undefined).should('be.visible')
            //todo: sub menu not appearing
            cy.contains('Sub Sub Item 1').parent().realHover(undefined).should('be.visible')


        })
    })

})