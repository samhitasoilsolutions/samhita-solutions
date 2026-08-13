import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import contactBg from "@/assets/contact-bg.jpg";
import contactBgAvif from "@/assets/contact-bg.avif";
import contactBgWebp from "@/assets/contact-bg.webp";

export default function ContactHero() {
  const { t } = useLanguage();

  return (
    <section data-section="contact" className="relative h-[520px] pt-20 flex items-end justify-start overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={contactBgAvif} type="image/avif" />
          <source srcSet={contactBgWebp} type="image/webp" />
          <img
            src={contactBg}
            alt="Agricultural landscape"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-apple pb-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-caption font-medium mb-5">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            {t.contactHero.badge}
          </span>

          <h1 className="font-heading text-display-lg lg:text-display-xl text-white leading-[1.1] mb-4">
            {t.contactHero.title1}
            <br />
            {t.contactHero.title2}
          </h1>

          <p className="text-body-lg text-white/70 max-w-md">
            {t.contactHero.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
