// functions/routes/api/auth.js
const express = require('express')
const router = express.Router()
const refreshAccessToken = require('../../refreshAccessToken.js')
const getLeadInfo = require('../../getLeadInfo')
const generateQuoteHTML = require('../../generateQuoteHTML.js')

router.get('/', async (req, res) => {
  try {
    const requestData = req.query
    const {
      eventUuid,
      inviteeUuid,
      subtotal,
      taxes,
      savings,
      total,
      discountCodeInput,
      ...serviceData
    } = requestData

    // Parse numbers (they come in as strings via query params)
    const subtotalNum = parseFloat(subtotal)
    const taxesNum = parseFloat(taxes)
    const savingsNum = parseFloat(savings)
    const totalNum = parseFloat(total)

    // Parse serviceData: each service is a JSON string, parse it back to object
    Object.keys(serviceData).forEach((key) => {
      serviceData[key] = JSON.parse(serviceData[key])
    })

    // Refresh access token
    await refreshAccessToken()

    // Get lead info from Calendly
    const leadData = await getLeadInfo(inviteeUuid, eventUuid)

    // Generate email body
    const emailBody = generateQuoteHTML(
      serviceData,
      taxesNum,
      savingsNum,
      totalNum,
      discountCodeInput
    )

    // Instead of sending email → send emailBody back to frontend
    res.status(200).send(emailBody)
  } catch (error) {
    console.error('Error processing data:', error)
    res.status(400).send('Error processing data')
  }
})

module.exports = router
