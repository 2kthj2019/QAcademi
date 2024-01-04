const connectionDetails = {
    DATABASE: "DBHMVS",
    HOSTNAME: "10.0.10.39",
    PORT: 50000,
    PROTOCOL: "TCPIP",
    UID: Cypress.env("DB2_USER"),
    PWD: Cypress.env("DB2_PASSWORD"),
    QUERY_PREFIX: "DBHMVS.HMLBAT"
};
  
const connectionOptions = {
    connectTimeout: 30000
};

export { connectionDetails, connectionOptions }