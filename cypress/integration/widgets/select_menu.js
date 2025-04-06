const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Widgets - select menu', () => {
    const url = config.e2e.baseUrl + "/menu";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(3, 'item-8')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can select options from dropdowns', () => {
        cy.get('#withOptGroup').click()
        cy.get('#react-select-2-option-0-1').click()
        cy.get('#selectOne').click()
        cy.get('#react-select-3-option-0-0').click()
        cy.get('#oldSelectMenu').select("5")
        cy.get('#oldSelectMenu').should('have.value', '5');
        cy.get('#cars').select(["volvo", "saab"]);
        cy.get('#cars').invoke('val').should('deep.equal',["volvo", "saab"]);
    })
})