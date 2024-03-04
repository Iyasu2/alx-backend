// 7-job_creator.js

const kue = require('kue');
const queue = kue.createQueue();

// Array of job data
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Process each job in the array
jobs.forEach((jobData) => {
  // Create a new job in the "push_notification_code_2" queue
  const job = queue.create('push_notification_code_2', jobData)
    .save((err) => {
      if (err) {
        console.error('Error creating job:', err);
      } else {
        console.log(`Notification job created: ${job.id}`);
      }
    });

  // Handle job completion
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });

  // Handle job failure
  job.on('failed', (err) => {
    console.error(`Notification job ${job.id} failed:`, err);
  });

  // Handle job progress (optional)
  job.on('progress', (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
});

console.log('Creating notification jobs...');
