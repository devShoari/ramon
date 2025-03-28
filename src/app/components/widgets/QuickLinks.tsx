import { motion } from "framer-motion";

export default function QuickLinks() {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden"
  >
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-green-300/20 to-blue-300/20 rounded-full -mr-20 -mb-20 blur-2xl"></div>
    <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      Quick Links
    </h2>
    <div className="grid grid-cols-3 gap-3">
      {[
        { name: 'Google', icon: 'G', color: 'from-blue-400 to-blue-500', url: 'https://google.com' },
        { name: 'YouTube', icon: 'Y', color: 'from-red-400 to-red-500', url: 'https://youtube.com' },
        { name: 'Gmail', icon: 'M', color: 'from-yellow-400 to-red-400', url: 'https://gmail.com' },
        { name: 'Drive', icon: 'D', color: 'from-green-400 to-green-500', url: 'https://drive.google.com' },
        { name: 'Maps', icon: 'M', color: 'from-green-400 to-blue-500', url: 'https://maps.google.com' },
        { name: 'Photos', icon: 'P', color: 'from-red-400 to-yellow-400', url: 'https://photos.google.com' },
      ].map((site, index) => (
        <motion.a
          key={index}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3 bg-white/70 rounded-xl hover:bg-white/90 transition shadow-sm hover:shadow group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${site.color} flex items-center justify-center text-white mb-2 shadow-sm group-hover:shadow`}
            whileHover={{ y: -2 }}
          >
            {site.icon}
          </motion.div>
          <span className="text-sm text-gray-700">{site.name}</span>
        </motion.a>
      ))}
    </div>
  </motion.div>
  );
}



