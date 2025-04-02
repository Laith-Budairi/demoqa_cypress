const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe(('book store'), () => {
    const userName = 'laith budairi'
    const user = {
        userName: userName,
        password: 'Laith@1998'
    }

    const booksToAdd = {
        userId: '',
        collectionOfIsbns: [
            {
                isbn: "9781449365035"
            },
            {
                isbn: "9781449325862"
            }
        ]
    }

    before(() => {
        // create user
        cy.request('POST', config.e2e.baseUrl + '/Account/v1/User', user).then((response) => {
            expect(response.isOkStatusCode).to.be.true;

            cy.setCookie('user-Id', response.body.userID)
            Cypress.Cookies.preserveOnce('user-Id')

            // commonHelper.goToPage(url + "/books")
        })
        //
        // login
        cy.request('POST', config.e2e.baseUrl + '/Account/v1/GenerateToken', user).then((response) => {
            expect(response.isOkStatusCode).to.be.true;

            cy.setCookie('auth-token', response.body.token)
            Cypress.Cookies.preserveOnce('auth-token')


        })


    })

    afterEach(() => {
        cy.getCookie('user-Id').then((userIdCookie) => {
            cy.getCookie('auth-token').then((authTokenCookie) => {
                cy.request({
                    method: 'DELETE',
                    url: `${config.e2e.baseUrl}/Account/v1/User/${userIdCookie.value}`, // Waits for user ID
                    headers: {
                        Authorization: `Bearer ${authTokenCookie.value}`, // Waits for auth token
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    expect(response.status).to.eq(204); // 204 = No Content (successful delete)
                });
            });
        });
    });

    it('can add books to collection', () => {
        // add books
        cy.getCookie('user-Id').then((userIdCookie) => {
            cy.getCookie('auth-token').then((authTokenCookie) => {

                booksToAdd.userId = userIdCookie.value
                cy.request({
                    method: 'POST',
                    url: `${config.e2e.baseUrl}/BookStore/v1/Books`,
                    body: booksToAdd,
                    headers: {
                        Authorization: `Bearer ${authTokenCookie.value}`, // Replace with actual token
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    expect(response.isOkStatusCode).to.be.true;
                });

            })
        })

        // verify user books collection
        cy.getCookie('user-Id').then((userIdCookie) => {
            cy.getCookie('auth-token').then((authTokenCookie) => {
                cy.request({
                    url: `${config.e2e.baseUrl}/Account/v1/User/${userIdCookie.value}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authTokenCookie.value}`,
                    }
                }).then(response => {
                    expect(response.isOkStatusCode).to.be.true;
                    const result = response.body.books.map(element => element.isbn);
                    const actualResult = booksToAdd.collectionOfIsbns.map(book => book.isbn)
                    console.log(result)
                    expect(actualResult).to.contain(result[0]);
                    expect(actualResult).to.contain(result[1]);
                })
            })
        })
    })

})