/// <reference types="cypress" />

context('Product List Page', () => {
    let citiesList = [];

    // Fetch cities list before all tests
    before(() => {
        cy.request('https://wshotfix.ihogroup.ir/api/mvc/hotelInfo/suggest').then((response) => {
            citiesList = response.body;
        });
        cy.viewport(1920, 1080)
    });

    // Now, we loop over the cities list synchronously and generate test cases
    it('Dynamically generates test cases for each city', function () {
        citiesList.forEach((city) => {
            cy.fixture('globals.json').then((globals) => {
                cy.visit(`${globals.baseUrl}${city.link}`);
                cy.log(`Current City: ${city.name}`);
                cy.get('h1').should('exist').invoke('text').and("eq", `هتل های ${city.name}`);
                cy.get('#filters-sidebar iho-stars-filter ul li').each(($el) => {

                    let ts = '';
                    cy.wrap($el).contains('ستاره').children().eq(0).invoke('text').then((text) => ts = text)
                    cy.wrap($el).then(()=>{
                        cy.get('label').contains('ستاره').click().then(() => {
                            cy.log('ts is: '+ts)
                            if(ts.includes('پنج')){
                                cy.get('h1').should('include.text', '5').and('include.text',city.name);
                            }else if(ts.includes('چهار')){{
                                cy.get('h1').should('include.text', '4').and('include.text',city.name);
                            }} else if(ts.includes('سه')){
                                cy.get('h1').should('include.text', '3').and('include.text',city.name);
                            } else if(ts.includes('دو')){
                                cy.get('h1').should('include.text', '2').and('include.text',city.name);
                            } else if(ts.includes('یک')){
                                cy.get('h1').should('include.text', '1').and('include.text',city.name);
                            }
                        });
                        cy.wrap($el).contains('ستاره').click().then(()=>{
                            // here is there
                            // continue;
                        })
                    })
                    })
            });
        });
    });
});
