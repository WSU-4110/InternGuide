// import all the functions from services
import { 
  createApplication, readApplications, updateApplication, deleteApplication, 
  filterByStatus, resetApplications, type JobApplication 
} from '../services/job-tracker.service';

beforeEach(() => {
  resetApplications();
});

test('createApplication adds a new job', () => {
  const job: JobApplication = { 
    id: '1', 
    job_title: 'IT Intern', 
    company: 'Google', 
    date_applied: '2025-11-23', 
    status: 'Applied', 
    job_description: 'IT Intern role at Google' 
  };
  createApplication(job);
  expect(readApplications()).toHaveLength(1);
  expect(readApplications()[0].id).toBe('1');
});

test('updateApplication updates existing job', () => {
  const job: JobApplication = { 
    id: '2', 
    job_title: 'SWE', 
    company: 'Apple', 
    date_applied: '2025-11-23', 
    status: 'Applied', 
    job_description: 'Software Engineer Intern at Apple' 
  };
  createApplication(job);
  updateApplication('2', { status: 'Interviewing' });
  expect(readApplications()[0].status).toBe('Interviewing');
});

test('deleteApplication removes job', () => {
  const job: JobApplication = { 
    id: '3', 
    job_title: 'Data Analyst', 
    company: 'Stellantis', 
    date_applied: '2025-11-23', 
    status: 'Applied', 
    job_description: 'Data Analyst Intern at Stellantis' 
  };
  createApplication(job);
  const deleted = deleteApplication('3');
  expect(deleted).toBe(true);
  expect(readApplications()).toHaveLength(0);
});

test('filterByStatus returns only matching jobs', () => {
  createApplication({ 
    id: '4', 
    job_title: 'Application Developer', 
    company: 'Apple', 
    date_applied: '2025-11-23', 
    status: 'Applied', 
    job_description: 'Application Developer Intern at Apple' 
  });
  createApplication({ 
    id: '5', 
    job_title: 'Cloud Intern', 
    company: 'Google', 
    date_applied: '2025-11-23', 
    status: 'Offer', 
    job_description: 'Cloud Intern at Google' 
  });
  const filtered = filterByStatus('Offer');
  expect(filtered).toHaveLength(1);
  expect(filtered[0].status).toBe('Offer');
});

test('resetApplications clears all jobs', () => {
  createApplication({ 
    id: '6', 
    job_title: 'IT Intern', 
    company: 'Ford', 
    date_applied: '2025-11-23', 
    status: 'Applied', 
    job_description: 'IT Intern role at Ford' 
  });
  resetApplications();
  expect(readApplications()).toHaveLength(0);
});

test('readApplications returns all jobs', () => {
  createApplication({ 
    id: '7', 
    job_title: 'Data Analyst', 
    company: 'DTE', 
    date_applied: '2025-11-23', 
    status: 'Applied', 
    job_description: 'Data Analyst Intern at DTE' 
  });
  const allJobs = readApplications();
  expect(allJobs).toHaveLength(1);
  expect(allJobs[0].company).toBe('DTE');
});
