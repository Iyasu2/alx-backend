import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection events
client.on('error', (err) => {
  console.error('Redis Client not connected to the server:', err);
});

client.on('connect', () => {
  console.log('Redis client connected to the server.');

  // Your other Redis operations go here
  displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  displaySchoolValue('HolbertonSanFrancisco');
});

// Function to set a new school value
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, (error, reply) => {
    if (error) {
      console.error('Error setting value:', error.message);
    } else {
      console.log(`Reply: ${reply}`);
    }
  });
};

// Function to display the value for a school
const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, value) => {
    if (err) {
      console.error('Error getting value:', err.message);
    } else {
      console.log(`${value}`);
    }
    client.quit(); // Disconnect the client
  });
};
