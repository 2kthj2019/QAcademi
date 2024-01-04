import { MongoClientOptions } from 'mongodb';

const connData: MongoClientOptions = {
    auth: {
        username: Cypress.env('MONGO_USER'),
        password: Cypress.env('MONGO_PASSWORD'),
    },
    authMechanism: 'SCRAM-SHA-1',
    replicaSet: 'rsviaQA',
    appName: 'cypress-sync',
    keepAlive: true,
    keepAliveInitialDelay: 60000,
};

const uri: string = 'mongodb://mdbq-via-1.dc.nova:27017'

const databaseName: string = 'catalogo';

export { connData, uri, databaseName };