import RedisConnectionPool from "./redis_core";

let redisConnectionPool: RedisConnectionPool;

function loadRedisTasks(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
    on('task', {
        connectRedis(connectionData: { [key: string]: any }) {
            if (redisConnectionPool) {
                redisConnectionPool.close();
            }

            redisConnectionPool = new RedisConnectionPool({
                host: connectionData.host,
                port: connectionData.port,
                maxConnections: connectionData.maxConnections,
                minConnections: connectionData.minConnections,
                connectionTimeout: connectionData.connectionTimeout,
            });

            return null;
        },
        disconnectRedis() {
            redisConnectionPool.close();
            return null;
        },
        async redisGet(key: string): Promise<string | null> {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await redisConnectionPool.withClient(async (client) => {
                        return await client.get(key);
                    });
                
                    resolve(result);
                } catch (error) {
                    reject(error)
                }
            });
        }
    });
}

export default loadRedisTasks;