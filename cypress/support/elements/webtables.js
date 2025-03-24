module.exports = {
    addRecord: (record) => {
        cy.get('#addNewRecordButton').click()

        cy.get('#userForm').within(() => {
            cy.get('#firstName').type(record.firstName)
            cy.get('#lastName').type(record.lastName)
            cy.get('#userEmail').type(record.email)
            cy.get('#age').type(record.age)
            cy.get('#salary').type(record.salary)
            cy.get('#department').type(record.department)
            cy.get('#submit').click()

        })
    },
    clearForm: () => {
        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#userEmail').clear()
        cy.get('#age').clear()
        cy.get('#salary').clear()
        cy.get('#department').clear()
    }
    //  lookupRecord: (record, recordAlias) => {
    //      cy.get('.ReactTable').find('div[class="rt-tr-group"]').then(($rows) => {
    //          const targetRow = [...$rows].find(row => row.innerText.includes(record_1.email))
    //
    //          const $cells = Cypress.$(targetRow).find('.rt-td') // Get all cells in the row
    //
    //          cy.wrap($cells).as(recordAlias)
    //
    //      })
    //
    // }
}