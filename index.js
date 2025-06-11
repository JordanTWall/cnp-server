// index.js
const express = require('express')
const path = require('path')
const cors = require('cors')
const auth = require('./functions/routes/api/auth.js')

const app = express()
const PORT = 3020

// Middleware
// app.use(cors())
// app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', auth)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
