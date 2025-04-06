const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('Widgets - slider', () => {
    const url = config.e2e.baseUrl + "/slider";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(3, 'item-3')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can change the slider value', () => {

        cy.get('#sliderContainer input[type="range"]')
            .realClick({
                position: 'right',
            })

        cy.get('#sliderContainer div[class="range-slider__tooltip__label"').should('have.text', 100)
        cy.get('#sliderContainer input[type="range"]').should('have.attr', 'value', 100);
        cy.get('#sliderValue').should('have.value', '100')
    })



})