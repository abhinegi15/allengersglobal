import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, useRoute } from 'wouter';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  Gauge,
  Globe2,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Stethoscope,
  X,
} from 'lucide-react';

type Product = {
  slug: string;
  name: string;
  category: string;
  eyebrow: string;
  description: string;
  image: string;
  accent: string;
  specs: string[];
  features: string[];
};

const products: Product[] = [
  {
    slug: 'libra-mpm',
    name: 'Libra MPM',
    category: 'Patient Monitoring',
    eyebrow: 'Vital signs / acute care',
    description: 'A clear, intelligent view of every patient moment.',
    image: '/monitor.png',
    accent: 'from-[#d8f2ee] to-[#f6fbf9]',
    specs: ['15.6” high-brightness display', '8 waveforms in real time', '120 hours trend storage'],
    features: ['Fast, intuitive workflow for busy wards', 'Clinical-grade alarm management', 'Designed for easy cleaning and transport'],
  },
  {
    slug: 'blaze-prime',
    name: 'Blaze Prime',
    category: 'Urology',
    eyebrow: 'Holmium laser platform',
    description: 'Precision energy, tuned for confident intervention.',
    image: '/laser.png',
    accent: 'from-[#e1edf8] to-[#f7fafc]',
    specs: ['60 W pulse power', 'Variable pulse duration', 'Touchscreen control'],
    features: ['Consistent cutting performance', 'Compact footprint for procedure rooms', 'Operator-first controls'],
  },
  {
    slug: 'scorpio-emg',
    name: 'Scorpio EMG',
    category: 'Neuro diagnostics',
    eyebrow: 'EMG / EP / NCS',
    description: 'Advanced neuro diagnostics without the complexity.',
    image: '/monitor.png',
    accent: 'from-[#e2eafb] to-[#f8f9fd]',
    specs: ['Multi-test capability', 'High-fidelity signal capture', 'Configurable reporting'],
    features: ['Purpose-built neuro workflows', 'Reliable performance across studies', 'Secure data export'],
  },
  {
    slug: 'gemini-treadmill',
    name: 'Gemini',
    category: 'Cardiology',
    eyebrow: 'Treadmill stress system',
    description: 'A steady platform for better cardiac insight.',
    image: '/laser.png',
    accent: 'from-[#e9f4ec] to-[#fbfcf9]',
    specs: ['Quiet 20 km/h motor', 'Ergonomic safety rails', 'Integrated ECG workflow'],
    features: ['Smooth, low-noise operation', 'Built for repeatable testing', 'Clinician-ready controls'],
  },
  {
    slug: 'neuroplot',
    name: 'Neuroplot',
    category: 'Neuro diagnostics',
    eyebrow: 'EEG / evoked potential',
    description: 'Make complex neurological signals easier to understand.',
    image: '/monitor.png',
    accent: 'from-[#f6ebe2] to-[#fcfaf7]',
    specs: ['32-channel acquisition', 'High-resolution display', 'Flexible exam presets'],
    features: ['Clear signal visualization', 'Comfortable patient setup', 'Built for confident interpretation'],
  },
  {
    slug: 'allengers-morcellator',
    name: 'Allengers Morcellator',
    category: 'Laparoscopy',
    eyebrow: 'Tissue management',
    description: 'Smooth, controlled performance where precision matters.',
    image: '/laser.png',
    accent: 'from-[#d9f3f0] to-[#f8fcfb]',
    specs: ['Variable speed control', 'Single-use blade system', 'Compact mobile stand'],
    features: ['Predictable tissue handling', 'Simple setup and operation', 'Designed around procedure flow'],
  },
];

const categories = ['All products', 'Patient Monitoring', 'Urology', 'Neuro diagnostics', 'Cardiology', 'Laparoscopy'];

function Logo() {
  return (
    <Link href="/" className="flex items-center" data-testid="link-logo">
      <img src="/allengers-logo.png" alt="Allengers — Passion for excellence" className="h-auto w-[146px] object-contain" />
    </Link>
  );
}

function EnquiryModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#102e40]/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[1.5rem] bg-[#f7fbfa] shadow-2xl">
        <button onClick={onClose} className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#14364b] transition hover:bg-[#dff2ee]" aria-label="Close enquiry form" data-testid="button-close-enquiry"><X size={18} /></button>
        {sent ? (
          <div className="px-8 py-16 text-center sm:px-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d3f0e7] text-[#087568]"><Check size={28} /></div>
            <p className="eyebrow text-[#0f778b]">Enquiry received</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#14364b]">We’ll be in touch shortly.</h2>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#5b707d]">A member of our clinical solutions team will contact you using the details provided.</p>
            <button onClick={onClose} className="mt-8 rounded-full bg-[#14364b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0f778b]" data-testid="button-close-success">Return to site</button>
          </div>
        ) : (
          <>
            <div className="bg-[#14364b] px-8 py-8 text-white sm:px-12">
              <p className="eyebrow text-[#f6b95c]">Talk to our team</p>
              <h2 className="mt-3 font-display text-3xl font-bold">Bring better care<br />within reach.</h2>
            </div>
            <form className="grid gap-4 px-8 py-8 sm:grid-cols-2 sm:px-12" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <label className="text-xs font-bold text-[#385365]">Full name<input required className="mt-2 w-full rounded-lg border border-[#d4e2e3] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0f778b] focus:ring-2 focus:ring-[#0f778b]/15" placeholder="Dr. Priya Menon" data-testid="input-enquiry-name" /></label>
              <label className="text-xs font-bold text-[#385365]">Work email<input required type="email" className="mt-2 w-full rounded-lg border border-[#d4e2e3] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0f778b] focus:ring-2 focus:ring-[#0f778b]/15" placeholder="you@hospital.org" data-testid="input-enquiry-email" /></label>
              <label className="text-xs font-bold text-[#385365]">Organisation<input className="mt-2 w-full rounded-lg border border-[#d4e2e3] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0f778b] focus:ring-2 focus:ring-[#0f778b]/15" placeholder="Hospital or practice" data-testid="input-enquiry-organisation" /></label>
              <label className="text-xs font-bold text-[#385365]">I’m interested in<select className="mt-2 w-full rounded-lg border border-[#d4e2e3] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f778b]" data-testid="select-enquiry-product"><option>Product consultation</option><option>Distribution partnership</option><option>Service and support</option></select></label>
              <label className="text-xs font-bold text-[#385365] sm:col-span-2">How can we help?<textarea required rows={3} className="mt-2 w-full resize-none rounded-lg border border-[#d4e2e3] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0f778b] focus:ring-2 focus:ring-[#0f778b]/15" placeholder="Tell us a little about your clinical need" data-testid="textarea-enquiry-message" /></label>
              <button className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0f778b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#095e70] sm:col-span-2" type="submit" data-testid="button-submit-enquiry">Send enquiry <ArrowRight size={16} /></button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Header({ onEnquire }: { onEnquire: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [location] = useLocation();
  const navItems = [{ href: '/', label: 'Home' }, { href: '/products', label: 'Products' }];
  return (
    <header className="relative z-30 border-b border-[#d8e7e6] bg-[#f7fbfa]/95 backdrop-blur-md">
      <div className="h-1 bg-gradient-to-r from-[#079cd4] via-[#079cd4] to-[#e33136]" />
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={`text-[.73rem] font-bold uppercase tracking-[.1em] transition ${location === item.href ? 'text-[#079cd4]' : 'text-[#5b707d] hover:text-[#079cd4]'}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</Link>)}
          <a href="#about" className="text-[.73rem] font-bold uppercase tracking-[.1em] text-[#5b707d] transition hover:text-[#079cd4]" data-testid="link-nav-about">Our approach</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <button onClick={() => setLanguageOpen(!languageOpen)} className="flex items-center gap-2 rounded-full border border-[#d4e2e3] bg-white px-3.5 py-2 text-xs font-bold text-[#385365]" data-testid="button-language"><Globe2 size={14} className="text-[#079cd4]" /> {language}<ChevronDown size={13} /></button>
            {languageOpen && <div className="absolute right-0 top-12 w-28 rounded-xl border border-[#d4e2e3] bg-white p-1 shadow-lg">{['EN', 'DE', 'FR'].map((item) => <button key={item} onClick={() => { setLanguage(item); setLanguageOpen(false); }} className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-bold hover:bg-[#eaf5f3] ${language === item ? 'text-[#079cd4]' : 'text-[#385365]'}`} data-testid={`button-language-${item.toLowerCase()}`}>{item}</button>)}</div>}
          </div>
          <button onClick={onEnquire} className="rounded-full bg-[#079cd4] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#e33136]" data-testid="button-header-enquire">Enquire now</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f3f1] text-[#14364b] md:hidden" aria-label="Toggle menu" data-testid="button-mobile-menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {menuOpen && <div className="border-t border-[#d8e7e6] bg-[#f7fbfa] px-5 py-5 md:hidden"><div className="grid gap-4">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm font-bold text-[#14364b]" data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</Link>)}<a href="#about" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-[#14364b]" data-testid="link-mobile-about">Our approach</a><button onClick={onEnquire} className="mt-2 rounded-full bg-[#079cd4] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e33136]" data-testid="button-mobile-enquire">Enquire now</button></div></div>}
    </header>
  );
}

