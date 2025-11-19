/**
 * Utility function to get the appropriate font family based on language
 * For Vietnamese, always use Prompt font which supports Vietnamese characters
 * For other languages, use the specified default font
 */
export function getFontFamily(
  language: "en" | "vi",
  defaultFont: "michroma" | "manrope" | "inter" | "prompt" = "manrope"
): string {
  // Always use Prompt font for Vietnamese text
  if (language === "vi") {
    return "var(--font-prompt)";
  }
  
  // For other languages, use the specified default font
  const fontMap: Record<string, string> = {
    michroma: "var(--font-michroma)",
    manrope: "var(--font-manrope)",
    inter: "var(--font-inter)",
    prompt: "var(--font-prompt)",
  };
  
  return fontMap[defaultFont] || fontMap.manrope;
}

