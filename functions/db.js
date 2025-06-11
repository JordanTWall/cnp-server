// connect.js
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_DB_CONNECTION_STRING;

if (!uri) {
  throw new Error('❌ MONGO_DB_CONNECTION_STRING is missing in .env');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }

  return client.db(); // uses the DB defined in URI (e.g., tokenDB)
}

module.exports = connect;
