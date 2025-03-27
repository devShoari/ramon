"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    // Set active link based on current path
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname);
    }

    // Add scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/messages", label: "Browse Messages", icon: "💌" },
    { href: "/create", label: "Write a Note", icon: "✏️" },
    { href: "/timed", label: "Timed Messages", icon: "⏰" },
    { href: "/memories", label: "Shared Memories", icon: "💭" },
  ];

  return (
    <motion.header
      className={`py-3 px-6 md:px-12 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-gradient-to-r from-[var(--light-pink)]/80 to-[var(--light-pink)]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="relative group">
          <motion.div
            className="absolute -inset-2 rounded-lg bg-[var(--light-pink)]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.05 }}
          />
          <div className="relative flex items-center">
            <span className="text-2xl font-bold text-[var(--foreground)]">
              Ramo<span className="text-[var(--pink)]">note</span>
            </span>
            <motion.span
              className="ml-1 text-xl"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
            >
              💝
            </motion.span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              isActive={activeLink === link.href}
            />
          ))}

          <motion.button
            className="ml-4 px-4 py-2 bg-[var(--pink)] text-white rounded-full shadow-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-1">✨</span>
            <span>Login</span>
          </motion.button>
        </div>

        <motion.button
          className="md:hidden text-[var(--foreground)] relative z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative w-6 h-6">
            <motion.span
              className="absolute top-2 right-0 w-6 h-0.5 bg-current rounded-full"
              animate={{
                top: isMenuOpen ? "50%" : "30%",
                rotate: isMenuOpen ? 45 : 0,
                translateY: isMenuOpen ? "-50%" : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-3 right-0 w-6 h-0.5 bg-current rounded-full"
              animate={{
                width: isMenuOpen ? "100%" : "75%",
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-4 right-0 w-6 h-0.5 bg-current rounded-full"
              animate={{
                top: isMenuOpen ? "50%" : "70%",
                rotate: isMenuOpen ? -45 : 0,
                translateY: isMenuOpen ? "-50%" : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 rounded-xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md p-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    isActive={activeLink === link.href}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}

                <div className="pt-4 mt-4 border-t border-[var(--light-pink)]">
                  <motion.button
                    className="w-full py-3 bg-[var(--pink)] text-white rounded-full shadow-sm flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-1">✨</span>
                    <span>Login</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Desktop Navigation Link
interface NavLinkProps {
  href: string;
  label: string;
  icon: string;
  isActive: boolean;
}

const NavLink = ({ href, label, icon, isActive }: NavLinkProps) => (
  <Link href={href} className="relative">
    <motion.div
      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
        isActive
          ? "text-[var(--pink)]"
          : "text-gray-700 hover:text-[var(--pink)]"
      }`}
      whileHover={{ y: -2 }}
    >
      <span className="mr-1.5">{icon}</span>
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-[var(--pink)] rounded-full"
          layoutId="activeIndicator"
          initial={{ x: "-50%" }}
          animate={{ x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  </Link>
);

// Mobile Navigation Link
interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({
  href,
  label,
  icon,
  isActive,
  onClick,
}: MobileNavLinkProps) => (
  <Link href={href} onClick={onClick}>
    <motion.div
      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
        isActive
          ? "bg-[var(--light-pink)]/30 text-[var(--pink)]"
          : "text-gray-700 hover:bg-[var(--light-pink)]/10 hover:text-[var(--pink)]"
      }`}
      whileHover={{ x: 4 }}
    >
      <span className="mr-3 text-lg">{icon}</span>
      {label}
      {isActive && (
        <motion.div
          className="ml-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="text-[var(--pink)]">•</span>
        </motion.div>
      )}
    </motion.div>
  </Link>
);
