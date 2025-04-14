const { getTokens, saveTokens } = require('./tokenService')
const dotenv = require('dotenv')
const btoa = require('btoa')
const fetch = require('node-fetch')

dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const tokenUrl = process.env.TOKEN_URL
let refreshInProgress = false

async function refreshAccessToken() {
  if (refreshInProgress) {
    console.log('⏳ Skipping duplicate refresh...')
    return
  }

  refreshInProgress = true

  try {
    const tokens = await getTokens()
    if (!tokens || !tokens.refreshToken) {
      throw new Error('❌ No refresh token found in DB')
    }

    const refreshTokenOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: tokens.refreshToken,
      }).toString(),
    }

    const res = await fetch(tokenUrl, refreshTokenOptions)
    const data = await res.json()

    if (!res.ok) {
      console.error('❌ Refresh request failed:', data)
      throw new Error('Token refresh failed')
    }

    if (data.access_token && data.refresh_token) {
      await saveTokens(data.access_token, data.refresh_token)
      console.log('✅ Access token refreshed')
      return data.access_token
    } else {
      console.error('⚠️ Unexpected refresh response:', data)
      throw new Error('Missing access/refresh token in response')
    }
  } catch (err) {
    console.error('❌ Error refreshing access token:', err.message || err)
    throw err
  } finally {
    refreshInProgress = false
  }
}

module.exports = refreshAccessToken
