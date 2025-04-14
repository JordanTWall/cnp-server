// getClient.js
const { getTokens } = require('./tokenService');
const dotenv = require('dotenv');

dotenv.config();
const scheduledEventsUrl = process.env.SCHEDULED_EVENTS_URL

async function getClient(eventUuid, inviteeUuid) {
  const fetch = (await import('node-fetch')).default;
  const { accessToken } = await getTokens();

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${scheduledEventsUrl}${eventUuid}/invitees/${inviteeUuid}`,
      options
    );
    const result = await response.json();

    if (!response.ok) {
      throw new Error(`❌ Failed to fetch client data: ${response.status} ${response.statusText}`);
    }

    const data = result.resource;
    const firstName = data.first_name || '';
    const lastName = data.last_name || '';

    const findAnswer = (q) =>
      data.questions_and_answers.find((a) => a.question === q)?.answer || '';

    return {
      firstName,
      lastName,
      city: findAnswer('City'),
      zipCode: findAnswer('Zip Code'),
      phoneNumber: findAnswer('Phone Number'),
    };
  } catch (error) {
    console.error('❌ Error in getClient:', error.message || error);
    throw error;
  }
}

module.exports = getClient;
