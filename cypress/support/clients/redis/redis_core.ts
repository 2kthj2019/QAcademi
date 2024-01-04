import * as Redis from 'ioredis';
import { createPool, Factory, Pool } from 'generic-pool';

interface RedisConnectionPoolOptions {
  host: string;
  port: number;
  maxConnections?: number;
  minConnections?: number;
  connectionTimeout?: number;
}

export default class RedisConnectionPool {
  private readonly pool: Pool<Redis.Cluster>;

  constructor(options: RedisConnectionPoolOptions) {
    const factory: Factory<Redis.Cluster> = {
      create: async () => {
        const client = new Redis.Cluster([{
          host: options.host,
          port: options.port
        }], { lazyConnect: true });

        await client.connect();

        return client;
      },
      destroy: async (client: Redis.Cluster) => {
        await client.quit();
      },
    };

    this.pool = createPool(factory, {
      max: options.maxConnections || 10,
      min: options.minConnections || 1,
      acquireTimeoutMillis: options.connectionTimeout || 10000,
    });
  }

  async withClient<T>(task: (client: Redis.Cluster) => Promise<T>): Promise<T> {
    const client = await this.pool.acquire();
    try {
      return await task(client);
    } finally {
      await this.pool.release(client);
    }
  }

  async close(): Promise<void> {
    await this.pool.drain();
    await this.pool.clear();
  }
}