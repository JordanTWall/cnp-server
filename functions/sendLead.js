const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const { emailPass, emailUser, emailHost, emailTo } = require('../Config')
const emailBodyConstructor = require('./emailBodyConstructor.js')

function sendLead(leadData, quoteInfo) {
  console.log(leadData)
  const {
    firstName,
    lastName,
    appointmentTimeEST,
    clientAddress,
    cityAnswer,
    zipCodeAnswer,
    phoneNumberAnswer,
  } = leadData

  const emailBody = emailBodyConstructor(
    firstName,
    lastName,
    phoneNumberAnswer,
    clientAddress,
    cityAnswer,
    zipCodeAnswer,
    appointmentTimeEST,
    quoteInfo
  )

  const transporter = nodemailer.createTransport({
    host: emailHost,
    secure: true,
    port: 465,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const mailOptions = {
    from: `Wall Web Development <${emailUser}>`,
    to: emailTo,
    subject: `New Online Booking`,
    html: emailBody,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
    } else {
      console.log('Email sent successfully:', info.response)
    }
  })
}

module.exports = sendLead
