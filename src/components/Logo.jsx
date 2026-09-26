import logoNavy from "../assets/logo-dark.png";
import logoWhite from "../assets/logo-light.png";
import logoFullNavy from "../assets/logo-full-dark.png";
import logoFullWhite from "../assets/logo-full-light.png";

/**
 * Anita Solutions wordmark.
 * - tone="auto":  navy on light screens, white in dark mode
 * - tone="white": always white (for dark backgrounds like the footer)
 * - full:         include the "Ideas | Technology | AI | Real Impact" tagline
 */
export default function Logo({ tone = "auto", full = false, className = "", alt = "Anita Solutions" }) {
  const navy = full ? logoFullNavy : logoNavy;
  const white = full ? logoFullWhite : logoWhite;
  const size = full ? { width: 900, height: 340 } : { width: 640, height: 194 };

  if (tone === "white") return <img className={"logo " + className} src={white} alt={alt} {...size} />;

  return (
    <picture>
      <source srcSet={white} media="(prefers-color-scheme: dark)" />
      <img className={"logo " + className} src={navy} alt={alt} {...size} />
    </picture>
  );
}
