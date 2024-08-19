import Footer from "@/components/Footer";
import Image from "next/image";
import AboutUs from "../components/aboutus/page";
import Services from "../components/services/page";
import HeroContainer from "../components/HeroSectionContainer";
import WhyChooseUs from "@/components/OurServices";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <HeroContainer />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
