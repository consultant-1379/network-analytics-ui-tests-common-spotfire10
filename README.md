# NetAn UI/E2E tests common

This project contains common code for writing UI/E2E tests for NetAn.
The following 3rd party libraries are used:

- [Cypress](https://www.cypress.io/)
- [Cucumberjs](https://github.com/cucumber/cucumber-js)
- [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)

The objective is to avoid code duplication across different features. 
This project exposes the functionality as a library that can be imported into 
other projects using the scoped name `@netan/ui-tests-common`, along with other dependencies.

## Using the library 

Import this library and its dependencies in the `package.json` of the project:
```json
{
  "devDependencies": {
    "@netan/ui-tests-common": "^1.0.2",
    "cucumber": "^6.0.5",
    "cypress": "^4.3.0",
    "cypress-cucumber-preprocessor": "^2.2.0"
  }
}
```

In the JavaScript file that defines the step definitions of the project, add the following code:

```javascript
const {Before, After, Given, When, Then} = require("cypress-cucumber-preprocessor/steps")
const {ui, commonSteps} = require("@netan/ui-tests-common")
commonSteps({Before, After, Given, When, Then})
```

This will make the common UI actions accessible via variable `ui`. 
The `commonSteps` function is invoked allowing the common steps to be registered.
