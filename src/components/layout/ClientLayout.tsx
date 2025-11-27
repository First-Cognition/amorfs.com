"use client";

import { useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LoadingScreen from "@/components/LoadingScreen";
import { motion, AnimatePresence } from "motion/react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { isLoaded, translationsLoaded, setAnimationComplete } = useLanguage();

  const handleAnimationComplete = useCallback(() => {
    setAnimationComplete(true);
  }, [setAnimationComplete]);

  return (
    <>
      <LoadingScreen 
        isLoading={!isLoaded} 
        translationsLoaded={translationsLoaded}
        onAnimationComplete={handleAnimationComplete}
      />
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
