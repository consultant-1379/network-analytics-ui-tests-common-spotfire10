/*------------------------------------------------------------------------------
 * COPYRIGHT Ericsson 2020
 *
 * The copyright to the computer program(s) herein is the property of
 * Ericsson Inc. The programs may be used and/or copied only with written
 * permission from Ericsson Inc. or in accordance with the terms and
 * conditions stipulated in the agreement/contract under which the
 * program(s) have been supplied.
 *
 * This file contains common UI test code to be reused.
 *----------------------------------------------------------------------------*/

const getProperty = name => Cypress.env(name) || Cypress.config(name)

const spotfireUsername = getProperty('spotfire_username')
const spotfirePassword = getProperty('spotfire_password')
const serverURL = getProperty('server_url')

const waitReady = () =>  cy.get('.sfx_status-globe_221.sfx_online_333').as('status').should('have.attr', 'title').should('contain', 'Client version: 10.10.1 LTS HF-005')

const exactMatchOf = value => new RegExp('^' + value + '$', "g")

const tab = name => cy.get('.sf-element-tab-group').contains(name).parent()

const assertThatTabIsActive = name => tab(name).should('have.class', 'sfpc-active')

const clickTab = name => {
  tab(name).click()
  waitReady()
}

const button = name => cy.get(`input[type="button"][value="${name}"]`)

const buttonImage = name => cy.get(`img[title="${name}"]`)

const filter = (name, value) => {
  cy.get(`span.sf-element-filter-title[title="${name}"]`)
    .parent().contains(exactMatchOf(value))
    .click('bottom')
  waitReady()
}

const resetFilters = () => {
  cy.get('div.ResetButton').click()
  waitReady()
}

const tableSection = name => cy.get('div.sfc-table').contains(name).parent().parent().parent()

const panelWithName = name => cy.get('div').contains(name).parent()

const computedStyle = element => {
  const win = element[0].ownerDocument.defaultView
  return win.getComputedStyle(element[0])
}

const resetSelections = () => {
  waitReady()
  buttonImage('Reset Filters & Markings').click()
}

const clickTableRowByValue = (tableName, value) => tableSection(tableName).within(() => {
  cy.wait(800)
  // TODO: This should be improved to search inside the specific column.
  cy.contains(value, { timeout: 60000 }).parent().click()
})


const login = (username = spotfireUsername, password = spotfirePassword) => {
  cy.getCookie('JSESSIONID').then(cookie => {
    // If the cookie is null it's not authenticated.
    if (cookie === null) {
      cy.visit('./spotfire/login.html')
      cy.get('input[name="username"]').type(username)
      cy.get('input[name="password"]').type(password)
      cy.get('button[class="LoginButton"]').click()
      cy.url().should('include', '/spotfire/#/landingPage')
    } else {
      cy.log('Already authenticated...')
    }
  })
}

const pageTitle = () => cy.get(`div[class="sfx_page-title_214"]`)


const openFeature = fileURI => {
  const baseUrl = getProperty('baseUrl')
  cy.visit(`${baseUrl}/spotfire/wp/OpenAnalysis?file=${fileURI}`)
  waitReady()
  cy.log('Waiting the feature to load...')
}

const markerStatus = () => cy.get('div[title="Number of marked rows in data table."]').as('markerStatus')


const openLandingPage = () => {
  ui.openFeature(getProperty('featureUrl'))
  ui.pageTitle().then(el => {
    const title = el.text()
    if (title !== 'Home') {
      ui.buttonImage('Home').as('homeBtn').click()
    }
  })
}

const ui = {
  tab,
  button,
  buttonImage,
  filter,
  resetFilters,
  clickTab,
  assertThatTabIsActive,
  tableSection,
  clickTableRowByValue,
  openFeature,
  login,
  waitReady,
  panelWithName,
  resetSelections,
  pageTitle,
  openLandingPage,
  markerStatus
}


module.exports = { ui, getProperty, computedStyle }