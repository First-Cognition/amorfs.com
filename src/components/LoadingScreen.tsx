"use client";

import { useRef, useEffect, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import logoAnimation from "../../public/logo_white.json";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  isLoading: boolean;
  translationsLoaded: boolean;
  onAnimationComplete?: () => void;
}

export default function LoadingScreen({ 
  isLoading, 
  translationsLoaded,
  onAnimationComplete 
}: LoadingScreenProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [shouldLoop, setShouldLoop] = useState(true);

  // When translations are loaded, stop looping and let the current animation finish
  useEffect(() => {
    if (translationsLoaded && shouldLoop) {
      setShouldLoop(false);
    }
  }, [translationsLoaded, shouldLoop]);

  const handleLoopComplete = () => {
    // If translations are loaded, this will be the last loop
    // onComplete will be called after this animation ends
    if (translationsLoaded) {
      setShouldLoop(false);
    }
  };

  const handleComplete = () => {
    // Animation finished its final run
    if (!shouldLoop && onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "#0f408f" }}
        >
          {/* Subtle gradient overlay for depth */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
            }}
          />

          {/* Lottie Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 w-40 h-40 md:w-56 md:h-56"
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={logoAnimation}
              loop={shouldLoop}
              autoplay={true}
              onLoopComplete={handleLoopComplete}
              onComplete={handleComplete}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Pulsing ring effect */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-white/20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