function Footer({ onEnquire }: { onEnquire: () => void }) {
  return <footer className="bg-[#14364b] text-white">
    <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
      <div><Logo /><p className="mt-6 max-w-xs text-sm leading-6 text-[#b9ced4]">Technology that earns trust at the point of care. Built for clinicians, designed for better outcomes.</p><button onClick={onEnquire} className="mt-6 flex items-center gap-2 text-sm font-bold text-[#f6b95c] transition hover:text-white" data-testid="button-footer-enquire">Start a conversation <ArrowUpRight size={16} /></button></div>
      <div><p className="eyebrow text-[#83c8cc]">Explore</p><div className="mt-5 grid gap-3 text-sm text-[#b9ced4]"><Link href="/" className="transition hover:text-white" data-testid="link-footer-home">Home</Link><Link href="/products" className="transition hover:text-white" data-testid="link-footer-products">All products</Link><a href="#about" className="transition hover:text-white" data-testid="link-footer-approach">Our approach</a></div></div>
      <div><p className="eyebrow text-[#83c8cc]">Connect</p><div className="mt-5 grid gap-3 text-sm text-[#b9ced4]"><a href="mailto:care@allengers.com" className="flex items-center gap-2 transition hover:text-white" data-testid="link-footer-email"><Mail size={15} /> care@allengers.com</a><a href="tel:+911722668001" className="flex items-center gap-2 transition hover:text-white" data-testid="link-footer-phone"><Phone size={15} /> +91 172 266 8001</a><span className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> Chandigarh, India</span></div></div>
      <div><p className="eyebrow text-[#83c8cc]">Built around you</p><p className="mt-5 text-sm leading-6 text-[#b9ced4]">From first conversation to long-term support, our specialists stay close to your clinical reality.</p><div className="mt-6 h-px bg-white/15" /><p className="mt-4 text-xs text-[#83c8cc]">© 2024 Allengers. Precision in care.</p></div>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  return <div className="noise min-h-dvh bg-[#f7fbfa]"><Header onEnquire={() => setEnquiryOpen(true)} />{children}<Footer onEnquire={() => setEnquiryOpen(true)} />{enquiryOpen && <EnquiryModal onClose={() => setEnquiryOpen(false)} />}</div>;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`scroll-reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Home() {
  const [active, setActive] = useState(0);
  const heroSlides = [
    { label: 'Libra MPM', title: 'Clarity at the bedside.', copy: 'Smart patient monitoring that helps clinical teams see what matters, sooner.', image: '/monitor.png', color: 'from-[#d6f1ef] via-[#eef8f6] to-[#f7fbfa]' },
    { label: 'Blaze Prime', title: 'Precision, made practical.', copy: 'A dependable holmium laser platform for confident procedural care.', image: '/laser.png', color: 'from-[#dceaf8] via-[#eff5fa] to-[#f7fbfa]' },
  ];
  const slide = heroSlides[active];
  return <Shell>
    <main>
      <section className={`relative overflow-hidden bg-gradient-to-br ${slide.color}`}>
        <div className="site-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid min-h-[600px] max-w-[1240px] items-center gap-8 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-20">
          <div className="reveal z-10 max-w-xl">
            <div className="mb-8 flex items-center gap-3 text-[#0f778b]"><span className="h-px w-10 bg-[#f6b95c]" /><span className="eyebrow">Advanced clinical systems</span></div>
            <p className="text-sm font-bold text-[#0f778b]">{slide.label}</p>
            <h1 className="mt-3 max-w-xl font-display text-5xl font-extrabold leading-[.98] tracking-[-.055em] text-[#14364b] sm:text-7xl">{slide.title}</h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#506875]">{slide.copy}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4"><Link href={`/products/${active === 0 ? 'libra-mpm' : 'blaze-prime'}`} className="group flex items-center gap-3 rounded-full bg-[#14364b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0f778b]" data-testid="link-hero-explore">Explore {slide.label} <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link><a href="#about" className="text-sm font-bold text-[#385365] underline decoration-[#8bbdc0] underline-offset-4 hover:text-[#0f778b]" data-testid="link-hero-approach">Why Allengers</a></div>
          </div>
          <div className="reveal reveal-delay-2 relative flex min-h-[330px] items-center justify-center lg:min-h-[460px]">
            <div className="absolute h-[320px] w-[320px] rounded-full bg-white/65 blur-2xl sm:h-[420px] sm:w-[420px]" />
            <div className="absolute bottom-10 h-7 w-[68%] rounded-[50%] bg-[#376b75]/15 blur-xl" />
            <img src={slide.image} alt={slide.label} className="product-shadow product-float relative z-10 max-h-[430px] w-[78%] object-contain transition-opacity duration-300 sm:w-[76%]" data-testid="img-hero-product" />
            <div className="absolute right-0 top-8 z-20 hidden w-36 rounded-2xl border border-white/80 bg-white/70 p-4 backdrop-blur-md sm:block"><p className="text-[.58rem] font-bold uppercase tracking-[.16em] text-[#0f778b]">Designed for</p><p className="mt-2 text-sm font-bold leading-5 text-[#14364b]">The moments that matter.</p></div>
          </div>
        </div>
        <div className="relative mx-auto flex max-w-[1240px] items-center justify-between px-5 pb-8 lg:px-8"><div className="flex gap-2">{heroSlides.map((item, index) => <button key={item.label} onClick={() => setActive(index)} className={`h-1 rounded-full transition-all ${active === index ? 'w-14 bg-[#0f778b]' : 'w-6 bg-[#a8c7c8]'}`} aria-label={`Show ${item.label}`} data-testid={`button-hero-slide-${index}`} />)}</div><span className="text-xs font-bold text-[#6e8790]">0{active + 1} / 0{heroSlides.length}</span></div>
      </section>

      <section className="overflow-hidden border-b border-[#d8e7e6] bg-white">
        <Reveal className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow text-[#079cd4]">Precision in practice</p>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-[1.02] tracking-[-.045em] text-[#14364b] sm:text-5xl">Every detail is designed for the care journey.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#506875]">From the first signal to the final decision, Allengers systems help care teams work with more clarity, confidence, and control.</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              { number: '01', title: 'See clearly', copy: 'Readable information and purposeful interfaces keep the important details in view.', icon: Activity },
              { number: '02', title: 'Move confidently', copy: 'Reliable performance helps teams spend less time troubleshooting and more time caring.', icon: ShieldCheck },
              { number: '03', title: 'Stay supported', copy: 'A responsive partner remains close from installation to every next step.', icon: HeartPulse },
            ].map(({ number, title, copy, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 100} className="group rounded-2xl border border-[#d8e7e6] bg-[#f7fbfa] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#079cd4]/40 hover:shadow-[0_18px_45px_rgba(20,54,75,.1)] sm:p-8">
                <div className="flex items-start justify-between"><Icon className="text-[#079cd4] transition duration-500 group-hover:scale-110 group-hover:text-[#e33136]" size={28} /><span className="font-mono text-xs font-bold text-[#e33136]">{number}</span></div>
                <h3 className="mt-12 font-display text-2xl font-bold text-[#14364b]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6a8089]">{copy}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="eyebrow text-[#0f778b]">The Allengers difference</p><h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-[1.05] tracking-[-.045em] text-[#14364b] sm:text-5xl">Technology that feels <span className="text-[#0f778b]">human.</span></h2></div><div className="grid gap-8 sm:grid-cols-2"><p className="text-lg leading-8 text-[#506875]">Healthcare moves quickly. The best equipment makes the next decision feel clearer, the next procedure feel steadier, and the whole team feel supported.</p><p className="text-sm leading-7 text-[#6a8089]">For more than three decades, Allengers has partnered with clinicians to bring precise, practical technology into real care environments. We listen first. Then we build.</p></div></div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[#d8e7e6] bg-[#d8e7e6] sm:grid-cols-3"><div className="bg-white p-7 sm:p-9"><ShieldCheck className="text-[#0f778b]" size={27} /><p className="mt-7 font-display text-2xl font-bold text-[#14364b]">Clinician-led</p><p className="mt-3 text-sm leading-6 text-[#6a8089]">Every detail begins with a real workflow and a real person.</p></div><div className="bg-white p-7 sm:p-9"><Gauge className="text-[#0f778b]" size={27} /><p className="mt-7 font-display text-2xl font-bold text-[#14364b]">Built to perform</p><p className="mt-3 text-sm leading-6 text-[#6a8089]">Reliable systems that keep their promise in demanding moments.</p></div><div className="bg-white p-7 sm:p-9"><HeartPulse className="text-[#0f778b]" size={27} /><p className="mt-7 font-display text-2xl font-bold text-[#14364b]">Closer support</p><p className="mt-3 text-sm leading-6 text-[#6a8089]">A responsive partner, from installation through every next step.</p></div></div>
      </section>

      <section className="bg-[#14364b] text-white">
        <Reveal className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <p className="eyebrow text-[#8bd5ed]">The care connection</p>
              <h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-[1.02] tracking-[-.045em] sm:text-5xl">Technology works better when people stay connected.</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                ['Listen', 'We start with the everyday reality of the people using the system.'],
                ['Shape', 'We turn clinical needs into practical, dependable technology.'],
                ['Stay close', 'We keep supporting your team long after the first conversation.'],
              ].map(([title, copy], index) => (
                <Reveal key={title} delay={index * 100} className="border-t border-white/20 pt-5">
                  <span className="font-mono text-xs font-bold text-[#e33136]">0{index + 1}</span>
                  <h3 className="mt-8 font-display text-2xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#b9ced4]">{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="overflow-hidden bg-[#14364b] py-5 text-white"><div className="marquee flex w-max items-center gap-12 whitespace-nowrap">{['PATIENT MONITORING', 'UROLOGY', 'NEURO DIAGNOSTICS', 'CARDIOLOGY', 'LAPAROSCOPY', 'PATIENT MONITORING', 'UROLOGY', 'NEURO DIAGNOSTICS'].map((item, i) => <span key={`${item}-${i}`} className="flex items-center gap-12 text-xs font-bold tracking-[.2em] text-[#bdd9da]">{item}<span className="h-2 w-2 rounded-full bg-[#e33136]" /></span>)}</div></section>

      <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-[#0f778b]">Explore the range</p><h2 className="mt-5 font-display text-4xl font-bold tracking-[-.045em] text-[#14364b] sm:text-5xl">Made for the moments<br /><span className="text-[#96b7b8]">that matter most.</span></h2></div><Link href="/products" className="group flex items-center gap-2 text-sm font-bold text-[#0f778b]" data-testid="link-home-all-products">View all products <ArrowRight size={17} className="transition group-hover:translate-x-1" /></Link></div><div className="mt-14 grid gap-5 md:grid-cols-3">{products.slice(0, 3).map((product, index) => <ProductCard product={product} key={product.slug} featured={index === 0} />)}</div></section>

      <section className="bg-[#e6f3f0]"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8 lg:py-28"><div><p className="eyebrow text-[#0f778b]">A partner, not a supplier</p><h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-[1.05] tracking-[-.045em] text-[#14364b] sm:text-5xl">Your clinical reality is the starting point.</h2><p className="mt-6 max-w-md text-lg leading-8 text-[#506875]">From discovery to deployment, our specialists help your team turn advanced technology into everyday confidence.</p><Link href="/products" className="group mt-8 flex w-fit items-center gap-2 text-sm font-bold text-[#0f778b]" data-testid="link-home-solutions">Find your solution <ArrowRight size={17} className="transition group-hover:translate-x-1" /></Link></div><div className="grid grid-cols-2 gap-4"><div className="rounded-2xl bg-[#14364b] p-6 text-white sm:p-8"><Stethoscope size={25} className="text-[#f6b95c]" /><p className="mt-12 font-display text-3xl font-bold">36+</p><p className="mt-2 text-sm text-[#b9ced4]">years beside care teams</p></div><div className="mt-10 rounded-2xl bg-white p-6 sm:p-8"><Globe2 size={25} className="text-[#0f778b]" /><p className="mt-12 font-display text-3xl font-bold text-[#14364b]">30+</p><p className="mt-2 text-sm text-[#6a8089]">markets connected</p></div><div className="rounded-2xl bg-white p-6 sm:p-8"><BadgeCheck size={25} className="text-[#0f778b]" /><p className="mt-12 font-display text-3xl font-bold text-[#14364b]">ISO</p><p className="mt-2 text-sm text-[#6a8089]">quality at every step</p></div><div className="mt-10 rounded-2xl bg-[#f6b95c] p-6 sm:p-8"><Activity size={25} className="text-[#14364b]" /><p className="mt-12 font-display text-3xl font-bold text-[#14364b]">24/7</p><p className="mt-2 text-sm text-[#14364b]/70">care never pauses</p></div></div></div></section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28"><div className="grid gap-8 rounded-[1.5rem] bg-[#f6b95c] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end lg:p-16"><div><p className="eyebrow text-[#14364b]">Have a clinical question?</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-[-.04em] text-[#14364b] sm:text-5xl">Let’s find the right next step.</h2></div><a href="mailto:care@allengers.com" className="flex w-fit items-center gap-2 rounded-full bg-[#14364b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0f778b]" data-testid="link-home-contact">Talk to an expert <ArrowUpRight size={17} /></a></div></section>
    </main>
  </Shell>;
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return <Link href={`/products/${product.slug}`} className={`group relative block overflow-hidden rounded-2xl border border-[#d8e7e6] bg-gradient-to-br ${product.accent} transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(20,54,75,.13)] ${featured ? 'md:col-span-2 md:grid md:grid-cols-[.85fr_1.15fr]' : ''}`} data-testid={`card-product-${product.slug}`}>
    <div className={`relative flex min-h-[250px] items-center justify-center overflow-hidden p-8 ${featured ? 'md:min-h-[360px]' : ''}`}><div className="absolute h-40 w-40 rounded-full bg-white/75 blur-2xl" /><img src={product.image} alt={product.name} className="product-shadow relative z-10 h-48 w-[76%] object-contain transition duration-500 group-hover:scale-105" data-testid={`img-product-${product.slug}`} /><span className="absolute left-5 top-5 rounded-full bg-white/65 px-3 py-1.5 text-[.6rem] font-bold uppercase tracking-[.12em] text-[#0f778b]">{product.category}</span></div>
    <div className="flex flex-col justify-between bg-white p-7"><div><p className="eyebrow text-[#0f778b]">{product.eyebrow}</p><h3 className="mt-3 font-display text-2xl font-bold tracking-[-.03em] text-[#14364b]">{product.name}</h3><p className="mt-3 text-sm leading-6 text-[#6a8089]">{product.description}</p></div><span className="mt-7 flex items-center gap-2 text-sm font-bold text-[#0f778b]">View product <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span></div>
  </Link>;
}

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All products');
  const [search, setSearch] = useState('');
  const filtered = products.filter((product) => (activeCategory === 'All products' || product.category === activeCategory) && `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()));
  return <Shell><main>
    <section className="site-grid border-b border-[#d8e7e6] bg-[#e8f4f1]"><div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28"><p className="eyebrow text-[#0f778b]">Our product ecosystem</p><div className="mt-5 grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end"><h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[.98] tracking-[-.06em] text-[#14364b] sm:text-7xl">Precision you can<br /><span className="text-[#0f778b]">put to work.</span></h1><p className="max-w-sm text-lg leading-8 text-[#506875]">Explore practical, high-performance systems built around the way modern care is delivered.</p></div></div></section>
    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16"><div className="flex flex-col gap-5 border-b border-[#d8e7e6] pb-6 lg:flex-row lg:items-center lg:justify-between"><div className="flex max-w-full gap-2 overflow-x-auto pb-1">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeCategory === category ? 'bg-[#14364b] text-white' : 'bg-[#edf5f3] text-[#5b707d] hover:bg-[#d7ebe7]'}`} data-testid={`button-filter-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}</div><label className="flex items-center gap-2 rounded-full border border-[#d8e7e6] bg-white px-4 py-2.5 text-sm text-[#6a8089] lg:w-64"><Search size={16} className="text-[#0f778b]" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-[#9aafb5]" placeholder="Search products" data-testid="input-product-search" /></label></div><div className="mt-10 grid gap-5 md:grid-cols-2">{filtered.map((product) => <ProductCard key={product.slug} product={product} />)}</div>{filtered.length === 0 && <div className="rounded-2xl bg-[#edf5f3] py-20 text-center"><p className="font-display text-2xl font-bold text-[#14364b]">No products found</p><p className="mt-2 text-sm text-[#6a8089]">Try another category or search term.</p><button onClick={() => { setSearch(''); setActiveCategory('All products'); }} className="mt-6 rounded-full bg-[#0f778b] px-5 py-2.5 text-sm font-bold text-white" data-testid="button-reset-products">Reset filters</button></div>}</section>
    <section className="bg-[#14364b]"><div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><p className="eyebrow text-[#83c8cc]">Not sure where to begin?</p><p className="mt-3 font-display text-2xl font-bold text-white">Start with the clinical need.</p></div><Link href="/#about" className="flex w-fit items-center gap-2 rounded-full bg-[#f6b95c] px-5 py-3 text-sm font-bold text-[#14364b] transition hover:bg-white" data-testid="link-products-approach">See our approach <ArrowRight size={16} /></Link></div></section>
  </main></Shell>;
}

function ProductDetail({ slug }: { slug: string }) {
  const product = products.find((item) => item.slug === slug) ?? products[0];
  return <Shell><main>
    <div className="mx-auto max-w-[1240px] px-5 pt-7 lg:px-8"><Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#6a8089] transition hover:text-[#0f778b]" data-testid="link-detail-back"><ChevronRight size={14} className="rotate-180" /> All products</Link></div>
    <section className={`mx-auto mt-7 grid max-w-[1240px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${product.accent} px-6 py-12 sm:px-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-16 lg:py-16`}><div className="order-2 lg:order-1"><p className="eyebrow text-[#0f778b]">{product.eyebrow}</p><h1 className="mt-4 font-display text-5xl font-extrabold leading-[.95] tracking-[-.06em] text-[#14364b] sm:text-7xl">{product.name}</h1><p className="mt-6 max-w-md text-lg leading-8 text-[#506875]">{product.description}</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => document.getElementById('detail-enquiry')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 rounded-full bg-[#14364b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0f778b]" data-testid="button-detail-enquire">Request a consultation <ArrowUpRight size={17} /></button><a href="#specifications" className="flex items-center gap-2 rounded-full border border-[#b5ced0] bg-white/60 px-6 py-3.5 text-sm font-bold text-[#14364b] transition hover:bg-white" data-testid="link-detail-specifications">Specifications <ChevronDown size={16} /></a></div></div><div className="order-1 flex min-h-[300px] items-center justify-center lg:order-2 lg:min-h-[430px]"><div className="absolute h-64 w-64 rounded-full bg-white/80 blur-3xl" /><img src={product.image} alt={product.name} className="product-shadow relative z-10 max-h-[390px] w-[78%] object-contain" data-testid="img-detail-product" /></div></section>
    <section id="specifications" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28"><div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-[#0f778b]">At a glance</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.045em] text-[#14364b]">Thought through<br />to the detail.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-[#6a8089]">Every system is shaped around the practical realities of clinical teams: clear controls, dependable performance, and less friction between insight and action.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-[#d8e7e6] bg-[#d8e7e6] sm:grid-cols-3">{product.specs.map((spec, index) => <div key={spec} className="bg-white p-6 sm:p-7"><span className="font-mono text-xs font-bold text-[#f0a945]">0{index + 1}</span><p className="mt-9 text-sm font-bold leading-6 text-[#385365]">{spec}</p></div>)}</div></div><div className="mt-16 grid gap-4 border-t border-[#d8e7e6] pt-12 sm:grid-cols-2 lg:grid-cols-3">{product.features.map((feature) => <div key={feature} className="flex gap-3"><Check className="mt-0.5 shrink-0 text-[#0f778b]" size={18} /><p className="text-sm leading-6 text-[#506875]">{feature}</p></div>)}</div></section>
    <section id="detail-enquiry" className="bg-[#e6f3f0]"><div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-20"><div><p className="eyebrow text-[#0f778b]">Ready when you are</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.045em] text-[#14364b]">See {product.name} in your workflow.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#6a8089]">Our team can help with technical details, clinical applications, availability, and next steps.</p></div><a href="mailto:care@allengers.com?subject=Product%20enquiry" className="flex w-fit items-center gap-2 rounded-full bg-[#0f778b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#14364b]" data-testid="link-detail-contact">Contact our team <Mail size={16} /></a></div></section>
  </main></Shell>;
}

function NotFound() {
  return <Shell><main className="mx-auto flex min-h-[60vh] max-w-[1240px] flex-col items-start justify-center px-5 lg:px-8"><p className="eyebrow text-[#0f778b]">Page not found</p><h1 className="mt-4 font-display text-6xl font-bold text-[#14364b]">A wrong turn.</h1><p className="mt-4 text-[#6a8089]">The page you’re looking for doesn’t exist.</p><Link href="/" className="mt-8 flex items-center gap-2 rounded-full bg-[#14364b] px-6 py-3 text-sm font-bold text-white" data-testid="link-not-found-home">Back home <ArrowRight size={16} /></Link></main></Shell>;
}

function Router() {
  const [, params] = useRoute('/products/:slug');
  return <Switch><Route path="/" component={Home} /><Route path="/products" component={ProductsPage} /><Route path="/products/:slug">{() => <ProductDetail slug={params?.slug ?? ''} />}</Route><Route component={NotFound} /></Switch>;
}

function App() {
  return <Router />;
}

export default App;