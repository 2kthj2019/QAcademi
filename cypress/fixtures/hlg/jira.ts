const jira = {
    connectionProtocol: "https",
    JiraHost: "jira.viavarejo.com.br", 
    JiraPort: 443,
    zephyrBasePath: "rest/atm/1.0",
    JiraUser: Cypress.env("JIRA_USER"),
    JiraPass: Cypress.env("JIRA_PASSWORD"),
    JiraProjectKey: Cypress.env("JIRA_PROJECT_KEY")
}

export default jira;