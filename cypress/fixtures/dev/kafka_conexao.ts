import { KafkaConfig, ConsumerSubscribeTopics, logLevel } from "kafkajs";

const kafkaDefaultConfig: KafkaConfig = {
    clientId: 'cypress-sync',
    brokers: ['kafka:9092'],
    logLevel: logLevel.ERROR
};

const kafkaDefaultTopic: ConsumerSubscribeTopics = {
    topics: ['ronildson-test'],
    fromBeginning: true
};

const kafkaDefaultProducerOpts = { partitioner: "default" };

const kafkaDefaultConsumerOpts = { groupId: 'integration-test-dev' };

export { kafkaDefaultConfig, kafkaDefaultTopic, kafkaDefaultProducerOpts, kafkaDefaultConsumerOpts }