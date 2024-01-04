import { ConnStr, Options } from 'ibm_db';
const Db2ConnectionPool = require('../db2/db2_core').default;

let db2Connector: any; 

function loadDB2Tasks(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
    on('task', {
        db2Open(connData: { connectionDetails: ConnStr, connectionOptions: Options }) {
            db2Connector = new Db2ConnectionPool(connData.connectionDetails, connData.connectionOptions);
            return null;
        },
        async db2Query(query) {
            try {
                const result = await db2Connector.executeQuery(query);
                return result;
            } catch (error) {
                throw error;
            }
        },
        db2Close() {
            db2Connector.killConnectionPool();
            return null;
        }
    });
};

export default loadDB2Tasks;