import React, { useState } from 'react';
import { Clock, Star, Edit, Trash2, Search } from 'lucide-react';

// Mock saved projects data
const initialProjects = [
  {
    id: '1',
    title: 'Research Paper Introduction',
    excerpt: 'The following research aims to explore the relationship between...',
    createdAt: '2023-09-15T10:30:00',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Email to Clients',
    excerpt: 'Dear valued clients, We are pleased to announce our new service offerings...',
    createdAt: '2023-09-12T14:45:00',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Product Description',
    excerpt: 'Our revolutionary new product combines cutting-edge technology with...',
    createdAt: '2023-09-10T09:15:00',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Blog Post Draft',
    excerpt: 'In this article, we\'ll explore the top 10 trends that are shaping the future of...',
    createdAt: '2023-09-05T16:20:00',
    isFavorite: false,
  },
];

const SavedProjects: React.FC = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFavorite = (id: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, isFavorite: !project.isFavorite } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Saved Projects</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-10 py-2 pr-4 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{project.title}</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleFavorite(project.id)}
                    className={`p-1 rounded-full ${project.isFavorite ? 'text-warning' : 'text-muted-foreground'}`}
                  >
                    <Star className="h-4 w-4" fill={project.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-1 rounded-full text-muted-foreground hover:text-foreground">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    className="p-1 rounded-full text-muted-foreground hover:text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.excerpt}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{formatDate(project.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No projects found</p>
          {searchTerm && (
            <button 
              className="mt-2 text-primary text-sm"
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedProjects;