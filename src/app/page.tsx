import Footer from "@/components/Footer";
import Image from "next/image";
import AboutUs from "../components/aboutus/page";
import Services from "../components/services/page";
import HeroContainer from "../components/HeroSectionContainer";
import WhyChooseUs from "@/components/OurServices";
import GetOurApp from "@/components/GetOurApp";
import Reviews from "@/components/Reviews";
import MultipleItems from "@/components/Reviews";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full ">
      <HeroContainer />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <MultipleItems/>
      <GetOurApp />
      <Footer />
    </main>
  );
}
