import { ExternalLink, Github } from "lucide-react";

const Projects = ({ visibleSections }) => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      stages: [
        { name: 'Project Research', category: 'Development', status: 'Completed' },
        { name: 'Moodboard', category: 'Design', status: 'Completed' },
        { name: 'User Flow', category: 'Design', status: 'Completed' },
        { name: 'Wireframe', category: 'Design', status: 'Completed' },
        { name: 'UI Design', category: 'Design', status: 'In Progress' },
        { name: 'Design System', category: 'Design', status: 'Pending' },
        { name: 'Prototype', category: 'Design', status: 'Pending' },
        { name: 'HTML', category: 'Development', status: 'Pending' }
      ],
      description: 'Full-stack e-commerce solution with modern UI/UX',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      type: 'Web Application'
    },
    {
      id: 2,
      title: 'Design System',
      stages: [
        { name: 'Project Research', category: 'Design', status: 'Completed' },
        { name: 'Moodboard', category: 'Design', status: 'Completed' },
        { name: 'User Flow', category: 'Design', status: 'In Progress' },
        { name: 'Wireframe', category: 'Design', status: 'Pending' },
        { name: 'UI Design', category: 'Design', status: 'Pending' },
        { name: 'Design System', category: 'Design', status: 'Pending' },
        { name: 'Prototype', category: 'Design', status: 'Pending' },
        { name: 'HTML', category: 'Development', status: 'Pending' }
      ],
      description: 'Comprehensive design system for enterprise applications',
      tech: ['Figma', 'React', 'Storybook', 'Tokens'],
      type: 'Design System'
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      stages: [
        { name: 'Project Research', category: 'Development', status: 'Completed' },
        { name: 'Moodboard', category: 'Design', status: 'Completed' },
        { name: 'User Flow', category: 'Design', status: 'Completed' },
        { name: 'Wireframe', category: 'Design', status: 'Completed' },
        { name: 'UI Design', category: 'Design', status: 'Completed' },
        { name: 'Design System', category: 'Design', status: 'In Progress' },
        { name: 'Prototype', category: 'Design', status: 'Pending' },
        { name: 'HTML', category: 'Development', status: 'Pending' }
      ],
      description: 'Secure mobile banking application with biometric auth',
      tech: ['React Native', 'Firebase', 'TypeScript'],
      type: 'Mobile App'
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      stages: [
        { name: 'Project Research', category: 'Development', status: 'Completed' },
        { name: 'Moodboard', category: 'Design', status: 'Completed' },
        { name: 'User Flow', category: 'Design', status: 'Completed' },
        { name: 'Wireframe', category: 'Design', status: 'Completed' },
        { name: 'UI Design', category: 'Design', status: 'Completed' },
        { name: 'Design System', category: 'Design', status: 'Completed' },
        { name: 'Prototype', category: 'Design', status: 'Completed' },
        { name: 'HTML', category: 'Development', status: 'In Progress' }
      ],
      description: 'Real-time analytics dashboard with interactive charts',
      tech: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      type: 'Web Application'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of work that showcases my expertise and creativity
          </p>
        </div>

        {/* Desktop: 4 cards per row, Tablet: 2 cards, Mobile: 1 card */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-500 border border-gray-100 ${visibleSections.has('projects')
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${project.category === 'Design' ? 'bg-red-500' :
                      project.category === 'Development' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600">{project.category}</span>
                </div>
                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Live' ? 'bg-green-100 text-green-700' :
                    project.status === 'In Development' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                  }`}>
                  {project.status}
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">{project.type}</p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs sm:text-sm">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Project Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button className="flex-1 bg-gray-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base">
                  <span className="hidden sm:inline">View Project</span>
                  <span className="sm:hidden">View</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button className="sm:w-auto w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Projects;