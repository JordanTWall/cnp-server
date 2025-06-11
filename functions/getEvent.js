// getEvent.js
const { getTokens } = require('./tokenService')
const dotenv = require('dotenv')

dotenv.config()
const scheduledEventsUrl = process.env.SCHEDULED_EVENTS_URL

async function getEvent(eventUuid) {
  const fetch = (await import('node-fetch')).default
  const { accessToken } = await getTokens()

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }

  try {
    const response = await fetch(`${scheduledEventsUrl}${eventUuid}`, options)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        `❌ Failed to fetch event data: ${response.status} ${response.statusText}`
      )
    }

    const data = result.resource
    const clientAddress = data.location?.location || 'No address'
    const appointmentTimeUTC = new Date(data.start_time)
    const appointmentTimeEST = appointmentTimeUTC.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })

    return { clientAddress, appointmentTimeEST }
  } catch (error) {
    console.error('❌ Error in getEvent:', error.message || error)
    throw error
  }
}

module.exports = getEvent
