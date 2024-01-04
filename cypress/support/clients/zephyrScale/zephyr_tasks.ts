import { runTestCaseSuite, runMiscellaneousSuite } from './zephyr_tests';

function loadZephyrTasks(on : Cypress.PluginEvents, config : Cypress.PluginConfigOptions) {
    on('task', {
        testZephyrIntegration(connectionData: { [key: string]: any }) {
            runTestCaseSuite(connectionData);
            runMiscellaneousSuite(connectionData);
            return null;
        }
    });
}

export default loadZephyrTasks;