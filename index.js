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

// Cypress related code.
const {ui, getProperty, computedStyle} = require("./src/netan-common")
// Cucumber test steps.
const commonSteps = require('./src/common-steps')

module.exports = {ui, getProperty, computedStyle, commonSteps}