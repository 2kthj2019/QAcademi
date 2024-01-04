import { KafkaConfig, ConsumerSubscribeTopics, logLevel } from "kafkajs";

const kafkaDefaultConfig: KafkaConfig = {
    clientId: 'cypress-sync',
    brokers: [
        'iidrkafkah01.hlg.bigdata.dc.nova:9092',
        'kfkh-iidr-1.dc.nova:9092',
        'kfkh-iidr-2.dc.nova:9092',
        'kfkh-iidr-3.dc.nova:9092'
    ],
    logLevel: logLevel.ERROR
};

const kafkaDefaultTopic: ConsumerSubscribeTopics = {
    topics: [
        'KFK001',
        'KFK002',
        'KFK003',
        'KFK004',
        'KFK005',
        'KFK006',
        'KFK007',
        'KFK008',
        'KFK009',
        'KFK010'
    ],
    fromBeginning: true
};

const kafkaDefaultProducerOpts = { partitioner: "default" };

const kafkaDefaultConsumerOpts = { groupId: 'integration-test-hlg' };

export { kafkaDefaultConfig, kafkaDefaultTopic, kafkaDefaultProducerOpts, kafkaDefaultConsumerOpts }