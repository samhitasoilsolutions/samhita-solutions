import { Instagram, Facebook, Youtube, type LucideIcon } from "lucide-react";

export interface SocialLink {
  href: string;
  label: string;
  Icon: LucideIcon;
  bg: string;
}

export const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/samhitasoilsolutions1?igsh=MWZ0ZzMyMHBrbGRtaQ==",
    label: "Instagram",
    Icon: Instagram,
    bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
  },
  {
    href: "https://www.facebook.com/share/14meNS3Jh4F/",
    label: "Facebook",
    Icon: Facebook,
    bg: "bg-[#1877F2]",
  },
  {
    href: "https://www.youtube.com/@samhitasoilsolutions",
    label: "YouTube",
    Icon: Youtube,
    bg: "bg-[#FF0000]",
  },
];
