// 6-job_processor.js

const kue = require('kue');
const queue = kue.createQueue();

// Function to send notifications
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  // Add your notification logic here (e.g., sending an SMS or email)
}

// Process jobs from the "push_notification_code" queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done(); // Mark the job as completed
});

// Handle connection events (optional)
queue.on('error', (err) => {
  console.error('Queue error:', err);
});

console.log('Job processor listening for new jobs...');
