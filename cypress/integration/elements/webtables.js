const webTables = require('../../support/elements/webtables')

const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');


let records = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        age: '33',
        salary: '3000',
        department: 'Health'
    },
    {
        firstName: 'Sandra',
        lastName: 'Potter',
        email: 'sandra@potter.com',
        age: '18',
        salary: '30000',
        department: 'Engineering'
    },
    {
        firstName: 'Sandra',
        lastName: 'Potter',
        email: 'sandra@potter.com',
        age: '18',
        salary: '30000',
        department: 'Engineering'
    },
    {
        firstName: 'Anna',
        lastName: 'Hawking',
        email: 'anna@hawking.com',
        age: '18',
        salary: '4400',
        department: 'Defense'
    },
    {
        firstName: 'Peter',
        lastName: 'Parker',
        email: 'peter@parker.com',
        age: '41',
        salary: '55000',
        department: 'Acting'
    }

]
describe('elements section web tables', () => {
    const url = config.e2e.baseUrl + "/elements";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(0, 'item-3')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can add a new record', () => {
        webTables.addRecord(records[0])

        cy.get('.ReactTable').find('div[class="rt-tr-group"]').then(($rows) => {
            const targetRow = [...$rows].find(row => row.innerText.includes(records[0].email))

            const $cells = Cypress.$(targetRow).find('.rt-td') // Get all cells in the row

            cy.wrap($cells).as('cells')

        })

        cy.get('@cells').then(($cells) => {
            expect($cells.eq(0).text().trim()).to.eq(records[0].firstName); // First Name
            expect($cells.eq(1).text().trim()).to.eq(records[0].lastName); // Last Name
            expect($cells.eq(2).text().trim()).to.eq(records[0].age); // Age
            expect($cells.eq(3).text().trim()).to.eq(records[0].email); // Email
            expect($cells.eq(4).text().trim()).to.eq(records[0].salary); // Salary
            expect($cells.eq(5).text().trim()).to.eq(records[0].department); // Department
        });
    })

    it('can delete a record', () => {
        cy.get('#delete-record-1').click()

        cy.get('.ReactTable').find('div[class="rt-tr-group"]').then(($rows) => {
            const targetRow = [...$rows].find(row => row.innerText.includes('cierra@example.com'))

            cy.wrap(targetRow).should('not.exist')
        })
    })

    it('can edit an existing record', () => {
        cy.get('#edit-record-1').click()

        cy.get('#userForm').within(() => {
            webTables.clearForm()
            cy.get('#firstName').type(records[0].firstName)
            cy.get('#lastName').type(records[0].lastName)
            cy.get('#userEmail').type(records[0].email)
            cy.get('#age').type(records[0].age)
            cy.get('#salary').type(records[0].salary)
            cy.get('#department').type(records[0].department)
            cy.get('#submit').click()
        })

        cy.get('.ReactTable').find('div[class="rt-tr-group"]').then(($rows) => {
            const targetRow = [...$rows].find(row => row.innerText.includes(records[0].email))
            const oldRow = [...$rows].find(row => row.innerText.includes('cierra@example.com'))
            cy.wrap(oldRow).should('not.exist')

            const $cells = Cypress.$(targetRow).find('.rt-td') // Get all cells in the row

            cy.wrap($cells).as('cells')

        })

        cy.get('@cells').then(($cells) => {
            expect($cells.eq(0).text().trim()).to.eq(records[0].firstName); // First Name
            expect($cells.eq(1).text().trim()).to.eq(records[0].lastName); // Last Name
            expect($cells.eq(2).text().trim()).to.eq(records[0].age); // Age
            expect($cells.eq(3).text().trim()).to.eq(records[0].email); // Email
            expect($cells.eq(4).text().trim()).to.eq(records[0].salary); // Salary
            expect($cells.eq(5).text().trim()).to.eq(records[0].department); // Department
        });
    })

    it('can search for a record by first name', () => {
        webTables.addRecord(records[1])

        cy.get('#searchBox').type(records[1].firstName)
        cy.get('#basic-addon2').parent().click()

        cy.get('.ReactTable').find('div[class="rt-tr-group"]').then(($rows) => {
            const targetRow = [...$rows].find(row => row.innerText.includes(records[1].email))

            const $cells = Cypress.$(targetRow).find('.rt-td') // Get all cells in the row

            cy.wrap($cells).as('cells')

        })

        cy.get('@cells').then(($cells) => {
            expect($cells.eq(0).text().trim()).to.eq(records[1].firstName); // First Name
            expect($cells.eq(1).text().trim()).to.eq(records[1].lastName); // Last Name
            expect($cells.eq(2).text().trim()).to.eq(records[1].age); // Age
            expect($cells.eq(3).text().trim()).to.eq(records[1].email); // Email
            expect($cells.eq(4).text().trim()).to.eq(records[1].salary); // Salary
            expect($cells.eq(5).text().trim()).to.eq(records[1].department); // Department
        });

    })

})