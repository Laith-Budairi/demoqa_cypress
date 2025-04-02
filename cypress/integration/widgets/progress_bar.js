const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Widgets - progress bar', () => {
    const url = config.e2e.baseUrl + "/slider";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(3, 'item-4')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can fill the progress bar in 10 seconds and reset it', () => {

        cy.get('#startStopButton').click()
        cy.wait(10000)
        cy.get('#progressBar').children().first().should('contain.text', '100%')
        cy.get('#resetButton').click()
        cy.get('#progressBar').children().first().should('contain.text', '0%')
    })




})