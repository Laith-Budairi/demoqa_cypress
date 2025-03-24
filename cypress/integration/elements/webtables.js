const webTables = require('../../support/elements/webtables')

let record_1 = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    age: '33',
    salary: '3000',
    department: 'Health'
}

describe('elements section web tables', () => {
    const url = "https://demoqa.com/elements";
    before(() => {
        cy.visit(url);
        cy.get('.accordion').children()
            .eq(0).within(() => {
            cy.get('#item-3').click()
        })
    })

    afterEach(() => {
        cy.reload()
    })

    it('can add a new record', () => {
        webTables.addRecord(record_1)
        // webTables.lookupRecord(record_1, "result")

        cy.get('.ReactTable').find('div[class="rt-tr-group"]').then(($rows) => {
            const targetRow = [...$rows].find(row => row.innerText.includes(record_1.email))

            const $cells = Cypress.$(targetRow).find('.rt-td') // Get all cells in the row

            cy.wrap($cells).as('cells')

        })

        cy.get('@cells').then(($cells) => {
            expect($cells.eq(0).text().trim()).to.eq(record_1.firstName); // First Name
            expect($cells.eq(1).text().trim()).to.eq(record_1.lastName); // Last Name
            expect($cells.eq(2).text().trim()).to.eq(record_1.age); // Age
            expect($cells.eq(3).text().trim()).to.eq(record_1.email); // Email
            expect($cells.eq(4).text().trim()).to.eq(record_1.salary); // Salary
            expect($cells.eq(5).text().trim()).to.eq(record_1.department); // Department
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
            cy.get('#firstName').type(record_1.firstName)
            cy.get('#lastName').type(record_1.lastName)
            cy.get('#userEmail').type(record_1.email)
            cy.get('#age').type(record_1.age)
            cy.get('#salary').type(record_1.salary)
            cy.get('#department').type(record_1.department)
            cy.get('#submit').click()
        })

        cy.get('.ReactTable').find('div[class="rt-tr-group"]').then(($rows) => {
            const targetRow = [...$rows].find(row => row.innerText.includes(record_1.email))
            const oldRow = [...$rows].find(row => row.innerText.includes('cierra@example.com'))
            cy.wrap(oldRow).should('not.exist')

            const $cells = Cypress.$(targetRow).find('.rt-td') // Get all cells in the row

            cy.wrap($cells).as('cells')

        })

        cy.get('@cells').then(($cells) => {
            expect($cells.eq(0).text().trim()).to.eq(record_1.firstName); // First Name
            expect($cells.eq(1).text().trim()).to.eq(record_1.lastName); // Last Name
            expect($cells.eq(2).text().trim()).to.eq(record_1.age); // Age
            expect($cells.eq(3).text().trim()).to.eq(record_1.email); // Email
            expect($cells.eq(4).text().trim()).to.eq(record_1.salary); // Salary
            expect($cells.eq(5).text().trim()).to.eq(record_1.department); // Department
        });
    })

    // it('can search for a record', () => {
    //
    // })

})