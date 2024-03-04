import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection events
client.on('error', (err) => {
  console.error('Redis Client not connected to the server:', err);
});

client.on('connect', () => {
  console.log('Redis client connected to the server.');

  // Set hash values using hset
  client.hset('HolbertonSchools', 'Portland', 50, print);
  client.hset('HolbertonSchools', 'Seattle', 80, print);
  client.hset('HolbertonSchools', 'New York', 20, print);
  client.hset('HolbertonSchools', 'Bogota', 20, print);
  client.hset('HolbertonSchools', 'Cali', 40, print);
  client.hset('HolbertonSchools', 'Paris', 2, print);

  // Retrieve the entire hash using hgetall
  client.hgetall('HolbertonSchools', (err, result) => {
    if (err) {
      console.error('Error retrieving hash:', err.message);
    } else {
      console.log(result);
    }
    client.quit(); // Disconnect the client
  });
});
