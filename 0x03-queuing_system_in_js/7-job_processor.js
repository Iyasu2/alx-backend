const kue = require('kue');
const queue = kue.createQueue();

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  // Track progress (0%)
  job.progress(0, 100);

  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job with an error if blacklisted
    const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
    return done(new Error(errorMessage));
  }

  // Track progress (50%)
  job.progress(50, 100);

  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  // Add your notification logic here (e.g., sending an SMS or email)

  // Mark the job as completed
  done();
}

// Process jobs from the "push_notification_code_2" queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

// Handle connection events (optional)
queue.on('error', (err) => {
  console.error('Queue error:', err);
});

console.log('Job processor listening for new jobs...');
