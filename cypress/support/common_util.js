module.exports = {
    clickButton: (id) => {
        cy.get(`#${id}`).click()
    },

    typeText: (id, text) => {
        cy.get(`#${id}`).type(text)
    },

    clearFields: (...args) => {
        for (const arg of args) {
            cy.get(`#${arg}`).clear()
        }
    },
    checkBox: (id, checked = true) => {
        if(checked)
            cy.get(`#${id}`).check({force: true})
        else
            cy.get(`#${id}`).uncheck({force: true})
    },
    reloadCurrentPage: () => {
        cy.reload()
    },
    goToPage: (url) => {
        cy.visit(url)
    }
}