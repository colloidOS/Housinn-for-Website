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
  { src: Twitter, alt: "Twitter", href: "https://x.com/housinnafrica" },
  // { src: Facebook, alt: "Facebook", href: "" },
  { src: Linkedin, alt: "LinkedIn", href: "https://www.linkedin.com/company/housinnafrica" },
  { src: Instagram, alt: "Instagram", href: "https://instagram.com/housinn.africa" },
];

export const contactDetails = [
  // {
  //   src: Address,
  //   text: "7, University road, Nsukka, Enugu Nigeria. zip 900101",
  //   alt: "Address",
  // },
  { 
    src: Telephone, 
    text: "+234-90 1234 5678", 
    alt: "Telephone", 
    href: "tel:+2349012345678" 
  },
  { 
    src: Mail, 
    text: "housinnafrica@gmail.com", 
    alt: "Mail", 
    href: "mailto:housinnafrica@gmail.com" 
  },
];


export const downloadLinks = [
  { src: GoogleDownloadButton, alt: "Sign in with Google" },
  { src: AppleDownloadButton, alt: "Sign in with Apple" },
];
