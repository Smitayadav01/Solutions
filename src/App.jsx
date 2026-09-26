import { useRoute } from "./lib/router.js";
import { SERVICES } from "./data/content.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicePage from "./pages/ServicePage.jsx";

export default function App() {
  const { path } = useRoute();
  const svc = SERVICES.find((s) => "/" + s.slug === path);
  let page;
  if (path === "/about") page = <AboutPage />;
  else if (svc) page = <ServicePage key={svc.slug} s={svc} />;
  else page = <HomePage />;

  const skip = (e) => {
    e.preventDefault();
    const m = document.getElementById("main");
    m.setAttribute("tabindex", "-1");
    m.focus();
  };

  return (
    <>
      <a className="skip" href="#main" onClick={skip}>Skip to content</a>
      <Navbar path={path} />
      <main id="main">{page}</main>
      <Footer />
    </>
  );
}
