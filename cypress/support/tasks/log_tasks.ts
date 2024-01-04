function loadLogTasks(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
    on('task', {
        log(message) {
            console.log(message);
            return null;
        },
        table(message) {
            console.table(message);
            return null;
        }
    });
}

export default loadLogTasks;