import { Kafka, Producer, ProducerBatch, KafkaConfig, ProducerConfig, Partitioners } from 'kafkajs'

export default class ProducerFactory {
  private producer: Producer;

  constructor(config: KafkaConfig, producerOpts: { [k:string]: any }) {
    this.producer = this.createProducer(config, producerOpts);
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log('Error connecting the producer: ', error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  public async sendBatch(batch: ProducerBatch): Promise<void> {
    await this.producer.sendBatch(batch);
  }

  private createProducer(config: KafkaConfig, producerOpts: { [k:string]: any }) : Producer {
    config.clientId = `${config.clientId}-producer`;
    const kafka = new Kafka(config);
    const internalOpts = this.generateProducerOptions(producerOpts);
    return kafka.producer(internalOpts);
  }

  private generateProducerOptions(opts: { [k:string]: any }): ProducerConfig {
    let producerOpts: ProducerConfig = {};

    if (opts.partitioner == 'default') {
      producerOpts.createPartitioner = Partitioners.DefaultPartitioner;
    } else if (opts.partitioner == 'legacy') {
      producerOpts.createPartitioner = Partitioners.LegacyPartitioner;
    } else {
      producerOpts.createPartitioner = Partitioners.DefaultPartitioner;
    }

    return producerOpts;
  }
}