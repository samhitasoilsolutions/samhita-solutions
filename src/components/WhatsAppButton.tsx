import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SECTION_KEYS = [
  "hero", "statsBar", "sustainability", "pmPranam", "cultivation",
  "whyChooseUs", "founder", "cta", "products", "about", "contact",
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

function StreamingText({ text }: { text: string }) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    setDisplayCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayCount(i);
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <>{text.slice(0, displayCount)}</>;
}

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const visibleSections = useRef(new Map<string, number>());
  const phoneNumber = "919848549349";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.whatsapp.message)}`;

  // Detect scroll start
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is most visible
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = entry.target.getAttribute("data-section");
          if (!key) continue;
          if (entry.isIntersecting) {
            visibleSections.current.set(key, entry.intersectionRatio);
          } else {
            visibleSections.current.delete(key);
          }
        }
        let best: string | null = null;
        let bestRatio = 0;
        visibleSections.current.forEach((ratio, key) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = key;
          }
        });
        if (best && SECTION_KEYS.includes(best as SectionKey)) {
          setActiveSection(best as SectionKey);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ctaCopy = t.whatsapp.sectionCta[activeSection] || t.whatsapp.tooltip;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* CTA pill - grows from center as text streams */}
      <AnimatePresence>
        {hasScrolled && (
          <motion.a
            key="cta-pill"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ originX: 0.5 }}
            className="bg-foreground rounded-full shadow-lg overflow-hidden"
          >
            <span className="block text-background text-caption font-medium whitespace-nowrap px-5 py-3 text-center">
              <StreamingText text={ctaCopy} />
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* WhatsApp bubble - always round */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shrink-0"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white relative z-10" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      </motion.a>
    </div>
  );
}
