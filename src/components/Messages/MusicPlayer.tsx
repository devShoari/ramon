import { motion, AnimatePresence } from "framer-motion";

interface MusicProps {
  title: string;
  artist: string;
  coverUrl: string;
}

interface MusicPlayerProps {
  music: MusicProps;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const MusicPlayer = ({ music, isPlaying, onTogglePlay }: MusicPlayerProps) => {
  return (
    <motion.div 
      className="mb-4 bg-[var(--light-pink)]/10 rounded-lg p-3 border border-[var(--light-pink)]/30 relative"
      whileHover={{ y: -2 }}
    >
      <div className="absolute -top-2 -right-2">
        <motion.button
          onClick={onTogglePlay}
          className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center ${
            isPlaying ? 'bg-[var(--pink)] text-white' : 'bg-white text-[var(--pink)] border border-[var(--light-pink)]'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </motion.button>
      </div>
      
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm mr-3 flex-shrink-0">
          <img 
            src={music.coverUrl} 
            alt={`${music.title} cover`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/100x100/FFF5F8/FF6B95?text=♫";
            }}
          />
        </div>
        
        <div className="flex-grow">
          <div className="text-xs font-medium text-[var(--pink)]">{music.title}</div>
          <div className="text-xs text-gray-500">{music.artist}</div>
        </div>
        
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              className="flex items-center space-x-1"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
            >
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  className="w-1 h-4 bg-[var(--pink)] rounded-full"
                  animate={{ 
                    height: [3, 6, 9, 6, 3],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-2 flex justify-center">
        <div className="text-[10px] text-gray-400 flex items-center">
          <span className="mr-1">♫</span> This message has a soundtrack
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer; 