const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

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

        })
    })

    it('should open an alert window when clicked after 5 seconds', () => {
        cy.get('#timerAlertButton').click()
        cy.wait(5000)

        cy.on('window:alert',(txt)=>{
            //Assertion
            expect(txt).to.contains('5 seconds');

        })
    })

    it('can click confirm button after alert window is opened', () => {
        cy.get('#confirmButton').click()

        cy.on('window:alert',(txt)=>{
            //Assertion
            expect(txt).to.contains('confirm');

        })
    })

    it('can click cancel button after alert window is opened', () => {
        cy.window().then((win) => {
            cy.stub(win, 'confirm').returns(false); // Simulates clicking "Cancel"
        });
        cy.get('#confirmButton').click()

        cy.on('window:alert',(txt)=>{
            //Assertion
            expect(txt).to.contains('confirm');

        })
    })

    it('can enter prompt text after clicking alert button', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('John Doe');
            cy.get('#promtButton').click();
            cy.get('#promptResult').contains('John Doe');
        });
    })

})