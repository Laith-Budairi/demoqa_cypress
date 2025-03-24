describe('elements section check box', () => {
    const url = "https://demoqa.com/elements";
    before(() => {
        cy.visit(url);
        cy.get('.accordion').children()
            .eq(0).within(() => {
            cy.get('#item-1').click()
        })
    })

    afterEach(() => {
        cy.reload()
    })

    it('can check all boxes if Home root checkbox is checked', () => {
        cy.get('#tree-node-home').check({force: true});
        cy.get('#tree-node').children().first()
            .children().first().click();
        // cy.get('#tree-node-desktop').uncheck({force: true});
        // cy.get('#tree-node').find('input[type="checkbox"]')
        //     .should('be.checked').and('have.length', 17)

        cy.get('#tree-node').find('input[type="checkbox"]').each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked');
        })


        // cy.get('#tree-node').find('span[class=rct-title]')
        //     .then((spans) => {
        //
        //         let text = '';
        //         spans.each((index, element) => {
        //             text += element.innerHTML.toLowerCase().split(".")[0] + " "
        //         })
        //
        //         text.trim()
        //         cy.get('#result').should('be.visible').and('equal', text)
        //
        //
        //     })

        // assert #result
    })

    it('can check sub checkboxes of "Desktop" checkbox', () => {
        cy.get('#tree-node').children().first()
            .children().first().click()

        cy.get('#tree-node-desktop').check({force: true});

        cy.get('#tree-node-desktop').closest('li').find('input[type="checkbox"]').each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked');
        })
    })

    // it('should print text of all checked checkboxes of "Desktop" checkbox', () => {
    //     cy.get('#tree-node-home').check({force: true});
    //     cy.get('#tree-node').children().first()
    //         .children().first().click();
    //
    //     cy.get('#tree-node').find('span[class="rct-title"]').each(($checkbox) => {
    //        let text = '';
    //        text = text.concat($checkbox.text().split('.')[0].toLowerCase(), " ")
    //         console.log(text)
    //     })
    //
    //
    // })


})