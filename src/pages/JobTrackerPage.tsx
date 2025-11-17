import { useEffect, useState } from 'react'

interface JobApplication {
  id: string
  job_title: string
  company: string
  date_applied: string
  status: 'Applied' | 'Interviewing' | 'Offer'
  compensation?: string
  job_description: string
  created_at?: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const STORAGE_KEY = 'internguide_job_applications'

function JobTrackerPage() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchField, setSearchField] = useState<'all' | 'job_title' | 'company' | 'date' | 'description'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Applied' | 'Interviewing' | 'Offer'>('all')
  
  // Form state
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    dateApplied: new Date().toISOString().split('T')[0],
    status: 'Applied' as 'Applied' | 'Interviewing' | 'Offer',
    compensation: '',
    jobDescription: '',
  })

  // Load applications from localStorage on mount
  useEffect(() => {
    loadApplications()
  }, [])

  // Save to localStorage whenever applications change
  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
    }
  }, [applications])

  const loadApplications = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Try to load from localStorage first
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as JobApplication[]
        setApplications(parsed)
      }
      
      // Then try to fetch from API (when backend is ready)
      try {
        const response = await fetch(`${API_BASE_URL}/job-tracker`)
        if (response.ok) {
          const data = await response.json()
          setApplications(data)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        }
      } catch (apiError) {
        // API not available, use localStorage data
        console.log('API not available, using local storage')
      }
    } catch (err) {
      setError('Failed to load applications')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        // Update existing application
        const updatedApp: JobApplication = {
          id: editingId,
          job_title: formData.jobTitle,
          company: formData.company,
          date_applied: formData.dateApplied,
          status: formData.status,
          compensation: formData.compensation || undefined,
          job_description: formData.jobDescription,
        }
        
        try {
          const response = await fetch(`${API_BASE_URL}/job-tracker/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jobTitle: formData.jobTitle,
              company: formData.company,
              dateApplied: formData.dateApplied,
              status: formData.status,
              compensation: formData.compensation,
              jobDescription: formData.jobDescription,
            }),
          })
          
          if (response.ok) {
            const data = await response.json()
            setApplications(applications.map(app => app.id === editingId ? data : app))
          } else {
            throw new Error('API update failed')
          }
        } catch (apiError) {
          // Fallback to local update
          setApplications(applications.map(app => app.id === editingId ? updatedApp : app))
        }
      } else {
        // Create new application
        const newApp: JobApplication = {
          id: Date.now().toString(),
          job_title: formData.jobTitle,
          company: formData.company,
          date_applied: formData.dateApplied,
          status: formData.status,
          compensation: formData.compensation || undefined,
          job_description: formData.jobDescription,
          created_at: new Date().toISOString(),
        }
        
        try {
          const response = await fetch(`${API_BASE_URL}/job-tracker`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jobTitle: formData.jobTitle,
              company: formData.company,
              dateApplied: formData.dateApplied,
              status: formData.status,
              compensation: formData.compensation,
              jobDescription: formData.jobDescription,
            }),
          })
          
          if (response.ok) {
            const data = await response.json()
            setApplications([data, ...applications])
          } else {
            throw new Error('API create failed')
          }
        } catch (apiError) {
          // Fallback to local create
          setApplications([newApp, ...applications])
        }
      }
      
      // Reset form
      resetForm()
    } catch (err) {
      setError('Failed to save application')
      console.error(err)
    }
  }

  const handleEdit = (app: JobApplication) => {
    setFormData({
      jobTitle: app.job_title,
      company: app.company,
      dateApplied: app.date_applied,
      status: app.status,
      compensation: app.compensation || '',
      jobDescription: app.job_description,
    })
    setEditingId(app.id)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return
    }
    
    try {
      try {
        const response = await fetch(`${API_BASE_URL}/job-tracker/${id}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          throw new Error('API delete failed')
        }
      } catch (apiError) {
        // Fallback to local delete
        console.log('API not available, deleting locally')
      }
      
      setApplications(applications.filter(app => app.id !== id))
    } catch (err) {
      setError('Failed to delete application')
      console.error(err)
    }
  }

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      company: '',
      dateApplied: new Date().toISOString().split('T')[0],
      status: 'Applied',
      compensation: '',
      jobDescription: '',
    })
    setEditingId(null)
    setIsFormOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'status-applied'
      case 'Interviewing':
        return 'status-interviewing'
      case 'Offer':
        return 'status-offer'
      default:
        return ''
    }
  }

  const getStatusCount = (status: string) => {
    return applications.filter(app => app.status === status).length
  }

  // Filter and search applications
  const filteredApplications = applications.filter(app => {
    // Status filter
    if (statusFilter !== 'all' && app.status !== statusFilter) {
      return false
    }

    // Search filter
    if (!searchQuery.trim()) {
      return true
    }

    const query = searchQuery.toLowerCase()

    switch (searchField) {
      case 'job_title':
        return app.job_title.toLowerCase().includes(query)
      case 'company':
        return app.company.toLowerCase().includes(query)
      case 'date':
        // Search by date in various formats
        const dateStr = new Date(app.date_applied).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
        return dateStr.toLowerCase().includes(query) || app.date_applied.includes(query)
      case 'description':
        return app.job_description.toLowerCase().includes(query)
      case 'all':
      default:
        return (
          app.job_title.toLowerCase().includes(query) ||
          app.company.toLowerCase().includes(query) ||
          app.job_description.toLowerCase().includes(query) ||
          app.date_applied.includes(query) ||
          (app.compensation && app.compensation.toLowerCase().includes(query))
        )
    }
  })

  const clearSearch = () => {
    setSearchQuery('')
    setSearchField('all')
    setStatusFilter('all')
  }

  return (
    <div className="job-tracker-page">
      <section className="hero job-tracker-hero">
        <div className="hero__body">
          <span className="hero__tag">Job Application Tracker</span>
          <h1>Keep track of every opportunity</h1>
          <p>
            Organize your job applications in one place. Track your progress from application to offer,
            and never lose sight of your opportunities.
          </p>
          <div className="hero__actions">
            <button 
              className="button button--primary" 
              onClick={() => setIsFormOpen(true)}
            >
              + Add New Application
            </button>
          </div>
        </div>
      </section>

      <div className="main-content job-tracker-content">
        {/* Statistics */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{applications.length}</div>
              <div className="stat-label">Total Applications</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{getStatusCount('Applied')}</div>
              <div className="stat-label">Applied</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{getStatusCount('Interviewing')}</div>
              <div className="stat-label">Interviewing</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{getStatusCount('Offer')}</div>
              <div className="stat-label">Offers</div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        {applications.length > 0 && (
          <section className="search-section">
            <div className="search-container">
              <div className="search-header">
                <h3>Search & Filter</h3>
                {(searchQuery || statusFilter !== 'all' || searchField !== 'all') && (
                  <button className="button button--secondary button--small" onClick={clearSearch}>
                    Clear Filters
                  </button>
                )}
              </div>
              
              <div className="search-controls">
                <div className="search-input-group">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="search-field-select"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value as any)}
                  >
                    <option value="all">All Fields</option>
                    <option value="job_title">Job Title</option>
                    <option value="company">Company</option>
                    <option value="date">Date</option>
                    <option value="description">Description</option>
                  </select>
                </div>

                <div className="status-filter-group">
                  <label htmlFor="statusFilter">Status:</label>
                  <select
                    id="statusFilter"
                    className="status-filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                  </select>
                </div>
              </div>

              {filteredApplications.length !== applications.length && (
                <div className="search-results-info">
                  Showing {filteredApplications.length} of {applications.length} applications
                </div>
              )}
            </div>
          </section>
        )}

        {/* Error message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {isFormOpen && (
          <div className="modal-overlay" onClick={() => resetForm()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingId ? 'Edit Application' : 'Add New Application'}</h2>
                <button className="modal-close" onClick={resetForm}>×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="job-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="jobTitle">Job Title *</label>
                    <input
                      id="jobTitle"
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="e.g., Software Engineering Intern"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company *</label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g., Google"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateApplied">Date Applied *</label>
                    <input
                      id="dateApplied"
                      type="date"
                      value={formData.dateApplied}
                      onChange={(e) => setFormData({ ...formData, dateApplied: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="status">Status *</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      required
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="compensation">Compensation (Optional)</label>
                  <input
                    id="compensation"
                    type="text"
                    value={formData.compensation}
                    onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                    placeholder="e.g., $25/hour or $100k/year"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="jobDescription">Job Description *</label>
                  <textarea
                    id="jobDescription"
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                    placeholder="Paste the job description here..."
                    rows={6}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="button button--secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="button button--primary">
                    {editingId ? 'Update Application' : 'Add Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Applications List */}
        <section className="applications-section">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="empty-state">
              <h3>No applications yet</h3>
              <p>Start tracking your job applications by clicking the button above.</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="empty-state">
              <h3>No applications found</h3>
              <p>Try adjusting your search criteria or filters.</p>
              <button className="button button--primary" onClick={clearSearch} style={{ marginTop: '1rem' }}>
                Clear Search
              </button>
            </div>
          ) : (
            <div className="applications-list">
              {filteredApplications.map((app) => (
                <div key={app.id} className="application-card">
                  <div className="application-header">
                    <div>
                      <h3 className="application-title">{app.job_title}</h3>
                      <p className="application-company">{app.company}</p>
                    </div>
                    <span className={`status-badge ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div className="application-details">
                    <div className="detail-item">
                      <span className="detail-label">Date Applied:</span>
                      <span className="detail-value">
                        {new Date(app.date_applied).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    
                    {app.compensation && (
                      <div className="detail-item">
                        <span className="detail-label">Compensation:</span>
                        <span className="detail-value">{app.compensation}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="application-description">
                    <p className="detail-label">Job Description:</p>
                    <p className="description-text">{app.job_description}</p>
                  </div>
                  
                  <div className="application-actions">
                    <button 
                      className="button button--secondary button--small"
                      onClick={() => handleEdit(app)}
                    >
                      Edit
                    </button>
                    <button 
                      className="button button--danger button--small"
                      onClick={() => handleDelete(app.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default JobTrackerPage

