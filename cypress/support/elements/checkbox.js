module.exports = {
    expandAllDirectories: () => {
        cy.get('#tree-node').children().first()
            .children().first().click();
    },
    verifyAllBoxesAreCheckedUnderRootTreeNodeWithId: (id) => {
        cy.get(`#${id}`).find('input[type="checkbox"]').each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked');
        })
    },
    verifyAllBoxesAreCheckedUnderTreeNodeWithId: (id) => {
        cy.get(`#${id}`).closest('li').find('input[type="checkbox"]').each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked');
        })
    }
}