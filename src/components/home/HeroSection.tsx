import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, FlaskConical, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import heroVideo from "@/assets/hero-video.mp4";
import heroBg from "@/assets/hero-bg.jpg";
import heroBgAvif from "@/assets/hero-bg.avif";
import heroBgWebp from "@/assets/hero-bg.webp";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoSrc(heroVideo);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  const trustBadges = [
    { icon: Shield, label: t.hero.badgeCibrc },
    { icon: FlaskConical, label: t.hero.badgeCapacity },
    { icon: Award, label: t.hero.badgeEst },
  ];

  return (
    <section data-section="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={heroBgAvif} type="image/avif" />
          <source srcSet={heroBgWebp} type="image/webp" />
          <img
            src={heroBg}
            alt="Lush green agricultural field"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
          />
        </picture>
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/60" />
      </div>

      {/* Spacer for header */}
      <div className="pt-24 md:pt-28" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-end pb-4">
        <div className="container-apple w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Mobile Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:hidden"
            >
              <h1 className="font-heading text-[3.5rem] text-white leading-[1.1] mb-4">
                {t.hero.headlineMobile}
              </h1>
              {/* Trust Badge Bar - Mobile */}
              <div className="flex flex-wrap gap-2 mt-4">
                {trustBadges.map((badge, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-caption font-medium">
                    <badge.icon className="w-3.5 h-3.5" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <p className="text-body-lg md:text-headline text-white/90 mb-3 max-w-lg font-medium">
                {t.hero.manufacturerLine}
              </p>
              <p className="text-body md:text-body-lg text-white/60 mb-8 max-w-lg">
                {t.hero.subtitleLine2}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-white text-foreground hover:bg-white/90 rounded-full px-6">
                  <Link to="/products">
                    {t.hero.exploreProducts}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/60 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm rounded-full px-6">
                  <Link to="/contact">
                    {t.hero.becomeDistributor}
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Content - Large Headline (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-right hidden lg:block"
            >
              <h1 className="font-heading text-[3.5rem] text-white leading-[1.1]">
                {t.hero.headlineDesktop1}
                <br />
                {t.hero.headlineDesktop2}
                <br />
                <span className="text-white/80">{t.hero.headlineDesktop3}</span>
                <br />
                <span className="text-white/80">{t.hero.headlineDesktop4}</span>
              </h1>
              {/* Trust Badge Bar - Desktop */}
              <div className="flex flex-wrap gap-3 justify-end mt-6">
                {trustBadges.map((badge, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-caption font-medium">
                    <badge.icon className="w-3.5 h-3.5" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 pb-8"
      >
        <div className="container-apple">
          {/* Location Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-caption pt-8">
            <span>{t.hero.location}</span>
            <span>{t.hero.tagline}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
