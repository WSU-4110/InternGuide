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
        <header className="resources-header">
          <h1 className="resources-title">Internship Guidance Hub</h1>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search internship resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

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
                <h2 className="no-results-title">No resources found</h2>
                <p className="no-results-text">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
