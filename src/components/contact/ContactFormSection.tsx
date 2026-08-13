import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactDetails = [
  {
    icon: MapPin,
    value: "2-4626/21, Venkat Nagar, Kakinada - 533003",
    href: null,
    color: "text-red-500",
  },
  {
    icon: Phone,
    value: "+91 98485 49349",
    href: "tel:+919848549349",
    color: "text-primary",
  },
  {
    icon: Mail,
    value: "samhitasoilsolutions@gmail.com",
    href: "mailto:samhitasoilsolutions@gmail.com",
    color: "text-primary",
  },
];

export default function ContactFormSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f918b0ea-e589-4dd2-bbfd-b817f0c99506",
          subject: `New Contact Form Submission from ${result.data.firstName} ${result.data.lastName}`,
          from_name: `${result.data.firstName} ${result.data.lastName}`,
          email: result.data.email,
          phone: result.data.phone,
          message: result.data.message,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        toast({
          title: t.contactForm.toastSuccess,
          description: t.contactForm.toastSuccessDesc,
        });
      } else {
        toast({
          title: t.contactForm.toastError,
          description: t.contactForm.toastErrorDesc,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: t.contactForm.toastNetworkError,
        description: t.contactForm.toastNetworkErrorDesc,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="section-padding !pb-10 md:!pb-14 lg:!pb-[4.5rem] bg-background">
      <div className="container-apple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              {t.contactForm.badge}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {t.contactForm.title1}
              <br />
              {t.contactForm.title2}
            </h2>

            <p className="text-muted-foreground text-base mb-10 max-w-md">
              {t.contactForm.description}
            </p>

            <div className="space-y-4">
              {contactDetails.map((item) => (
                <div key={item.value} className="flex items-start gap-3">
                  <item.icon className={`w-5 h-5 mt-0.5 ${item.color} flex-shrink-0`} />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-foreground font-medium hover:text-primary transition-colors text-sm"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium text-sm">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/5 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.contactForm.thankYou}</h3>
                <p className="text-muted-foreground mb-6">
                  {t.contactForm.thankYouMessage}
                </p>
                <Button variant="outline" onClick={resetForm}>
                  {t.contactForm.sendAnother}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
                      {t.contactForm.firstName}
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t.contactForm.firstName}
                      className={`h-11 bg-background ${errors.firstName ? "border-destructive" : ""}`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1.5">
                      {t.contactForm.lastName}
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t.contactForm.lastName}
                      className={`h-11 bg-background ${errors.lastName ? "border-destructive" : ""}`}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                      {t.contactForm.phone}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.contactForm.phone}
                      className={`h-11 bg-background ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      {t.contactForm.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contactForm.email}
                      className={`h-11 bg-background ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    {t.contactForm.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contactForm.message}
                    rows={6}
                    className={`bg-background resize-none ${errors.message ? "border-destructive" : ""}`}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-full px-12 bg-foreground text-background hover:bg-foreground/90"
                >
                  {isSubmitting ? (
                    t.contactForm.sending
                  ) : (
                    <>
                      {t.contactForm.submit}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
