module.exports = {
    submitPracticeForm: (form, canSubmit = true) => {
        cy.get('#userForm').within(() => {
            // get all fields of the form
            if(form.firstName)
                cy.get('#firstName').type(form.firstName)
            if(form.lastName)
                cy.get('#lastName').type(form.lastName)

            cy.get('#userEmail').type(form.email)
            cy.get('#gender-radio-1').check({ force: true });

            if(form.mobile)
                cy.get('#userNumber').type(form.mobile)

            cy.get('#dateOfBirth').click().within((res) => {
                cy.get('.react-datepicker__month-select').select(form.dateOfBirth.month)
                cy.get('.react-datepicker__year-select').select(form.dateOfBirth.year) // Change as needed
                // Select the specific day
                cy.get(`.react-datepicker__day--0${form.dateOfBirth.day}:not(.react-datepicker__day--outside-month)`)
                    .should('be.visible')
                    .click();

            })
            // subjects
            cy.get('#subjectsInput').type(form.subjects[0])
            cy.get('#react-select-2-option-0').click()
            cy.get('#subjectsInput').type(form.subjects[1])
            cy.get('#react-select-2-option-0').click()
            cy.get('#hobbies-checkbox-1').check({ force: true });
            cy.get('#hobbies-checkbox-3').check({ force: true });

            //upload picture
            const fileName = 'exalt.jpg'
            cy.get('#uploadPicture').attachFile(fileName)
            cy.get('#uploadPicture').then(($input) => {
                expect($input[0].files.length).to.be.greaterThan(0); // Ensure file is attached
            });


            cy.get('#currentAddress').type(form.address);
            // state and city
            cy.get('#state').click()
            cy.get('#react-select-3-option-0').click()
            cy.get('#city').click()
            cy.get('#react-select-4-option-1').click()

            // submit
            if(canSubmit)
                cy.get('#submit').click({force: true});



        })
    }
}