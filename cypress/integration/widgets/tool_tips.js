const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Widgets - tool tips', () => {
    const url = config.e2e.baseUrl + "/tool-tips";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(3, 'item-6')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can show tool tip on button hover', () => {
        cy.get('#toolTipButton').trigger('mouseover')
        cy.wait(500)
        cy.get('#buttonToolTip').should('be.visible')
            .and('contain.text', 'You hovered over the Button')
    })

    it('can show tool tip on text field hover', () => {
        cy.get('#toolTipTextField').trigger('mouseover')
        cy.wait(500)
        cy.get('#textFieldToolTip').should('be.visible')
            .and('contain.text', 'You hovered over the text field')
    })




})