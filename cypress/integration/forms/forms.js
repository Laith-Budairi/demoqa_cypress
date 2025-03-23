import {submitPracticeForm} from '../../support/forms/forms'

describe("Forms section", () => {
    let url = "https://demoqa.com/forms";
    before(() => {
        cy.visit(url);
        cy.get('.accordion').children()
            .eq(1).within(() => {
                cy.get('#item-0').click()
            })
    })

    afterEach(() => {
        cy.reload()
    })

    it("can register a student form", () => {
        let form = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            gender: 'Male',
            mobile: '1234567890',
            dateOfBirth: {
                day: '03',
                month: 'March',
                year: '1999'
            },
            subjects: [
                'Chemistry', 'Maths'
            ],
            hobbies: [
                'Sports', 'Music'
            ],
            picture: '',
            address: '32 Oxford Street',
            state: 'NCR',
            city: 'Gurgaon'
        }
        submitPracticeForm(form);

        // assert
        cy.get('#example-modal-sizes-title-lg')
            .parent().next().within(() => {

            cy.get('tbody').children('tr').each(($row, index) => {
                switch (index) {
                    case 0:
                        expect($row).to.contain(`${form.firstName} ${form.lastName}`);
                        break;
                    case 1:
                        expect($row).to.contain(`${form.email}`);
                        break;
                    case 2:
                        expect($row).to.contain(`${form.gender}`);
                        break;
                    case 3:
                        expect($row).to.contain(`${form.mobile}`);
                        break;
                    case 4:
                        expect($row).to.contain(`${form.dateOfBirth.day} ${form.dateOfBirth.month},${form.dateOfBirth.year}`);
                        break;
                    case 5:
                        expect($row).to.contain(form.subjects.join(', '));
                        break;
                    case 6:
                        expect($row).to.contain(form.hobbies.join(', '));
                        break;
                    case 7:
                        expect($row).to.contain(`${form.picture}`);
                        break;
                    case 8:
                        expect($row).to.contain(`${form.address}`);
                        break;
                    case 9:
                        expect($row).to.contain(`${form.state} ${form.city}`);
                        break;
                }
            });


        })
        //todo: pic?

    })

    it("can't submit form without first/last name and/or mobile", () => {
        let form = {
            email: 'john@example.com',
            gender: 'Male',
            dateOfBirth: {
                day: '03',
                month: 'March',
                year: '1999'
            },
            subjects: [
                'Chemistry', 'Maths'
            ],
            hobbies: [
                'Sports', 'Music'
            ],
            picture: '',
            address: '32 Oxford Street',
            state: 'NCR',
            city: 'Gurgaon'
        }
        submitPracticeForm(form, true);

        // assert
        cy.get('#example-modal-sizes-title-lg').should('not.exist');
    })

    it("can't submit form with invalid email address", () => {
        let form = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example',
            gender: 'Male',
            mobile: 'abcd123456',
            dateOfBirth: {
                day: '03',
                month: 'March',
                year: '1999'
            },
            subjects: [
                'Chemistry', 'Maths'
            ],
            hobbies: [
                'Sports', 'Music'
            ],
            picture: '',
            address: '32 Oxford Street',
            state: 'NCR',
            city: 'Gurgaon'
        }

        submitPracticeForm(form);
        // assert
        cy.get('#example-modal-sizes-title-lg').should('not.exist');
    })

    it("can't enter non numeric characters for mobile'", () => {
        let form = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            gender: 'Male',
            mobile: 'abcd123456',
            dateOfBirth: {
                day: '03',
                month: 'March',
                year: '1999'
            },
            subjects: [
                'Chemistry', 'Maths'
            ],
            hobbies: [
                'Sports', 'Music'
            ],
            picture: '',
            address: '32 Oxford Street',
            state: 'NCR',
            city: 'Gurgaon'
        }

        submitPracticeForm(form);
        // assert
        cy.get('#example-modal-sizes-title-lg').should('not.exist');


    })

    it("can't enter more than 10 digits mobile number'", () => {
        let form = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            gender: 'Male',
            mobile: '11223344556677889900',
            dateOfBirth: {
                day: '03',
                month: 'March',
                year: '1999'
            },
            subjects: [
                'Chemistry', 'Maths'
            ],
            hobbies: [
                'Sports', 'Music'
            ],
            picture: '',
            address: '32 Oxford Street',
            state: 'NCR',
            city: 'Gurgaon'
        }

        submitPracticeForm(form, false)
        // assert
        cy.get('#userNumber').should('contain.value', '1122334455')

    })

    // todo: fix this test
    it("can't enter less than 10 digits mobile number'", () => {
        let form = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            gender: 'Male',
            mobile: '12345',
            dateOfBirth: {
                day: '03',
                month: 'March',
                year: '1999'
            },
            subjects: [
                'Chemistry', 'Maths'
            ],
            hobbies: [
                'Sports', 'Music'
            ],
            picture: '',
            address: '32 Oxford Street',
            state: 'NCR',
            city: 'Gurgaon'
        }
        submitPracticeForm(form)

        // assert
        cy.get('#example-modal-sizes-title-lg').should('not.exist')
    })
})