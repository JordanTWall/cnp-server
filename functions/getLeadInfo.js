// getLeadInfo.js
const getClient = require('./getClient.js')
const getEvent = require('./getEvent.js')
const express = require('express')
const router = express.Router()

async function getLeadInfo(inviteeUuid, eventUuid) {
  let firstName = ''
  let lastName = ''
  let clientAddress = ''
  let appointmentTimeEST = ''
  let cityAnswer = null
  let zipCodeAnswer = null
  let phoneNumberAnswer = null

  try {
    // Use Promise.all to wait for both getClient and getEvent
    const [clientData, eventData] = await Promise.all([
      getClient(eventUuid, inviteeUuid),
      getEvent(eventUuid),
    ])

    // Destructure data from clientData and eventData
    ;({ firstName, lastName, cityAnswer, zipCodeAnswer, phoneNumberAnswer } =
      clientData)
    ;({ clientAddress, appointmentTimeEST } = eventData)

    return {
      firstName,
      lastName,
      appointmentTimeEST,
      clientAddress,
      cityAnswer,
      zipCodeAnswer,
      phoneNumberAnswer,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getLeadInfo
