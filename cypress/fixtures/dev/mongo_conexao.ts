import { MongoClientOptions } from 'mongodb';

const connData: MongoClientOptions = {
    auth: {
        username: Cypress.env('MONGO_USER'),
        password: Cypress.env('MONGO_PASSWORD'),
    },
    authMechanism: 'SCRAM-SHA-1',
    replicaSet: '',
    appName: 'cypress-sync',
    keepAlive: true,
    keepAliveInitialDelay: 60000,
};

const uri: string = ''

const databaseName: string = 'catalogo';

export { connData, uri, databaseName };