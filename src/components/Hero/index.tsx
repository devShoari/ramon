"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Auto-rotate through tabs
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const tabContent = [
    {
      emoji: "💌",
      title: "Express Yourself",
      description: "Write the words you never had a chance to say",
    },
    {
      emoji: "🤗",
      title: "Find Closure",
      description: "Release emotions and move forward with peace",
    },
    {
      emoji: "✨",
      title: "Connect & Relate",
      description: "Discover others who share similar experiences",
    },
  ];

  // Reduced number of floating elements and adjusted positioning
  const floatingElements = Array(10)
    .fill(0)
    .map((_, i) => ({
      id: i,
      icon: ["💌", "💭", "✨", "💗", "🌸", "🕊️", "💫"][i % 7],
      size: Math.random() * 15 + 10, // Slightly smaller size range
      left: `${Math.random() * 90 + 5}%`, // Keep away from extreme edges
      top: `${Math.random() * 90 + 5}%`, // Keep away from extreme edges
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));

  return (
    <section className="mb-10 px-4 relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5F8]">
      {/* Animated floating elements - reduced opacity */}
      {mounted &&
        floatingElements.map((elem) => (
          <motion.div
            key={elem.id}
            className="absolute pointer-events-none opacity-15 z-0"
            style={{
              left: elem.left,
              top: elem.top,
              fontSize: `${elem.size}px`,
            }}
            animate={{
              y: [0, -20, 0], // Reduced movement range
              rotate: [0, 5, -5, 0], // Reduced rotation
            }}
            transition={{
              duration: elem.duration,
              repeat: Infinity,
              delay: elem.delay,
              ease: "easeInOut",
            }}
          >
            {elem.icon}
          </motion.div>
        ))}

      {/* Main content */}
      <div className="  mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-left relative z-10">
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-block px-4 py-1 bg-[var(--light-pink)] text-[var(--pink)] rounded-full text-sm font-medium mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  ✨ Your unsent messages matter
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="relative inline-block">
                    <span className="relative z-10">Share the words</span>
                    <motion.span
                      className="absolute bottom-2 left-0 w-full h-3 bg-[var(--light-pink)] rounded-full z-0"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </span>
                  <br />
                  <span className="text-[var(--pink)]">your heart holds</span>
                </h1>

                <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed max-w-lg">
                  A sanctuary for the messages you never sent, the feelings you
                  never expressed, and the closure you&apos;re seeking. Join our
                  community of healing hearts.
                </p>

                {/* Interactive tabs - redesigned */}
                <div className="mb-8">
                  <div className="inline-flex p-1 bg-[var(--light-pink)]/30 rounded-xl mb-5">
                    {tabContent.map((tab, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                          activeTab === index
                            ? "text-[var(--pink)]"
                            : "text-gray-500 hover:text-[var(--pink)]"
                        }`}
                        whileHover={{ scale: activeTab === index ? 1 : 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {activeTab === index && (
                          <motion.div
                            className="absolute inset-0 bg-white rounded-lg shadow-md"
                            layoutId="activeTabBackground"
                            transition={{ type: "spring", duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center justify-center">
                          <span className="text-lg mr-2">{tab.emoji}</span>
                          {tab.title}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="relative">
                    {tabContent.map((tab, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md border border-[var(--light-pink)] relative"
                        initial={{ opacity: 0, y: 20, position: "absolute" }}
                        animate={{
                          opacity: activeTab === index ? 1 : 0,
                          y: activeTab === index ? 0 : 20,
                          position:
                            activeTab === index ? "relative" : "absolute",
                          zIndex: activeTab === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="absolute -top-2 -right-2 bg-[var(--pink)]/10 w-12 h-12 rounded-full flex items-center justify-center">
                          <span className="text-2xl">{tab.emoji}</span>
                        </div>
                        <h3 className="font-bold text-xl text-[var(--pink)] mb-3">
                          {tab.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {tab.description}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <motion.button
                            className="text-sm text-[var(--pink)] font-medium flex items-center"
                            whileHover={{ x: 3 }}
                          >
                            Learn more
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/create">
                    <motion.button
                      className="relative overflow-hidden px-8 py-4 rounded-full bg-[var(--pink)] text-white font-medium shadow-lg flex items-center gap-2 group"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onHoverStart={() => setHoverButton(true)}
                      onHoverEnd={() => setHoverButton(false)}
                    >
                      <motion.span
                        animate={hoverButton ? { x: [-2, 2, -2] } : {}}
                        transition={{ repeat: Infinity, duration: 0.3 }}
                      >
                        Write Your Message
                      </motion.span>
                    </motion.button>
                  </Link>

                  <Link href="/browse">
                    <motion.button
                      className="px-8 py-4 rounded-full border-2 border-[var(--pink)] text-[var(--pink)] font-medium hover:bg-[var(--light-pink)] transition-colors flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      Browse Messages
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </motion.button>
                  </Link>
                </div>

                {/* Social proof */}
                <motion.div
                  className="mt-10 flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className="flex -space-x-3">
                    {[
                      { bg: "bg-blue-100", emoji: "👩" },
                      { bg: "bg-green-100", emoji: "👨" },
                      { bg: "bg-yellow-100", emoji: "👧" },
                      { bg: "bg-purple-100", emoji: "👦" },
                      { bg: "bg-pink-100", emoji: "👵" },
                    ].map((avatar, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full ${avatar.bg} flex items-center justify-center text-sm border-2 border-white`}
                      >
                        {avatar.emoji}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--pink)]">
                      10,000+ messages shared
                    </div>
                    <div className="text-sm text-gray-500">
                      Join our growing community today
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Right column - Visual content */}
          <div className="relative md:h-[550px] flex items-center justify-center">
            {mounted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10 w-full max-w-md"
              >
                {/* Main card - enhanced with better styling */}
                <motion.div
                  className="relative bg-white p-6 rounded-2xl shadow-xl border-2 border-[var(--light-pink)] md:ml-8 md:mt-8 overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute -top-3 -right-3 bg-[var(--pink)] text-white text-xs px-3 py-1 rounded-full shadow-md">
                    Featured Message
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-[var(--light-pink)]/20"></div>
                  <div className="absolute right-20 bottom-20 w-4 h-4 rounded-full bg-[var(--pink)]/20"></div>

                  <div className="mb-4 text-sm text-gray-500 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs mr-2">
                      👩
                    </span>
                    Dear Mom,
                  </div>

                  <p className="text-gray-700 mb-6 italic relative z-10 bg-white/80 p-3 rounded-lg border-l-2 border-[var(--pink)]">
                    &quot;I never told you how much your strength inspired me.
                    Through all the hardships, you never gave up. I wish I had
                    said thank you more often. Your love shaped who I am
                    today.&quot;
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <motion.span
                        className="text-xs bg-[var(--light-pink)] px-2 py-1 rounded-full flex items-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="mr-1 text-[8px]">🏷️</span> #gratitude
                      </motion.span>
                      <motion.span
                        className="text-xs bg-[var(--light-pink)] px-2 py-1 rounded-full flex items-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="mr-1 text-[8px]">🏷️</span> #family
                      </motion.span>
                    </div>
                    <motion.div
                      className="text-[var(--pink)] flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        ❤️
                      </motion.span>
                      <span className="ml-1">247</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Testimonial card - improved styling and positioning */}
                <motion.div
                  className="absolute -bottom-16 -left-10 md:-left-16 p-5 rounded-xl shadow-lg border-2 border-[var(--light-pink)] w-60 backdrop-blur-sm bg-white/95 z-20"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -1, 0, 1, 0],
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute -top-3 -right-3 bg-[var(--pink)] text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center">
                    <span className="w-3 h-3 bg-white rounded-full mr-1 animate-pulse"></span>
                    Testimonial
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-lg shadow-inner border-2 border-white">
                      💭
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--pink)]">
                        Finding Peace
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <span className="mr-1">Sarah, 28</span>
                        <span className="bg-green-100 text-green-800 text-[10px] px-1 rounded-full">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 italic bg-[var(--light-pink)]/20 p-3 rounded-lg border-l-2 border-[var(--pink)]">
                    &quot;Writing here helped me find closure after 5 years of
                    holding onto unsaid words. Thank you!&quot;
                  </div>
                  <div className="flex justify-between mt-2 items-center">
                    <div className="text-[10px] text-gray-500">
                      Posted 2 days ago
                    </div>
                    <div className="flex">
                      {["⭐️", "⭐️", "⭐️", "⭐️", "⭐️"].map((star, i) => (
                        <motion.span
                          key={i}
                          className="text-xs"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {star}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Stats card - improved with animations and better styling */}
                <motion.div
                  className="absolute -top-10 md:-top-16 right-0 md:-right-10 bg-white p-5 rounded-xl shadow-lg border-2 border-[var(--light-pink)] w-64 backdrop-blur-sm bg-white/95 z-20"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, 1, 0, -1, 0],
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-bold text-[var(--pink)] flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
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
                      Message Stats
                    </div>
                    <div className="text-xs bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <span className="animate-pulse relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      Live
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.div
                      className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <div className="font-medium flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                          Today:
                        </div>
                        <div className="font-bold text-[var(--pink)]">
                          +124 messages
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="bg-[var(--pink)] h-1.5 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "65%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        ></motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <div className="font-medium flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-1"></span>
                          This week:
                        </div>
                        <div className="font-bold text-[var(--pink)]">
                          +1,893 messages
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="bg-[var(--pink)] h-1.5 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.7 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="mt-3 text-center bg-[var(--light-pink)]/30 p-2 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="text-xs text-[var(--pink)] font-medium">
                      Join our growing community today!
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
