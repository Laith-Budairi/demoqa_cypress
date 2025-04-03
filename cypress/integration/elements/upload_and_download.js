const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('elements section broken links - upload and download', () => {
    const url = config.e2e.baseUrl + "/upload-download";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(0, 'item-7')
    })

    afterEach(() => {
        commonHelper.goToPage(url)
        cy.deleteDownloadsFolder()
    })

    it('can download', () => {
        cy.get('#downloadButton').click()
        cy.readFile('./cypress/downloads/sampleFile.jpeg')

    })

})