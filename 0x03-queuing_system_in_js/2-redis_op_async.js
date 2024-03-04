import { createClient } from 'redis';
import { promisify } from 'util'; // Import the promisify function

// Create a Redis client
const client = createClient();

// Handle connection events
client.on('error', (err) => {
  console.error('Redis Client not connected to the server:', err);
});

client.on('connect', async () => {
  console.log('Redis client connected to the server.');

  // Your other Redis operations go here
  await displaySchoolValue('Holberton'); // Use await for async function
  await setNewSchool('HolbertonSanFrancisco', '100'); // Use await for async function
  await displaySchoolValue('HolbertonSanFrancisco'); // Use await for async function

  // Disconnect the client
  client.quit();
});

// Function to set a new school value
const setNewSchool = (schoolName, value) => {
  return new Promise((resolve, reject) => {
    client.set(schoolName, value, (error, reply) => {
      if (error) {
        reject(error); // Reject the promise on error
      } else {
        resolve(reply); // Resolve the promise with the reply
	console.log(`Reply: ${reply}`);
      }
    });
  });
};

// Function to display the value for a school
const displaySchoolValue = async (schoolName) => {
  try {
    const getAsync = promisify(client.get).bind(client); // Promisify client.get
    const value = await getAsync(schoolName); // Use await for async function
    console.log(`${value}`);
  } catch (error) {
    console.error(`Error getting value for ${schoolName}:`, error.message);
  }
};
