export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>
      <div className="absolute -right-32 top-1/3 w-64 h-64 bg-indigo-900 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -left-32 bottom-1/3 w-64 h-64 bg-purple-900 rounded-full filter blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 bg-indigo-900/30 border border-indigo-700/50 rounded-full text-indigo-400 text-sm font-medium">
            Services
          </span>
          <h2 className="text-4xl font-bold text-center text-gray-100 mb-4">
            What I Offer
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

            <div className="p-8 relative z-10">
              <div className="w-16 h-16 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-800/50 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300">
                Project Management
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                End-to-end management of web development projects, ensuring
                timely delivery, quality control, and alignment with business
                goals. I handle resource allocation, timeline planning, and risk
                management.
              </p>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

            <div className="p-8 relative z-10">
              <div className="w-16 h-16 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-800/50 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300">
                Developer Coordination
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Specialized in working with frontend developers to translate
                client requirements into technical specifications. I facilitate
                communication between stakeholders and development teams to
                ensure project success.
              </p>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

            <div className="p-8 relative z-10">
              <div className="w-16 h-16 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-800/50 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300">
                Strategic Planning
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Development of comprehensive project strategies that align with
                business objectives. I help clients define their digital vision
                and create roadmaps for successful implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
