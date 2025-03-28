export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>
      <div className="absolute -left-32 top-1/4 w-64 h-64 bg-indigo-900 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-purple-900 rounded-full filter blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 bg-indigo-900/30 border border-indigo-700/50 rounded-full text-indigo-400 text-sm font-medium">
            About Me
          </span>
          <h2 className="text-4xl font-bold text-center text-gray-100 mb-4">
            My Background & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-indigo-300">
                Professional Journey
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I&apos;m a dedicated project manager based in Canada with extensive
              experience in web development projects. My approach combines
              technical understanding with strong communication skills to ensure
              projects are delivered on time and exceed client expectations.
            </p>
            <p className="text-gray-300 leading-relaxed">
              With years of experience in the digital industry, I&apos;ve
              successfully managed numerous web development projects from
              conception to completion. I specialize in coordinating with
              frontend developers to create seamless, user-friendly websites
              that align with business objectives.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-indigo-300">
                Skills & Expertise
              </h3>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Project Management Professional (PMP) certification
              </li>
              <li className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Bachelor&apos;s degree in Computer Science
              </li>
              <li className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Agile and Scrum methodologies expert
              </li>
              <li className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Web development workflow optimization
              </li>
              <li className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Strong technical communication skills
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              When I&apos;m not managing projects, I enjoy exploring Canada&apos;s
              beautiful landscapes, staying updated with the latest web
              technologies, and contributing to the tech community through
              mentorship and knowledge sharing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
