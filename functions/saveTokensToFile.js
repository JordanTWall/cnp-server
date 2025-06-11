const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const authFilePath = path.join(__dirname, '../Auth.js')

function saveTokensToFile(auth, newAccessToken, newRefreshToken) {
  // Create a new object with the latest tokens
  const authObject = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  }

  // Replace the existing object in the auth array with the new object
  auth.splice(0, 1, authObject)

  // Convert the auth array to a string with proper formatting
  const fileContent = `\nconst express = require('express');
  \nconst router = express.Router();
  \nconst accessToken = '${newAccessToken}';
  \nconst refreshToken = '${newRefreshToken}';
  
  \n\nconst auth = ${JSON.stringify(auth, null, 2)}; 
  
  \n\nmodule.exports = { accessToken, refreshToken, auth };
  `

  // Write the updated content to the file
  fs.writeFileSync(authFilePath, fileContent)
}

module.exports = saveTokensToFile
