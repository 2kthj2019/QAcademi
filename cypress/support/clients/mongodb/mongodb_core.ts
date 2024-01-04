import { MongoClient, Db, Collection, InsertOneResult, UpdateResult, DeleteResult, MongoClientOptions } from 'mongodb';
import { SimpleStringMap } from '../../utils';

class MongoDBClient {
  private uri: string;
  private client: MongoClient;
  private dbName: string;

  constructor(uri: string, dbName: string, clientOpts: MongoClientOptions) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri, clientOpts);
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
  }

  private getDb(dbName: string): Db {
    return this.client.db(dbName);
  }

  private getCollection(collectionName: string, dbName: string): Collection {
    return this.getDb(dbName).collection(collectionName);
  }

  public async createDocument(collectionName: string, document: SimpleStringMap, dbName: string = this.dbName): Promise<InsertOneResult> {
    return await this.getCollection(collectionName, dbName).insertOne(document);
  }

  public async readDocument(collectionName: string, query: SimpleStringMap, dbName: string = this.dbName): Promise<any> {
    return await this.getCollection(collectionName, dbName).findOne(query);
  }

  public async readDocuments(collectionName: string, query: SimpleStringMap, dbName: string = this.dbName): Promise<any[]> {
    return await this.getCollection(collectionName, dbName).find(query).toArray();
  }

  public async updateDocument(collectionName: string, filter: SimpleStringMap, update: SimpleStringMap, dbName: string = this.dbName): Promise<UpdateResult> {
    return await this.getCollection(collectionName, dbName).updateOne(filter, { $set: update });
  }

  public async deleteDocument(collectionName: string, filter: SimpleStringMap, dbName: string = this.dbName): Promise<DeleteResult> {
    return await this.getCollection(collectionName, dbName).deleteOne(filter);
  }
}

export default MongoDBClient;