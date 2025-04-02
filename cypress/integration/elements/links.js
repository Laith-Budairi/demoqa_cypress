const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('elements section links', () => {
    const url = config.e2e.baseUrl + "/links";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(0, 'item-5')
    })

    afterEach(() => {
        commonHelper.goToPage(url)
    })

    it('should verify all links are visible and have correct hrefs', () => {
        cy.get('#simpleLink')
            .should('be.visible')
            .and('have.attr', 'href', 'https://demoqa.com');

        cy.get('#dynamicLink')
            .should('be.visible')
            .and('have.attr', 'href', 'https://demoqa.com');
    })

    it('should navigate to the correct page when clicking on "Home" link', () => {
        cy.get('#simpleLink').should('have.attr', 'target', '_blank');

        cy.get('#simpleLink').invoke('removeAttr', 'target')
        cy.get('#simpleLink').click()

        cy.url().should('eq', `${config.e2e.baseUrl}/`);
    });

    it('should trigger API request when clicking a link', () => {
        cy.intercept('GET', '**/created').as('createdRequest');

        cy.get('#created').click();

        cy.wait('@createdRequest').its('response.statusCode').should('eq', 201);
    });



})