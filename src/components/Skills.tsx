const Skills = ({ visibleSections }) =>{
   const skills = [
        { name: 'Frontend Development', progress: 95, category: 'Development' },
        { name: 'Backend Development', progress: 90, category: 'Development' },
        { name: 'UI/UX Design', progress: 85, category: 'Design' },
        { name: 'Database Design', progress: 80, category: 'Development' },
        { name: 'Mobile Development', progress: 75, category: 'Development' },
        { name: 'DevOps', progress: 70, category: 'Development' }
      ];
return (
        <section id="skills" className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Specialized in modern technologies and design principles
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`group p-6 lg:p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-500 ${
                    visibleSections.has('skills') 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900">{skill.name}</h3>
                      <p className="text-sm text-gray-500">{skill.category}</p>
                    </div>
                    <span className="text-xl lg:text-2xl font-bold text-blue-600">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: visibleSections.has('skills') ? `${skill.progress}%` : '0%',
                        transitionDelay: `${index * 100 + 300}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
}
export default Skills;