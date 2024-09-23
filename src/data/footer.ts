import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Address,
  Telephone,
  Mail,
  GoogleDownloadButton,
  AppleDownloadButton,
} from "../../public/icons/index";

export const socialLinks = [
  { src: Twitter, alt: "Twitter", href: "" },
  { src: Facebook, alt: "Facebook", href: "" },
  { src: Linkedin, alt: "LinkedIn", href: "" },
  { src: Instagram, alt: "Instagram", href: "" },
];

export const contactDetails = [
  {
    src: Address,
    text: "7, University road, Nsukka, Enugu Nigeria. zip 900101",
    alt: "Address",
  },
  { src: Telephone, text: "+234-90 1234 5678", alt: "Telephone" },
  { src: Mail, text: "info@housinn.com", alt: "Mail" },
];

export const downloadLinks = [
  { src: GoogleDownloadButton, alt: "Sign in with Google" },
  { src: AppleDownloadButton, alt: "Sign in with Apple" },
];
