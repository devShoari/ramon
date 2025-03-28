import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export type BackgroundType = "gradient" | "particles" | "image" | "waves";

interface BackgroundProps {
  type?: BackgroundType;
  imageUrl?: string;
  opacity?: number;
  color?: string;
}

export default function Background({
  type = "gradient",
  imageUrl = "/backgrounds/mountains.jpg",
  opacity = 0.7,
  color = "blue",
}: BackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Color theme mapping
  const colorMap = {
    blue: {
      primary: "from-blue-400/30 to-blue-600/30",
      secondary: "from-purple-400/20 to-indigo-400/20",
      accent: "from-cyan-400/20 to-teal-400/20",
    },
    purple: {
      primary: "from-purple-400/30 to-indigo-600/30",
      secondary: "from-pink-400/20 to-purple-400/20",
      accent: "from-indigo-400/20 to-blue-400/20",
    },
    green: {
      primary: "from-green-400/30 to-emerald-600/30",
      secondary: "from-teal-400/20 to-cyan-400/20",
      accent: "from-lime-400/20 to-green-400/20",
    },
    orange: {
      primary: "from-orange-400/30 to-amber-600/30",
      secondary: "from-yellow-400/20 to-orange-400/20",
      accent: "from-red-400/20 to-rose-400/20",
    },
    pink: {
      primary: "from-pink-400/30 to-rose-600/30",
      secondary: "from-purple-400/20 to-pink-400/20",
      accent: "from-rose-400/20 to-red-400/20",
    },
  };

  const selectedColor =
    colorMap[color as keyof typeof colorMap] || colorMap.blue;

  // Get wave colors based on the current theme
  const getWaveColors = () => {
    // Create wave colors with different opacities based on the theme
    const themeColorBase = `var(--theme-primary)`;
    if (themeColorBase === "var(--theme-primary)") {
      return {
        wave1: `rgba(var(--theme-primary-rgb), 0.2)`,
        wave2: `rgba(var(--theme-primary-rgb), 0.3)`,
        wave3: `rgba(var(--theme-primary-rgb), 0.4)`,
      };
    }
    return {
      wave1: `rgba(var(--theme-primary-rgb), 0.2)`,
      wave2: `rgba(var(--theme-primary-rgb), 0.3)`,
      wave3: `rgba(var(--theme-primary-rgb), 0.4)`,
    };
  };

  const waveColors = getWaveColors();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none h-screen w-full">
      {/* Image background */}
      {type === "image" && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt="Background"
            fill
            priority
            style={{ objectFit: "cover", opacity }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      {/* Gradient background */}
      {type === "gradient" && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div
            className={`absolute inset-0 bg-gradient-to-br ${selectedColor.primary} opacity-70`}
          ></div>

          <motion.div
            className={`absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r ${selectedColor.secondary} blur-3xl`}
            animate={{
              x: mousePosition.x - 300,
              y: mousePosition.y - 300,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 50,
              mass: 0.5,
            }}
          />

          <motion.div
            className={`absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br ${selectedColor.accent} blur-3xl`}
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className={`absolute top-2/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br ${selectedColor.secondary} blur-3xl`}
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
              scale: [1, 1.15, 1],
              rotate: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Particles background */}
      {type === "particles" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -Math.random() * 100],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5 + Math.random() * 10,
                  delay: Math.random() * 10,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Waves background */}
      {type === "waves" && (
        <>
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, #ffffff, rgba(var(--theme-primary-rgb), 0.08))`,
              }}
            >
              <div
                className="absolute bottom-0 left-0 w-full h-1/2"
                style={{
                  background: `linear-gradient(to top, rgba(var(--theme-primary-rgb), 0.12), transparent)`,
                }}
              ></div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ height: "30vh" }}
          >
            <motion.path
              fill={waveColors.wave1}
              fillOpacity="1"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,240C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill={waveColors.wave2}
              fillOpacity="1"
              d="M0,256L48,261.3C96,267,192,277,288,277.3C384,277,480,267,576,234.7C672,203,768,149,864,138.7C960,128,1056,160,1152,186.7C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,256L48,261.3C96,267,192,277,288,277.3C384,277,480,267,576,234.7C672,203,768,149,864,138.7C960,128,1056,160,1152,186.7C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,144C960,139,1056,181,1152,208C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,256L48,261.3C96,267,192,277,288,277.3C384,277,480,267,576,234.7C672,203,768,149,864,138.7C960,128,1056,160,1152,186.7C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill={waveColors.wave3}
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,256L48,250.7C96,245,192,235,288,224C384,213,480,203,576,202.7C672,203,768,213,864,229.3C960,245,1056,267,1152,266.7C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
              }}
            />
          </svg>
        </>
      )}
    </div>
  );
}
