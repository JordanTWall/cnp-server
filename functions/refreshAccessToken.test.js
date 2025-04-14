const refreshAccessToken = require('./refreshAccessToken');
const { getTokens } = require('./tokenService');

describe('refreshAccessToken (live integration test)', () => {
  it('should refresh and return a new access token', async () => {
    const oldTokens = await getTokens();
    console.log('\n🔐 Old Tokens:');
    console.log('Access Token:', oldTokens.accessToken);
    console.log('Refresh Token:', oldTokens.refreshToken);

    const newAccessToken = await refreshAccessToken();

    const updatedTokens = await getTokens();
    console.log('\n🆕 New Tokens:');
    console.log('Access Token:', updatedTokens.accessToken);
    console.log('Refresh Token:', updatedTokens.refreshToken);

    expect(typeof newAccessToken).toBe('string');
    expect(newAccessToken.length).toBeGreaterThan(10);

    expect(updatedTokens.accessToken).toBe(newAccessToken);
    expect(updatedTokens.refreshToken).not.toBe(oldTokens.refreshToken);
    console.log('\n✅ Token refresh test completed.');
  }, 15000);
});
