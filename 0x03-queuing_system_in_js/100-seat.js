const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const kue = require('kue');

const app = express();
const port = 1245;

const client = redis.createClient();
client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);

// Set initial available seats to 50
client.setAsync('available_seats', 50);

// Initialize reservationEnabled flag
let reservationEnabled = true;

// Function to reserve seats
function reserveSeat(number) {
  client.setAsync('available_seats', number);
}

// Function to get current available seats
async function getCurrentAvailableSeats() {
  const seats = await client.getAsync('available_seats');
  return parseInt(seats) || 0;
}

const queue = kue.createQueue();

// Route to get current available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  // Create and queue a job
  const job = queue.create('reserve_seat').save();

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
    res.json({ status: 'Reservation confirmed' });
  });

  job.on('failed', (err) => {
    console.error(`Seat reservation job ${job.id} failed: ${err.message}`);
    res.json({ status: 'Reservation failed' });
  });
});

// Define the /process route
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  // Process the queue reserve_seat
  const currentSeats = await getCurrentAvailableSeats();
  if (currentSeats === 0) {
    reservationEnabled = false;
  } else if (currentSeats < 0) {
    throw new Error('Not enough seats available');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
