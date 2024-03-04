const kue = require('kue');
const queue = kue.createQueue();

// Create an object containing job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'This is the code to verify your account',
};

// Create a job in the "push_notification_code" queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.error('Error creating job:', err);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

// Handle job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Handle job failure
job.on('failed', (err) => {
  console.error('Notification job failed:', err);
});

// Quit the queue after a delay (for demonstration purposes)
setTimeout(() => {
  queue.shutdown(5000, (err) => {
    console.log('Queue shutdown:', err || 'OK');
  });
}, 1000); // Wait 1 second before shutting down
