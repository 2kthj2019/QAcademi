import * as db2Driver from 'ibm_db';
import { createPool, Pool } from 'generic-pool';

type ConnStr = db2Driver.ConnStr;
type Options = db2Driver.Options;
type Database = db2Driver.Database;

class Db2ConnectionPool {
  private connectionDetails: ConnStr;
  private connectionOptions: Options;
  private pool: Pool<Database>;

  constructor(connectionDetails: ConnStr, connOptions: Options) {
    this.connectionDetails = connectionDetails;
    this.connectionOptions = connOptions;
    this.pool = this.createConnectionPool();
  }

  private createConnectionPool(): Pool<Database> {
    return createPool<Database>({
      create: () => {
        return new Promise<Database>(async (resolve, reject) => {
          await db2Driver.open(this.connectionDetails, this.connectionOptions, (err: Error, conn?: Database) => {
            if (err) {
              reject(err);
            } else {
              if (conn) {
                resolve(conn);
              } else {
                reject(new Error("Connection didn't error, but it has returned undefined"));
              }
            }
          });
        });
      },
      destroy: (connection: Database) => {
        return new Promise<void>((resolve, reject) => {
          connection.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      },
    }, {
      min: 1,
      max: 3,
    });
  }

  public async executeQuery(query: string): Promise<any> {
    const connection = await this.pool.acquire();
    try {
      const result = await this.executeQueryWithConnection(connection, query);
      return result;
    } finally {
      await this.pool.release(connection);
    }
  }

  private async executeQueryWithConnection(connection: Database, query: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async killConnectionPool(): Promise<void> {
    await this.pool.drain();
    await this.pool.clear();
  }
}

export default Db2ConnectionPool;