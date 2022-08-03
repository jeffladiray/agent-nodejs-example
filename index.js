require("dotenv").config();

// Import the requirements
const { createAgent } = require("@forestadmin/agent");
const { createSqlDataSource } = require("@forestadmin/datasource-sql");

// Create your Forest Admin agent
createAgent({
  // These process.env variables should be provided in the onboarding
  authSecret: process.env.FOREST_AUTH_SECRET,
  agentUrl: process.env.FOREST_AGENT_URL,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === "production",
  agentUrl: process.env.FOREST_AGENT_URL,
  forestServerUrl: process.env.FOREST_SERVER_URL,
})
  .addDataSource(createSqlDataSource(process.env.DATABASE_URL))
  .mountOnStandaloneServer(3000)
  .start();
