const commonHelper = require('./common_util');

module.exports = {
    navigateToGroupAndItem: (group, itemId) => {
        cy.get('.accordion').children()
            .eq(group).within(() => {
            commonHelper.clickButton(itemId)
        })
    }
}