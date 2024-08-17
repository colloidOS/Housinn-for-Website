import Image from "next/image";
import AboutUs from '../components/aboutus/page'
import Services from '../components/services/page'
import HeroContainer from '../components/HeroSectionContainer'
import Footer from "@/footer/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <HeroContainer/>
      <AboutUs/>
      <Services/>
      <Footer/>
    </main>
  );
}
