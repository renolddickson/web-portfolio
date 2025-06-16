import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from "lucide-react";

  const Contact = () => (
      <section id="contact" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Let's Connect</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to bring your next project to life? Let's discuss how we can work together.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <div className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm sm:text-base break-all">renold.dickson@email.com</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600 text-sm sm:text-base">+91 98765 43210</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 pt-4">
                <button className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project requirements..."
                  ></textarea>
                </div>
                <button className="w-full bg-gray-900 text-white py-3 sm:py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
                  Send Message
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

    export default Contact;