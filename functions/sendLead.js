const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const emailBodyConstructor = require('./emailBodyConstructor.js')
const dotenv = require('dotenv')

const emailPass = process.env.EMAIL_PASS
const emailUser = process.env.EMAIL_USER
const emailHost = process.env.EMAIL_HOST
const emailTo = process.env.EMAIL_TO


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
