import '../styles/FilterSidebar.css';
// filter side bar that will showed rhe catgories 
interface FilterSidebarProps {
  selectedDesignedFor: string;
  selectedCategory: string;
  onDesignedForChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  designedForOptions: string[];
  categoryOptions: string[];
}
//
const FilterSidebar = ({
  selectedDesignedFor,
  selectedCategory,
  onDesignedForChange,
  onCategoryChange,
  designedForOptions,
  categoryOptions
}: FilterSidebarProps) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-section">
        <h3 className="filter-title">Designed for</h3>
        <div className="filter-options">
          {designedForOptions.map((option) => (
            <button
              key={option}
              className={`filter-option ${selectedDesignedFor === option ? 'active' : ''}`}
              onClick={() => onDesignedForChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <div className="filter-options">
          {categoryOptions.map((option) => (
            <button
              key={option}
              className={`filter-option ${selectedCategory === option ? 'active' : ''}`}
              onClick={() => onCategoryChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
