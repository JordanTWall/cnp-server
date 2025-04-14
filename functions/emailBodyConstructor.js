const express = require('express')
const router = express.Router()

function emailBodyConstructor(
  firstName,
  lastName,
  phoneNumberAnswer,
  clientAddress,
  cityAnswer,
  zipCodeAnswer,
  appointmentTimeEST,
  quoteInfo
) {
  return `<h1>Fresh Lead!</h1>
      <p>Carpet Cleaning Booking</p>
      <ul style="list-style-type: none">
        <li>${firstName} ${lastName}</li>
        <li>${appointmentTimeEST}</li>        
        <li>${phoneNumberAnswer ? phoneNumberAnswer.answer : ''}</li>
        <li>${clientAddress}</li>
        <li>${cityAnswer ? cityAnswer.answer : ''}</li>
        <li>${zipCodeAnswer ? zipCodeAnswer.answer : ''}</li>
      </ul>
      <p>${quoteInfo}</p> <!-- Include quoteInfo here -->
      <h4 style="margin-top: 40px">All The Best,</h4>
      <ul style="list-style-type: none; font-size: small">
        <p>Wall Web Development</p>
      </ul>
      <p style="font-size: xx-small">
        Do Not Reply. Inbox Not Monitored. If this email has been sent to you in error please report to contact@wallwebdevelopment.com.
      </p>
    `
}

module.exports = emailBodyConstructor
