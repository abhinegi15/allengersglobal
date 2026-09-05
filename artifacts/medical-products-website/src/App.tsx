import { useEffect, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock,
  Globe2,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

// =============================================================================
// REAL ALLENGERS PRODUCT DATA (10 Authentic Systems)
// =============================================================================
export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: 'Urology' | 'Neurology' | 'Cardiology' | 'Patient Monitoring' | 'Laparoscopy';
  eyebrow: string;
  description: string;
  image: string;
  accent: string;
  badge: string;
  highlight: string;
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
    description:
      'High-precision holmium laser system with super-imposed modulated pulse shaping to minimize stone retropulsion and maximize ablation efficiency.',
    image: '/products/blaze-prime-holmium-laser-clean.png',
    accent: 'from-[#dceaf8] via-[#eff5fa] to-[#f7fbfa]',
    badge: 'Urology Flagship',
    highlight: '100W / 65W / 30W Laser',
    specs: [
      'Power Configurations: 100W, 65W, and 30W variants',
      'Pulse Energy: 0.1 J to 5.0 J adjustable range',
      'Pulse Frequency: Up to 80 Hz high repetition rate',
      '12” Bright color swivel interactive touchscreen',
      'Dual inverter compressor turbo cooling system',
      'Dedicated dusting and fragmentation operating modes',
    ],
    features: [
      'Super-imposed pulse modulation minimizes stone retropulsion',
      'Tilting and sideways swivel touchscreen display for surgeon ergonomics',
      'Compatible with optical fibers from 200 µm to 1000 µm',
      'Ideal for ureteroscopy, percutaneous nephrolithotomy (PCNL), and HoLEP',
      'CE & ISO 13485 certified with automated safety interlocks',
    ],
  },
  {
    slug: 'fiberlaze-plus',
    name: 'FiberLAZE+ Thulium Fiber Laser',
    shortName: 'Thulium Laser',
    category: 'Urology',
    eyebrow: 'Ultra-Fine Dusting & Tissue Surgery',
    description:
      'Extreme repetition rate thulium fiber laser with hybrid air cooling delivering superior stone dusting and bloodless soft tissue resection.',
    image: '/products/fiberlaze-thulium-laser-clean.png',
    accent: 'from-[#dcf2f5] via-[#eef9fa] to-[#f7fbfa]',
    badge: 'High Frequency',
    highlight: 'Up to 2500 Hz Pulse Rate',
    specs: [
      'Power Configurations: 60W and 35W available',
      'Extreme Pulse Rate: Up to 2500 Hz (60W) / 1600 Hz (35W)',
      'Seven selectable levels of pulse width modulation',
      'Hybrid air-cooling system (no water refill needed)',
      'Standard single-phase 220V power supply compatibility',
      'Integrated green aiming beam with adjustable brightness',
    ],
    features: [
      'Hands-free Ready/Standby selection with dual foot pedal',
      'Produces sub-millimeter stone dust for spontaneous passage',
      'Minimal carbonization and ultra-shallow penetration depth (<0.2 mm)',
      'Compact mobile cart designed for tight operating theater footprints',
      'Custom surgeon preset profiles with instant touch recall',
    ],
  },
  {
    slug: 'allengers-morcellator',
    name: 'Allengers Morcellator (DynaCut)',
    shortName: 'Morcellator',
    category: 'Laparoscopy',
    eyebrow: 'Laparoscopic Tissue Extraction',
    description:
      'Smooth, controlled laparoscopic tissue morcellation with variable speed cutting, twin collection canisters, and mobile stand with dual foot pedal.',
    image: '/products/dynacut-morcellator-clean.png',
    accent: 'from-[#d9f3f0] via-[#edf8f6] to-[#f7fbfa]',
    badge: 'Laparoscopy',
    highlight: 'Variable Speed Control',
    specs: [
      'Intuitive touchscreen digital interface',
      'Continuous variable speed cutting control',
      'Dual high-volume canister collection system',
      'Ergonomic mobile stand with dual foot switch',
      'Single-use and reusable blade compatibility',
      'Autoclavable high-torque motor handpiece',
    ],
    features: [
      'Predictable, smooth tissue handling for minimally invasive procedures',
      'Zero-vibration handpiece reduces surgeon fatigue',
      'Airtight vacuum sealing prevents loss of pneumoperitoneum',
      'Quick disassembly for hospital-grade cleaning and sterilization',
      'Seamlessly fits laparoscopic trocar ports (12mm / 15mm)',
    ],
  },
  {
    slug: 'neuroplot',
    name: 'Neuroplot / VIRGO EEG',
    shortName: 'Electroencephalograph',
    category: 'Neurology',
    eyebrow: 'High-Fidelity Brain Mapping',
    description:
      'State-of-the-art EEG systems for recording and analyzing electrical brain activity, identifying neurological disorders, and localizing seizure origins.',
    image: '/products/virgo-electroencephalograph-clean.png',
    accent: 'from-[#f5ebe0] via-[#faf5f0] to-[#f7fbfa]',
    badge: 'Neurology Flagship',
    highlight: '32-Channel DSP Acquisition',
    specs: [
      '32 / 24 Channel high-precision acquisition headbox',
      'Full HD medical display with high refresh rate',
      'Advanced digital signal processing (DSP) filters',
      'Integrated medical-grade trolley, PC, and laser printer',
      'Brain mapping, spectral analysis, and montage editor',
      'Synchronized digital video recording capabilities',
    ],
    features: [
      'Automated artifact rejection with crystal clear wave display',
      'Programmable photic stimulation frequency sweeps',
      'Pre-configured templates for adult, pediatric, and ICU studies',
      'Export studies in universal EDF, PDF, and clinical formats',
      'Compliant with international clinical neurophysiology standards',
    ],
  },
  {
    slug: 'scorpio-emg',
    name: 'SCORPIO EMG / EP / NCS',
    shortName: 'Electromyograph',
    category: 'Neurology',
    eyebrow: 'Advanced Neuromuscular Diagnostics',
    description:
      'High-fidelity EMG/EP/NCS platform designed for electromyography, nerve conduction velocity studies, and evoked potential analysis.',
    image: '/products/scorpio-electromyograph-clean.png',
    accent: 'from-[#e2eafb] via-[#f0f4fd] to-[#f7fbfa]',
    badge: 'Multi-Modality',
    highlight: 'EMG, NCV, SEP, VEP, BAEP',
    specs: [
      'Multi-test capability: EMG, NCV, SEP, VEP, BAEP',
      'Ultra-low-noise biopotential amplifiers',
      'Dedicated handheld electrical stimulator with intensity dial',
      'Integrated medical console with printer compartment',
      'Built-in anatomical nerve and muscle reference atlas',
      'Instant marker calculation for peak latency and amplitude',
    ],
    features: [
      'Streamlined workflows reduce test duration by up to 35%',
      'High-fidelity acoustic EMG audio monitoring with volume limiter',
      'Automated baseline tracking during repetitive stimulation (RNS)',
      'Side-by-side left/right limb nerve comparison charts',
      'Trusted across leading tertiary care neuro centers worldwide',
    ],
  },
  {
    slug: 'allengers-psg',
    name: 'Allengers Polysomnograph (PSG)',
    shortName: 'Polysomnograph',
    category: 'Neurology',
    eyebrow: 'Comprehensive Sleep Diagnostics',
    description:
      'Hospital-grade polysomnography platform for overnight sleep staging, respiratory monitoring, apnea indexing, and limb movement recording.',
    image: '/products/polysomnograph-psg-clean.png',
    accent: 'from-[#e8ecf8] via-[#f2f4fc] to-[#f7fbfa]',
    badge: 'Sleep Medicine',
    highlight: 'AASM Compliant Analysis',
    specs: [
      'Multi-channel overnight PSG acquisition station',
      'Synchronized infrared night-vision HD camera with audio',
      'SpO2, nasal pressure cannula, thermistor, and thoracic effort',
      'Leg EMG, body position sensor, and snore microphone',
      'AASM standard automated & manual sleep staging',
      'Real-time Apnea-Hypopnea Index (AHI) calculation',
    ],
    features: [
      'Patient-first non-intrusive sensor placement for natural sleep',
      'Zero data loss architecture during unexpected power interruptions',
      'Continuous oxygen desaturation index (ODI) profiling',
      'Full compatibility with CPAP and BiPAP pressure titration',
      'Single-page comprehensive diagnostic sleep summary',
    ],
  },
  {
    slug: 'gemini-treadmill',
    name: 'Gemini TMT Machine (GEMINI-A-DX)',
    shortName: 'TMT Machine',
    category: 'Cardiology',
    eyebrow: 'Cardiac Stress Test System',
    description:
      'Heavy-duty treadmill stress test system with 30+ years of manufacturing heritage, featuring a rock-steady digital baseline and custom Bruce protocols.',
    image: '/products/gemini-treadmill-tmt-clean.png',
    accent: 'from-[#e9f4ec] via-[#f3f9f5] to-[#f7fbfa]',
    badge: 'Cardiology Classic',
    highlight: 'Heavy-Duty 20 km/h AC Drive',
    specs: [
      'GEMINI-A-DX high-torque AC motor drive',
      'Speed range: 0.1 to 20 km/h with 0–22% grade elevation',
      'Ergonomic full-length side & front patient safety handrails',
      '12-lead simultaneous stress ECG data acquisition',
      'Proprietary digital baseline stabilization filter',
      'Emergency safety stop magnetic lanyard and push switch',
    ],
    features: [
      'Standard Bruce, Modified Bruce, Naughton, and custom protocols',
      'Real-time ST-segment elevation/depression tracking across all 12 leads',
      'Full disclosure recording with post-test review and re-scoring',
      'Reinforced deck accommodates patient weights up to 200 kg',
      'Ergonomic mobile console with LCD display and report printer',
    ],
  },
  {
    slug: 'pisces-ecg',
    name: 'Pisces 1012 12-Channel ECG',
    shortName: '12-Channel ECG',
    category: 'Cardiology',
    eyebrow: 'Diagnostic Electrocardiograph',
    description:
      'High-precision 12-channel electrocardiograph featuring an interactive LCD screen, alphanumeric silicone keypad, and high-speed thermal printing.',
    image: '/products/pisces-electrocardiograph-clean.png',
    accent: 'from-[#e2f3f5] via-[#f1f9fa] to-[#f7fbfa]',
    badge: 'Cardiac Essential',
    highlight: '12-Lead Simultaneous Print',
    specs: [
      '12-lead simultaneous acquisition and printing',
      'High-contrast LCD screen with real-time waveform preview',
      'Full alphanumeric silicone keyboard for patient entry',
      'High-resolution thermal array printhead',
      'Internal storage for hundreds of patient ECG records',
      'Dual power: AC mains and built-in rechargeable battery',
    ],
    features: [
      'Automated Glasgow-standard ECG measurement & interpretation',
      'Digital baseline drift, muscle tremor, and AC hum filters',
      'Lightweight portable chassis with fold-away carrying handle',
      'USB export for digital EMR integration and PDF reporting',
      'Fast 3-second quick-start for emergency department triage',
    ],
  },
  {
    slug: 'libra-mpm',
    name: 'Libra Smart / BRIO Multipara Monitor',
    shortName: 'Multipara Monitor',
    category: 'Patient Monitoring',
    eyebrow: 'Acute Care Bedside Monitor',
    description:
      'Clinical-grade bedside monitor delivering crystal clear real-time waveforms, multi-parameter tracking, and 120 hours of continuous trend storage.',
    image: '/products/libra-multipara-monitor-clean.png',
    accent: 'from-[#d8f2ee] via-[#edf7f5] to-[#f7fbfa]',
    badge: 'Critical Care',
    highlight: '15.6” High-Brightness Display',
    specs: [
      '15.6” / 12.1” anti-glare high-resolution TFT display',
      'Parameters: 5-Lead ECG, SpO2, NIBP, Respiration, 2-Temp, Pulse',
      'Up to 8 real-time high-contrast waveforms simultaneously',
      '120 hours graphical and tabular trend memory',
      '3-level audio-visual alarm system with 360° light bar',
      'High-capacity rechargeable lithium-ion battery',
    ],
    features: [
      'Customized monitoring modes for Adult, Pediatric, and Neonate',
      'Optical rotary navigation knob and one-touch quick buttons',
      'Central nursing station (CNS) wired and wireless support',
      'Chemical-resistant medical casing for hospital disinfectant wipes',
      'Flexible mounting: bed rail, wall arm, or rolling floor stand',
    ],
  },
  {
    slug: 'ecg-holter',
    name: 'Allengers ECG Holter System',
    shortName: 'ECG Holter',
    category: 'Cardiology',
    eyebrow: 'Ambulatory Cardiac Monitoring',
    description:
      'Feather-light ambulatory ECG recorder for 24–48 hour continuous cardiac recording with automated arrhythmia detection and HRV analysis software.',
    image: '/products/ecg-holter-clean.png',
    accent: 'from-[#e0f2fe] via-[#f0f9ff] to-[#f7fbfa]',
    badge: 'Ambulatory Care',
    highlight: 'Feather-Light (<80g)',
    specs: [
      'Selectable 3-Channel or 12-Channel recording modes',
      'Feather-light weight under 80 grams including battery',
      'Sampling frequency up to 10,000 Hz for pacemaker spike capture',
      'Up to 72 hours continuous recording on a single AAA battery',
      'OLED real-time screen for instantaneous lead contact verification',
      'High-speed secure digital (SD) card data transfer',
    ],
    features: [
      'Intelligent detection for Atrial Fibrillation, Pauses, and Bigeminy',
      'Heart Rate Variability (HRV) and ST segment displacement analysis',
      'Integrated Obstructive Sleep Apnea (OSA) screening calculator',
      'Single-click doctor-ready PDF report generation with signature',
      'Supreme patient compliance due to unobtrusive wearable design',
    ],
  },
];

