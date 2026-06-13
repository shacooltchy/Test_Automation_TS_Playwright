This is a demo playwright test automation project

1. Project setup
    1. Add .env file based on .env.example

2. Running the tests from the teminal
    1. Run 'npx playwright test --config=./config/playwright.config.ts --project setup', this command will run 'authenticate' setup which will login and save storage state. There is no need to run it before every test run, but it is valid for a limited time.
    2. Run the tests using command 'npx playwright test --config=./config/playwright.config.ts --project chromium --workers=2', to run a test with a specific title, use the -g flag followed by the title of the test e.g. npx playwright test --config=./config/playwright.config.ts -g "Add checklist"
    3. Tests can be run from the VS Code test explorer or directly from the editor. Ensure that the 'setup' and 'chromium' projects are selected in the Playwright section in the Testing tab so that all tests can be detected.