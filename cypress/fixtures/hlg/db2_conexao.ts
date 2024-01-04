const connectionDetails = {
    DATABASE: "DBDMVS",
    HOSTNAME: "10.0.10.39",
    PORT: 50000,
    PROTOCOL: "TCPIP",
    UID: Cypress.env("DB2_USER"),
    PWD: Cypress.env("DB2_PASSWORD"),
    QUERY_PREFIX: "DBPMVS.JTRACH"
};
  
const connectionOptions = {
    connectTimeout: 30000
};

export { connectionDetails, connectionOptions }