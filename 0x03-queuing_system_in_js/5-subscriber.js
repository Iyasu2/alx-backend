const redis = require('redis');

// Create a Redis subscriber client
const subscriber = redis.createClient();

// Handle connection events
subscriber.on('connect', () => {
  console.log('Redis client connected to the server.');
});

subscriber.on('error', (err) => {
  console.error('Redis client not connected to the server:', err);
});

// Subscribe to the channel
subscriber.subscribe('holberton school');

// Handle received messages
subscriber.on('message', (channel, message) => {
  console.log(`${message}`);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
