import { ProducerBatch, ConsumerSubscribeTopics, EachMessagePayload, KafkaConfig } from 'kafkajs';
import ProducerFactory from './kafka_producer';
import ConsumerFactory from './kafka_consumer';
import { Util } from 'cypress/support/utils';

let producer: ProducerFactory;
let consumer: ConsumerFactory;

function loadKafkaTasks(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
    on('task', {
        async kafkaProducerStart(kfkData: { cfg: KafkaConfig, prdOpts: { [k: string]: any } }): Promise<null> {
          if (producer) await producer.shutdown();
          producer = new ProducerFactory(kfkData.cfg, kfkData.prdOpts);
          return null;
        },

        async kafkaProducerSend(batch: ProducerBatch): Promise<null> {
          await producer.start();
          await producer.sendBatch(batch);
          await producer.shutdown();
          return null;
        },

        async kafkaConsumerStart(kfkData: { cfg: KafkaConfig, csmOpts: { [k: string]: any } }): Promise<null> {
          if (consumer) await consumer.shutdown();
          consumer = new ConsumerFactory(kfkData.cfg, kfkData.csmOpts);
          return null;
        },

        async kafkaConsumerGetNextMessage(msgData: { topic: ConsumerSubscribeTopics, timeoutMs: number }): Promise<unknown> {
          let nextMessage: EachMessagePayload;

          const fetchNextMessageConfig = {
            eachMessage: async (messagePayload: EachMessagePayload) => {
              if (!nextMessage) {
                nextMessage = messagePayload;
              }
            }
          }

          await consumer.startMessageConsumer(msgData.topic, fetchNextMessageConfig);

          return await Util.waitFor(() => { return nextMessage? true : false }, msgData.timeoutMs).then(async (conditionResult: boolean) => {
            await consumer.shutdown();
            if (!nextMessage) throw new Error('No message received within the timeout period');
            return nextMessage;
          });
        },

        async kafkaConsumerWaitForMessage(msgData: { topic: ConsumerSubscribeTopics, timeoutMs: number, messageFilter: Partial<EachMessagePayload> }): Promise<unknown> {
          let filteredMessage: EachMessagePayload;

          const findMessageConfig = {
            eachMessage: async (messagePayload: EachMessagePayload) => {
              if (!filteredMessage && Util.matchesPartial(messagePayload, msgData.messageFilter)) {
                filteredMessage = messagePayload;
              }
            }
          }

          await consumer.startMessageConsumer(msgData.topic, findMessageConfig);

          return await Util.waitFor(() => { return filteredMessage? true : false }, msgData.timeoutMs).then(async (conditionResult: boolean) => {
            await consumer.shutdown();
            if (!filteredMessage) throw new Error('No message received within the timeout period which matches the filter');
            return filteredMessage;
          });
        },

        async kafkaConsumerWaitForMessages(msgData: { topic: ConsumerSubscribeTopics, timeoutMs: number, messageFilter: Partial<EachMessagePayload>, messageLimit: number }): Promise<unknown> {
          let filteredMessages: EachMessagePayload[] = [];

          const findMessagesConfig = {
            eachMessage: async (messagePayload: EachMessagePayload) => {
              if (Util.matchesPartial(messagePayload, msgData.messageFilter)) {
                if (filteredMessages.length < msgData.messageLimit) {
                  filteredMessages.push(messagePayload);
                }
              }
            }
          }

          await consumer.startMessageConsumer(msgData.topic, findMessagesConfig);

          return await Util.waitFor(() => { return filteredMessages.length >= msgData.messageLimit? true : false }, msgData.timeoutMs).then(async (conditionResult: boolean) => {
            await consumer.shutdown();
            if (filteredMessages.length == 0) throw new Error('No messages received within the timeout period which match the filter');
            return filteredMessages;
          });
        },

        async kafkaConsumerTopicHasMessage(msgData: { topic: ConsumerSubscribeTopics, timeoutMs: number, messageFilter: Partial<EachMessagePayload> }): Promise<unknown> {
          let foundMessage: boolean = false;

          const findInAllTopicConfig = {
            eachMessage: async (messagePayload: EachMessagePayload) => {
              if (Util.matchesPartial(messagePayload, msgData.messageFilter)) {
                foundMessage = true;
              }
            },
            autoCommit: false
          }

          await consumer.startMessageConsumer(msgData.topic, findInAllTopicConfig);
          await consumer.seek(msgData.topic, "0");

          return await Util.waitFor(() => { return foundMessage }, msgData.timeoutMs).then(async (conditionResult: boolean) => {
            await consumer.shutdown();
            if (!foundMessage) {
              return false;
            } else {
              return true;
            }
          });
        }
    });
};

export default loadKafkaTasks;