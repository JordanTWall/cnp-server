require('dotenv').config();
const connect = require('./db');

const COLLECTION_NAME = process.env.TOKEN_COLLECTION || 'tokens';

async function getTokens() {
  try {
    const db = await connect();
    const collection = db.collection(COLLECTION_NAME);
    const tokens = await collection.findOne({});

    if (!tokens) {
      console.warn(`⚠️ No tokens found in collection "${COLLECTION_NAME}"`);
    }

    return tokens;
  } catch (err) {
    console.error('❌ Failed to retrieve tokens:', err.message);
    throw err;
  }
}

async function saveTokens(newAccessToken, newRefreshToken) {
  try {
    const db = await connect();
    const collection = db.collection(COLLECTION_NAME);

    await collection.updateOne(
      {},
      {
        $set: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    console.log(`✅ Tokens saved to "${COLLECTION_NAME}"`);
  } catch (err) {
    console.error('❌ Failed to save tokens:', err.message);
    throw err;
  }
}

module.exports = {
  getTokens,
  saveTokens,
};
