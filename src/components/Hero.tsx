import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn">
          <div className="inline-block px-3 py-1 mb-6 bg-indigo-900/30 border border-indigo-700/50 rounded-full">
            <span className="text-indigo-400 text-sm font-medium">
              Project Manager & Digital Strategist
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-100 leading-tight">
            Mohammad{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Omidinia
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
            Turning Vision into Reality
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            Specialized in collaborating with frontend developers to deliver
            exceptional web experiences. I bridge the gap between vision and
            execution to create successful digital products.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="group relative px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-indigo-500/25 hover:shadow-xl"
            >
              <span className="relative z-10">Contact Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <Link
              href="#about"
              className="group relative px-8 py-4 overflow-hidden rounded-lg bg-transparent border border-indigo-600 text-indigo-400 font-medium transition-all duration-300 hover:text-white"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/50 to-indigo-900/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center animate-float">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-indigo-900 shadow-2xl shadow-indigo-900/30">
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center text-indigo-300">
                <span className="text-xl">Mohammad Omidinia</span>
                {/* Uncomment and use when you have an image */}
                <Image 
                  src="/omidinia.jpg" 
                  alt="Mohammad Omidinia" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full opacity-50 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </section>
  );
}
