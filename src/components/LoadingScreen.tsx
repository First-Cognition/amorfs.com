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
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

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
    // Animation finished its final run - trigger fade out
    if (!shouldLoop) {
      setShouldFadeOut(true);
      // Call onAnimationComplete after fade out animation
      setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 500); // Match the fade out duration
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

          {/* Lottie Animation - Scaled 2x and with fade out effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: shouldFadeOut ? 0 : 1 
            }}
            transition={{ 
              duration: shouldFadeOut ? 0.5 : 0.6, 
              ease: shouldFadeOut ? "easeIn" : "easeOut" 
            }}
            className="relative z-10 w-80 h-80 md:w-112 md:h-112"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
