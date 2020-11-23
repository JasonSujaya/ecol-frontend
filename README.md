# Getting Started with Create React App

The ecol project is a forum web application currently under construction for sustainable living communities in Canada (https://www.ecoleproject.com) . The project uses React for the front end and Django Rest API as a it’s backend. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# Installation Guide
After downloading the package, make sure you have Node installed in your project. 
`npm install`
`npm start`

## Available Script

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test -- --coverage --watchAll=false`

Check current test coverage

### Run end to end test
`node_modules/cypress/bin/cypress run --spec cypress/integration/test.spec.js --browser=chrome --no-exit`
