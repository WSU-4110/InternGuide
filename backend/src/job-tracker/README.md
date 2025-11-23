# Job Tracker Module

This module provides functionality for tracking job applications throughout the internship search process.

## Features

- **Create Applications**: Add new job applications with all relevant details
- **View Applications**: List all applications with sorting by date
- **Update Applications**: Edit existing applications to update status or details
- **Delete Applications**: Remove applications from the tracker
- **Status Tracking**: Track applications through three stages:
  - Applied
  - Interviewing
  - Offer

## API Endpoints

### Create Application
```
POST /api/job-tracker
```
**Body:**
```json
{
  "jobTitle": "Software Engineering Intern",
  "company": "Google",
  "dateApplied": "2024-01-15",
  "status": "Applied",
  "compensation": "$50/hour",
  "jobDescription": "Full job description text..."
}
```

### Get All Applications
```
GET /api/job-tracker
```
Returns all applications for the current user, sorted by date applied (newest first).

### Get Single Application
```
GET /api/job-tracker/:id
```

### Update Application
```
PUT /api/job-tracker/:id
```
**Body:** (all fields optional)
```json
{
  "jobTitle": "Software Engineering Intern",
  "company": "Google",
  "dateApplied": "2024-01-15",
  "status": "Interviewing",
  "compensation": "$50/hour",
  "jobDescription": "Updated job description..."
}
```

### Delete Application
```
DELETE /api/job-tracker/:id
```

## Database Schema

The module uses a `job_applications` table with the following structure:

- `id` (UUID): Primary key
- `user_id` (TEXT): User identifier
- `job_title` (TEXT): Job title
- `company` (TEXT): Company name
- `date_applied` (DATE): Date the application was submitted
- `status` (TEXT): Application status (Applied, Interviewing, Offer)
- `compensation` (TEXT): Optional compensation information
- `job_description` (TEXT): Full job description
- `created_at` (TIMESTAMP): Record creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

## Setup

1. Run the migration script to create the database table:
   ```sql
   -- See backend/migrations/create_job_applications_table.sql
   ```

2. The module is automatically imported in `app.module.ts`

3. Ensure Supabase credentials are configured in your environment variables

## Frontend Integration

The frontend component is located at `src/pages/JobTrackerPage.tsx` and includes:

- Statistics dashboard showing total applications and status breakdown
- **Advanced Search & Filter System**:
  - Search by specific fields (Job Title, Company, Date, Description)
  - Search across all fields simultaneously
  - Filter by application status (Applied, Interviewing, Offer)
  - Real-time search results with count display
  - Clear filters button for easy reset
- Modal form for adding/editing applications
- Card-based list view of all applications
- Local storage fallback for offline functionality
- Responsive design for mobile and desktop

### Search Features

The search functionality supports:

1. **Field-Specific Search**:
   - Job Title: Search by position name
   - Company: Find applications by company name
   - Date: Search by application date (supports multiple formats)
   - Description: Search within job descriptions
   - All Fields: Search across all fields simultaneously

2. **Status Filtering**: Filter applications by their current status

3. **Combined Filters**: Use search and status filter together for precise results

4. **Real-time Updates**: Results update as you type

5. **Result Counter**: Shows how many applications match your search

## Future Enhancements

- User authentication integration (currently uses default user)
- Application notes and follow-up reminders
- Document attachments (resume, cover letter)
- Interview scheduling integration
- Application deadline tracking
- Company research notes
- Networking contact tracking

