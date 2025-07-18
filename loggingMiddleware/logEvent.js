const axios = require('axios');

const logEvent = async (stack, level, logPackage, message) => {
  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: logPackage.toLowerCase(),
        message
      },
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMnZlMWEwNTk5QHNyZXlhcy5hYy5pbiIsImV4cCI6MTc1MjgxOTA4NCwiaWF0IjoxNzUyODE4MTg0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmYwMGYyZDYtMjEwYS00MmNmLTlhZjAtYTRjMGE1YjUzYzcxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibW9ndWxsYSB2YXJzaGluaSIsInN1YiI6IjdhZTIzZTU1LWVkZTMtNDhmNi05OGQ3LTNmNjRlZTE5ZTllNCJ9LCJlbWFpbCI6IjIydmUxYTA1OTlAc3JleWFzLmFjLmluIiwibmFtZSI6Im1vZ3VsbGEgdmFyc2hpbmkiLCJyb2xsTm8iOiIyMnZlMWEwNTk5IiwiYWNjZXNzQ29kZSI6Ik5OWkRHcSIsImNsaWVudElEIjoiN2FlMjNlNTUtZWRlMy00OGY2LTk4ZDctM2Y2NGVlMTllOWU0IiwiY2xpZW50U2VjcmV0Ijoia3lBZllSY0prcVZRTkNnayJ9.tei3tfYt8S90dN4CeIRUahBq3W9p-rr0uiT5vdz2Iuk'
        }
      }
    );

    console.log('Log sent:', response.data);
  } catch (error) {
    console.error('Logging failed:', error.message);
    if (error.response) {
      console.error('🛠️ Error details:', error.response.data);
    }
  }
};

module.exports = logEvent;
