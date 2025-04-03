const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

//todo: find a way to test it

describe('Alerts, frame, and windows section - frames', () => {
    const url = config.e2e.baseUrl + "/frames";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(2, 'item-2')
    })

    afterEach(() => {
        commonHelper.goToPage(url)
    })

    it('should have an iframe with <h1> in it', () => {
        // Access the iframe using its selector
        cy.get('#frame1').then(($iframe) => {
            // Get the iframe's document body
            const iframeBody = $iframe.contents().find('body');

            // Now interact with the iframe body like a normal page
            cy.wrap(iframeBody).find('#sampleHeading').should('have.text', 'This is a sample page');
        });
    })





})