import React from "react";
import Logo from "../components/Logo.jsx";
import WhySection from "../components/WhySection.jsx";
import CTASection from "../components/CTASection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import PageHero from "../components/PageHero.jsx";

export default function AboutPage() {
  return (<>
    <PageHero crumb="About" title="A technology partner for growing businesses" text="Anita Solutions is a technology solutions company focused on helping businesses adopt software, AI, automation, and digital technologies." />
    <section className="sec" aria-labelledby="who-h">
      <div className="wrap intro">
        <div>
          <h2 id="who-h">Who We Are</h2>
          <p className="lede" style={{marginTop:18}}>Anita Solutions is a technology solutions company focused on helping businesses adopt software, AI, automation, and digital technologies.</p>
          <p className="lede" style={{marginTop:14}}>We work with startups, small businesses, recruitment agencies and growing companies — understanding how they work today and building the technology that helps them work better tomorrow.</p>
          <h2 style={{marginTop:48}}>Our Mission</h2>
          <p className="lede" style={{marginTop:18}}>To make useful technology accessible to businesses by building practical, scalable, and business-focused digital solutions.</p>
        </div>
        <div className="about-visual">
          <Logo full alt="Anita Solutions — Ideas | Technology | AI | Real Impact" />
        </div>
      </div>
    </section>
    <section className="sec alt" aria-labelledby="ap-h">
      <div className="wrap">
        <h2 id="ap-h">Our Approach</h2>
        <p className="lede" style={{marginTop:16}}>A continuous cycle — because good technology keeps improving after launch.</p>
        <div className="approach">
          {["Understand","Plan","Build","Launch","Improve"].map((t, i, a) => <React.Fragment key={t}><span>{t}</span>{i < a.length - 1 && <i aria-hidden="true">→</i>}</React.Fragment>)}
        </div>
      </div>
    </section>
    <WhySection />
    <CTASection />
    <ContactSection />
  </>);
}
