
export interface JobApplication {
  id:string;
  job_title:string;
  company:string;
  date_applied:string;
  status: 'Applied' | 'Interviewing' | 'Offer';
  compensation?:string;
  job_description:string;
}
//stores all job applictions 
let applications: JobApplication[] = [];

//creates a new job
export function createApplication(job: JobApplication): void {
  applications.push(job);
}

export function readApplications(): JobApplication[] {
  return [...applications]; // return a copy
}

export function updateApplication(id: string, updatedFields: Partial<JobApplication>): void {
  applications = applications.map(job =>
    job.id === id ? { ...job, ...updatedFields } : job
  );
}

export function deleteApplication(id: string): boolean {
  const lengthBefore = applications.length;
  applications = applications.filter(job => job.id !== id);
  return applications.length < lengthBefore;
}

export function filterByStatus(status: 'Applied' | 'Interviewing' | 'Offer'): JobApplication[] {
  return applications.filter(job => job.status === status);
}

export function resetApplications(): void {
  applications = [];
}