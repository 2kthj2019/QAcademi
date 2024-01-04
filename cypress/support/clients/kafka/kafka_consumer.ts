import { Consumer, ConsumerSubscribeTopics, Kafka, KafkaConfig, ConsumerConfig, ConsumerRunConfig } from 'kafkajs'

export default class ConsumerFactory {
  private consumer: Consumer;

  public constructor(config: KafkaConfig, consumerOpts: { [k:string]: any }) {
    this.consumer = this.createKafkaConsumer(config, consumerOpts);
  }

  public async startMessageConsumer(topic: ConsumerSubscribeTopics, runMessageConfig: ConsumerRunConfig): Promise<void> {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe(topic);
      await this.consumer.run(runMessageConfig);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  public async startBatchConsumer(topic: ConsumerSubscribeTopics, runBatchConfig: ConsumerRunConfig): Promise<void> {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe(topic);
      await this.consumer.run(runBatchConfig);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  public async seek(topic: ConsumerSubscribeTopics, newOffset: string): Promise<void> {
    await this.consumer.seek({ topic: topic.topics[0] as string, partition: 0, offset: newOffset });
  }

  public async shutdown(): Promise<void> {
    await this.consumer.disconnect();
  }

  private createKafkaConsumer(config: KafkaConfig, consumerOpts: { [k:string]: any }): Consumer {
    config.clientId = `${config.clientId}-consumer`;
    const kafka = new Kafka(config);
    const internalOpts = this.generateConsumerOptions(consumerOpts);
    return kafka.consumer(internalOpts);
  }

  private generateConsumerOptions(opts: { [k:string]: any }): ConsumerConfig {
    let consumerOpts: ConsumerConfig;

    if (opts.groupId) {
      consumerOpts = { groupId: opts.groupId };
    } else {
      throw new Error('Consumer group id is required');
    }
    
    return consumerOpts;
  }
}