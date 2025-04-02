const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

//todo: find a way to test it

describe('Alerts, frame, and windows section - alerts', () => {
    const url = config.e2e.baseUrl + "/alerts";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(2, 'item-1')
    })

    afterEach(() => {
        commonHelper.goToPage(url)
    })

    it('should open an alert window when clicked', () => {
        cy.get('#alertButton').click()

        cy.on('window:alert',(txt)=>{
            //Assertion
            expect(txt).to.contains('clicked');

            return true
        })
    })

    it.only('should open an alert window when clicked', () => {
        cy.get('#timerAlertButton').click()

        cy.on('window:alert',(txt)=>{
            //Assertion
            expect(txt).to.contains('5 seconds');

            return true
        })
    })




})