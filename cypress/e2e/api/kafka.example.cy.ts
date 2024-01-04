import { EachMessagePayload, KafkaMessage, ProducerBatch } from 'kafkajs';

const kafkaConn = require(`../../fixtures/${Cypress.env('estagioDev')}/kafka_conexao`);

describe('Kafka Test', () => {
  const kafkaConfig = kafkaConn.kafkaDefaultConfig;
  const topic = kafkaConn.kafkaDefaultTopic;
  const producerOpts = kafkaConn.kafkaDefaultProducerOpts;
  const consumerOpts = kafkaConn.kafkaDefaultConsumerOpts;

  before(() => {
    cy.task('kafkaProducerStart', { cfg: kafkaConfig, prdOpts: producerOpts });
    cy.task('kafkaConsumerStart', { cfg: kafkaConfig, csmOpts: consumerOpts });
  });

  it('kafka - Escutar mensagem do Kafka ViaHub', () => {
    let messageCaptured: EachMessagePayload;

    cy.task('kafkaConsumerGetNextMessage', { topic: topic, timeoutMs: 30000 }).then((result) => {
      messageCaptured = result as EachMessagePayload;
    });

    cy.then((subj) => {
      cy.task('log', messageCaptured);
    })
  });
});