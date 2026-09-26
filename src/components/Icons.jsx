const I = ({ d, size = 24, sw = 1.8, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d ? <path d={d} /> : children}</svg>
);
export const Icon = {
  ai: (p) => <I {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><rect x="7" y="7" width="10" height="10" rx="3"/><path d="M10 12h4M12 10v4"/></I>,
  code: (p) => <I {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></I>,
  people: (p) => <I {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5.4 6-5.4s5.4 2 6 5.4"/><path d="M16 5.2a3 3 0 0 1 0 5.8M18 14.8c1.7.6 2.8 2.4 3 5.2"/></I>,
  grid: (p) => <I {...p}><rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><path d="M17 14v6M14 17h6"/></I>,
  target: (p) => <I {...p}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></I>,
  puzzle: (p) => <I {...p}><path d="M10 4h4v3a2 2 0 1 0 4 0h2v5h-3a2 2 0 1 0 0 4h3v4h-5v-3a2 2 0 1 0-4 0v3H4v-5h3a2 2 0 1 0 0-4H4V7h6z"/></I>,
  bolt: (p) => <I {...p} d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>,
  layers: (p) => <I {...p}><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></I>,
  chart: (p) => <I {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></I>,
  hand: (p) => <I {...p}><path d="M4 13.5 8.5 9a2.1 2.1 0 0 1 3 0l1 1M20 13.5 15.5 9M8 17l2 2a2 2 0 0 0 3 0l5-5M11 14l2 2M13 12l2 2"/></I>,
  doc: (p) => <I {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></I>,
  chat: (p) => <I {...p}><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4.2A8 8 0 1 1 20 12z"/></I>,
  mail: (p) => <I {...p}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></I>,
  shield: (p) => <I {...p}><path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/></I>,
  clock: (p) => <I {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></I>,
  check: (p) => <I {...p} d="m5 12.5 4.5 4.5L19 7.5"/>,
  arrow: (p) => <I {...p} d="M5 12h14m-5-5 5 5-5 5"/>,
  menu: (p) => <I {...p} d="M4 7h16M4 12h16M4 17h16"/>,
  close: (p) => <I {...p} d="M6 6l12 12M18 6 6 18"/>,
  down: (p) => <I {...p} d="m6 9 6 6 6-6"/>,
  wa: (p) => <I {...p}><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4.2A8 8 0 1 1 20 12z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2z"/></I>,
};

export const Swoosh = ({ className }) => (
  <svg className={className} viewBox="0 0 520 300" aria-hidden="true">
    <defs><linearGradient id="sw" x1="0" x2="1" y1="1" y2="0"><stop offset="0" stopColor="#1B84F2" stopOpacity=".15"/><stop offset=".6" stopColor="#1B84F2" stopOpacity=".7"/><stop offset="1" stopColor="#5FB0FF"/></linearGradient></defs>
    <path d="M10 290C150 285 190 250 250 180S400 40 515 20C420 60 360 110 300 190S160 300 10 290z" fill="url(#sw)"/>
  </svg>
);

