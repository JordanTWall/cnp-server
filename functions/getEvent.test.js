const getEvent = require('./getEvent');
const dotenv = require('dotenv');

dotenv.config();

const testEventUuid = process.env.TEST_EVENT_UUID; // ✅ Make sure .env has this key

describe('getEvent (live integration test)', () => {
  it('should return clientAddress and formatted appointment time', async () => {
    try {
      const result = await getEvent(testEventUuid); // ✅ Use the actual var

      console.log('\n📍 Client Address:', result.clientAddress);
      console.log('🕒 Appointment Time (EST):', result.appointmentTimeEST);

      expect(typeof result.clientAddress).toBe('string');
      expect(typeof result.appointmentTimeEST).toBe('string');
    } catch (error) {
      console.error('❌ Test failed:', error.message || error);
      throw error;
    }
  }, 15000);
});
