import { SimpleStringMap } from 'cypress/support/utils';
import { MongoClientOptions } from 'mongodb';
import MongoDBClient from './mongodb_core';

let mongoDbDriver: MongoDBClient;

function loadMongoDbTasks(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  on('task', {
    async mongoStart(connData: { uri: string, dbName: string, clientOpts: MongoClientOptions }) {
      if (mongoDbDriver) {
        await mongoDbDriver.disconnect();
      }

      mongoDbDriver = new MongoDBClient(connData.uri, connData.dbName, connData.clientOpts);
      await mongoDbDriver.connect();

      return null;
    },

    async mongoStop() {
      await mongoDbDriver.disconnect();
      return null;
    },

    async mongoWrite(writeData: { doc: SimpleStringMap, collectionName: string, dbName?: string }) {
      return await mongoDbDriver.createDocument(writeData.collectionName, writeData.doc, writeData.dbName);
    },

    async mongoReadSingle(readSingleData: { query: SimpleStringMap, collectionName: string, dbName?: string }) {
      return await mongoDbDriver.readDocument(readSingleData.collectionName, readSingleData.query, readSingleData.dbName);
    },

    async mongoReadMultiple(readMultipleData: { query: SimpleStringMap, collectionName: string, dbName?: string }) {
      return await mongoDbDriver.readDocuments(readMultipleData.collectionName, readMultipleData.query, readMultipleData.dbName);
    },

    async mongoUpdate(updateData: { updateDoc: SimpleStringMap, filter: SimpleStringMap, collectionName: string, dbName?: string }) {
      return await mongoDbDriver.updateDocument(updateData.collectionName, updateData.filter, updateData.updateDoc, updateData.dbName);
    },

    async mongoDelete(deleteData: { filter: SimpleStringMap, collectionName: string, dbName?: string }) {
      return await mongoDbDriver.deleteDocument(deleteData.collectionName, deleteData.filter, deleteData.dbName);
    },
  });
}

export default loadMongoDbTasks;