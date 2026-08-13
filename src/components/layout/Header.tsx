import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { socialLinks } from "@/lib/social";
import logo from "@/assets/logo.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.header.home },
    { href: "/about", label: t.header.about },
    { href: "/products", label: t.header.products },
    { href: "/blog", label: t.header.blog },
    { href: "/contact", label: t.header.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Pages with light hero backgrounds need dark header text when unscrolled
  const lightHeroPages = ["/about", "/blog"];
  const isLightHero = lightHeroPages.includes(location.pathname);
  const useDarkText = isScrolled || isMobileMenuOpen || isLightHero;

  const headerClasses = isMobileMenuOpen
    ? "bg-background shadow-apple-md py-3"
    : isScrolled
      ? "glass shadow-apple-md py-3"
      : "bg-transparent py-5";

  const LanguageToggle = ({ className = "" }: { className?: string }) => (
    <div
      className={`inline-flex rounded-full border p-0.5 text-caption font-medium transition-colors duration-300 ${
        useDarkText
          ? "bg-muted border-border"
          : "bg-white/15 border-white/30"
      } ${className}`}
    >
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          lang === "en"
            ? useDarkText
              ? "bg-primary text-primary-foreground"
              : "bg-white/25 text-white"
            : useDarkText
              ? "text-muted-foreground hover:text-foreground"
              : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("te")}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          lang === "te"
            ? useDarkText
              ? "bg-primary text-primary-foreground"
              : "bg-white/25 text-white"
            : useDarkText
              ? "text-muted-foreground hover:text-foreground"
              : "text-white/70 hover:text-white"
        }`}
      >
        తె
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
    >
      <nav className="container-apple flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Samhita Soil Solutions logo" className="w-9 h-9 object-contain" />
          <div className="flex flex-col">
            <span className={`text-title font-bold tracking-tight transition-colors duration-300 ${useDarkText ? "text-gradient" : "text-white"}`}>
              SAMHITA
            </span>
            <span className={`text-caption -mt-1 transition-colors duration-300 ${useDarkText ? "text-muted-foreground" : "text-white/70"}`}>
              Soil Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            const textColor = useDarkText
              ? "text-foreground/70"
              : "text-white/80";

            return (
              <Link
                key={link.href}
                to={link.href}
                className="group relative overflow-hidden h-[1.5em] text-body font-medium"
              >
                {/* Default text - scrolls up on hover */}
                <span
                  className={`block transition-transform duration-300 ease-out ${
                    isActive ? "-translate-y-full" : "group-hover:-translate-y-full"
                  } ${isActive ? textColor : textColor}`}
                >
                  {link.label}
                </span>
                {/* Underlined text - revealed from below */}
                <span
                  className={`absolute left-0 top-full block transition-transform duration-300 ease-out underline underline-offset-4 decoration-2 ${
                    isActive ? "-translate-y-full" : "group-hover:-translate-y-full"
                  } ${
                    useDarkText
                      ? "text-primary decoration-primary"
                      : "text-white decoration-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Language Toggle + CTA Button + Social Links */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Button
            size="sm"
            asChild
            className={`transition-all duration-300 ${
              useDarkText
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-apple-sm hover:shadow-apple-md"
                : "bg-white/15 text-white border border-white/30 backdrop-blur-sm hover:bg-white/25"
            }`}
          >
            <Link to="/contact">{t.header.getInTouch}</Link>
          </Button>
          <div className="flex items-center gap-1">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  useDarkText
                    ? "text-foreground/70 hover:text-primary hover:bg-secondary"
                    : "text-white/80 hover:text-white hover:bg-white/15"
                }`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile: Language Toggle + Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <button
            className={`p-2 -mr-2 transition-colors duration-300 ${useDarkText ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - grows from header */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden"
          >
            <nav className="flex flex-col items-center gap-0 pb-6 pt-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2.5 px-6 text-body-lg font-medium text-center transition-colors ${
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.2 }}
                className="mt-4 flex flex-col items-center gap-4"
              >
                <Button variant="default" size="sm" className="rounded-full px-6 text-primary-foreground" asChild>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.header.getInTouch}
                  </Link>
                </Button>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ href, label, Icon, bg }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-85 ${bg}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
