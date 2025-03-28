"use client";
import { useEffect, useRef } from "react";

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contactRef.current) return;

      const cards = contactRef.current.querySelectorAll(".contact-card");
      cards.forEach((card: Element) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>

      {/* Animated background elements */}
      <div className="absolute -left-32 top-1/4 w-64 h-64 bg-indigo-900 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div
        className="absolute -right-32 bottom-1/4 w-64 h-64 bg-purple-900 rounded-full filter blur-3xl opacity-10 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute left-1/2 top-1/3 w-48 h-48 bg-blue-900 rounded-full filter blur-3xl opacity-5 animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF6_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF6_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={contactRef}>
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 bg-indigo-900/30 border border-indigo-700/50 rounded-full text-indigo-400 text-sm font-medium tracking-wide">
            Contact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 max-w-3xl mx-auto">
          <div className="contact-card relative bg-gray-900/30 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-gray-800 shadow-xl group transition-all duration-300 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-indigo-500/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 before:blur-xl">
            {/* Glow effect */}

            {/* Interactive light effect */}
            <div
              className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 z-0"
              style={{
                background:
                  "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15), transparent 80%)",
              }}
            ></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-8 text-indigo-300 flex items-center">
                <span className="mr-2">Let&apos;s Connect</span>
                <div className="h-px flex-grow bg-gradient-to-r from-indigo-500 to-transparent opacity-30 ml-4"></div>
              </h3>

              <div className="space-y-8">
                <div className="flex items-start group/item">
                  <div className="w-14 h-14 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-5 shrink-0 shadow-md duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-400 group-hover/item:text-indigo-300 transition-colors duration-300"
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
                    <h4 className="text-lg font-medium text-gray-200 mb-1 group-hover/item:text-white transition-colors duration-300">
                      Phone
                    </h4>
                    <p className="text-gray-400 group-hover/item:text-indigo-300 transition-colors duration-300">
                      +1 365 336 4050
                    </p>
                  </div>
                </div>

                <div className="flex items-start group/item">
                  <div className="w-14 h-14 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-5 shrink-0 shadow-md group-hover/item:shadow-indigo-500/20 group-hover/item:bg-indigo-800/50 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-400 group-hover/item:text-indigo-300 transition-colors duration-300"
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
                    <h4 className="text-lg font-medium text-gray-200 mb-1 group-hover/item:text-white transition-colors duration-300">
                      Email
                    </h4>
                    <a
                      href="mailto:Omidiniamohammad@gmail.com"
                      className="text-gray-400 hover:text-indigo-400 transition duration-300 inline-flex items-center group-hover/item:text-indigo-300"
                    >
                      Omidiniamohammad@gmail.com
                      <svg
                        className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="flex items-start group/item">
                  <div className="w-14 h-14 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-5 shrink-0 shadow-md group-hover/item:shadow-indigo-500/20 group-hover/item:bg-indigo-800/50 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-400 group-hover/item:text-indigo-300 transition-colors duration-300"
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
                    <h4 className="text-lg font-medium text-gray-200 mb-1 group-hover/item:text-white transition-colors duration-300">
                      Location
                    </h4>
                    <p className="text-gray-400 group-hover/item:text-indigo-300 transition-colors duration-300">
                      Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start group/item">
                  <div className="w-14 h-14 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-5 shrink-0 shadow-md group-hover/item:shadow-indigo-500/20 group-hover/item:bg-indigo-800/50 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-400 group-hover/item:text-indigo-300 transition-colors duration-300"
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
                    <h4 className="text-lg font-medium text-gray-200 mb-1 group-hover/item:text-white transition-colors duration-300">
                      LinkedIn
                    </h4>
                    <a
                      href="https://www.linkedin.com/in/mohammad-omidinia-824a91310"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition duration-300 inline-flex items-center group-hover/item:text-indigo-300"
                    >
                      Connect with me
                      <svg
                        className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
