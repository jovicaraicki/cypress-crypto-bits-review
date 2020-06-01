{/* <refererence types="cypress" /> */}

describe('cryptobitsreview.com', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    function scroll() {
        cy.get('#listpretop').scrollIntoView()
    }

    it('Load site', () => {
        cy.visit('https://cryptobitsreview.com/');
    })

    it('Find cryptocurrency input - type', () => {
        cy.get('#find-crypto input[type=text]').should('have.attr', 'placeholder', 'Find cryptocurrency').type('eth')
        cy.wait(1000)
        cy.get('#find-crypto input[type=text]').should('have.attr', 'placeholder', 'Find cryptocurrency').clear()
    })

    it('Include mining calculator checkbox', () => {
        cy.get('#include-mining-calc').check({ force: true }).should('be.checked')
        cy.wait(1000)
        cy.get('#include-mining-calc').uncheck({ force: true }).should('not.be.checked')
    })

    it('See per page dropdown', () => {
        cy.get('select[name=perPage]').should('have.attr', 'placeholder', 'See Per Page').select('10').should('have.value', '10')
        cy.get('.App > div > p').contains('210')
        cy.wait(1000)
        cy.get('select[name=perPage]').select('5').should('have.value', '5')
        cy.wait(1000)
        cy.get('select[name=perPage]').select('100').should('have.value', '100')
        cy.wait(1000)
        cy.get('select[name=perPage]').select('10').should('have.value', '10')
    })

    it('Sort by Marketcap dropdown', () => {
        cy.get('div.spinner').should('not.be.visible')
        cy.get('select[name=sortBy]').should('have.attr', 'placeholder', 'Sort By').select('Marketcap').contains('Marketcap')
        cy.wait(1000)
        cy.get('select[name=sortBy]').should('have.attr', 'placeholder', 'Sort By').select('Price High To Low').contains('Price High To Low')
        cy.wait(1000)
        cy.get('select[name=sortBy]').should('have.attr', 'placeholder', 'Sort By').select('Price Low To High').contains('Price Low To High')
        cy.get('div.spinner').should('not.be.visible')
    })

    it('List', () => {
        cy.get('.box-header-0 > .grid-item > .img-container-grid > .index').contains('1')
        cy.wait(1000)
        cy.get('button.MuiButtonBase-root > span.MuiButton-label').contains('2').click()
        cy.wait(1000)
        cy.get('.box-header-10 > .grid-item > .img-container-grid > .index').contains('11')
        cy.wait(1000)
        cy.get('button.MuiButtonBase-root > span.MuiButton-label').contains('Previous').click()
        cy.wait(1000)
        cy.get('button.MuiButtonBase-root > span.MuiButton-label').contains('Next').click()
        cy.get('button.MuiButtonBase-root > span.MuiButton-label').contains('Next').click()
        cy.get('button.MuiButtonBase-root > span.MuiButton-label').contains('Next').click()
        cy.get('button.MuiButtonBase-root > span.MuiButton-label').contains('Next').click()
        cy.get('.box-header-40 > .grid-item > .img-container-grid > .index').contains('41')
    })

    it('Cryptocurrency Converter', () => {
        cy.get('#convpretop').scrollIntoView()

        cy.get('#label1').contains('Convert from: BTC');
        cy.get('#select1').contains('BTC')

        cy.get('#label2').contains('Convert to: USD');
        cy.get('#select2').contains('USD')

        cy.get('#amount1').should('have.value', '1')
        cy.get('#result-text-btc').should('contain', '1')
        cy.get('#convpretop').scrollIntoView()
        cy.get('#amount1').clear()
        cy.get('#amount1').type('100')
        cy.get('#amount1').should('have.value', '100')
        cy.get('#result-text-btc').should('contain', '100')
        cy.get('#convpretop').scrollIntoView()

        cy.get('button.exchange').click();

        cy.get('#label3').contains('Convert from: USD')
        cy.get('#select3').contains('USD')

        cy.get('#label4').contains('Convert to: BTC')
        cy.get('#select4').contains('BTC')

        cy.get('#amount2').should('have.value', '1')
        cy.get('#result-text-btc').should('contain', '1')
        cy.get('#amount2').clear()
        cy.get('#amount2').type('100')
        cy.get('#amount2').should('have.value', '100')
        cy.get('#result-text-btc').should('contain', '100')

        cy.get('button.exchange').click()

        cy.get('#select1').click()
        cy.get('ul.MuiList-root').find('li[data-value=ETH]').should('contain', 'ETH').click()

        cy.get('#select2').click()
        cy.get('ul.MuiList-root').find('li[data-value=EUR]').should('contain', 'EUR').click()
    })

    it('About cryptocurrency mining', () => {
        cy.get('ul.nav-tabs > li:nth-child(2)')
          .find('a#proofofwork')
          .should('contain', 'Proof-of-Work')
          .click()

        cy.wait(1000)

        cy.get('ul.nav-tabs > li:nth-child(3)')
          .find('a#hashrate')
          .should('contain', 'Hash rate')
          .click()

        cy.wait(1000)

        cy.get('ul.nav-tabs > li:nth-child(4)')
          .find('a#blockreward')
          .should('contain', 'Block reward')
          .click()

        cy.wait(1000)

        cy.get('ul.nav-tabs > li:nth-child(5)')
          .find('a#difficulty')
          .should('contain', 'Difficulty')
          .click()

        cy.wait(1000)

        cy.get('ul.nav-tabs > li:nth-child(1)')
          .find('a#about')
          .should('contain', 'About')
          .click()
    })

})