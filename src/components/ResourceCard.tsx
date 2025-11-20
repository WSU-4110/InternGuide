import { useNavigate } from 'react-router-dom';
import '../styles/ResourceCard.css';
import type{ Resource } from '../data/resourcesData';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(resource.link);
  };
  
  return (
    <div className="resource-card" onClick={handleClick} role="button" tabIndex={0}>
      <div className="resource-card-content">
        <h3 className="resource-title">{resource.title}</h3>
        <p className="resource-description">{resource.description}</p>
        <div className="resource-meta">
          <span className="resource-badge">{resource.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;