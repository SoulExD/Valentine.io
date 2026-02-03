import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars } from 'lucide-react';
import { Sparkles } from './components/Sparkles';

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noBtnVisible, setNoBtnVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#db2777', '#fbcfe8', '#ffffff'] // Pink palette
    });

    // Continuous confetti for a moment
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#db2777']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#db2777']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleNoInteraction = () => {
    setNoBtnVisible(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-white flex items-center justify-center p-4 overflow-hidden relative selection:bg-pink-200">
      <Sparkles />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 text-pink-300 opacity-50"
        >
          <Heart size={48} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-20 text-pink-300 opacity-50"
        >
          <Heart size={64} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-10 text-pink-200"
        >
          <Stars size={32} />
        </motion.div>
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!yesPressed ? (
            <motion.div
              key="question"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-8 text-center flex flex-col items-center gap-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 bg-pink-400 blur-xl opacity-30 rounded-full animate-pulse-slow"></div>
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40dnE5Y2tkbHV4YjI5ZnA1eG54ZCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/iCVzZwwE6QNAV2tEE0/giphy.gif"
                  alt="Cute Bear"
                  className="w-48 h-48 object-contain relative z-10"
                />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-handwriting text-pink-600 font-bold drop-shadow-sm">
                Will you be my Valentine?
              </h1>

              <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full min-h-[100px]">
                <button
                  onClick={handleYesClick}
                  className="btn-primary w-full md:w-auto text-xl group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Yes <Heart className="w-5 h-5 group-hover:fill-current transition-colors" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>

                <AnimatePresence>
                  {noBtnVisible && (
                    <motion.button
                      key="no-btn"
                      initial={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, rotate: 20 }}
                      onHoverStart={handleNoInteraction}
                      onClick={handleNoInteraction}
                      className="btn-secondary w-full md:w-auto text-xl"
                    >
                      No
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel p-10 text-center flex flex-col items-center gap-6"
            >
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 10 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmo3c3l5ODh3ZGN6NHh6M2p8anF6OClpM3p4Z3J0aXpmeW52bSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/26FLdmIp6wJr91JAI/giphy.gif"
                  alt="Happy Cat"
                  className="w-48 h-48 object-contain"
                />
              </motion.div>

              <h1 className="text-5xl font-handwriting text-pink-600 font-bold">
                Yayyy! I knew it! 💖
              </h1>

              <p className="text-gray-600 text-lg">
                See you on the date! ✨
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-sm text-pink-400 hover:text-pink-600 underline decoration-pink-300"
              >
                Let me say yes again!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 text-pink-400 text-sm font-light">
        Made with 💖 for you
      </div>
    </div>
  );
}

export default App;
