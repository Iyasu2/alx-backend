import kue from 'kue'; // Import Kue or any other queue library you're using
import createPushNotificationsJobs from './8-job.js'; // Import your function
import { expect } from 'chai'; // Use your preferred assertion library

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    // Initialize the queue (create it if not already done)
    queue = kue.createQueue();
  });

  after(() => {
    // Clear the queue and exit test mode
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    try {
      createPushNotificationsJobs('not_an_array', queue);
    } catch (error) {
      expect(error.message).to.equal('Jobs is not an array');
    }
  });

  it('should create two new jobs to the queue', () => {
    const jobData1 = { data: 'job1' };
    const jobData2 = { data: 'job2' };

    createPushNotificationsJobs([jobData1, jobData2], queue);

    // Assert that the jobs are correctly added to the queue
    queue.testMode.jobs.forEach((job) => {
      expect(job.type).to.equal('push_notification_code_3');
      expect(job.data).to.deep.equal(jobData1) || expect(job.data).to.deep.equal(jobData2);
    });
  });
});
