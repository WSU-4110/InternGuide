import { useState, useMemo } from 'react';
import ResourceCard from '../components/ResourceCard';
import { resourcesData, designedForOptions, categoryOptions } from '../data/resourcesData';
import '../styles/Resources.css';

const Resources = () => {
  return (
    <div className="resources-page">
      <div className="resources-container">
        <header className="resources-header">
          <p className="resources-header-label">INTERNSHIP RESOURCES</p>
          <h1 className="resources-title">Navigate your<br />internship journey</h1>
          <p className="resources-description">
            Access comprehensive guides and resources for your internship journey. From crafting resumes to acing interviews, find everything you need to succeed.
          </p>
        </header>

        <div className="resources-content">
          <div className="resources-grid">
            {resourcesData.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
