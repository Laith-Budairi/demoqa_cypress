const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Widgets - tabs', () => {
    const url = config.e2e.baseUrl + "/tabs";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(3, 'item-5')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can switch between different tabs', () => {

        cy.get('#tabsContainer').within(() => {
            cy.get('#demo-tab-origin').click()
            cy.get('#demo-tab-origin').should('have.class', 'active')

            cy.get('#demo-tab-use').click()
            cy.get('#demo-tab-use').should('have.class', 'active')

            cy.get('#demo-tab-what').click()
            cy.get('#demo-tab-what').should('have.class', 'active')

            cy.get('#demo-tab-more').should('have.css', 'pointer-events', 'none');



        })

    })




})