import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, useRoute } from 'wouter';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  FileCheck,
  FileText,
  Gauge,
  Globe2,
  Headphones,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: 'Urology' | 'Neurology' | 'Cardiology' | 'Patient Monitoring' | 'Laparoscopy';
  eyebrow: string;
  description: string;
  image: string;
  cleanImage: string;
  accent: string;
  badge: string;
  specs: string[];
  features: string[];
};

export const products: Product[] = [
  {
    slug: 'blaze-prime',
    name: 'BLAZE-prime Holmium Laser',
    shortName: 'Holmium Laser',
    category: 'Urology',
    eyebrow: 'Lithotripsy & HoLEP Platform',
    description: 'Advanced long pulse holmium laser system with super-imposed modulated pulse to minimize retropulsion and maximize stone ablation.',
    image: '/products/blaze-prime-holmium-laser.jpeg',
    cleanImage: '/products/blaze-prime-holmium-laser-clean.png',
    accent: 'from-[#dcf0f8] via-[#edf7fc] to-[#ffffff]',
    badge: 'Urology Flagship',
    specs: [
      'Power Options: 100W, 65W, 30W variants',
      'Pulse Energy: 0.1 J to 5.0 J adjustable',
      'Pulse Frequency: Up to 80 Hz high repetition',
      '12” Bright color interactive touchscreen',
      'Advanced dual inverter compressor turbo cooling',
      'Blast stone dusting & fragmenting presets',
    ],
    features: [
      'Super-imposed pulse modulation minimizes stone retropulsion',
      'Tilting and sideways swivel touchscreen display for surgeon comfort',
      'Supports ultra-thin fibers from 200 µm to 1000 µm',
      'Ideal for ureteroscopy, percutaneous nephrolithotomy (PCNL) and HoLEP',
      'Rigorous safety interlocks and smart fiber recognition system',
    ],
  },
  {
    slug: 'fiberlaze-plus',
    name: 'FiberLAZE+ Thulium Fiber Laser',
    shortName: 'Thulium Fiber Laser',
    category: 'Urology',
    eyebrow: 'Fine Tissue & Dusting Platform',
    description: 'Extreme repetition rate laser with hybrid air cooling system delivering superior lithotripsy and smooth tissue cutting with minimal blood loss.',
    image: '/products/fiberlaze-thulium-laser.jpeg',
    cleanImage: '/products/fiberlaze-thulium-laser-clean.png',
    accent: 'from-[#e1f5f3] via-[#f0faf8] to-[#ffffff]',
    badge: 'High Precision',
    specs: [
      'Power Options: 60W and 35W available',
      'Extreme Repetition Rate: Up to 2500 Hz (60W) / 1600 Hz (35W)',
      'Seven levels of selectable pulse width',
      'Hybrid air-cooling system (no water replenishment needed)',
      'Peak power optimization for ultra-fine dust generation',
      'Standard 220V electrical connection',
    ],
    features: [
      'Hands-free Ready/Standby selection switches with dual foot pedal',
      'Consistent pulse energy with near-zero tissue carbonization',
      'Significantly faster dusting than conventional holmium units',
      'Lightweight, compact procedure room footprint on mobile stand',
      'User-friendly touchscreen with customizable surgeon profiles',
    ],
  },
  {
    slug: 'allengers-morcellator',
    name: 'Allengers Morcellator (DynaCut)',
    shortName: 'Morcellator',
    category: 'Laparoscopy',
    eyebrow: 'Tissue Management & Extraction',
    description: 'Smooth, controlled performance with variable speed control, twin collection canisters, and mobile stand with dual foot pedal.',
    image: '/products/dynacut-morcellator.jpeg',
    cleanImage: '/products/dynacut-morcellator-clean.png',
    accent: 'from-[#d9f3f0] via-[#edf9f7] to-[#ffffff]',
    badge: 'Laparoscopy',
    specs: [
      'Intuitive touchscreen digital interface',
      'Continuous variable speed cutting control',
      'Twin high-volume suction canister system',
      'Ergonomic mobile stand with dual foot switch',
      'Single-use and reusable blade compatibility',
      'High-torque autoclavable handpiece',
    ],
    features: [
      'Predictable, smooth tissue handling for minimally invasive surgeries',
      'Designed specifically around operating room workflow and safety',
      'Quiet suction motor with airtight canister seal',
      'Rapid setup and simple disassembly for decontamination',
      'Compatible with leading laparoscopic access ports',
    ],
  },
  {
    slug: 'neuroplot',
    name: 'Neuroplot / VIRGO EEG',
    shortName: 'Electroencephalograph',
    category: 'Neurology',
    eyebrow: 'EEG / Evoked Potential Systems',
    description: 'State-of-the-art EEG systems for recording and monitoring electrical brain activity, analyzing complex disorders, and locating seizure origin.',
    image: '/products/virgo-electroencephalograph.jpeg',
    cleanImage: '/products/virgo-electroencephalograph-clean.png',
    accent: 'from-[#e1edf8] via-[#f0f6fc] to-[#ffffff]',
    badge: 'Neurology Standard',
    specs: [
      '32 / 24 Channel high-gain acquisition headbox',
      'High-resolution full HD display monitor',
      'Advanced digital signal processing (DSP) filters',
      'Integrated medical-grade PC, trolley, and laser printer',
      'Brain mapping & montage editor software',
      'Synchronized video EEG recording (optional)',
    ],
    features: [
      'Clear signal visualization with automated artifact rejection',
      'Configurable exam presets for adult, pediatric, and ICU studies',
      'Integrated photic stimulator with programmable frequency sweeps',
      'Comprehensive report generation with PDF and raw data export',
      'Built for clinical neurology wards, research labs, and hospitals',
    ],
  },
  {
    slug: 'scorpio-emg',
    name: 'SCORPIO EMG / EP / NCS',
    shortName: 'Electromyograph',
    category: 'Neurology',
    eyebrow: 'EMG / EP / NCS Platform',
    description: 'High-fidelity EMG/EP/NCS platform designed for advanced neuro diagnostics, nerve conduction studies, and evoked potentials.',
    image: '/products/scorpio-electromyograph.jpeg',
    cleanImage: '/products/scorpio-electromyograph-clean.png',
    accent: 'from-[#e2eafb] via-[#f2f6fd] to-[#ffffff]',
    badge: 'Multi-Test Platform',
    specs: [
      'Multi-test capability: EMG, NCV, SEP, VEP, BAEP',
      'High-accuracy low-noise biopotential amplifiers',
      'Dedicated handheld electrical stimulator with intensity knob',
      'Integrated medical trolley with dedicated printer compartment',
      'Comprehensive anatomical muscle & nerve selector database',
      'Automated peak latency and amplitude marker calculation',
    ],
    features: [
      'Purpose-built workflows reduce study time by up to 35%',
      'High-fidelity acoustic EMG audio monitoring with volume limiter',
      'Robust baseline correction during repetitive nerve stimulation (RNS)',
      'Customizable reporting templates with side-by-side comparison',
      'Trusted across 12,000+ clinical installations worldwide',
    ],
  },
  {
    slug: 'allengers-psg',
    name: 'Allengers Polysomnograph (PSG)',
    shortName: 'Polysomnograph',
    category: 'Neurology',
    eyebrow: 'Sleep Diagnostic System',
    description: 'Comprehensive sleep diagnostic system providing synchronized sleep staging, respiratory analysis, and limb movement recording.',
    image: '/products/polysomnograph-psg.jpeg',
    cleanImage: '/products/polysomnograph-psg-clean.png',
    accent: 'from-[#e8ecf8] via-[#f5f7fc] to-[#ffffff]',
    badge: 'Sleep Medicine',
    specs: [
      'Multi-channel PSG acquisition unit with stand',
      'Integrated SpO2, nasal airflow, and thoracic effort channels',
      'Snore sensor, body position detector, and limb movement EMG',
      'Infrared HD camera synchronization with audio',
      'AASM compliant automatic & manual sleep staging',
      'Hypopnea / Apnea index (AHI) automated calculation',
    ],
    features: [
      'High-comfort patient interface for natural overnight sleep studies',
      'Reliable data retention during accidental power interruptions',
      'Detailed hypnogram reports with oxygen desaturation profiling',
      'Seamless integration with CPAP/BiPAP titration equipment',
      'Certified under international medical standards (ISO 13485 / CE)',
    ],
  },
  {
    slug: 'gemini-treadmill',
    name: 'Gemini TMT Machine (GEMINI-A-DX)',
    shortName: 'Treadmill Test Machine',
    category: 'Cardiology',
    eyebrow: 'Treadmill Stress Test System',
    description: 'Designed using state-of-the-art technology and 30+ years of manufacturing experience. Sturdy treadmill and stable baseline during stress tests.',
    image: '/products/gemini-treadmill-tmt.jpeg',
    cleanImage: '/products/gemini-treadmill-tmt-clean.png',
    accent: 'from-[#e8f5ec] via-[#f4faf6] to-[#ffffff]',
    badge: 'Cardiology Classic',
    specs: [
      'GEMINI-A-DX heavy-duty AC drive motor',
      'Ergonomic full-length safety handrails',
      'Speed range: 0.1 to 20 km/h with 0–22% grade elevation',
      '12-lead simultaneous stress ECG acquisition',
      'Proprietary digital baseline stabilizing filter',
      'Instant safety stop cord and emergency brake switch',
    ],
    features: [
      'Standard Bruce, Modified Bruce, Balke, Ellestad and custom protocols',
      'Real-time ST level and slope tracking across all 12 leads',
      'Full disclosure recording with post-test review and re-analysis',
      'Heavy-duty platform supports patients up to 200 kg',
      'Integrated trolley console with high-resolution LCD monitor',
    ],
  },
  {
    slug: 'pisces-ecg',
    name: 'Pisces 1012 12-Channel ECG',
    shortName: 'Electrocardiograph',
    category: 'Cardiology',
    eyebrow: '12-Channel Electrocardiograph',
    description: 'High-precision 12-channel electrocardiograph featuring interactive LCD display, alphanumeric keyboard, and thermal printer.',
    image: '/products/pisces-electrocardiograph.jpeg',
    cleanImage: '/products/pisces-electrocardiograph-clean.png',
    accent: 'from-[#eaf0f8] via-[#f5f8fc] to-[#ffffff]',
    badge: 'Essential Cardiac',
    specs: [
      '12-Lead simultaneous ECG acquisition and printing',
      'Built-in high-contrast LCD waveform display',
      'Full alphanumeric silicone keyboard for quick patient entry',
      'High-speed thermal array printing with multiple format options',
      'Internal memory stores hundreds of ECG records',
      'Dual power: AC mains and built-in rechargeable battery',
    ],
    features: [
      'Automated ECG interpretation with arrhythmia detection',
      'Digital baseline drift, AC hum, and EMG artifact filtration',
      'Lightweight and portable with integrated carrying handle',
      'USB connectivity for PC communication and PDF export',
      'Robust construction suited for emergency rooms, clinics, and wards',
    ],
  },
  {
    slug: 'libra-mpm',
    name: 'Libra Smart / BRIO Multipara Monitor',
    shortName: 'Multipara Monitors',
    category: 'Patient Monitoring',
    eyebrow: 'Vital Signs Acute Care Monitor',
    description: 'Comprehensive bedside patient monitor providing clear real-time waveforms, clinical-grade alarms, and durable multi-parameter tracking.',
    image: '/products/libra-multipara-monitor.jpeg',
    cleanImage: '/products/libra-multipara-monitor-clean.png',
    accent: 'from-[#d8f2ee] via-[#ecf8f5] to-[#ffffff]',
    badge: 'Critical Care',
    specs: [
      '15.6” / 12.1” high-brightness anti-glare TFT display',
      'Standard Parameters: 5-Lead ECG, SpO2, NIBP, Respiration, Temp',
      'Up to 8 real-time high-resolution waveforms',
      '120 hours graphical and tabular trend memory',
      'Audio-visual 3-level alarm notification with flashing bar',
      'Rechargeable high-capacity Li-ion battery backup',
    ],
    features: [
      'Dedicated profiles for Adult, Pediatric, and Neonatal patients',
      'Rotary optical knob plus direct one-touch shortcut keys',
      'Central nursing station (CNS) wired/wireless connectivity',
      'Rugged casing resistant to hospital-grade disinfectants',
      'Multiple mounting options: rolling stand, wall mount, bed rail',
    ],
  },
  {
    slug: 'ecg-holter',
    name: 'Allengers ECG Holter',
    shortName: 'ECG Holter',
    category: 'Cardiology',
    eyebrow: 'Ambulatory ECG Monitoring System',
    description: 'Ultra-compact, lightweight ambulatory ECG recorder for 24–48 hour continuous recording with advanced automated arrhythmia analysis software.',
    image: '/products/ecg-holter.jpeg',
    cleanImage: '/products/ecg-holter-clean.png',
    accent: 'from-[#e7f0fa] via-[#f4f7fc] to-[#ffffff]',
    badge: 'Ambulatory Care',
    specs: [
      '3-Channel / 12-Channel recording modes available',
      'Weight: Under 80 grams with battery installed',
      'High sampling frequency up to 10,000 Hz for pacemaker analysis',
      'Continuous 24 to 72 hour recording on a single AAA battery',
      'OLED real-time display for lead impedance and signal check',
      'Secure SD card data storage with fast USB data transfer',
    ],
    features: [
      'Advanced analysis for Atrial Fibrillation, Flutter, and Ectopic beats',
      'Heart Rate Variability (HRV) and ST segment change profiling',
      'Obstructive Sleep Apnea (OSA) screening tool included',
      'Single-click automated report generation with doctor signature',
      'High patient compliance due to feather-light ergonomic design',
    ],
  },
];

