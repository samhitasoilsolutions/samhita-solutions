import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactMap() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-apple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">{t.contactMap.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {t.contactMap.addresses.map((addr) => (
              <div
                key={addr.type}
                className="flex items-start gap-4 bg-card rounded-2xl p-6 shadow-[var(--shadow-sm)]"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{addr.type}</p>
                  <p className="font-medium text-foreground">{addr.address}</p>
                  <p className="text-muted-foreground text-sm">{addr.city}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-md)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.1998444051364!2d82.258066!3d17.0628747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382b003a5efd4b%3A0x564a051e687348d1!2sSamhita%20Soil%20Solutions!5e0!3m2!1sen!2sin!4v1770446424659!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Samhita Soil Solutions Location"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
