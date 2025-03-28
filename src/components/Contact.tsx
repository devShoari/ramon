export default function Contact() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>
      <div className="absolute -left-32 top-1/4 w-64 h-64 bg-indigo-900 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-purple-900 rounded-full filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 bg-indigo-900/30 border border-indigo-700/50 rounded-full text-indigo-400 text-sm font-medium">
            Contact
          </span>
          <h2 className="text-4xl font-bold text-center text-gray-100 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-xl">
            <h3 className="text-2xl font-semibold mb-8 text-indigo-300">
              Let&apos;s Connect
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-4 shrink-0">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-1">
                    Phone
                  </h4>
                  <p className="text-gray-400">+1 365 336 4050</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-4 shrink-0">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:Omidiniamohammad@gmail.com"
                    className="text-gray-400 hover:text-indigo-400 transition duration-300"
                  >
                    Omidiniamohammad@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-4 shrink-0">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-1">
                    Location
                  </h4>
                  <p className="text-gray-400">Canada</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-4 shrink-0">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-1">
                    LinkedIn
                  </h4>
                  <a
                    href="https://www.linkedin.com/in/mohammad-omidinia-824a91310"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-400 transition duration-300"
                  >
                    Connect with me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