const categories = ['All products', 'Urology', 'Neurology', 'Cardiology', 'Patient Monitoring', 'Laparoscopy'] as const;

function Logo() {
  return (
    <Link href="/" className="flex items-center" data-testid="link-logo">
      <img
        src="/allengers-logo.png"
        alt="Allengers — Passion for excellence"
        className="h-auto w-[150px] object-contain sm:w-[170px]"
      />
    </Link>
  );
}

function EnquiryModal({
  onClose,
  initialProduct = '',
}: {
  onClose: () => void;
  initialProduct?: string;
}) {
  const [sent, setSent] = useState(false);
  const [productChoice, setProductChoice] = useState(initialProduct || 'General Enquiry');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d2232]/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-[1.75rem] bg-[#f8fbfa] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#14364b] shadow transition hover:bg-[#079cd4] hover:text-white"
          aria-label="Close enquiry form"
          data-testid="button-close-enquiry"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="px-8 py-16 text-center sm:px-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d3f0e7] text-[#087568]">
              <Check size={32} />
            </div>
            <p className="eyebrow text-[#079cd4]">Enquiry Received</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#14364b]">
              Thank You for Contacting Us
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#5b707d]">
              Our representative from Allengers Global Healthcare will contact you shortly regarding{' '}
              <strong className="text-[#14364b]">{productChoice}</strong>.
            </p>
            <div className="mt-6 rounded-xl bg-white p-4 text-xs text-[#5b707d] shadow-sm">
              <p>Direct Support Email: <strong>enquiries@allengersglobal.com</strong></p>
              <p className="mt-1">Toll Free (India): <strong>1800-266-8800</strong></p>
            </div>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-[#079cd4] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#e33136]"
              data-testid="button-close-success"
            >
              Return to Site
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-[#0d2232] to-[#1a3d54] px-8 py-8 text-white sm:px-12">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#079cd4]">
                <Sparkles size={14} /> Allengers Global Healthcare
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold text-white">
                Request Product Enquiry
              </h2>
              <p className="mt-2 text-xs text-[#b0c8d4]">
                Direct connection with our factory specialists & clinical sales team.
              </p>
            </div>

            <form
              className="grid gap-4 px-8 py-8 sm:grid-cols-2 sm:px-12"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="text-xs font-bold text-[#385365]">
                Full Name *
                <input
                  required
                  className="mt-2 w-full rounded-lg border border-[#d4e2e3] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#079cd4] focus:ring-2 focus:ring-[#079cd4]/20"
                  placeholder="Dr. Rajesh Kumar"
                  data-testid="input-enquiry-name"
                />
              </label>

              <label className="text-xs font-bold text-[#385365]">
                Contact Number *
                <input
                  required
                  type="tel"
                  className="mt-2 w-full rounded-lg border border-[#d4e2e3] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#079cd4] focus:ring-2 focus:ring-[#079cd4]/20"
                  placeholder="+91 98765 43210"
                  data-testid="input-enquiry-phone"
                />
              </label>

              <label className="text-xs font-bold text-[#385365]">
                Email Address *
                <input
                  required
                  type="email"
                  className="mt-2 w-full rounded-lg border border-[#d4e2e3] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#079cd4] focus:ring-2 focus:ring-[#079cd4]/20"
                  placeholder="doctor@hospital.org"
                  data-testid="input-enquiry-email"
                />
              </label>

              <label className="text-xs font-bold text-[#385365]">
                Select Product *
                <select
                  value={productChoice}
                  onChange={(e) => setProductChoice(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-[#d4e2e3] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#079cd4]"
                  data-testid="select-enquiry-product"
                >
                  <option value="General Enquiry">Select Product / General</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Dealership Enquiry">Dealership / Distribution</option>
                  <option value="Service and Support">Service & Support Request</option>
                </select>
              </label>

              <label className="text-xs font-bold text-[#385365] sm:col-span-2">
                Leave us a message...
                <textarea
                  rows={3}
                  className="mt-2 w-full resize-none rounded-lg border border-[#d4e2e3] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#079cd4] focus:ring-2 focus:ring-[#079cd4]/20"
                  placeholder="Tell us your hospital/clinic requirements or specification needs..."
                  data-testid="textarea-enquiry-message"
                />
              </label>

              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#079cd4] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#e33136] sm:col-span-2"
                data-testid="button-submit-enquiry"
              >
                Submit Enquiry <Send size={16} />
              </button>
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

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/#about', label: 'ABOUT US' },
    { href: '/products', label: 'ALL PRODUCTS' },
    { href: '/#specialties', label: 'OUR SPECIALTIES' },
    { href: '/#enquire', label: 'ENQUIRE NOW' },
    { href: '/#contact', label: 'CONTACT US' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8e7e6] bg-[#ffffff]/98 shadow-sm backdrop-blur-md">
      {/* Brand Color Top Border Accent */}
      <div className="h-1 bg-gradient-to-r from-[#079cd4] via-[#079cd4] to-[#e33136]" />

      <div className="mx-auto flex h-[80px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[.78rem] font-bold tracking-[.06em] transition ${
                location === item.href
                  ? 'text-[#079cd4]'
                  : 'text-[#445b6a] hover:text-[#079cd4]'
              }`}
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-2 rounded-full border border-[#d4e2e3] bg-white px-3.5 py-1.5 text-xs font-bold text-[#385365] shadow-sm transition hover:border-[#079cd4]"
              data-testid="button-language"
            >
              <Globe2 size={14} className="text-[#079cd4]" /> {language}
              <ChevronDown size={13} />
            </button>
            {languageOpen && (
              <div className="absolute right-0 top-11 w-28 rounded-xl border border-[#d4e2e3] bg-white p-1 shadow-lg">
                {['EN', 'ES', 'FR', 'DE', 'AR'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setLanguage(item);
                      setLanguageOpen(false);
                    }}
                    className={`block w-full rounded-lg px-3 py-1.5 text-left text-xs font-bold hover:bg-[#eaf5f3] ${
                      language === item ? 'text-[#079cd4]' : 'text-[#385365]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onEnquire}
            className="rounded-full bg-[#079cd4] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#e33136]"
            data-testid="button-header-enquire"
          >
            Enquire Now
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f6f8] text-[#14364b] lg:hidden"
          aria-label="Toggle navigation menu"
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#d8e7e6] bg-white px-5 py-5 lg:hidden">
          <div className="grid gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-1 text-sm font-bold text-[#14364b] hover:text-[#079cd4]"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onEnquire();
              }}
              className="mt-3 rounded-full bg-[#079cd4] px-5 py-2.5 text-center text-sm font-bold text-white"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ onEnquire }: { onEnquire: () => void }) {
  return (
    <footer id="contact" className="bg-[#1c2734] text-white">
      {/* Top Product Category Links Bar (From Original Site) */}
      <div className="border-b border-white/10 bg-[#141e2a] px-5 py-4">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold tracking-wider text-[#93a9bb]">
          <Link href="/products/blaze-prime" className="hover:text-[#079cd4]">
            HOLMIUM LASER
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/products/neuroplot" className="hover:text-[#079cd4]">
            EEG
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/products/scorpio-emg" className="hover:text-[#079cd4]">
            EMG
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/products/gemini-treadmill" className="hover:text-[#079cd4]">
            TMT
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/products/libra-mpm" className="hover:text-[#079cd4]">
            MPM
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/products/pisces-ecg" className="hover:text-[#079cd4]">
            ECG
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/products/allengers-psg" className="hover:text-[#079cd4]">
            PSG
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/products/ecg-holter" className="hover:text-[#079cd4]">
            HOLTER
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/products/allengers-morcellator" className="hover:text-[#079cd4]">
            MORCELLATOR
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4 lg:px-8">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#079cd4]">
            About Allengers
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-[#b4c7d4]">
            <li>
              <a href="#about" className="hover:text-white">
                - Company Profile
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                - Certifications (ISO / CE / BIS)
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                - Office Locations
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                - The Allengers Group
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#079cd4]">
            Our Specialties
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-[#b4c7d4]">
            <li>
              <Link href="/products" className="hover:text-white">
                - Cardiology
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                - Neurology
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                - Urology
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                - Patient Monitoring
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                - Laparoscopy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#079cd4]">
            Policy & Terms
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-[#b4c7d4]">
            <li>
              <a href="#about" className="hover:text-white">
                - Privacy Policy
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                - Terms of Use
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                - Payment Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                - Disclaimer
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#079cd4]">
            Connect & Support
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-[#b4c7d4]">
            <li>
              <a href="mailto:enquiries@allengersglobal.com" className="hover:text-white">
                - Careers
              </a>
            </li>
            <li>
              <button onClick={onEnquire} className="text-left hover:text-white">
                - Dealership Enquiry
              </button>
            </li>
            <li>
              <button onClick={onEnquire} className="text-left hover:text-white">
                - Service & Support
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Toll Free Banner Section */}
      <div className="border-t border-white/10 bg-[#15202c] px-5 py-6">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 sm:flex-row lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <span className="font-display text-lg font-extrabold tracking-wide text-white sm:text-xl">
              TOLL FREE (India) <span className="text-[#079cd4]">1800-266-8800</span>
            </span>
            <span className="hidden text-white/30 sm:inline">|</span>
            <span className="text-xs text-[#b0c4d2]">
              Phone: 0172 – 6618001
            </span>
          </div>

          <button
            onClick={onEnquire}
            className="rounded-full bg-[#079cd4] px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
            data-testid="button-footer-contact"
          >
            CONTACT US
          </button>
        </div>
      </div>

      {/* Bottom Copyright & Address Section */}
      <div className="border-t border-black/40 bg-[#0d151e] px-5 py-5 text-center text-xs text-[#879dab] lg:px-8">
        <p className="font-semibold text-[#b8cbd6]">
          Allengers © {new Date().getFullYear()} Allengers Global Healthcare Private Limited
        </p>
        <p className="mt-1">
          S.C.O 212-213-214, Sector 34-A, CHANDIGARH (U.T.), 160022, India.
        </p>
        <p className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span>Phone : 0172 – 6618001</span>
          <span>•</span>
          <a
            href="mailto:enquiries@allengersglobal.com"
            className="text-[#079cd4] hover:underline"
          >
            Email: enquiries@allengersglobal.com
          </a>
          <span>•</span>
          <span className="text-[#079cd4]">Web: www.allengersglobal.com</span>
        </p>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState('');

  const handleOpenEnquiry = (productName = '') => {
    setEnquiryProduct(productName);
    setEnquiryOpen(true);
  };

  return (
    <div className="noise min-h-dvh bg-[#f8fbfa] text-[#14364b]">
      <Header onEnquire={() => handleOpenEnquiry()} />
      {children}
      <Footer onEnquire={() => handleOpenEnquiry()} />
      {enquiryOpen && (
        <EnquiryModal
          onClose={() => setEnquiryOpen(false)}
          initialProduct={enquiryProduct}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// HOME PAGE
// -------------------------------------------------------------
function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [enquirySent, setEnquirySent] = useState(false);
  const [inPageProduct, setInPageProduct] = useState('All Products');

  const heroSlides = [
    {
      title: 'Neuroplot EEG',
      subtitle: 'Precision You Can Trust',
      badges: ['High Precision', 'Advanced Sampling', 'Full HD Display', 'Reliable Performance'],
      copy: 'State-of-the-art EEG systems designed for accurate neurological diagnosis, seizure localization, and high-fidelity signal acquisition.',
      image: '/products/virgo-electroencephalograph-clean.png',
      slug: 'neuroplot',
      gradient: 'from-[#0072b2] via-[#0288d1] to-[#005b8e]',
    },
    {
      title: 'SCORPIO EMG/EP/NCS',
      subtitle: 'Advanced Neuro Diagnostics',
      badges: ['High Accuracy', 'Multi-Test Capability', 'Patient Safety', 'Reliable Performance'],
      copy: 'Comprehensive Electromyography, Evoked Potential, and Nerve Conduction Study platform with purpose-built clinical workflows.',
      image: '/products/scorpio-electromyograph-clean.png',
      slug: 'scorpio-emg',
      gradient: 'from-[#00609c] via-[#0277bd] to-[#01579b]',
    },
    {
      title: 'LIBRA MPM',
      subtitle: 'Smarter Patient Monitoring',
      badges: ['High Resolution', 'Real-Time Monitoring', 'Long Trend Storage', 'Reliable Performance'],
      copy: 'Clinical-grade multipara patient monitor with 15.6” high-brightness display, 8 real-time waveforms, and 120 hours trend storage.',
      image: '/products/libra-multipara-monitor-clean.png',
      slug: 'libra-mpm',
      gradient: 'from-[#00695c] via-[#00897b] to-[#004d40]',
    },
    {
      title: 'Allengers Morcellator',
      subtitle: 'Precision Cutting. Smooth Performance.',
      badges: ['Single-Use Blade System', 'Variable Speed Control', 'Twin Canister Suction', 'Dual Foot Pedal'],
      copy: 'Smooth, controlled tissue morcellation with variable speed control and dual-pedal operation for laparoscopic procedures.',
      image: '/products/dynacut-morcellator-clean.png',
      slug: 'allengers-morcellator',
      gradient: 'from-[#00838f] via-[#0097a7] to-[#006064]',
    },
    {
      title: 'BLAZE-prime Holmium Laser',
      subtitle: 'Precision Urology Intervention',
      badges: ['100W / 65W / 30W', 'Modulated Pulse Shaping', '12” Touchscreen', 'Turbo Cooling System'],
      copy: 'High-precision holmium laser platform engineered for lithotripsy and HoLEP with modulated pulse shaping to minimize retropulsion.',
      image: '/products/blaze-prime-holmium-laser-clean.png',
      slug: 'blaze-prime',
      gradient: 'from-[#0277bd] via-[#0288d1] to-[#01579b]',
    },
  ];

  // Auto-slide hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const activeSlide = heroSlides[heroIndex];

  // The 9 Products matching the original website's 3x3 grid
  const grid9Products = [
    { name: 'HOLMIUM LASER', slug: 'blaze-prime', img: '/products/blaze-prime-holmium-laser-clean.png' },
    { name: 'THULIUM FIBER LASER', slug: 'fiberlaze-plus', img: '/products/fiberlaze-thulium-laser-clean.png' },
    { name: 'MORCELLATOR', slug: 'allengers-morcellator', img: '/products/dynacut-morcellator-clean.png' },
    { name: 'POLYSOMNOGRAPH', slug: 'allengers-psg', img: '/products/polysomnograph-psg-clean.png' },
    { name: 'ELECTROMYOGRAPH', slug: 'scorpio-emg', img: '/products/scorpio-electromyograph-clean.png' },
    { name: 'ELECTROENCEPHALOGRAPH', slug: 'neuroplot', img: '/products/virgo-electroencephalograph-clean.png' },
    { name: 'TREADMILL TEST (TMT)', slug: 'gemini-treadmill', img: '/products/gemini-treadmill-tmt-clean.png' },
    { name: 'ELECTROCARDIOGRAPHS', slug: 'pisces-ecg', img: '/products/pisces-electrocardiograph-clean.png' },
    { name: 'MULTIPARA MONITORS', slug: 'libra-mpm', img: '/products/libra-multipara-monitor-clean.png' },
  ];

  return (
    <Shell>
      <main>
        {/* ============================================================== */}
        {/* 1. HERO CAROUSEL BANNER                                         */}
        {/* ============================================================== */}
        <section className={`relative overflow-hidden bg-gradient-to-r ${activeSlide.gradient} text-white transition-colors duration-700`}>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

          <div className="relative mx-auto flex min-h-[500px] max-w-[1280px] flex-col justify-between px-5 py-12 lg:px-8 lg:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Text Side */}
              <div className="z-10 max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  <Sparkles size={13} className="text-[#f6b95c]" />
                  Allengers Global Medical Systems
                </span>

                <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                  {activeSlide.title}
                </h1>
                <p className="mt-2 text-xl font-semibold text-[#a5e1f7]">
                  {activeSlide.subtitle}
                </p>

                {/* 4 Characteristic Badges from original banner */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {activeSlide.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded border border-white/40 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-6 text-white/85">
                  {activeSlide.copy}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/products/${activeSlide.slug}`}
                    className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#079cd4] shadow-lg transition hover:bg-[#e33136] hover:text-white"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>

                  <a
                    href="#enquire"
                    className="flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#079cd4]"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>

              {/* Product Image Side */}
              <div className="relative flex items-center justify-center">
                <div className="absolute h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="product-shadow product-float relative z-10 max-h-[380px] w-auto max-w-[90%] object-contain"
                />
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4">
              <div className="flex items-center gap-2">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.title}
                    onClick={() => setHeroIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      heroIndex === idx ? 'w-10 bg-white' : 'w-3 bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white hover:text-[#079cd4]"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setHeroIndex((prev) => (prev + 1) % heroSlides.length)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white hover:text-[#079cd4]"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. THE 9-PRODUCT GRID (Signature Blue Rounded Cards)            */}
        {/* ============================================================== */}
        <section className="bg-[#f0f5f9] px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="text-center">
              <span className="eyebrow text-[#079cd4]">Product Portfolios</span>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#14364b] sm:text-4xl">
                Explore Allengers Range of Medical Products
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#5c7280]">
                Click on any product to review detailed technical specifications, certifications, and procedure workflows.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid9Products.map((prod) => (
                <Link
                  key={prod.name}
                  href={`/products/${prod.slug}`}
                  className="group relative flex flex-col items-center justify-between rounded-[2rem] bg-[#1e3a53] p-7 shadow-md transition duration-300 hover:-translate-y-1.5 hover:bg-[#183046] hover:shadow-xl"
                  data-testid={`card-grid9-${prod.slug}`}
                >
                  {/* Clean Product machine image */}
                  <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl bg-white/95 p-4 shadow-inner">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Button bar matching original site */}
                  <div className="mt-5 flex w-full items-center justify-between rounded-full bg-[#079cd4] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow transition group-hover:bg-[#e33136]">
                    <span>{prod.name}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/30 text-white">
                      <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. ENQUIRE NOW SECTION (Direct Form on Home Page)               */}
        {/* ============================================================== */}
        <section id="enquire" className="bg-[#bce0f8] px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#a2ceee] bg-white/90 p-8 shadow-xl backdrop-blur-md sm:p-12">
            <div className="text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#14364b] sm:text-4xl">
                ENQUIRE NOW
              </h2>
              <p className="mt-2 text-sm text-[#4f6775]">
                Get factory-direct pricing, availability, and clinical demonstrations for your facility.
              </p>
            </div>

            {enquirySent ? (
              <div className="mt-8 rounded-2xl bg-[#e6f8f2] p-8 text-center text-[#087568]">
                <Check size={40} className="mx-auto mb-2 text-[#087568]" />
                <h3 className="font-display text-2xl font-bold">Enquiry Submitted!</h3>
                <p className="mt-2 text-sm">
                  Our Allengers Global clinical team will contact you shortly.
                </p>
                <button
                  onClick={() => setEnquirySent(false)}
                  className="mt-6 rounded-full bg-[#079cd4] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form
                className="mt-8 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnquirySent(true);
                }}
              >
                <div>
                  <label className="text-xs font-bold text-[#385365]">Name *</label>
                  <input
                    required
                    className="mt-1.5 w-full rounded-lg border border-[#c1d9eb] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#079cd4] focus:ring-2 focus:ring-[#079cd4]/20"
                    placeholder="Dr. Rajesh Kumar"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#385365]">Contact Number *</label>
                  <input
                    required
                    type="tel"
                    className="mt-1.5 w-full rounded-lg border border-[#c1d9eb] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#079cd4] focus:ring-2 focus:ring-[#079cd4]/20"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#385365]">Email Address *</label>
                  <input
                    required
                    type="email"
                    className="mt-1.5 w-full rounded-lg border border-[#c1d9eb] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#079cd4] focus:ring-2 focus:ring-[#079cd4]/20"
                    placeholder="doctor@hospital.org"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#385365]">Select Product *</label>
                  <select
                    value={inPageProduct}
                    onChange={(e) => setInPageProduct(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#c1d9eb] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#079cd4]"
                  >
                    <option value="All Products">Select Product / Specialty</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Dealership">Dealership / Export Enquiry</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#385365]">Leave us a message...</label>
                  <textarea
                    rows={3}
                    className="mt-1.5 w-full resize-none rounded-lg border border-[#c1d9eb] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#079cd4] focus:ring-2 focus:ring-[#079cd4]/20"
                    placeholder="Please specify your department, institution, or clinical enquiry..."
                  />
                </div>

                <div className="sm:col-span-2 sm:text-center">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1e293b] px-10 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#079cd4] sm:w-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. ABOUT US (Authentic Content from Original Site)              */}
        {/* ============================================================== */}
        <section id="about" className="bg-white px-5 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1240px]">
            <div className="text-center">
              <span className="eyebrow text-[#079cd4]">Pioneering Healthcare</span>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#14364b] sm:text-5xl">
                ABOUT US
              </h2>
            </div>

            <div className="mx-auto mt-8 max-w-4xl text-center">
              <p className="text-base leading-8 text-[#4a6372] sm:text-lg">
                Incorporated in the year <strong>2009</strong>, <strong>Allengers Global Healthcare Private Limited</strong> is headquartered at <strong>Chandigarh, India</strong>, and is one of the leading manufacturers of a wide range of medical diagnostic equipment comprising Holmium Laser, EEG, EMG, PSG, TMT, ECG, Holter and MPM.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#607785] sm:text-base">
                Our products are made with the best quality raw materials, making them functionally superior and cost-effective. Our focus on quality, system, and safety standards has led us to get certifications such as <strong>ISO 9001:2015</strong>, <strong>EN ISO 13485:2016</strong>, <strong>BIS</strong>, and <strong>CE</strong>.
              </p>
            </div>

            {/* Quick Pill Action Buttons from Original Site */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/products"
                className="rounded-full bg-[#079cd4] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
              >
                LEARN MORE
              </Link>
              <a
                href="#about"
                className="rounded-full bg-[#079cd4] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
              >
                COMPANY PROFILE
              </a>
              <a
                href="#about"
                className="rounded-full bg-[#079cd4] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
              >
                CERTIFICATIONS
              </a>
              <a
                href="#contact"
                className="rounded-full bg-[#079cd4] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
              >
                OFFICE LOCATIONS
              </a>
              <a
                href="#enquire"
                className="rounded-full bg-[#079cd4] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
              >
                DIRECT ENQUIRY
              </a>
              <a
                href="#contact"
                className="rounded-full bg-[#079cd4] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
              >
                CONTACT US
              </a>
            </div>

            {/* Authentic Company Milestones Video Section */}
            <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border-4 border-[#142838] bg-[#142838] shadow-2xl">
              <div className="relative group overflow-hidden">
                <img
                  src="/allengers-milestones.jpg"
                  alt="Allengers Milestones — Company Trajectory & Quality Commitment"
                  className="w-full object-cover transition duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition group-hover:bg-black/10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#079cd4] text-white shadow-xl transition group-hover:scale-110 group-hover:bg-[#e33136]">
                    <Play size={26} className="ml-1 fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/70 p-3 text-xs text-white backdrop-blur-md">
                  <p className="font-semibold text-center text-white/90">
                    “On an upward trajectory, the company is guided by a vision to provide high quality world-class medical solutions.”
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links from Original Site */}
            <div className="mt-10 flex items-center justify-center gap-4 text-sm font-bold text-[#14364b]">
              <span>Follow us on social media:</span>
              <a
                href="https://www.instagram.com/allengersglobal/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow transition hover:opacity-90"
                aria-label="Instagram"
              >
                <span className="font-black text-xs">IG</span>
              </a>
              <a
                href="https://www.facebook.com/allengersglobal/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877f2] text-white shadow transition hover:opacity-90"
                aria-label="Facebook"
              >
                <span className="font-black text-xs">FB</span>
              </a>
              <a
                href="https://www.linkedin.com/company/allengers-medical-systems-limited/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a66c2] text-white shadow transition hover:opacity-90"
                aria-label="LinkedIn"
              >
                <span className="font-black text-xs">IN</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. OUR SPECIALTIES (Urology, Cardiology, Neurology)              */}
        {/* ============================================================== */}
        <section id="specialties" className="bg-[#f7fafc] pb-24">
          {/* Blue Ribbon Banner */}
          <div className="bg-[#079cd4] py-3.5 text-center shadow-sm">
            <span className="font-display text-xl font-black uppercase tracking-widest text-white sm:text-2xl">
              OUR SPECIALTIES
            </span>
          </div>

          <div className="mx-auto mt-16 max-w-[1240px] space-y-24 px-5 lg:px-8">
            {/* Specialty 1: UROLOGY PRODUCTS */}
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#079cd4]">
                  Clinical Specialty 01
                </span>
                <h3 className="mt-2 font-display text-3xl font-extrabold text-[#079cd4] sm:text-4xl">
                  UROLOGY PRODUCTS
                </h3>
                <p className="mt-5 text-base leading-8 text-[#4a616f]">
                  Allengers BLAZE-prime Holmium laser is used to generate laser beam which is intended for lithotripsy and HoLEP. Advanced compressor based turbo cooling system to enhance laser beam quality and efficiency of the laser. BLAZE-prime has an Advanced long pulse laser with a super imposed modulated pulse to minimize retropulsion and enhanced the ablation rate.
                </p>

                <div className="mt-7">
                  <Link
                    href="/products/blaze-prime"
                    className="inline-flex items-center gap-2 rounded-full bg-[#079cd4] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
                  >
                    LEARN MORE <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 rounded-3xl bg-white p-8 shadow-sm">
                <img
                  src="/products/blaze-prime-holmium-laser-clean.png"
                  alt="Allengers BLAZE-prime Holmium Laser"
                  className="max-h-72 w-1/2 object-contain"
                />
                <img
                  src="/products/fiberlaze-thulium-laser-clean.png"
                  alt="Allengers FiberLAZE+ Thulium Fiber Laser"
                  className="max-h-72 w-1/2 object-contain"
                />
              </div>
            </div>

            {/* Specialty 2: CARDIOLOGY PRODUCTS */}
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div className="order-2 flex items-center justify-center rounded-3xl bg-white p-8 shadow-sm lg:order-1">
                <img
                  src="/products/gemini-treadmill-tmt-clean.png"
                  alt="Allengers Gemini TMT Machine"
                  className="max-h-80 w-auto object-contain"
                />
              </div>

              <div className="order-1 lg:order-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#079cd4]">
                  Clinical Specialty 02
                </span>
                <h3 className="mt-2 font-display text-3xl font-extrabold text-[#079cd4] sm:text-4xl">
                  CARDIOLOGY PRODUCTS
                </h3>
                <p className="mt-5 text-base leading-8 text-[#4a616f]">
                  Allengers’ Gemini Series of stress test systems are designed using state-of-the-art technology and more than 30 years of experience in design and manufacturing of medical equipment. Sturdy, in-house designed treadmill and stable base line during stress test are highlights of Allengers’ TMT.
                </p>

                <div className="mt-7">
                  <Link
                    href="/products/gemini-treadmill"
                    className="inline-flex items-center gap-2 rounded-full bg-[#079cd4] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
                  >
                    LEARN MORE <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Specialty 3: NEUROLOGY PRODUCTS */}
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#079cd4]">
                  Clinical Specialty 03
                </span>
                <h3 className="mt-2 font-display text-3xl font-extrabold text-[#079cd4] sm:text-4xl">
                  NEUROLOGY PRODUCTS
                </h3>
                <p className="mt-5 text-base leading-8 text-[#4a616f]">
                  Allengers Neuroplot test systems are designed using state-of-the-art technology and Recording & monitoring of electrical activities of the brain and to investigate and locate seizure origin. Advanced digital signal processing and brain mapping techniques are highlights of Allengers EEG.
                </p>

                <div className="mt-7">
                  <Link
                    href="/products/neuroplot"
                    className="inline-flex items-center gap-2 rounded-full bg-[#079cd4] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
                  >
                    LEARN MORE <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center rounded-3xl bg-white p-8 shadow-sm">
                <img
                  src="/products/virgo-electroencephalograph-clean.png"
                  alt="Allengers Neuroplot / VIRGO EEG Workstation"
                  className="max-h-80 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. STATS COUNTERS (7K+ / 12K+ / 36+)                            */}
        {/* ============================================================== */}
        <section className="relative overflow-hidden bg-[#182838] px-5 py-20 text-white lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(#079cd4_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

          <div className="relative mx-auto max-w-[1100px]">
            <div className="grid gap-10 sm:grid-cols-3">
              {/* Stat 1: 7K+ */}
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#079cd4]/40 bg-[#0e1a26] shadow-xl">
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#079cd4]/60" />
                  <span className="font-display text-4xl font-extrabold tracking-tight text-white">
                    7K+
                  </span>
                </div>
                <h4 className="mt-6 text-base font-bold text-[#b4cbdb]">
                  Clients Served
                </h4>
              </div>

              {/* Stat 2: 12K+ */}
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#14b8a6]/40 bg-[#0e1a26] shadow-xl">
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#14b8a6]/60" />
                  <span className="font-display text-4xl font-extrabold tracking-tight text-white">
                    12K+
                  </span>
                </div>
                <h4 className="mt-6 text-base font-bold text-[#b4cbdb]">
                  Product Installations
                </h4>
              </div>

              {/* Stat 3: 36+ */}
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#e33136]/40 bg-[#0e1a26] shadow-xl">
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#e33136]/60" />
                  <span className="font-display text-4xl font-extrabold tracking-tight text-white">
                    36+
                  </span>
                </div>
                <h4 className="mt-6 text-base font-bold text-[#b4cbdb]">
                  Countries Covered
                </h4>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

// -------------------------------------------------------------
// ALL PRODUCTS CATALOG PAGE
// -------------------------------------------------------------
function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All products');
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === 'All products' || p.category === activeCategory;
    const matchesSearch = `${p.name} ${p.category} ${p.eyebrow} ${p.description}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Shell>
      <main className="bg-[#f8fbfd] pb-24">
        {/* Banner */}
        <section className="bg-gradient-to-r from-[#102a3d] to-[#1e4866] py-16 text-white">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <span className="eyebrow text-[#079cd4]">Product Ecosystem</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              All Diagnostic & Surgical Systems
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#b6d0e0]">
              Discover our complete range of certified medical diagnostic equipment engineered for accuracy, longevity, and clinical excellence.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <section className="mx-auto mt-10 max-w-[1280px] px-5 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-[#d5e4ec] bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    activeCategory === cat
                      ? 'bg-[#079cd4] text-white shadow'
                      : 'bg-[#f0f6fa] text-[#486374] hover:bg-[#e1edf5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#d5e4ec] bg-[#f8fbfd] px-4 py-2 md:w-72">
              <Search size={16} className="text-[#079cd4]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products or specs..."
                className="w-full bg-transparent text-xs text-[#14364b] outline-none placeholder:text-[#8aa1b0]"
              />
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((prod) => (
              <div
                key={prod.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#d8e7ee] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  {/* Clean Machine Photo Display */}
                  <div className="relative flex h-64 items-center justify-center bg-[#f7fafc] p-6">
                    <span className="absolute left-4 top-4 rounded-full bg-[#18344c] px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-white">
                      {prod.category}
                    </span>
                    <img
                      src={prod.cleanImage}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <span className="eyebrow text-[#079cd4]">{prod.eyebrow}</span>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#14364b]">
                      {prod.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#637a88]">
                      {prod.description}
                    </p>

                    <div className="mt-4 border-t border-[#edf2f6] pt-3">
                      <p className="text-[.7rem] font-bold uppercase tracking-wider text-[#355365]">
                        Key Highlights:
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-[#526a79]">
                        {prod.specs.slice(0, 3).map((s) => (
                          <li key={s} className="flex items-center gap-1.5">
                            <Check size={13} className="shrink-0 text-[#079cd4]" />
                            <span className="truncate">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#edf2f6] p-6 pt-4">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#079cd4] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#e33136]"
                  >
                    View Specifications <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="my-16 rounded-3xl bg-white p-12 text-center shadow-sm">
              <p className="font-display text-xl font-bold text-[#14364b]">
                No products found matching "{search}"
              </p>
              <p className="mt-2 text-sm text-[#6c8290]">
                Try selecting another category or clear the search filter.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All products');
                }}
                className="mt-6 rounded-full bg-[#079cd4] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </Shell>
  );
}

// -------------------------------------------------------------
// PRODUCT DETAIL PAGE
// -------------------------------------------------------------
function ProductDetail({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  return (
    <Shell>
      <main className="bg-[#f8fbfd] pb-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1280px] px-5 pt-8 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#079cd4] transition hover:text-[#e33136]"
          >
            <ChevronLeft size={16} /> Back to All Products
          </Link>
        </div>

        {/* Product Overview Header Box */}
        <section className="mx-auto mt-6 max-w-[1280px] px-5 lg:px-8">
          <div className="grid items-center gap-12 rounded-[2.5rem] border border-[#d5e4ec] bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#18344c] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {product.category}
                </span>
                <span className="rounded-full bg-[#e1f2fc] px-3.5 py-1 text-xs font-bold text-[#079cd4]">
                  {product.badge}
                </span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-extrabold text-[#14364b] sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-base font-semibold text-[#079cd4]">
                {product.eyebrow}
              </p>

              <p className="mt-5 text-sm leading-7 text-[#506877] sm:text-base">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-[#079cd4] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#e33136]"
                >
                  Enquire for {product.shortName} <Send size={15} />
                </button>

                <a
                  href="#specs"
                  className="flex items-center gap-2 rounded-full border border-[#c6dae6] bg-[#f7fafd] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#345163] transition hover:bg-white"
                >
                  Technical Specifications <ChevronDown size={15} />
                </a>
              </div>

              {/* Direct helpline snippet */}
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#d8eaf4] bg-[#f1f8fc] p-4 text-xs text-[#355263]">
                <Phone size={18} className="text-[#079cd4]" />
                <div>
                  <span>Direct Sales Helpline: </span>
                  <strong className="text-[#14364b]">0172 – 6618001</strong> /{' '}
                  <strong className="text-[#079cd4]">1800-266-8800</strong>
                </div>
              </div>
            </div>

            {/* Real Product Image Showcase */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-[#f5f9fc] p-8">
              <img
                src={product.cleanImage}
                alt={product.name}
                className="max-h-[380px] w-auto max-w-full object-contain drop-shadow-md"
              />
              <p className="mt-4 text-xs font-semibold text-[#7c95a5]">
                Original Equipment Manufacturer (OEM) Image
              </p>
            </div>
          </div>
        </section>

        {/* Specifications & Features */}
        <section id="specs" className="mx-auto mt-16 max-w-[1280px] px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            {/* Technical Specifications */}
            <div className="rounded-[2rem] border border-[#d5e4ec] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e1f2fc] text-[#079cd4]">
                  <FileText size={20} />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#14364b]">
                  Technical Specifications
                </h3>
              </div>

              <div className="mt-6 divide-y divide-[#edf3f7]">
                {product.specs.map((spec, i) => (
                  <div key={spec} className="flex items-start gap-3 py-3 text-xs sm:text-sm text-[#465f70]">
                    <span className="font-mono text-xs font-bold text-[#079cd4]">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical & Design Features */}
            <div className="rounded-[2rem] border border-[#d5e4ec] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e1f2fc] text-[#079cd4]">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#14364b]">
                  Clinical Highlights & Compliance
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {product.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 rounded-xl bg-[#f7fafd] p-3 text-xs sm:text-sm text-[#465f70]">
                    <Check size={17} className="mt-0.5 shrink-0 text-[#079cd4]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Quality Standards Guarantee */}
              <div className="mt-8 rounded-xl bg-[#142838] p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#079cd4]">
                  <Award size={15} /> Quality & Regulatory Certifications
                </div>
                <p className="mt-2 text-xs leading-5 text-[#b0c7d6]">
                  Manufactured strictly compliant with <strong>ISO 9001:2015</strong>, <strong>EN ISO 13485:2016</strong>, <strong>BIS</strong>, and <strong>CE</strong> guidelines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {enquiryModalOpen && (
          <EnquiryModal
            onClose={() => setEnquiryModalOpen(false)}
            initialProduct={product.name}
          />
        )}
      </main>
    </Shell>
  );
}

// -------------------------------------------------------------
// NOT FOUND
// -------------------------------------------------------------
function NotFound() {
  return (
    <Shell>
      <main className="mx-auto flex min-h-[60vh] max-w-[1240px] flex-col items-center justify-center px-5 py-20 text-center">
        <h1 className="font-display text-6xl font-extrabold text-[#14364b]">404</h1>
        <p className="mt-3 text-lg text-[#556e7d]">Page Not Found</p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-[#079cd4] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#e33136]"
        >
          Return to Home
        </Link>
      </main>
    </Shell>
  );
}

// -------------------------------------------------------------
// MAIN ROUTER
// -------------------------------------------------------------
function Router() {
  const [, params] = useRoute('/products/:slug');
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:slug">
        {() => <ProductDetail slug={params?.slug ?? ''} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}