const categories = [
  'All products',
  'Urology',
  'Neurology',
  'Cardiology',
  'Patient Monitoring',
  'Laparoscopy',
] as const;

// =============================================================================
// HEADER NAVIGATION
// =============================================================================
function Header({ onEnquire }: { onEnquire: (productName?: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    if (location !== '/') {
      window.location.href = '/#' + sectionId;
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8e7e6] bg-[#f7fbfa]/95 shadow-sm backdrop-blur-md">
      {/* Brand Top Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#079cd4] via-[#38bdf8] to-[#e33136]" />

      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/allengers-logo.png"
            alt="Allengers Global Healthcare"
            className="h-10 w-auto object-contain transition hover:opacity-90 sm:h-11"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-xs font-bold uppercase tracking-[.1em] transition ${
              location === '/' ? 'text-[#079cd4]' : 'text-[#5b707d] hover:text-[#079cd4]'
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-xs font-bold uppercase tracking-[.1em] transition ${
              location.startsWith('/products') ? 'text-[#079cd4]' : 'text-[#5b707d] hover:text-[#079cd4]'
            }`}
          >
            Products
          </Link>
          <button
            onClick={() => scrollToSection('video')}
            className="cursor-pointer text-xs font-bold uppercase tracking-[.1em] text-[#5b707d] transition hover:text-[#079cd4]"
          >
            Company Video
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="cursor-pointer text-xs font-bold uppercase tracking-[.1em] text-[#5b707d] transition hover:text-[#079cd4]"
          >
            Our Approach
          </button>
        </nav>

        {/* Right Action Callouts */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href="tel:18002668800"
            className="flex items-center gap-2 text-xs font-bold text-[#385365] transition hover:text-[#079cd4]"
          >
            <Phone size={14} className="text-[#079cd4]" />
            <span>1800-266-8800</span>
          </a>

          <button
            onClick={() => onEnquire()}
            className="cursor-pointer rounded-full bg-[#079cd4] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#0284c7] hover:shadow-md"
          >
            Enquire Now
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f3f1] text-[#14364b] transition md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="border-t border-[#d8e7e6] bg-[#f7fbfa] px-5 py-5 md:hidden">
          <div className="grid gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-[#14364b]"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-[#14364b]"
            >
              Products
            </Link>
            <button
              onClick={() => scrollToSection('video')}
              className="text-left text-sm font-bold text-[#14364b]"
            >
              Company Video
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-sm font-bold text-[#14364b]"
            >
              Our Approach
            </button>
            <a
              href="tel:18002668800"
              className="flex items-center gap-2 text-sm font-bold text-[#079cd4]"
            >
              <Phone size={16} /> 1800-266-8800 (Toll-Free)
            </a>
            <button
              onClick={() => {
                setMenuOpen(false);
                onEnquire();
              }}
              className="mt-2 rounded-full bg-[#079cd4] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0284c7]"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function Footer({ onEnquire }: { onEnquire: (productName?: string) => void }) {
  return (
    <footer className="border-t border-[#d8e7e6] bg-[#14364b] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:px-8">
        <div>
          <img
            src="/allengers-logo.png"
            alt="Allengers Global Healthcare"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#b9ced4]">
            Incorporated in 2009 in Chandigarh, India. Leading manufacturer of certified medical diagnostic & surgical equipment built for clinical excellence.
          </p>
          <button
            onClick={() => onEnquire()}
            className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-bold text-[#f6b95c] transition hover:text-white"
          >
            Start a consultation <ArrowUpRight size={16} />
          </button>
        </div>

        <div>
          <p className="eyebrow text-[#83c8cc]">Quick Navigation</p>
          <div className="mt-5 grid gap-3 text-sm text-[#b9ced4]">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/products" className="transition hover:text-white">
              All Products Catalog
            </Link>
            <a href="/#video" className="transition hover:text-white">
              Corporate Video
            </a>
            <a href="/#about" className="transition hover:text-white">
              About Allengers Global
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-[#83c8cc]">Direct Support</p>
          <div className="mt-5 grid gap-3 text-sm text-[#b9ced4]">
            <a
              href="mailto:enquiries@allengersglobal.com"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={15} className="shrink-0 text-[#83c8cc]" />
              <span className="break-all">enquiries@allengersglobal.com</span>
            </a>
            <a
              href="tel:01726618001"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Phone size={15} className="shrink-0 text-[#83c8cc]" />
              <span>0172 – 6618001</span>
            </a>
            <a
              href="tel:18002668800"
              className="flex items-center gap-2 font-semibold text-white transition hover:text-[#f6b95c]"
            >
              <Phone size={15} className="shrink-0 text-[#f6b95c]" />
              <span>1800-266-8800 (Toll Free)</span>
            </a>
            <div className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#83c8cc]" />
              <span className="text-xs leading-5">
                S.C.O 212-213-214, Sector 34-A, Chandigarh (U.T.), 160022, India
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow text-[#83c8cc]">Quality & Standards</p>
          <p className="mt-5 text-xs leading-6 text-[#b9ced4]">
            Certified in strict compliance with <strong>ISO 9001:2015</strong>, <strong>EN ISO 13485:2016</strong>, <strong>BIS</strong>, and <strong>CE</strong> medical device directives.
          </p>
          <div className="mt-6 h-px bg-white/15" />
          <p className="mt-4 text-xs text-[#83c8cc]">
            © {new Date().getFullYear()} Allengers Global Healthcare Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// ENQUIRY MODAL (Lead Generation Popup)
// =============================================================================
function EnquiryModal({
  onClose,
  initialProduct = '',
}: {
  onClose: () => void;
  initialProduct?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [productChoice, setProductChoice] = useState(initialProduct || products[0].name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#d8e7e6] bg-white p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer rounded-full p-2 text-[#5b707d] transition hover:bg-[#edf5f3] hover:text-[#14364b]"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#079cd4]/15 text-[#079cd4]">
              <Check size={32} />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-[#14364b]">
              Enquiry Submitted
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[#506875]">
              Thank you for contacting Allengers Global Healthcare. Our clinical product specialist will be in touch shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 cursor-pointer rounded-full bg-[#14364b] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#079cd4]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#079cd4]">
              <Sparkles size={14} /> Official Equipment Inquiry
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-[#14364b]">
              Request Product Consultation
            </h3>
            <p className="mt-1 text-xs text-[#506875]">
              Direct support from Allengers certified biomedical engineers and sales team.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <label className="text-xs font-bold text-[#385365]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. / Mr. / Ms."
                  className="mt-1 w-full rounded-lg border border-[#d8e7e6] bg-[#f7fbfa] px-3.5 py-2.5 text-sm text-[#14364b] outline-none transition focus:border-[#079cd4] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#385365]">Contact Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 or Mobile"
                  className="mt-1 w-full rounded-lg border border-[#d8e7e6] bg-[#f7fbfa] px-3.5 py-2.5 text-sm text-[#14364b] outline-none transition focus:border-[#079cd4] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-[#385365]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@hospital.org"
                  className="mt-1 w-full rounded-lg border border-[#d8e7e6] bg-[#f7fbfa] px-3.5 py-2.5 text-sm text-[#14364b] outline-none transition focus:border-[#079cd4] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-[#385365]">Product of Interest</label>
                <select
                  value={productChoice}
                  onChange={(e) => setProductChoice(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#d8e7e6] bg-[#f7fbfa] px-3.5 py-2.5 text-sm text-[#14364b] outline-none transition focus:border-[#079cd4] focus:bg-white"
                >
                  {products.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-[#385365]">Clinical Requirement / Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specify hospital department, bed capacity, or preferred quote options..."
                  className="mt-1 w-full resize-none rounded-lg border border-[#d8e7e6] bg-[#f7fbfa] px-3.5 py-2.5 text-sm text-[#14364b] outline-none transition focus:border-[#079cd4] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#079cd4] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#0284c7] sm:col-span-2"
              >
                Send Request <ArrowRight size={15} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// SHELL WRAPPER
// =============================================================================
function Shell({
  children,
  onEnquire,
}: {
  children: ReactNode;
  onEnquire: (productName?: string) => void;
}) {
  return (
    <div className="min-h-screen bg-[#f7fbfa] text-[#14364b]">
      <Header onEnquire={onEnquire} />
      {children}
      <Footer onEnquire={onEnquire} />
    </div>
  );
}

// =============================================================================
// PRODUCT CARD COMPONENT
// =============================================================================
function ProductCard({
  product,
  onEnquire,
}: {
  product: Product;
  onEnquire?: (name: string) => void;
}) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#d8e7e6] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#079cd4]/40 hover:shadow-xl">
      {/* Product Image Stage */}
      <div className={`relative flex min-h-[250px] items-center justify-center bg-gradient-to-br ${product.accent} p-6`}>
        {/* Soft Aura */}
        <div className="absolute h-40 w-40 rounded-full bg-white/70 blur-2xl transition duration-500 group-hover:scale-110" />

        <img
          src={product.image}
          alt={product.name}
          className="product-shadow relative z-10 max-h-[190px] w-auto max-w-[85%] object-contain transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[.62rem] font-bold uppercase tracking-wider text-[#079cd4] shadow-xs">
            {product.category}
          </span>
        </div>

        <span className="absolute bottom-3 right-4 rounded-full bg-white/80 px-2.5 py-0.5 text-[.6rem] font-semibold text-[#5b707d]">
          {product.highlight}
        </span>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="eyebrow text-[#079cd4]">{product.eyebrow}</p>
          <h3 className="mt-2 font-display text-xl font-bold text-[#14364b] transition group-hover:text-[#079cd4]">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#506875]">
            {product.description}
          </p>

          <ul className="mt-4 space-y-1.5 border-t border-[#edf5f3] pt-3">
            {product.specs.slice(0, 2).map((spec) => (
              <li key={spec} className="flex items-start gap-2 text-xs text-[#5b707d]">
                <Check size={13} className="mt-0.5 shrink-0 text-[#079cd4]" />
                <span className="line-clamp-1">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card CTA */}
        <div className="mt-6 flex items-center justify-between border-t border-[#edf5f3] pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-1.5 text-xs font-bold text-[#079cd4] transition hover:underline"
          >
            Specifications <ChevronRight size={14} />
          </Link>

          {onEnquire && (
            <button
              onClick={() => onEnquire(product.name)}
              className="cursor-pointer rounded-full bg-[#edf5f3] px-3.5 py-1.5 text-xs font-bold text-[#14364b] transition hover:bg-[#079cd4] hover:text-white"
            >
              Enquire
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// PAGE 1: HOME PAGE
// =============================================================================
function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<string | null>(null);

  const heroSlides = [
    {
      slug: 'blaze-prime',
      label: 'BLAZE-prime Holmium Laser',
      headline: 'Precision Urology Laser Lithotripsy',
      subhead:
        'High-energy pulsed laser with super-imposed pulse modulation to virtually eliminate stone retropulsion and accelerate fragmentation.',
      image: '/products/blaze-prime-holmium-laser-clean.png',
      badge: 'Urology Flagship',
      metrics: ['Up to 100W Output', 'Dusting & Fragmentation', 'Dual Inverter Cooling'],
    },
    {
      slug: 'fiberlaze-plus',
      label: 'FiberLAZE+ Thulium Fiber Laser',
      headline: 'Ultra-Fine Stone Dusting & Resection',
      subhead:
        'Extreme 2500 Hz pulse repetition rate with hybrid air cooling for whisper-quiet, water-free theater operations and bloodless tissue vaporization.',
      image: '/products/fiberlaze-thulium-laser-clean.png',
      badge: 'High Frequency',
      metrics: ['Up to 2500 Hz Pulse Rate', 'Hybrid Air Cooling', 'Minimal Penetration (<0.2mm)'],
    },
    {
      slug: 'neuroplot',
      label: 'Neuroplot / VIRGO EEG',
      headline: 'State-of-the-Art Brain Wave Diagnostics',
      subhead:
        'High-fidelity 32-channel digital signal processing system with real-time brain mapping, synchronized video, and automated seizure alerts.',
      image: '/products/virgo-electroencephalograph-clean.png',
      badge: 'Neurology Flagship',
      metrics: ['32-Channel DSP Acquisition', 'Spectral Brain Mapping', 'Full HD Medical Display'],
    },
    {
      slug: 'gemini-treadmill',
      label: 'Gemini TMT Machine (GEMINI-A-DX)',
      headline: 'Rugged Cardiac Treadmill Stress Testing',
      subhead:
        'Heavy-duty AC motor with rock-steady baseline filter, simultaneous 12-lead ECG trace, and standard Bruce stress protocols.',
      image: '/products/gemini-treadmill-tmt-clean.png',
      badge: 'Cardiology Classic',
      metrics: ['20 km/h AC Drive', '0–22% Elevation Grade', 'Full Disclosure ECG Storage'],
    },
    {
      slug: 'libra-mpm',
      label: 'Libra Smart / BRIO Multipara Monitor',
      headline: 'Intuitive Clinical Bedside Care',
      subhead:
        'Anti-glare 15.6” high-brightness display showing 8 real-time high-contrast waveforms and 120 hours of continuous multi-parameter trend memory.',
      image: '/products/libra-multipara-monitor-clean.png',
      badge: 'Critical Care',
      metrics: ['15.6” High-Res Touchscreen', '8 Real-time Waveforms', '120h Continuous Trends'],
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <Shell onEnquire={(p) => setEnquiryModalProduct(p || products[0].name)}>
      <main>
        {/* ============================================================== */}
        {/* HERO SECTION                                                  */}
        {/* ============================================================== */}
        <section className="site-grid relative overflow-hidden border-b border-[#d8e7e6] bg-gradient-to-b from-[#eaf4f2] via-[#f1f8f7] to-[#f7fbfa] py-14 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Text */}
              <div className="z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#079cd4]/30 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#079cd4] shadow-xs backdrop-blur-md">
                  <Sparkles size={14} className="text-[#f6b95c]" />
                  Allengers Global Healthcare Private Limited
                </div>

                <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#14364b] sm:text-6xl lg:leading-[1.08]">
                  {currentSlide.headline}
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-[#506875] sm:text-lg">
                  {currentSlide.subhead}
                </p>

                {/* Metric Quick-Pills */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {currentSlide.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8e7e6] bg-white/90 px-3 py-1.5 text-xs font-bold text-[#385365] shadow-xs"
                    >
                      <Check size={14} className="text-[#079cd4]" />
                      {metric}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/products/${currentSlide.slug}`}
                    className="flex items-center gap-2 rounded-full bg-[#14364b] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#079cd4] hover:shadow-lg"
                  >
                    Explore System <ArrowUpRight size={16} />
                  </Link>
                  <button
                    onClick={() => setEnquiryModalProduct(currentSlide.label)}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-[#079cd4] bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#079cd4] transition hover:bg-[#079cd4] hover:text-white"
                  >
                    Request Quote
                  </button>
                </div>
              </div>

              {/* Right Floating Product Hero */}
              <div className="relative flex min-h-[340px] items-center justify-center lg:min-h-[460px]">
                {/* 3D Aura Halo */}
                <div className="absolute h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-[#079cd4]/20 via-[#38bdf8]/15 to-transparent blur-3xl sm:h-[400px] sm:w-[400px]" />
                <div className="absolute bottom-6 h-8 w-[65%] rounded-[50%] bg-[#376b75]/15 blur-xl" />

                {/* Animated Floating Equipment Image */}
                <img
                  src={currentSlide.image}
                  alt={currentSlide.label}
                  className="product-float product-shadow relative z-10 max-h-[380px] w-auto max-w-[85%] object-contain"
                />

                {/* Floating Tag */}
                <div className="absolute right-2 top-4 z-20 rounded-xl border border-white bg-white/85 p-3 shadow-md backdrop-blur-md">
                  <p className="text-[.6rem] font-bold uppercase tracking-wider text-[#079cd4]">
                    {currentSlide.badge}
                  </p>
                  <p className="mt-1 font-display text-xs font-bold text-[#14364b]">
                    {currentSlide.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="mt-10 flex items-center justify-between border-t border-[#d8e7e6]/70 pt-6">
              <div className="flex flex-wrap gap-2">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.slug}
                    onClick={() => setActiveSlide(idx)}
                    className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition ${
                      activeSlide === idx
                        ? 'bg-[#079cd4] text-white shadow-xs'
                        : 'bg-white text-[#5b707d] hover:bg-[#dceef3]'
                    }`}
                  >
                    {slide.label.split(' ')[0]}
                  </button>
                ))}
              </div>

              <span className="font-mono text-xs font-bold text-[#5b707d]">
                0{activeSlide + 1} / 0{heroSlides.length}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* STATS & CREDENTIALS BANNER                                     */}
        {/* ============================================================== */}
        <section className="border-b border-[#d8e7e6] bg-white py-10">
          <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="border-r border-[#edf5f3] pr-4 last:border-none">
                <div className="flex items-center gap-2 text-[#079cd4]">
                  <Globe2 size={20} />
                  <span className="font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
                    7,000+
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#5b707d]">
                  Clients Served Globally
                </p>
              </div>

              <div className="border-r border-[#edf5f3] pr-4 last:border-none">
                <div className="flex items-center gap-2 text-[#079cd4]">
                  <Activity size={20} />
                  <span className="font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
                    12,000+
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#5b707d]">
                  Equipment Installations
                </p>
              </div>

              <div className="border-r border-[#edf5f3] pr-4 last:border-none">
                <div className="flex items-center gap-2 text-[#079cd4]">
                  <ShieldCheck size={20} />
                  <span className="font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
                    36+
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#5b707d]">
                  Export Countries
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#e33136]">
                  <Award size={20} />
                  <span className="font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
                    ISO & CE
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#5b707d]">
                  Certified Medical Standards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* YOUTUBE VIDEO SECTION (User Embedded Corporate Video)          */}
        {/* ============================================================== */}
        <section id="video" className="border-b border-[#d8e7e6] bg-[#edf6f7] py-20 lg:py-24">
          <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
            <div className="text-center">
              <span className="eyebrow text-[#079cd4]">Corporate Trajectory & Innovation</span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
                Experience Allengers Excellence in Motion
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#506875]">
                Watch our company journey, ISO certified manufacturing facilities, and medical engineering milestones.
              </p>
            </div>

            {/* Video Player Cinema Frame */}
            <div className="relative mx-auto mt-10 max-w-4xl">
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[#b5dbe0] bg-black shadow-2xl">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/3rZmaoAjxNM?si=1TqBOxwzX4siMD3H"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Video Caption Bar */}
              <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-[#d8e7e6] bg-white p-4 shadow-xs sm:flex-row">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#079cd4]/15 text-[#079cd4]">
                    <Play size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#14364b]">
                      Allengers Milestones — Global Healthcare Pioneer
                    </p>
                    <p className="text-[.72rem] text-[#6a8089]">
                      Chandigarh Headquarters • 50+ Years Engineering Heritage
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.youtube.com/watch?v=3rZmaoAjxNM"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-[#079cd4] hover:underline"
                >
                  Watch on YouTube <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FEATURED PRODUCTS PORTFOLIO                                    */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-4 border-b border-[#d8e7e6] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-[#079cd4]">Signature Medical Platforms</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#14364b] sm:text-4xl">
                Engineered for Modern Clinical Outcomes
              </h2>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#079cd4] hover:underline"
            >
              View All 10 Systems <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                onEnquire={(name) => setEnquiryModalProduct(name)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#14364b] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#079cd4] hover:shadow-lg"
            >
              Explore Complete Product Catalog <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CLINICAL PILLARS (Our Approach)                                */}
        {/* ============================================================== */}
        <section className="border-y border-[#d8e7e6] bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <p className="eyebrow text-[#079cd4]">Precision In Practice</p>
                <h2 className="mt-4 max-w-lg font-display text-3xl font-bold leading-[1.1] text-[#14364b] sm:text-4xl">
                  Every detail is designed for the care journey.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#506875] sm:text-base">
                From the first cardiac or neurological signal to laser intervention in the OR, Allengers systems help care teams work with clarity, confidence, and control.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'See Clearly',
                  copy: 'High-contrast displays, intuitive touchscreen controls, and noise-free signal acquisition keep clinical teams focused on the patient.',
                  icon: Activity,
                },
                {
                  number: '02',
                  title: 'Move Confidently',
                  copy: 'Rock-steady baselines, dual inverter cooling, and variable speed motors provide uninterrupted procedural performance in demanding environments.',
                  icon: ShieldCheck,
                },
                {
                  number: '03',
                  title: 'Stay Supported',
                  copy: 'An extensive direct network of factory-trained biomedical engineers and 24/7 technical assistance nationwide across hospitals and clinics.',
                  icon: HeartPulse,
                },
              ].map(({ number, title, copy, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#d8e7e6] bg-[#f7fbfa] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#079cd4]/40 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#079cd4] shadow-xs">
                      <Icon size={24} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#e33136]">{number}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-[#14364b]">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#6a8089]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ABOUT ALLENGERS GLOBAL HEALTHCARE                              */}
        {/* ============================================================== */}
        <section id="about" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow text-[#079cd4]">About Allengers Global</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
                Technology That Earns Clinical Trust.
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#506875]">
                Incorporated in the year 2009, <strong>Allengers Global Healthcare Private Limited</strong> is headquartered at Chandigarh, India, and is one of the leading manufacturers of a wide range of medical diagnostic and surgical equipment comprising Holmium Laser, Thulium Fiber Laser, EEG, EMG, PSG, TMT, ECG, Holter, and Multipara Patient Monitors.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#506875]">
                Our products are engineered with the highest quality clinical-grade components, making them functionally superior, durable, and cost-effective. Our relentless focus on quality, system engineering, and patient safety has earned international certifications including <strong>ISO 9001:2015</strong>, <strong>EN ISO 13485:2016</strong>, <strong>BIS</strong>, and <strong>CE</strong>.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setEnquiryModalProduct(products[0].name)}
                  className="cursor-pointer rounded-full bg-[#079cd4] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#0284c7]"
                >
                  Direct Enquiry
                </button>
                <a
                  href="tel:18002668800"
                  className="flex items-center gap-2 rounded-full border border-[#d8e7e6] bg-white px-5 py-3 text-xs font-bold text-[#14364b] shadow-xs transition hover:bg-[#edf5f3]"
                >
                  <Phone size={14} className="text-[#079cd4]" /> 1800-266-8800
                </a>
              </div>
            </div>

            {/* Right Quick Info Card */}
            <div className="rounded-3xl border border-[#d8e7e6] bg-white p-8 shadow-xl">
              <h3 className="font-display text-xl font-bold text-[#14364b]">
                Headquarters & Compliance
              </h3>

              <div className="mt-6 space-y-4 text-xs text-[#506875]">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <div>
                    <p className="font-bold text-[#14364b]">Corporate Headquarters</p>
                    <p>S.C.O 212-213-214, Sector 34-A, Chandigarh (U.T.), 160022, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <div>
                    <p className="font-bold text-[#14364b]">Official Communications</p>
                    <p>enquiries@allengersglobal.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <div>
                    <p className="font-bold text-[#14364b]">Global Accreditations</p>
                    <p>ISO 9001:2015, EN ISO 13485:2016, BIS, and CE Certified</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <div>
                    <p className="font-bold text-[#14364b]">Support Helpline</p>
                    <p>Toll Free (India): 1800-266-8800 | Board: 0172 – 6618001</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-[#eaf5f4] p-4 text-center">
                <p className="text-xs font-bold text-[#079cd4]">50+ Years Medical Heritage</p>
                <p className="mt-0.5 text-[.7rem] text-[#6a8089]">
                  Reliable Indian manufacturing trusted across 36+ export nations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* In-Page Modal */}
      {enquiryModalProduct && (
        <EnquiryModal
          onClose={() => setEnquiryModalProduct(null)}
          initialProduct={enquiryModalProduct}
        />
      )}
    </Shell>
  );
}

// =============================================================================
// PAGE 2: PRODUCTS CATALOG
// =============================================================================
function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All products');
  const [search, setSearch] = useState('');
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === 'All products' || p.category === activeCategory;
    const matchesSearch =
      search.trim() === '' ||
      `${p.name} ${p.shortName} ${p.category} ${p.eyebrow} ${p.specs.join(' ')}`
        .toLowerCase()
        .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Shell onEnquire={(p) => setEnquiryModalProduct(p || products[0].name)}>
      <main>
        {/* Banner */}
        <section className="site-grid border-b border-[#d8e7e6] bg-[#e8f4f1] py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
            <p className="eyebrow text-[#079cd4]">Complete Product Ecosystem</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#14364b] sm:text-6xl">
                Certified Precision <br />
                <span className="text-[#079cd4]">You Can Put to Work.</span>
              </h1>
              <p className="text-base leading-7 text-[#506875]">
                Explore high-performance diagnostic, surgical, and patient monitoring systems built to international hospital standards.
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-[#d8e7e6] pb-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Pills */}
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                    activeCategory === category
                      ? 'bg-[#14364b] text-white shadow-xs'
                      : 'bg-[#edf5f3] text-[#5b707d] hover:bg-[#d7ebe7]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <label className="flex items-center gap-2 rounded-full border border-[#d8e7e6] bg-white px-4 py-2 text-sm text-[#6a8089] lg:w-72">
              <Search size={16} className="text-[#079cd4]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products & specs..."
                className="w-full bg-transparent text-xs outline-none placeholder:text-[#9aafb5]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="cursor-pointer text-xs text-[#9aafb5] hover:text-[#14364b]">
                  <X size={14} />
                </button>
              )}
            </label>
          </div>

          {/* Product Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                onEnquire={(name) => setEnquiryModalProduct(name)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-2xl bg-[#edf5f3] py-16 text-center">
              <p className="font-display text-2xl font-bold text-[#14364b]">No products found</p>
              <p className="mt-2 text-xs text-[#6a8089]">
                Try adjusting your search criteria or category filter.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All products');
                }}
                className="mt-4 cursor-pointer rounded-full bg-[#079cd4] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#0284c7]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {enquiryModalProduct && (
        <EnquiryModal
          onClose={() => setEnquiryModalProduct(null)}
          initialProduct={enquiryModalProduct}
        />
      )}
    </Shell>
  );
}

// =============================================================================
// PAGE 3: PRODUCT DETAIL
// =============================================================================
function ProductDetail({ slug }: { slug: string }) {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const product = products.find((item) => item.slug === slug) ?? products[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <Shell onEnquire={() => setEnquiryModalOpen(true)}>
      <main className="pb-20">
        {/* Back Link */}
        <div className="mx-auto max-w-[1240px] px-5 pt-8 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6a8089] transition hover:text-[#079cd4]"
          >
            <ChevronRight size={14} className="rotate-180" /> Back to All Products
          </Link>
        </div>

        {/* Hero Product Spotlight */}
        <section
          className={`mx-auto mt-6 grid max-w-[1240px] overflow-hidden rounded-3xl border border-[#d8e7e6] bg-gradient-to-br ${product.accent} px-6 py-12 sm:px-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-16 lg:py-16`}
        >
          {/* Left Details */}
          <div className="order-2 lg:order-1">
            <span className="rounded-full bg-white/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#079cd4] shadow-xs">
              {product.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#14364b] sm:text-5xl lg:leading-[1.1]">
              {product.name}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#506875] sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-[#14364b] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#079cd4]"
              >
                Request Consultation <ArrowUpRight size={15} />
              </button>
              <a
                href="tel:18002668800"
                className="flex items-center gap-2 rounded-full border border-[#b5ced0] bg-white/80 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#14364b] transition hover:bg-white"
              >
                <Phone size={14} className="text-[#079cd4]" /> Call 1800-266-8800
              </a>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="order-1 relative flex min-h-[300px] items-center justify-center lg:order-2 lg:min-h-[420px]">
            <div className="absolute h-64 w-64 rounded-full bg-white/90 blur-3xl" />
            <img
              src={product.image}
              alt={product.name}
              className="product-float product-shadow relative z-10 max-h-[360px] w-auto max-w-[85%] object-contain"
            />
          </div>
        </section>

        {/* Specifications & Clinical Features */}
        <section className="mx-auto max-w-[1240px] px-5 pt-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-[#079cd4]">Engineering Specs</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#14364b]">
                Clinical Specifications
              </h2>
              <p className="mt-4 text-xs leading-6 text-[#6a8089]">
                Calibrated and manufactured according to international medical device directives (EN ISO 13485:2016, ISO 9001:2015, BIS, and CE).
              </p>
            </div>

            {/* Spec Cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec, idx) => (
                <div
                  key={spec}
                  className="rounded-xl border border-[#d8e7e6] bg-white p-5 shadow-xs"
                >
                  <span className="font-mono text-xs font-bold text-[#079cd4]">
                    0{idx + 1}.
                  </span>
                  <p className="mt-2 text-xs font-bold leading-5 text-[#385365]">{spec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Checklist */}
          <div className="mt-14 rounded-2xl border border-[#d8e7e6] bg-white p-8 shadow-xs">
            <h3 className="font-display text-xl font-bold text-[#14364b]">
              Clinical Highlights & Benefits
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {product.features.map((feat) => (
                <div key={feat} className="flex items-start gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <span className="text-xs leading-5 text-[#506875]">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          onClose={() => setEnquiryModalOpen(false)}
          initialProduct={product.name}
        />
      )}
    </Shell>
  );
}

// =============================================================================
// 404 NOT FOUND
// =============================================================================
function NotFound() {
  return (
    <Shell onEnquire={() => {}}>
      <main className="mx-auto flex min-h-[60vh] max-w-[1240px] flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-6xl font-extrabold text-[#14364b]">404</h1>
        <p className="mt-2 text-sm text-[#6a8089]">The requested page could not be found.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#079cd4] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#0284c7]"
        >
          Return to Home
        </Link>
      </main>
    </Shell>
  );
}

// =============================================================================
// MAIN ROUTER
// =============================================================================
export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:slug">
        {(params) => <ProductDetail slug={params.slug} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}
