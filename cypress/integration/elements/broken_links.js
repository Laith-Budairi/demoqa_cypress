const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('elements section broken links - images', () => {
    const url = config.e2e.baseUrl + "/broken";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(0, 'item-6')
    })

    afterEach(() => {
        commonHelper.goToPage(url)
    })

    it('should verify the valid and broken images', () => {


    cy.get('img[src="/images/Toolsqa.jpg"]').should('be.visible')
            .and('have.prop', 'naturalWidth')
            .should('be.greaterThan', 0)

    cy.get('img[src="/images/Toolsqa_1.jpg"]').should('be.visible')
        .and('have.prop', 'naturalWidth')
        .should('not.be.greaterThan', 0)
    })



})