import { useState, useMemo } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ResourceCard from '../components/ResourceCard';
import { resourcesData, designedForOptions, categoryOptions } from '../data/resourcesData';
import '../styles/Resources.css';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignedFor, setSelectedDesignedFor] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = useMemo(() => {
    return resourcesData.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDesignedFor =
        selectedDesignedFor === 'All' ||
        resource.designedFor.includes(selectedDesignedFor);

      const matchesCategory =
        selectedCategory === 'All' ||
        resource.category === selectedCategory;

      return matchesSearch && matchesDesignedFor && matchesCategory;
    });
  }, [searchQuery, selectedDesignedFor, selectedCategory]);

  return (
    <div className="resources-page">
      <div className="resources-container">

        {/* Page Header */}
        <header className="resources-header">
          <h1 className="resources-title">Internship Guidance Hub</h1>

          <div className="search-container">

            {/* Clean Search Icon */}
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10 2a8 8 0 015.29 13.71l4 4a1 1 0 01-1.42 1.42l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"/>
            </svg>

            <input
              type="text"
              className="search-input"
              placeholder="Search internship resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Main Content */}
        <div className="resources-content">
          <FilterSidebar
            selectedDesignedFor={selectedDesignedFor}
            selectedCategory={selectedCategory}
            onDesignedForChange={setSelectedDesignedFor}
            onCategoryChange={setSelectedCategory}
            designedForOptions={designedForOptions}
            categoryOptions={categoryOptions}
          />

          <div className="resources-grid">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
            ) : (
              <div className="no-results">
                <h2>No resources found</h2>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resources;
