// 0-redis_client.js

// Import the required library
import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection events
client.on('error', (err) => {
  console.error('Redis client connected to the server:', err);
});

client.on('connect', () => {
  console.log('Redis client connected to the server.');
  // Your other Redis operations go here
  client.set('Holberton', 'School', (error) => {
    if (error) {
      console.error('Error setting key:', error.message);
    } else {
      client.get('Holberton', (err, value) => {
        if (err) {
          console.error('Error getting key:', err.message);
        } else {
          console.log('Value for myKey:', value);
        }
        client.quit(); // Disconnect the client
      });
    }
  });
});
