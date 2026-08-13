import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { socialLinks } from "@/lib/social";
import logo from "@/assets/logo.png";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-apple section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Samhita Soil Solutions logo" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-headline font-bold tracking-tight">
                  SAMHITA
                </span>
                <span className="text-body text-background/60">
                  Soil Solutions
                </span>
              </div>
            </div>
            <p className="text-body md:text-body-lg text-background/70 mb-6">
              {t.footer.brandDescription}
            </p>
            <p className="text-caption text-background/50 mb-6">
              {t.footer.since}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, Icon, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-85 ${bg}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-title font-semibold mb-6">{t.footer.companyTitle}</h4>
            <ul className="space-y-4">
              {t.footer.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-body text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-title font-semibold mb-6">{t.footer.productsTitle}</h4>
            <ul className="space-y-4">
              {t.footer.productsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-body text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-title font-semibold mb-6">{t.footer.contactTitle}</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:samhitasoilsolutions@gmail.com"
                  className="flex items-start gap-3 text-body text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>samhitasoilsolutions@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919848549349"
                  className="flex items-start gap-3 text-body text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>+91 98485 49349</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-body text-background/70">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{t.footer.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-caption text-background/50">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
            <div className="flex items-center gap-6">
              <span className="text-caption text-background/50">
                {t.footer.cibrc}
              </span>
              <span className="text-caption text-background/50">
                {t.footer.madeInIndia}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
