import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, useRoute } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Cpu,
  FileText,
  Flame,
  Globe2,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
  Zap,
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
      'High-precision holmium laser system with super-imposed modulated pulse shaping to minimize retropulsion and maximize stone ablation efficiency.',
    image: '/products/blaze-prime-holmium-laser.jpeg',
    cleanImage: '/products/blaze-prime-holmium-laser-clean.png',
    accent: 'from-[#079cd4]/20 via-[#079cd4]/5 to-transparent',
    badge: 'Urology Flagship',
    highlight: '100W / 65W / 30W Laser',
    specs: [
      'Power Options: 100W, 65W, and 30W variants',
      'Pulse Energy: 0.1 J to 5.0 J adjustable',
      'Pulse Frequency: Up to 80 Hz high repetition rate',
      '12” Bright color interactive touchscreen display',
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
    image: '/products/fiberlaze-thulium-laser.jpeg',
    cleanImage: '/products/fiberlaze-thulium-laser-clean.png',
    accent: 'from-[#00b4d8]/20 via-[#00b4d8]/5 to-transparent',
    badge: 'High Frequency',
    highlight: 'Up to 2500 Hz Pulse Rate',
    specs: [
      'Power Configurations: 60W and 35W available',
      'Extreme Pulse Rate: Up to 2500 Hz (60W) / 1600 Hz (35W)',
      'Seven selectable levels of pulse width',
      'Hybrid air-cooling system (no water refill needed)',
      'Standard single-phase 220V power supply compatibility',
      'Integrated aiming beam with adjustable brightness',
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
    eyebrow: 'Tissue Extraction Platform',
    description:
      'Smooth, controlled laparoscopic tissue morcellation with variable speed cutting, twin collection canisters, and mobile stand with dual foot pedal.',
    image: '/products/dynacut-morcellator.jpeg',
    cleanImage: '/products/dynacut-morcellator-clean.png',
    accent: 'from-[#14b8a6]/20 via-[#14b8a6]/5 to-transparent',
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
      'Seamlessly fits laparoscopic trocar ports',
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
    image: '/products/virgo-electroencephalograph.jpeg',
    cleanImage: '/products/virgo-electroencephalograph-clean.png',
    accent: 'from-[#0284c7]/20 via-[#0284c7]/5 to-transparent',
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
    image: '/products/scorpio-electromyograph.jpeg',
    cleanImage: '/products/scorpio-electromyograph-clean.png',
    accent: 'from-[#3b82f6]/20 via-[#3b82f6]/5 to-transparent',
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
    image: '/products/polysomnograph-psg.jpeg',
    cleanImage: '/products/polysomnograph-psg-clean.png',
    accent: 'from-[#6366f1]/20 via-[#6366f1]/5 to-transparent',
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
    image: '/products/gemini-treadmill-tmt.jpeg',
    cleanImage: '/products/gemini-treadmill-tmt-clean.png',
    accent: 'from-[#10b981]/20 via-[#10b981]/5 to-transparent',
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
    image: '/products/pisces-electrocardiograph.jpeg',
    cleanImage: '/products/pisces-electrocardiograph-clean.png',
    accent: 'from-[#06b6d4]/20 via-[#06b6d4]/5 to-transparent',
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
    image: '/products/libra-multipara-monitor.jpeg',
    cleanImage: '/products/libra-multipara-monitor-clean.png',
    accent: 'from-[#0ea5e9]/20 via-[#0ea5e9]/5 to-transparent',
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
    image: '/products/ecg-holter.jpeg',
    cleanImage: '/products/ecg-holter-clean.png',
    accent: 'from-[#38bdf8]/20 via-[#38bdf8]/5 to-transparent',
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

// -----------------------------------------------------------------------------
// NAVIGATION BAR
// -----------------------------------------------------------------------------
function Header({ onEnquire }: { onEnquire: (productName?: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/#specialties', label: 'Specialties' },
    { href: '/#video', label: 'Company Video' },
    { href: '/#about', label: 'About Us' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#07131e]/90 shadow-2xl backdrop-blur-xl'
          : 'border-b border-white/5 bg-[#0a1826]/75 backdrop-blur-md'
      }`}
    >
      {/* Top Brand Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#079cd4] via-[#38bdf8] to-[#e33136]" />

      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/allengers-logo.png"
            alt="Allengers Global Healthcare"
            className="h-10 w-auto object-contain transition hover:opacity-95 sm:h-11"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-xs font-bold uppercase tracking-wider transition duration-200 ${
                location === item.href
                  ? 'text-[#079cd4]'
                  : 'text-[#94a9ba] hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:18002668800"
            className="flex items-center gap-2 text-xs font-semibold text-[#8eb0c4] transition hover:text-[#079cd4]"
          >
            <Phone size={14} className="text-[#079cd4]" />
            <span>1800-266-8800</span>
          </a>

          <button
            onClick={() => onEnquire()}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#079cd4] to-[#0284c7] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#079cd4]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#079cd4]/40 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Enquire Now <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-[#07131e] px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#079cd4]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-white/10 pt-4">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEnquire();
                  }}
                  className="w-full rounded-full bg-[#079cd4] py-3 text-center text-xs font-bold uppercase tracking-wider text-white"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// -----------------------------------------------------------------------------
// FOOTER
// -----------------------------------------------------------------------------
function Footer({ onEnquire }: { onEnquire: (productName?: string) => void }) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#060e17] text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-[#079cd4]/10 blur-[120px]" />

      {/* Category Ribbon */}
      <div className="border-b border-white/5 bg-[#091522] py-4">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 text-xs font-semibold text-[#8ca3b5]">
          {products.slice(0, 8).map((p, i) => (
            <span key={p.slug} className="flex items-center gap-6">
              <Link href={`/products/${p.slug}`} className="transition hover:text-[#079cd4]">
                {p.shortName}
              </Link>
              {i < 7 && <span className="text-white/15">/</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Col 1: Brand */}
        <div>
          <img src="/allengers-logo.png" alt="Allengers" className="h-10 w-auto object-contain" />
          <p className="mt-4 text-xs leading-6 text-[#8ea4b5]">
            Allengers Global Healthcare Private Limited is an ISO 9001:2015, EN ISO 13485:2016, BIS, and CE certified pioneer manufacturing medical diagnostic and surgical equipment.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/allengersglobal/"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-[#8ea4b5] transition hover:bg-[#079cd4] hover:text-white"
            >
              IG
            </a>
            <a
              href="https://www.facebook.com/allengersglobal/"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-[#8ea4b5] transition hover:bg-[#079cd4] hover:text-white"
            >
              FB
            </a>
            <a
              href="https://www.linkedin.com/company/allengers-medical-systems-limited/"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-[#8ea4b5] transition hover:bg-[#079cd4] hover:text-white"
            >
              IN
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#079cd4]">
            Quick Navigation
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-[#8ea4b5]">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home Overview
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition hover:text-white">
                Full Product Catalog (10 Systems)
              </Link>
            </li>
            <li>
              <a href="#specialties" className="transition hover:text-white">
                Clinical Specialties
              </a>
            </li>
            <li>
              <a href="#about" className="transition hover:text-white">
                Company Profile & Certifications
              </a>
            </li>
            <li>
              <a href="#video" className="transition hover:text-white">
                Manufacturing Video
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Specialties */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#079cd4]">
            Clinical Disciplines
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-[#8ea4b5]">
            <li>
              <Link href="/products" className="transition hover:text-white">
                Urology & Holmium Laser
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition hover:text-white">
                Neurology (EEG, EMG, PSG)
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition hover:text-white">
                Cardiology (TMT, ECG, Holter)
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition hover:text-white">
                Patient Monitoring (MPM)
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition hover:text-white">
                Laparoscopic Morcellation
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Official Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#079cd4]">
            Official Contact
          </h4>
          <div className="mt-4 space-y-3 text-xs text-[#8ea4b5]">
            <p className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#079cd4]" />
              <span>S.C.O 212-214, Sector 34-A, Chandigarh (U.T.) 160022, India</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-[#079cd4]" />
              <a href="tel:01726618001" className="hover:text-white">
                0172 – 6618001
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-[#e33136]" />
              <span className="font-semibold text-white">Toll Free: 1800-266-8800</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-[#079cd4]" />
              <a href="mailto:enquiries@allengersglobal.com" className="hover:text-white">
                enquiries@allengersglobal.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#04090f] py-6">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-5 text-center text-xs text-[#5e7789] sm:flex-row sm:text-left lg:px-8">
          <p>© {new Date().getFullYear()} Allengers Global Healthcare Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="text-[#079cd4]">www.allengersglobal.com</span>
            <span>•</span>
            <button onClick={() => onEnquire()} className="text-white hover:underline">
              Request Dealership
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// ENQUIRY MODAL (Modern Glassmorphic)
// -----------------------------------------------------------------------------
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#0a1826] text-white shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#e33136]"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="p-10 text-center sm:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#079cd4]/20 text-[#079cd4]">
              <Check size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Enquiry Received</h3>
            <p className="mt-3 text-sm text-[#94a9ba]">
              Thank you for contacting Allengers Global Healthcare. Our clinical sales specialist will reach out shortly regarding{' '}
              <strong className="text-white">{productChoice}</strong>.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-[#94a9ba]">
              <p>Direct Support Email: <strong className="text-white">enquiries@allengersglobal.com</strong></p>
              <p className="mt-1">Toll Free: <strong className="text-[#079cd4]">1800-266-8800</strong></p>
            </div>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-[#079cd4] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#0284c7]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-white/10 bg-gradient-to-r from-[#0d2337] to-[#0a1826] p-8">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#079cd4]">
                <Sparkles size={14} /> Official Manufacturer Consultation
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Direct Product Enquiry
              </h3>
              <p className="mt-1 text-xs text-[#8ca3b5]">
                Get factory-certified specifications, pricing, and hospital demonstrations.
              </p>
            </div>

            <form
              className="grid gap-4 p-8 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label className="text-xs font-bold text-[#8ca3b5]">Your Name *</label>
                <input
                  required
                  placeholder="Dr. Rajesh Kumar"
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white outline-none transition focus:border-[#079cd4] focus:bg-white/10"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#8ca3b5]">Contact Phone *</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white outline-none transition focus:border-[#079cd4] focus:bg-white/10"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#8ca3b5]">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="doctor@hospital.org"
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white outline-none transition focus:border-[#079cd4] focus:bg-white/10"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#8ca3b5]">Product of Interest *</label>
                <select
                  value={productChoice}
                  onChange={(e) => setProductChoice(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0a1826] px-4 py-2.5 text-xs text-white outline-none focus:border-[#079cd4]"
                >
                  <option value="General Enquiry">General Consultation</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Dealership">Export / Dealership Enquiry</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-[#8ca3b5]">Clinical Requirement / Message</label>
                <textarea
                  rows={3}
                  placeholder="Mention your hospital department, procedural need, or required configuration..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white outline-none transition focus:border-[#079cd4] focus:bg-white/10"
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#079cd4] to-[#0284c7] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:from-[#e33136] hover:to-[#b91c1c] sm:col-span-2"
              >
                Send Request <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Shell({
  children,
  onEnquire,
}: {
  children: ReactNode;
  onEnquire: (productName?: string) => void;
}) {
  return (
    <div className="min-h-screen bg-[#07131e] font-sans text-white antialiased selection:bg-[#079cd4] selection:text-white">
      <Header onEnquire={onEnquire} />
      {children}
      <Footer onEnquire={onEnquire} />
    </div>
  );
}

// =============================================================================
// PAGE 1: HOME PAGE
// =============================================================================
function Home() {
  const [activeHero, setActiveHero] = useState(0);
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<string | null>(null);
  const [activeSpecialty, setActiveSpecialty] = useState<'Urology' | 'Neurology' | 'Cardiology'>('Urology');

  const heroSystems = [
    {
      slug: 'blaze-prime',
      title: 'BLAZE-prime Holmium Laser',
      tagline: 'High-Energy Precision Lithotripsy & HoLEP Platform',
      highlight: 'Up to 100W Output Power | Stone Dusting Mode',
      image: '/products/blaze-prime-holmium-laser-clean.png',
      badge: 'Urology Flagship',
      specs: ['100W/65W/30W Options', '0.1 J – 5.0 J Energy', 'Dual Inverter Cooling', '12” Swivel Touchscreen'],
    },
    {
      slug: 'fiberlaze-plus',
      title: 'FiberLAZE+ Thulium Fiber Laser',
      tagline: 'Ultra-Fine Dusting & Rapid Soft Tissue Resection',
      highlight: 'Extreme 2500 Hz Pulse Frequency | Hybrid Air Cooling',
      image: '/products/fiberlaze-thulium-laser-clean.png',
      badge: 'High Frequency',
      specs: ['Up to 2500 Hz Rate', 'Minimal Retropulsion', 'Hands-free Dual Pedal', 'Near-zero Hemorrhage'],
    },
    {
      slug: 'neuroplot',
      title: 'Neuroplot / VIRGO EEG',
      tagline: 'State-of-the-Art Electroencephalography & Brain Mapping',
      highlight: '32-Channel High-Gain Headbox | Synchronized Video',
      image: '/products/virgo-electroencephalograph-clean.png',
      badge: 'Neurology Flagship',
      specs: ['32/24 Channel DSP', 'Spectral Brain Mapping', 'Full HD Medical Display', 'Automated Seizure Alert'],
    },
    {
      slug: 'gemini-treadmill',
      title: 'Gemini TMT Machine (GEMINI-A-DX)',
      tagline: 'Advanced Treadmill Stress Test with Stable Baseline Filter',
      highlight: 'Heavy-Duty 20 km/h Motor | 12-Lead Real-time ECG',
      image: '/products/gemini-treadmill-tmt-clean.png',
      badge: 'Cardiology Flagship',
      specs: ['Heavy-Duty AC Drive', '0–22% Elevation Grade', 'Bruce & Custom Protocols', 'Full Disclosure Review'],
    },
    {
      slug: 'libra-mpm',
      title: 'Libra Smart / BRIO Multipara Monitor',
      tagline: 'Clinical-Grade Acute Care Bedside Patient Monitoring',
      highlight: '15.6” High-Brightness Display | 120-Hour Trend Storage',
      image: '/products/libra-multipara-monitor-clean.png',
      badge: 'Critical Care',
      specs: ['15.6” Touch Screen', '8 Real-time Waveforms', 'ECG, SpO2, NIBP, Temp', 'Central Station Link'],
    },
  ];

  const currentHero = heroSystems[activeHero];

  return (
    <Shell onEnquire={(product) => setEnquiryModalProduct(product || '')}>
      <main>
        {/* ============================================================== */}
        {/* HERO SECTION WITH 3D AMBIENT LIGHT & MOTION                    */}
        {/* ============================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1928] via-[#081522] to-[#07131e] py-16 lg:py-24">
          {/* 3D Background Glow Orbs */}
          <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#079cd4]/15 blur-[140px]" />
          <div className="pointer-events-none absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-[#00b4d8]/10 blur-[150px]" />

          <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Column Text */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#079cd4]/30 bg-[#079cd4]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#38bdf8] backdrop-blur-md">
                  <Sparkles size={14} className="text-[#f6b95c]" />
                  Allengers Global Healthcare Private Limited
                </div>

                <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:leading-[1.1]">
                  Precision Medical <br />
                  <span className="bg-gradient-to-r from-[#079cd4] via-[#38bdf8] to-white bg-clip-text text-transparent">
                    Equipment Systems
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-base font-medium text-[#b0c7d7] sm:text-lg">
                  ISO 13485 & CE certified manufacturers of advanced Holmium & Thulium Lasers, EEG, EMG, TMT, ECG, and Multipara Monitors.
                </p>

                {/* Live System Feature Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {currentHero.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#9ec4db]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/products/${currentHero.slug}`}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#079cd4] to-[#0284c7] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#079cd4]/25 transition hover:scale-105 hover:shadow-[#079cd4]/40"
                  >
                    Explore System <ArrowRight size={16} />
                  </Link>

                  <button
                    onClick={() => setEnquiryModalProduct(currentHero.title)}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/15"
                  >
                    Request Quotation
                  </button>
                </div>

                {/* Interactive System Tabs */}
                <div className="mt-10 border-t border-white/10 pt-6">
                  <p className="text-[.7rem] font-bold uppercase tracking-widest text-[#69889d]">
                    Featured Systems:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {heroSystems.map((item, idx) => (
                      <button
                        key={item.slug}
                        onClick={() => setActiveHero(idx)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                          activeHero === idx
                            ? 'bg-[#079cd4] text-white shadow-md'
                            : 'border border-white/10 bg-white/5 text-[#8ea4b5] hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {item.badge}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Product Float Showcase */}
              <div className="relative flex items-center justify-center">
                {/* 3D Depth Backdrop Card */}
                <div className="relative flex h-[420px] w-full max-w-[480px] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
                  {/* Radial spotlight behind product */}
                  <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(7,156,212,0.25)_0%,transparent_70%)]" />

                  {/* Real Product Image with 3D Float */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHero.slug}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <img
                        src={currentHero.image}
                        alt={currentHero.title}
                        className="product-float max-h-[320px] w-auto max-w-full object-contain drop-shadow-[0_30px_35px_rgba(7,156,212,0.3)]"
                      />
                      <div className="mt-4 text-center">
                        <span className="text-xs font-bold text-white">{currentHero.title}</span>
                        <p className="text-[.7rem] text-[#7eb3cf]">{currentHero.highlight}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* STATS BAR (Live Real Figures from Original Site)               */}
        {/* ============================================================== */}
        <section className="relative z-20 -mt-8 mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-[#091a29]/95 p-6 shadow-2xl backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#079cd4]/20 text-[#079cd4]">
                <Building2 size={24} />
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-white">7,000+</p>
                <p className="text-xs font-medium text-[#8ea4b5]">Clients Served Worldwide</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#14b8a6]/20 text-[#14b8a6]">
                <Cpu size={24} />
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-white">12,000+</p>
                <p className="text-xs font-medium text-[#8ea4b5]">Product Installations</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f59e0b]/20 text-[#f59e0b]">
                <Globe2 size={24} />
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-white">36+</p>
                <p className="text-xs font-medium text-[#8ea4b5]">Countries Covered</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e33136]/20 text-[#e33136]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-display text-xl font-extrabold text-white">ISO & CE</p>
                <p className="text-xs font-medium text-[#8ea4b5]">ISO 13485, BIS, CE Certified</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ALL 10 REAL PRODUCTS (Modern 3D Tilt Cards)                    */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-[1280px] px-5 py-24 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow text-[#079cd4]">Engineered For Healthcare</span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Diagnostic & Surgical Product Lines
              </h2>
              <p className="mt-2 text-sm text-[#8ea4b5]">
                Real equipment manufactured by Allengers Global Healthcare Private Limited.
              </p>
            </div>

            <Link
              href="/products"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#079cd4] transition hover:text-[#38bdf8]"
            >
              View All 10 Products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <div
                key={product.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0e2133] to-[#091522] p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#079cd4]/50 hover:shadow-2xl hover:shadow-[#079cd4]/15"
              >
                <div>
                  {/* Card Image Area with Glowing Backdrop */}
                  <div className="relative flex h-52 items-center justify-center rounded-2xl bg-[#061019] p-4">
                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {product.category}
                    </span>
                    <img
                      src={product.cleanImage}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Details */}
                  <div className="mt-5">
                    <span className="text-[.7rem] font-bold uppercase tracking-wider text-[#079cd4]">
                      {product.eyebrow}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#8ea4b5] line-clamp-2">
                      {product.description}
                    </p>

                    {/* Specs Pills */}
                    <div className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
                      {product.specs.slice(0, 2).map((s) => (
                        <div key={s} className="flex items-center gap-2 text-xs text-[#b1c7d6]">
                          <Check size={12} className="text-[#079cd4]" />
                          <span className="truncate">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 rounded-xl bg-white/10 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#079cd4]"
                  >
                    Specs & Details
                  </Link>
                  <button
                    onClick={() => setEnquiryModalProduct(product.name)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold text-[#8ea4b5] transition hover:bg-white/15 hover:text-white"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* YOUTUBE EMBEDDED VIDEO SECTION (User Provided)                 */}
        {/* ============================================================== */}
        <section id="video" className="border-y border-white/10 bg-gradient-to-b from-[#081522] via-[#0b1d2e] to-[#081522] py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="text-center">
              <span className="eyebrow text-[#079cd4]">Corporate Trajectory & Innovation</span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Experience Allengers Excellence in Motion
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#8ea4b5]">
                Watch our company journey, ISO certified manufacturing facilities, and medical engineering milestones.
              </p>
            </div>

            {/* Video Player Cinema Frame */}
            <div className="relative mx-auto mt-12 max-w-4xl">
              {/* Ambient Glow behind player */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#079cd4]/30 via-[#38bdf8]/20 to-[#e33136]/30 blur-2xl" />

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/3rZmaoAjxNM?si=1TqBOxwzX4siMD3H"
                  title="Allengers Global Corporate Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Video Info Caption */}
              <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:flex-row">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#079cd4]/20 text-[#079cd4]">
                    <Play size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Allengers Milestones — Global Healthcare Pioneer
                    </p>
                    <p className="text-[.7rem] text-[#8ea4b5]">
                      Chandigarh, India Headquarters • 50+ Years Engineering Heritage
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.youtube.com/watch?v=3rZmaoAjxNM"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#079cd4] hover:underline"
                >
                  Watch on YouTube <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CLINICAL SPECIALTIES SHOWCASE (Interactive 3D Tabs)            */}
        {/* ============================================================== */}
        <section id="specialties" className="mx-auto max-w-[1280px] px-5 py-24 lg:px-8">
          <div className="text-center">
            <span className="eyebrow text-[#079cd4]">Specialized Departments</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Core Clinical Specialties
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#8ea4b5]">
              Tailored medical equipment platforms developed for high-throughput surgery and diagnostics.
            </p>

            {/* Specialty Selection Tabs */}
            <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
              {(['Urology', 'Cardiology', 'Neurology'] as const).map((spec) => (
                <button
                  key={spec}
                  onClick={() => setActiveSpecialty(spec)}
                  className={`rounded-full px-6 py-2 text-xs font-bold transition ${
                    activeSpecialty === spec
                      ? 'bg-[#079cd4] text-white shadow-lg'
                      : 'text-[#8ea4b5] hover:text-white'
                  }`}
                >
                  {spec} Products
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="mt-14">
            <AnimatePresence mode="wait">
              {activeSpecialty === 'Urology' && (
                <motion.div
                  key="Urology"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d2235] to-[#091522] p-8 shadow-2xl lg:grid-cols-[1.1fr_0.9fr] lg:p-14"
                >
                  <div>
                    <span className="rounded-full bg-[#079cd4]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                      Endourology & Lithotripsy
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-bold text-white">
                      BLAZE-prime & FiberLAZE+ Laser Platforms
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#9ec4db]">
                      Allengers BLAZE-prime Holmium laser is engineered for Lithotripsy and HoLEP. It features an advanced compressor-based turbo cooling system to optimize laser beam stability and longevity. Equipped with super-imposed modulated pulse technology to minimize retropulsion and maximize stone ablation speed.
                    </p>

                    <div className="mt-6 space-y-2 text-xs text-[#b0c8d7]">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#079cd4]" />
                        <span>High pulse power (up to 100W) for large stone fragmentation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#079cd4]" />
                        <span>FiberLAZE+ 2500 Hz extreme repetition rate for dust generation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#079cd4]" />
                        <span>DynaCut Morcellator for smooth laparoscopic tissue removal</span>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link
                        href="/products/blaze-prime"
                        className="rounded-full bg-[#079cd4] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#0284c7]"
                      >
                        Explore BLAZE-prime
                      </Link>
                      <button
                        onClick={() => setEnquiryModalProduct('BLAZE-prime Holmium Laser')}
                        className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/15"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 rounded-2xl bg-[#061019] p-8">
                    <img
                      src="/products/blaze-prime-holmium-laser-clean.png"
                      alt="BLAZE-prime"
                      className="max-h-72 w-auto object-contain drop-shadow-xl"
                    />
                    <img
                      src="/products/fiberlaze-thulium-laser-clean.png"
                      alt="FiberLAZE+"
                      className="max-h-72 w-auto object-contain drop-shadow-xl"
                    />
                  </div>
                </motion.div>
              )}

              {activeSpecialty === 'Cardiology' && (
                <motion.div
                  key="Cardiology"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d2235] to-[#091522] p-8 shadow-2xl lg:grid-cols-[1.1fr_0.9fr] lg:p-14"
                >
                  <div>
                    <span className="rounded-full bg-[#10b981]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#34d399]">
                      Non-Invasive Cardiac Systems
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-bold text-white">
                      Gemini TMT & Pisces 12-Lead ECG
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#9ec4db]">
                      Allengers Gemini Series stress test systems are built with state-of-the-art electronics backed by more than 30 years of medical design experience. A heavy-duty, whisper-quiet treadmill and proprietary baseline stabilization filter ensure clinical fidelity even during rigorous high-speed stress protocols.
                    </p>

                    <div className="mt-6 space-y-2 text-xs text-[#b0c8d7]">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#10b981]" />
                        <span>Smooth 20 km/h AC treadmill with full-length patient handrails</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#10b981]" />
                        <span>Pisces 1012 simultaneous 12-channel thermal printing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#10b981]" />
                        <span>Feather-light 3/12-lead continuous ambulatory ECG Holter</span>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link
                        href="/products/gemini-treadmill"
                        className="rounded-full bg-[#10b981] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#059669]"
                      >
                        Explore Gemini TMT
                      </Link>
                      <button
                        onClick={() => setEnquiryModalProduct('Gemini TMT Machine')}
                        className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/15"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center rounded-2xl bg-[#061019] p-8">
                    <img
                      src="/products/gemini-treadmill-tmt-clean.png"
                      alt="Gemini TMT"
                      className="max-h-80 w-auto object-contain drop-shadow-xl"
                    />
                  </div>
                </motion.div>
              )}

              {activeSpecialty === 'Neurology' && (
                <motion.div
                  key="Neurology"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d2235] to-[#091522] p-8 shadow-2xl lg:grid-cols-[1.1fr_0.9fr] lg:p-14"
                >
                  <div>
                    <span className="rounded-full bg-[#0284c7]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                      Neurodiagnostics & Sleep Medicine
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-bold text-white">
                      Neuroplot EEG & Scorpio EMG/EP
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#9ec4db]">
                      Allengers Neuroplot test systems are designed using cutting-edge DSP technology for recording and monitoring brain electrical potentials, spectral brain mapping, and accurate seizure localization. Paired with our Scorpio EMG and overnight PSG sleep diagnostic solutions.
                    </p>

                    <div className="mt-6 space-y-2 text-xs text-[#b0c8d7]">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#0284c7]" />
                        <span>32-channel EEG headbox with impedance measurement display</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#0284c7]" />
                        <span>Scorpio EMG/EP/NCS with dedicated ergonomic stimulator</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#0284c7]" />
                        <span>Comprehensive overnight AASM-compliant PSG sleep staging</span>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link
                        href="/products/neuroplot"
                        className="rounded-full bg-[#0284c7] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#0369a1]"
                      >
                        Explore Neuroplot
                      </Link>
                      <button
                        onClick={() => setEnquiryModalProduct('Neuroplot EEG')}
                        className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/15"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center rounded-2xl bg-[#061019] p-8">
                    <img
                      src="/products/virgo-electroencephalograph-clean.png"
                      alt="Neuroplot EEG"
                      className="max-h-80 w-auto object-contain drop-shadow-xl"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ABOUT ALLENGERS (Real Verified Corporate Credentials)          */}
        {/* ============================================================== */}
        <section id="about" className="border-t border-white/10 bg-[#06101a] py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <span className="eyebrow text-[#079cd4]">Corporate Profile</span>
                <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
                  About Allengers Global Healthcare
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-7 text-[#98b3c4]">
                  <p>
                    Incorporated in the year <strong className="text-white">2009</strong>, <strong className="text-white">Allengers Global Healthcare Private Limited</strong> is headquartered at <strong className="text-white">Chandigarh, India</strong>, and is a pioneer in the manufacturing of medical diagnostic and surgical equipment.
                  </p>
                  <p>
                    Our complete portfolio comprises Holmium Lasers, Thulium Fiber Lasers, Morcellators, EEG, EMG, PSG, TMT, ECG, Holter, and Multipara Patient Monitors (MPM).
                  </p>
                  <p>
                    Our unwavering commitment to quality and safety standards is verified through audited adherence to leading global regulatory certifications including <strong className="text-[#079cd4]">ISO 9001:2015</strong>, <strong className="text-[#079cd4]">EN ISO 13485:2016</strong>, <strong className="text-[#079cd4]">BIS</strong>, and <strong className="text-[#079cd4]">CE</strong>.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:enquiries@allengersglobal.com"
                    className="flex items-center gap-2 rounded-full bg-[#079cd4] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#e33136]"
                  >
                    <Mail size={14} /> enquiries@allengersglobal.com
                  </a>
                  <a
                    href="tel:01726618001"
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/15"
                  >
                    <Phone size={14} /> 0172 – 6618001
                  </a>
                </div>
              </div>

              {/* Verified Badges Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <Award size={28} className="text-[#079cd4]" />
                  <h4 className="mt-4 font-display text-lg font-bold text-white">
                    ISO 13485:2016 Certified
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-[#8ea4b5]">
                    Audited medical device quality management system ensuring patient safety and rigorous manufacturing standards.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <ShieldCheck size={28} className="text-[#14b8a6]" />
                  <h4 className="mt-4 font-display text-lg font-bold text-white">
                    CE & BIS Regulatory Mark
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-[#8ea4b5]">
                    Fully certified and approved for export and clinical operation across European, Asian, and Middle Eastern healthcare networks.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <Globe2 size={28} className="text-[#f59e0b]" />
                  <h4 className="mt-4 font-display text-lg font-bold text-white">
                    Global Export Footprint
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-[#8ea4b5]">
                    Over 36 export countries actively equipped with Allengers surgical lasers and cardiac diagnostic systems.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <HeartPulse size={28} className="text-[#e33136]" />
                  <h4 className="mt-4 font-display text-lg font-bold text-white">
                    24/7 Clinical Service
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-[#8ea4b5]">
                    Dedicated biomedical field support engineering team and toll-free helpline for rapid hospital maintenance response.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {enquiryModalProduct !== null && (
          <EnquiryModal
            onClose={() => setEnquiryModalProduct(null)}
            initialProduct={enquiryModalProduct}
          />
        )}
      </main>
    </Shell>
  );
}

// =============================================================================
// PAGE 2: PRODUCTS CATALOG PAGE
// =============================================================================
function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All products');
  const [search, setSearch] = useState('');
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchesCat = activeCategory === 'All products' || p.category === activeCategory;
    const matchesSearch = `${p.name} ${p.category} ${p.eyebrow} ${p.description}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Shell onEnquire={(p) => setEnquiryModalProduct(p || '')}>
      <main className="min-h-screen pb-24">
        {/* Header Hero */}
        <section className="border-b border-white/10 bg-gradient-to-b from-[#0a1826] to-[#07131e] py-16">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <span className="eyebrow text-[#079cd4]">Product Portfolios</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
              All Diagnostic & Surgical Systems
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8ea4b5]">
              Explore all 10 certified medical equipment platforms manufactured by Allengers Global Healthcare.
            </p>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="mx-auto mt-10 max-w-[1280px] px-5 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    activeCategory === cat
                      ? 'bg-[#079cd4] text-white shadow'
                      : 'bg-white/5 text-[#8ea4b5] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 md:w-72">
              <Search size={16} className="text-[#079cd4]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products or specs..."
                className="w-full bg-transparent text-xs text-white outline-none placeholder:text-[#6a8497]"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((prod) => (
              <div
                key={prod.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0e2133] to-[#091522] p-6 shadow-xl transition duration-300 hover:-translate-y-1.5 hover:border-[#079cd4]/40 hover:shadow-2xl"
              >
                <div>
                  <div className="relative flex h-56 items-center justify-center rounded-2xl bg-[#061019] p-4">
                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-white">
                      {prod.category}
                    </span>
                    <img
                      src={prod.cleanImage}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-5">
                    <span className="text-[.7rem] font-bold uppercase tracking-wider text-[#079cd4]">
                      {prod.eyebrow}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">
                      {prod.name}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#8ea4b5] line-clamp-2">
                      {prod.description}
                    </p>

                    <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                      {prod.specs.slice(0, 3).map((s) => (
                        <div key={s} className="flex items-center gap-2 text-xs text-[#b1c7d6]">
                          <Check size={13} className="shrink-0 text-[#079cd4]" />
                          <span className="truncate">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="flex-1 rounded-xl bg-[#079cd4] py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#0284c7]"
                  >
                    View Specifications
                  </Link>
                  <button
                    onClick={() => setEnquiryModalProduct(prod.name)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold text-[#8ea4b5] transition hover:bg-white/15 hover:text-white"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="my-20 rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
              <h3 className="font-display text-xl font-bold text-white">No products found</h3>
              <p className="mt-2 text-xs text-[#8ea4b5]">Try adjusting your search criteria or category filter.</p>
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

        {enquiryModalProduct !== null && (
          <EnquiryModal
            onClose={() => setEnquiryModalProduct(null)}
            initialProduct={enquiryModalProduct}
          />
        )}
      </main>
    </Shell>
  );
}

// =============================================================================
// PAGE 3: PRODUCT DETAIL PAGE
// =============================================================================
function ProductDetail({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  return (
    <Shell onEnquire={() => setEnquiryModalOpen(true)}>
      <main className="min-h-screen pb-24">
        {/* Top Breadcrumb Bar */}
        <div className="mx-auto max-w-[1280px] px-5 pt-8 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#079cd4] hover:text-[#38bdf8]"
          >
            <ChevronLeft size={16} /> Back to Products Catalog
          </Link>
        </div>

        {/* Product Showcase Header */}
        <section className="mx-auto mt-6 max-w-[1280px] px-5 lg:px-8">
          <div className="grid items-center gap-12 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e2133] via-[#0b1b2a] to-[#07131e] p-8 shadow-2xl lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#079cd4]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                  {product.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-bold text-white">
                  {product.badge}
                </span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-base font-semibold text-[#079cd4]">
                {product.eyebrow}
              </p>

              <p className="mt-5 text-sm leading-7 text-[#9cb4c5] sm:text-base">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#079cd4] to-[#0284c7] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#079cd4]/25 transition hover:scale-105"
                >
                  Request Consultation <Send size={15} />
                </button>

                <a
                  href="#specs"
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                >
                  Technical Specs <ChevronDown size={15} />
                </a>
              </div>

              {/* Direct Helpline Badge */}
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-[#8ea4b5]">
                <Phone size={18} className="text-[#079cd4]" />
                <div>
                  <span>Direct Sales Helpline: </span>
                  <strong className="text-white">0172 – 6618001</strong> /{' '}
                  <strong className="text-[#079cd4]">1800-266-8800 (Toll Free)</strong>
                </div>
              </div>
            </div>

            {/* Product Real Image Centerpiece */}
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#061019] p-8">
              <img
                src={product.cleanImage}
                alt={product.name}
                className="max-h-[380px] w-auto max-w-full object-contain drop-shadow-[0_30px_35px_rgba(7,156,212,0.25)]"
              />
              <span className="mt-4 text-[.7rem] font-semibold text-[#668294]">
                Genuine Allengers OEM System Photography
              </span>
            </div>
          </div>
        </section>

        {/* Specifications & Compliance Grid */}
        <section id="specs" className="mx-auto mt-16 max-w-[1280px] px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Tech Specs */}
            <div className="rounded-3xl border border-white/10 bg-[#091929] p-8 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#079cd4]/20 text-[#079cd4]">
                  <FileText size={20} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Technical Specifications
                </h3>
              </div>

              <div className="mt-6 divide-y divide-white/5">
                {product.specs.map((spec, i) => (
                  <div key={spec} className="flex items-start gap-3 py-3 text-xs sm:text-sm text-[#9cb4c5]">
                    <span className="font-mono text-xs font-bold text-[#079cd4]">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Highlights */}
            <div className="rounded-3xl border border-white/10 bg-[#091929] p-8 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14b8a6]/20 text-[#14b8a6]">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Clinical Highlights & Compliance
                </h3>
              </div>

              <div className="mt-6 space-y-3">
                {product.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 rounded-xl bg-white/5 p-3 text-xs sm:text-sm text-[#9cb4c5]">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#079cd4]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Quality Guarantee Box */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-[#079cd4]/20 via-[#079cd4]/5 to-transparent p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                  <Award size={16} /> Certified Manufacturing Quality
                </div>
                <p className="mt-2 text-xs leading-5 text-[#8ea4b5]">
                  Engineered and calibrated in strict compliance with <strong>ISO 9001:2015</strong>, <strong>EN ISO 13485:2016</strong>, <strong>BIS</strong>, and <strong>CE</strong> medical device directives.
                </p>
              </div>
            </div>
          </div>
        </section>

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

// =============================================================================
// 404 NOT FOUND
// =============================================================================
function NotFound() {
  return (
    <Shell onEnquire={() => {}}>
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-6xl font-extrabold text-white">404</h1>
        <p className="mt-2 text-sm text-[#8ea4b5]">Page Not Found</p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-[#079cd4] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0284c7]"
        >
          Return to Home
        </Link>
      </main>
    </Shell>
  );
}

// =============================================================================
// ROUTER & APP ROOT
// =============================================================================
export default function App() {
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