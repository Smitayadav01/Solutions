import Hero from "../components/Hero.jsx";
import Intro from "../components/Intro.jsx";
import ServiceSection from "../components/ServiceSection.jsx";
import WhySection from "../components/WhySection.jsx";
import ProcessSection from "../components/ProcessSection.jsx";
import Industries from "../components/Industries.jsx";
import Products from "../components/Products.jsx";
import CaseStudies from "../components/CaseStudies.jsx";
import TechnologySection from "../components/TechnologySection.jsx";
import CTASection from "../components/CTASection.jsx";
import ContactSection from "../components/ContactSection.jsx";

export default function HomePage() {
  return (<>
    <Hero /><Intro /><ServiceSection /><WhySection /><ProcessSection /><Industries /><Products /><CaseStudies /><TechnologySection /><CTASection /><ContactSection />
  </>);
}
