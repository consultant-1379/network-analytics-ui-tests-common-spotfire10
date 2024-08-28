/*------------------------------------------------------------------------------
 * COPYRIGHT Ericsson 2020
 *
 * The copyright to the computer program(s) herein is the property of
 * Ericsson Inc. The programs may be used and/or copied only with written
 * permission from Ericsson Inc. or in accordance with the terms and
 * conditions stipulated in the agreement/contract under which the
 * program(s) have been supplied.
 *
 * This file contains test steps to be reused.
 *----------------------------------------------------------------------------*/

const {ui} = require("./netan-common")

function steps({Before, After, Given, When, Then}) {

  Before(() => {
    cy.log(`Starting scenario`)
    Cypress.Cookies.preserveOnce('JSESSIONID', 'SF_REMEMBER_ME', '_fbp')
  })


  After(() => {
    cy.log(`After scenario`)
  })


  Given('I am authenticated', () => {
    ui.login()
  })


  Given('I open the URL {string}', (pageURL) => {
    cy.visit(pageURL)
  })


  Given('I open the landing page', () => {
    ui.openLandingPage()
  })


  Given('I reset the selections', () => {
    ui.resetSelections()
  })


  When('I click in the img button {string}', name => {
    ui.buttonImage(name).click()
  })


  Then('I should see the page {string}', pageTitle => {
    ui.waitReady()
    cy.get('div.sfx_page-title_214').contains(pageTitle).should('be.visible')
  })


  Then('I should see data in the status bar', () => {
    ui.waitReady()
    cy.wait(5000)
    cy.get(`div[class="sfx_label_218"]`).eq(2).then(e => {
        const content = e.text()
        if (content === '0 marked') {
            cy.onlyOn('false')
        }
    })
  })


  Then('I should see {int} rows marked', rows => {
    ui.waitReady()
    ui.markerStatus().then(el => {
      const text = el.text()
      if (text !== `${rows} marked`) {
        throw new Error('Wrong number of rows marked.')
      }
    })
  })


  Then('I should see some rows marked', rows => {
    ui.waitReady()
    ui.markerStatus().then(el => {
      const text = el.text()
      if (text === `0 marked`) {
        throw new Error('No rows marked.')
      }
    })
  })



}


module.exports = steps
