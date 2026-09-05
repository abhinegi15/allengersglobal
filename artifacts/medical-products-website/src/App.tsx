import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  ChevronLeft,
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
  Stethoscope,
  X,
  Zap,
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
  secondaryImage?: string;
  accent: string;
  badge: string;
  highlight: string;
  specs: string[];
  features: string[];
  applications?: string[];
};

export const products: Product[] = [
  {
    slug: 'blaze-prime',
    name: 'BLAZE-prime Holmium Laser',
    shortName: 'Holmium Laser',
    category: 'Urology',
    eyebrow: 'Lithotripsy & HoLEP Platform',
    description:
      'Allengers BLAZE-prime Holmium laser is used to generate laser beam which is intended for lithotripsy and HoLEP. Advanced compressor based turbo cooling system to enhance laser beam quality and efficiency of the laser. BLAZE-prime has an Advanced long pulse laser with a super imposed modulated pulse to minimize retropulsion and enhanced the ablation rate.',
    image: '/products/blaze-prime-nobg-1.png',
    secondaryImage: '/products/blaze-prime-nobg-2.png',
    accent: 'from-[#dbeafe] via-[#eff6ff] to-[#f0f9ff]',
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
    applications: [
      'Ureteroscopic Lithotripsy (URSL)',
      'Percutaneous Nephrolithotomy (PCNL)',
      'Holmium Laser Enucleation of Prostate (HoLEP)',
      'Urethral and Ureteral Stricture Ablation',
      'Bladder Tumor Resection (TURBT)',
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
    accent: 'from-[#cffafe] via-[#ecfeff] to-[#f0fdfa]',
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
    applications: [
      'Ultra-Fine Renal Calculus Dusting',
      'Thulium Laser Enucleation of the Prostate (ThuLEP)',
      'Soft Tissue Vaporization and Resection',
      'Endoscopic Urological Surgery',
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
    accent: 'from-[#ccfbf1] via-[#e6fffa] to-[#f0fdfa]',
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
    applications: [
      'Laparoscopic Myomectomy',
      'Subtotal & Total Laparoscopic Hysterectomy',
      'Minimally Invasive Soft Tissue Extraction',
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
    accent: 'from-[#ede9fe] via-[#f5f3ff] to-[#faf5ff]',
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
    applications: [
      'Epilepsy & Seizure Focus Localization',
      'ICU Continuous Cerebral Monitoring',
      'Sleep Staging and Coma Assessment',
      'Pediatric & Neonatal Neuro Diagnostics',
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
    accent: 'from-[#e0e7ff] via-[#eef2ff] to-[#f8faff]',
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
    applications: [
      'Neuropathy and Radiculopathy Diagnosis',
      'Carpal Tunnel Syndrome (CTS) Assessment',
      'Myasthenia Gravis (RNS Studies)',
      'Auditory & Visual Evoked Potentials',
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
    accent: 'from-[#e0f2fe] via-[#f0f9ff] to-[#f8fafc]',
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
    applications: [
      'Obstructive Sleep Apnea (OSA) Titration',
      'Restless Legs Syndrome (RLS) Studies',
      'Narcolepsy & Daytime Somnolence Diagnostics',
      'Clinical Sleep Laboratory Certification',
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
    accent: 'from-[#d1fae5] via-[#ecfdf5] to-[#f0fdf4]',
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
    applications: [
      'Coronary Artery Disease (CAD) Screening',
      'Post-Myocardial Infarction Exercise Evaluation',
      'Arrhythmia Provocation and Assessment',
      'Pre-Operative Cardiac Risk Stratification',
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
    accent: 'from-[#ccfbf1] via-[#f0fdfa] to-[#f8fafc]',
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
    applications: [
      'Emergency Room (ER) Acute Chest Pain Triage',
      'Outpatient Cardiology Consultations',
      'Bedside Routine Cardiac Assessment',
      'Mobile Medical Camps and Ambulances',
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
    accent: 'from-[#cffafe] via-[#ecfeff] to-[#f0fdfa]',
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
    applications: [
      'Intensive Care Unit (ICU) & CCU Bedside Telemetry',
      'Post-Anesthesia Care Unit (PACU)',
      'Operating Room (OR) Physiological Monitoring',
      'Emergency & Step-Down Wards',
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
    accent: 'from-[#e0f2fe] via-[#f0f9ff] to-[#f8fafc]',
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
    applications: [
      'Unexplained Syncope & Palpitations Evaluation',
      'Paroxysmal Atrial Fibrillation Detection',
      'Pacemaker Capture & Sensing Verification',
      'Post-Infarct Cardiac Risk Stratification',
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
    <header className="sticky top-0 z-40 border-b border-[#0f344d] bg-[#092233]/95 shadow-md backdrop-blur-md text-white">
      {/* Brand Top Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#079cd4] via-[#38bdf8] to-[#e33136]" />

      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/allengers-logo.png"
            alt="Allengers Global Healthcare"
            className="h-10 w-auto object-contain brightness-0 invert transition hover:opacity-90 sm:h-11"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-xs font-bold uppercase tracking-[.1em] transition ${
              location === '/' ? 'text-[#38bdf8]' : 'text-[#9cbcd0] hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-xs font-bold uppercase tracking-[.1em] transition ${
              location.startsWith('/products') ? 'text-[#38bdf8]' : 'text-[#9cbcd0] hover:text-white'
            }`}
          >
            Products
          </Link>
          <button
            onClick={() => scrollToSection('specialties')}
            className="cursor-pointer text-xs font-bold uppercase tracking-[.1em] text-[#9cbcd0] transition hover:text-white"
          >
            Specialties
          </button>
          <button
            onClick={() => scrollToSection('video')}
            className="cursor-pointer text-xs font-bold uppercase tracking-[.1em] text-[#9cbcd0] transition hover:text-white"
          >
            Company Video
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="cursor-pointer text-xs font-bold uppercase tracking-[.1em] text-[#9cbcd0] transition hover:text-white"
          >
            About Us
          </button>
        </nav>

        {/* Right Action Callouts */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href="tel:18002668800"
            className="flex items-center gap-2 text-xs font-bold text-[#b4d2e5] transition hover:text-[#38bdf8]"
          >
            <Phone size={14} className="text-[#38bdf8]" />
            <span>1800-266-8800</span>
          </a>

          <button
            onClick={() => onEnquire()}
            className="cursor-pointer rounded-full bg-[#079cd4] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-[#0284c7] hover:shadow-md"
          >
            Enquire Now
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="border-t border-[#0f344d] bg-[#092233] px-5 py-5 md:hidden">
          <div className="grid gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-white"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-white"
            >
              Products
            </Link>
            <button
              onClick={() => scrollToSection('specialties')}
              className="text-left text-sm font-bold text-white"
            >
              Specialties
            </button>
            <button
              onClick={() => scrollToSection('video')}
              className="text-left text-sm font-bold text-white"
            >
              Company Video
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-sm font-bold text-white"
            >
              About Us
            </button>
            <a
              href="tel:18002668800"
              className="flex items-center gap-2 text-sm font-bold text-[#38bdf8]"
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
    <footer className="border-t border-[#0d2a3f] bg-[#061521] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:px-8">
        <div>
          <img
            src="/allengers-logo.png"
            alt="Allengers Global Healthcare"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#9cb5c7]">
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
          <p className="eyebrow text-[#38bdf8]">Quick Navigation</p>
          <div className="mt-5 grid gap-3 text-sm text-[#9cb5c7]">
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
          <p className="eyebrow text-[#38bdf8]">Direct Support</p>
          <div className="mt-5 grid gap-3 text-sm text-[#9cb5c7]">
            <a
              href="mailto:enquiries@allengersglobal.com"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={15} className="shrink-0 text-[#38bdf8]" />
              <span className="break-all">enquiries@allengersglobal.com</span>
            </a>
            <a
              href="tel:01726618001"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Phone size={15} className="shrink-0 text-[#38bdf8]" />
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
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#38bdf8]" />
              <span className="text-xs leading-5">
                S.C.O 212-213-214, Sector 34-A, Chandigarh (U.T.), 160022, India
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow text-[#38bdf8]">Quality & Standards</p>
          <p className="mt-5 text-xs leading-6 text-[#9cb5c7]">
            Certified in strict compliance with <strong>ISO 9001:2015</strong>, <strong>EN ISO 13485:2016</strong>, <strong>BIS</strong>, and <strong>CE</strong> medical device directives.
          </p>
          <div className="mt-6 h-px bg-white/10" />
          <p className="mt-4 text-xs text-[#6fa3c4]">
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
    <div className="min-h-screen bg-[#f0f5f8] text-[#14364b]">
      <Header onEnquire={onEnquire} />
      {children}
      <Footer onEnquire={onEnquire} />
    </div>
  );
}

// =============================================================================
// ENHANCED PRODUCT CARD (With In-Card Specs Tabbing)
// =============================================================================
function EnhancedProductCard({
  product,
  onEnquire,
}: {
  product: Product;
  onEnquire?: (name: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'features'>('overview');

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#cfe0e8] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#079cd4]/60 hover:shadow-xl">
      {/* Product Image Stage */}
      <div className={`relative flex min-h-[260px] items-center justify-center bg-gradient-to-br ${product.accent} p-6 overflow-hidden`}>
        {/* Soft Radiant Halo */}
        <div className="absolute h-48 w-48 rounded-full bg-white/70 blur-2xl transition duration-700 group-hover:scale-125" />

        <img
          src={product.image}
          alt={product.name}
          className="product-shadow relative z-10 max-h-[200px] w-auto max-w-[85%] object-contain transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 flex items-center gap-2 z-20">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[.62rem] font-bold uppercase tracking-wider text-[#079cd4] shadow-xs">
            {product.category}
          </span>
        </div>

        <span className="absolute bottom-3 right-4 z-20 rounded-full bg-white/90 px-3 py-1 text-[.62rem] font-bold text-[#14364b] shadow-xs">
          {product.highlight}
        </span>
      </div>

      {/* Card Body with In-Card Mode Tabbing */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between">
            <p className="eyebrow text-[#079cd4]">{product.eyebrow}</p>
            <span className="text-[.62rem] font-semibold text-[#8ba2b0]">{product.badge}</span>
          </div>

          <h3 className="mt-1.5 font-display text-xl font-bold text-[#14364b] transition group-hover:text-[#079cd4]">
            {product.name}
          </h3>

          {/* In-Card Interactive Tabbing */}
          <div className="mt-3 flex rounded-lg bg-[#ebf3f6] p-1 text-[.65rem] font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`cursor-pointer flex-1 rounded-md py-1 transition ${
                activeTab === 'overview' ? 'bg-white text-[#14364b] shadow-xs' : 'text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`cursor-pointer flex-1 rounded-md py-1 transition ${
                activeTab === 'specs' ? 'bg-white text-[#14364b] shadow-xs' : 'text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Key Specs
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`cursor-pointer flex-1 rounded-md py-1 transition ${
                activeTab === 'features' ? 'bg-white text-[#14364b] shadow-xs' : 'text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Highlights
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="mt-3 min-h-[90px]">
            {activeTab === 'overview' && (
              <p className="text-xs leading-5 text-[#506875]">
                {product.description}
              </p>
            )}

            {activeTab === 'specs' && (
              <ul className="space-y-1.5">
                {product.specs.slice(0, 3).map((spec, i) => (
                  <li key={spec} className="flex items-start gap-2 text-xs text-[#385365]">
                    <span className="font-mono text-[.65rem] font-bold text-[#079cd4]">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span className="line-clamp-1">{spec}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'features' && (
              <ul className="space-y-1.5">
                {product.features.slice(0, 3).map((feat) => (
                  <li key={feat} className="flex items-start gap-1.5 text-xs text-[#385365]">
                    <Check size={13} className="mt-0.5 shrink-0 text-[#079cd4]" />
                    <span className="line-clamp-1">{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Card Actions */}
        <div className="mt-5 flex items-center justify-between border-t border-[#edf5f3] pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-1 text-xs font-bold text-[#079cd4] transition hover:text-[#0284c7] hover:underline"
          >
            Full Clinical Details <ChevronRight size={14} />
          </Link>

          {onEnquire && (
            <button
              onClick={() => onEnquire(product.name)}
              className="cursor-pointer rounded-full bg-[#ebf3f6] px-4 py-1.5 text-xs font-bold text-[#14364b] transition hover:bg-[#079cd4] hover:text-white"
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
// HERO CAROUSEL SLIDES DEFINITION (Rich Modality-Colored Backgrounds)
// =============================================================================
const carouselSlides = [
  {
    slug: 'blaze-prime',
    shortTitle: 'BLAZE-prime Holmium',
    title: 'BLAZE-prime Holmium Laser Platform',
    category: 'Urology Flagship',
    tagline: 'Super-Imposed Pulse Modulation for Superior Stone Fragmentation & HoLEP',
    description:
      'Allengers BLAZE-prime Holmium laser is used to generate laser beam which is intended for lithotripsy and HoLEP. Advanced compressor based turbo cooling system to enhance laser beam quality and efficiency of the laser. BLAZE-prime has an Advanced long pulse laser with a super imposed modulated pulse to minimize retropulsion and enhanced the ablation rate.',
    image: '/products/blaze-prime-nobg-1.png',
    secondaryImage: '/products/blaze-prime-nobg-2.png',
    accentBg: 'from-[#0b283d] via-[#103854] to-[#081e2e]',
    accentColor: '#38bdf8',
    glowColor: 'bg-[#079cd4]/35',
    badge: 'Urology Flagship',
    specs: ['Up to 100W Output Power', '0.1 J – 5.0 J Pulse Energy', 'Dual Inverter Turbo Cooling', '12” Swivel Touchscreen'],
  },
  {
    slug: 'fiberlaze-plus',
    shortTitle: 'FiberLAZE+ Thulium',
    title: 'FiberLAZE+ Thulium Fiber Laser',
    category: 'Endoscopic Surgery',
    tagline: 'Extreme 2500 Hz High-Frequency Dusting with Hybrid Air Cooling',
    description:
      'Delivers sub-millimeter stone dust for spontaneous natural passage and bloodless soft tissue resection with ultra-shallow (<0.2 mm) penetration depth.',
    image: '/products/fiberlaze-thulium-laser-clean.png',
    accentBg: 'from-[#082d30] via-[#0d4246] to-[#062123]',
    accentColor: '#2dd4bf',
    glowColor: 'bg-[#14b8a6]/35',
    badge: 'High Frequency Laser',
    specs: ['Up to 2500 Hz Pulse Rate', 'Hybrid Air-Cooled System', 'Minimal Tissue Carbonization', 'Single-Phase 220V Power'],
  },
  {
    slug: 'neuroplot',
    shortTitle: 'VIRGO 32-Ch EEG',
    title: 'Neuroplot / VIRGO EEG System',
    category: 'Neuro Diagnostics',
    tagline: '32-Channel DSP Brain Wave Mapping & Clinical Seizure Localization',
    description:
      'Hospital-grade clinical electroencephalograph station with synchronized HD video, automated artifact rejection, and pre-configured pediatric and adult ICU montages.',
    image: '/products/virgo-electroencephalograph-clean.png',
    accentBg: 'from-[#141b3b] via-[#1c2754] to-[#0e132b]',
    accentColor: '#818cf8',
    glowColor: 'bg-[#6366f1]/35',
    badge: 'Neurology Flagship',
    specs: ['32 / 24 Channel DSP Headbox', 'Spectral Brain Mapping', 'Full HD Medical Display', 'Universal EDF / PDF Export'],
  },
  {
    slug: 'gemini-treadmill',
    shortTitle: 'Gemini TMT Stress',
    title: 'Gemini TMT Cardiac Stress System',
    category: 'Cardiology Diagnostics',
    tagline: 'Heavy-Duty 20 km/h Treadmill Stress Test with Stable Baseline Filter',
    description:
      'Over 30 years of manufacturing excellence: GEMINI-A-DX AC drive, 12-lead simultaneous stress ECG recording, and standard Bruce stress protocols.',
    image: '/products/gemini-treadmill-tmt-clean.png',
    accentBg: 'from-[#0b2b20] via-[#103d2e] to-[#081e17]',
    accentColor: '#34d399',
    glowColor: 'bg-[#10b981]/35',
    badge: 'Cardiology Classic',
    specs: ['20 km/h AC High-Torque Drive', '0% to 22% Grade Elevation', '12-Lead Real-time Stress ECG', '200 kg Patient Deck Rating'],
  },
  {
    slug: 'libra-mpm',
    shortTitle: 'LIBRA 15.6” MPM',
    title: 'Libra Smart / BRIO Multipara Monitor',
    category: 'Patient Monitoring',
    tagline: '15.6” Anti-Glare Touchscreen with 120 Hours Continuous Trend Storage',
    description:
      'Clinical-grade bedside vital signs monitoring delivering 8 real-time waveforms, 360° visual alarm beacon, and Central Nursing Station (CNS) wired & wireless telemetry.',
    image: '/products/libra-multipara-monitor-clean.png',
    accentBg: 'from-[#0a2833] via-[#0e3948] to-[#071c24]',
    accentColor: '#38bdf8',
    glowColor: 'bg-[#0ea5e9]/35',
    badge: 'Critical Care Monitoring',
    specs: ['15.6” High-Brightness Display', '8 Real-time Waveforms', '120 Hours Graphical Trends', 'Central Station Networking'],
  },
];

// =============================================================================
// HERO BANNER CAROUSEL (Visible Auto-Slider with Progress Timer)
// =============================================================================
function HeroBannerCarousel({ onEnquire }: { onEnquire: (productName?: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(0);

  const duration = 5000; // 5 seconds per slide
  const step = 50; // update every 50ms

  // Continuous smooth auto-slide with visible progress bar
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
          return 0;
        }
        return old + (step / duration) * 100;
      });
    }, step);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) prevSlide();
    if (deltaX < -40) nextSlide();
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden border-b border-[#0f354f]"
    >
      {/* Top Timer Progress Line */}
      <div className="absolute top-0 left-0 z-30 h-[4px] w-full bg-black/30">
        <div
          className="h-full bg-gradient-to-r from-[#079cd4] via-[#38bdf8] to-[#f6b95c] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ============================================================== */}
      {/* HORIZONTAL SLIDING TRACK (True Physical Sliding Motion)       */}
      {/* ============================================================== */}
      <div className="w-full overflow-hidden relative">
        <div
          className="flex w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.slug}
              className={`w-full shrink-0 min-w-full relative bg-gradient-to-br ${slide.accentBg} text-white py-14 lg:py-20`}
            >
              {/* Subtle Background Medical Grid */}
              <div className="site-grid absolute inset-0 opacity-25 pointer-events-none" />

              {/* Ambient Halo Behind Image */}
              <div
                className={`pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full ${slide.glowColor} blur-3xl transition-all duration-700`}
              />

              <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] min-h-[460px]">
                  {/* Left Content Column */}
                  <div className="z-20 max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#38bdf8] shadow-xs backdrop-blur-md">
                      <Sparkles size={14} className="text-[#f6b95c]" />
                      <span>{slide.badge}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/80">{slide.category}</span>
                    </div>

                    {/* Title & Tagline */}
                    <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                      {slide.title}
                    </h1>

                    <p
                      className="mt-3 font-display text-base font-semibold sm:text-lg"
                      style={{ color: slide.accentColor }}
                    >
                      {slide.tagline}
                    </p>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#bad3e3]">
                      {slide.description}
                    </p>

                    {/* Specs Pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {slide.specs.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white shadow-xs backdrop-blur-xs"
                        >
                          <Check size={14} style={{ color: slide.accentColor }} />
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* CTA Row */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/products/${slide.slug}`}
                        className="flex items-center gap-2 rounded-full bg-[#079cd4] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition duration-200 hover:bg-[#0284c7] hover:scale-105"
                      >
                        Explore Specifications <ArrowRight size={15} />
                      </Link>

                      <button
                        onClick={() => onEnquire(slide.title)}
                        className="cursor-pointer flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition duration-200 hover:bg-white hover:text-[#14364b]"
                      >
                        Request Official Quote
                      </button>
                    </div>
                  </div>

                  {/* Right Product Image Column */}
                  <div className="relative flex min-h-[340px] items-center justify-center lg:min-h-[460px]">
                    {/* Concentric Rotating Ring */}
                    <div className="pointer-events-none absolute h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] rounded-full border border-dashed border-white/20 hud-spin" />

                    {/* Floating Equipment Image - Dual Model Showcase for BLAZE-prime or Single Model */}
                    {'secondaryImage' in slide && slide.secondaryImage ? (
                      <div className="relative z-20 flex items-end justify-center w-full">
                        <img
                          src={slide.image}
                          alt={`${slide.title} Model 1`}
                          className="product-float product-shadow-3d relative z-20 max-h-[300px] sm:max-h-[390px] w-auto object-contain"
                        />
                        <img
                          src={slide.secondaryImage}
                          alt={`${slide.title} Model 2`}
                          className="product-float product-shadow-3d relative z-10 max-h-[250px] sm:max-h-[330px] w-auto object-contain -ml-8 sm:-ml-12 opacity-95"
                          style={{ animationDelay: '1.2s' }}
                        />
                      </div>
                    ) : (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="product-float product-shadow-3d relative z-20 max-h-[340px] sm:max-h-[420px] w-auto max-w-[85%] object-contain"
                      />
                    )}

                    {/* Ground Reflection Shadow */}
                    <div className="absolute bottom-4 h-7 w-[65%] rounded-[50%] bg-black/40 blur-xl z-10" />

                    {/* Verified Quality Floating Badge */}
                    <div className="absolute right-2 top-6 z-30 rounded-2xl border border-white/20 bg-[#071f30]/85 p-3.5 shadow-xl backdrop-blur-md">
                      <div className="flex items-center gap-2 text-[#38bdf8]">
                        <BadgeCheck size={16} />
                        <span className="text-xs font-bold text-white">Certified Quality</span>
                      </div>
                      <p className="mt-0.5 text-[.7rem] text-[#9fc0d4]">
                        ISO 13485:2016 & CE Approved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* CAROUSEL BOTTOM BAR & AUTO-SLIDE PILLS                         */}
      {/* ============================================================== */}
      <div className="border-t border-[#0f344d] bg-[#071b29] px-5 py-4 text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 md:flex-row lg:px-8">
          {/* Arrow Buttons & Counter */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-[#079cd4] hover:border-[#079cd4]"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="font-mono text-xs font-bold text-[#8fb2c7]">
              0{currentSlide + 1} / 0{carouselSlides.length}
            </span>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-[#079cd4] hover:border-[#079cd4]"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Slide Selector Pills with Active Progress Underline */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {carouselSlides.map((item, index) => (
              <button
                key={item.slug}
                onClick={() => setCurrentSlide(index)}
                className={`relative cursor-pointer overflow-hidden rounded-full px-4 py-2 text-xs font-bold transition duration-200 ${
                  currentSlide === index
                    ? 'bg-[#079cd4] text-white shadow-md scale-105'
                    : 'bg-white/10 text-[#9bb8ca] hover:bg-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      currentSlide === index ? 'bg-white pulse-dot' : 'bg-white/40'
                    }`}
                  />
                  <span>{item.shortTitle}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Live Auto-Slide Status */}
          <div className="flex items-center gap-2 text-[.72rem] text-[#8fb2c7]">
            <span className="h-2 w-2 rounded-full bg-[#10b981] pulse-dot" />
            <span>Auto-Sliding (5s)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// PAGE 1: HOME PAGE (Rich Contrasting Background Sections)
// =============================================================================
function Home() {
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<string | null>(null);

  return (
    <Shell onEnquire={(p) => setEnquiryModalProduct(p || products[0].name)}>
      <main>
        {/* ============================================================== */}
        {/* 1. AUTO-SLIDE HERO BANNER CAROUSEL (Rich Modality Gradients)   */}
        {/* ============================================================== */}
        <HeroBannerCarousel onEnquire={(name) => setEnquiryModalProduct(name || '')} />

        {/* ============================================================== */}
        {/* 2. STATS & CREDENTIALS BAR (Deep Corporate Slate Background)   */}
        {/* ============================================================== */}
        <section className="border-b border-[#0d2a3f] bg-[#0b2132] py-10 text-white">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="border-r border-white/10 pr-4 last:border-none">
                <div className="flex items-center gap-2 text-[#38bdf8]">
                  <Globe2 size={22} />
                  <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                    7,000+
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#9cbcd0]">
                  Clients Served Globally
                </p>
              </div>

              <div className="border-r border-white/10 pr-4 last:border-none">
                <div className="flex items-center gap-2 text-[#38bdf8]">
                  <Activity size={22} />
                  <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                    12,000+
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#9cbcd0]">
                  Equipment Installations
                </p>
              </div>

              <div className="border-r border-white/10 pr-4 last:border-none">
                <div className="flex items-center gap-2 text-[#38bdf8]">
                  <ShieldCheck size={22} />
                  <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                    36+
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#9cbcd0]">
                  Export Countries
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#f6b95c]">
                  <Award size={22} />
                  <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                    ISO & CE
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#9cbcd0]">
                  Certified Medical Quality
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. CLINICAL SPECIALTIES MATRIX (Soft Sage/Mint Tinted BG)       */}
        {/* ============================================================== */}
        <section id="specialties" className="border-b border-[#cfe0e8] bg-[#ebf3f6] py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="text-center">
              <p className="eyebrow text-[#079cd4]">Specialized Healthcare Divisions</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
                Engineered for Clinical Acuity
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#506875]">
                Explore our specialized medical platforms built for demanding surgical suites, cardiac centers, and neurological diagnostic wards.
              </p>
            </div>

            {/* Bento Grid with Distinct Card Colors */}
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {/* Urology Hub (Soft Blue Sky Gradient) */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#bfdbfe] bg-gradient-to-br from-[#dbeafe] via-[#eff6ff] to-[#f0f9ff] p-8 shadow-xs transition duration-300 hover:shadow-xl md:col-span-2">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-md">
                    <span className="rounded-full bg-[#079cd4] px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-white shadow-xs">
                      Urology Center of Excellence
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-[#14364b]">
                      Laser Lithotripsy & Soft Tissue Surgery
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-[#506875]">
                      Dual high-precision platform: <strong>BLAZE-prime Holmium (100W/65W/30W)</strong> with pulse modulation and <strong>FiberLAZE+ Thulium (2500 Hz)</strong> with hybrid air cooling.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl border border-white bg-white/90 p-3 shadow-xs">
                        <p className="font-bold text-[#14364b]">Zero Retropulsion</p>
                        <p className="text-[.7rem] text-[#6a8089]">Patented pulse modulation</p>
                      </div>
                      <div className="rounded-xl border border-white bg-white/90 p-3 shadow-xs">
                        <p className="font-bold text-[#14364b]">Ultra-Fine Dusting</p>
                        <p className="text-[.7rem] text-[#6a8089]">Spontaneous stone passage</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex min-h-[220px] w-full items-center justify-center sm:w-64">
                    <div className="absolute h-40 w-40 rounded-full bg-[#079cd4]/20 blur-2xl" />
                    <div className="relative z-10 flex items-end justify-center">
                      <img
                        src="/products/blaze-prime-nobg-1.png"
                        alt="BLAZE-prime Holmium Laser"
                        className="product-float product-shadow relative z-20 max-h-[195px] object-contain transition duration-500 group-hover:scale-105"
                      />
                      <img
                        src="/products/blaze-prime-nobg-2.png"
                        alt="BLAZE Compact Console"
                        className="product-float product-shadow relative z-10 max-h-[160px] -ml-6 object-contain transition duration-500 group-hover:scale-105"
                        style={{ animationDelay: '1.2s' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between border-t border-[#bfdbfe]/60 pt-4">
                  <span className="text-xs font-semibold text-[#6b899e]">
                    Procedures: URS, PCNL, HoLEP, ThuLEP
                  </span>
                  <Link
                    href="/products/blaze-prime"
                    className="flex items-center gap-1.5 text-xs font-bold text-[#079cd4] hover:underline"
                  >
                    Explore Urology Lasers <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Neurology Hub (Soft Lavender Gradient) */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#ddd6fe] bg-gradient-to-br from-[#ede9fe] via-[#f5f3ff] to-[#faf5ff] p-8 shadow-xs transition duration-300 hover:shadow-xl">
                <div>
                  <span className="rounded-full bg-[#6366f1] px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-white shadow-xs">
                    Neuro Diagnostics
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-[#14364b]">
                    VIRGO EEG & SCORPIO EMG
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#506875]">
                    High-fidelity 32-channel DSP brain wave mapping, nerve conduction velocity, and evoked potential analysis.
                  </p>

                  <div className="relative mt-6 flex min-h-[160px] items-center justify-center">
                    <div className="absolute h-32 w-32 rounded-full bg-[#6366f1]/20 blur-2xl" />
                    <img
                      src="/products/virgo-electroencephalograph-clean.png"
                      alt="VIRGO EEG"
                      className="product-shadow relative z-10 max-h-[150px] object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-6 border-t border-[#ddd6fe]/60 pt-4">
                  <Link
                    href="/products/neuroplot"
                    className="flex items-center justify-between text-xs font-bold text-[#6366f1] hover:underline"
                  >
                    <span>Neuro Systems</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Cardiology Hub (Soft Mint Emerald Gradient) */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#a7f3d0] bg-gradient-to-br from-[#d1fae5] via-[#ecfdf5] to-[#f0fdf4] p-8 shadow-xs transition duration-300 hover:shadow-xl">
                <div>
                  <span className="rounded-full bg-[#10b981] px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-white shadow-xs">
                    Cardiology Lab
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-[#14364b]">
                    Gemini TMT & Pisces ECG
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#506875]">
                    Heavy-duty 20 km/h treadmill stress test station with stable digital baseline, 12-lead ECG, and ambulatory Holter.
                  </p>

                  <div className="relative mt-6 flex min-h-[160px] items-center justify-center">
                    <div className="absolute h-32 w-32 rounded-full bg-[#10b981]/20 blur-2xl" />
                    <img
                      src="/products/gemini-treadmill-tmt-clean.png"
                      alt="Gemini TMT"
                      className="product-shadow relative z-10 max-h-[150px] object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-6 border-t border-[#a7f3d0]/60 pt-4">
                  <Link
                    href="/products/gemini-treadmill"
                    className="flex items-center justify-between text-xs font-bold text-[#10b981] hover:underline"
                  >
                    <span>Cardiac Diagnostics</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Acute Care Hub (Soft Cyan Aqua Gradient) */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#a5f3fc] bg-gradient-to-br from-[#cffafe] via-[#ecfeff] to-[#f0fdfa] p-8 shadow-xs transition duration-300 hover:shadow-xl md:col-span-2">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-md">
                    <span className="rounded-full bg-[#14b8a6] px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-white shadow-xs">
                      Acute Care & Monitoring
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-[#14364b]">
                      Libra Smart MPM & Polysomnograph
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-[#506875]">
                      Crystal clear real-time monitoring for ICU, PACU, and Sleep Labs. Featuring 15.6” touch displays, 120-hour multi-parameter trends, and AASM-compliant sleep staging.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl border border-white bg-white/90 p-3 shadow-xs">
                        <p className="font-bold text-[#14364b]">120-Hour Memory</p>
                        <p className="text-[.7rem] text-[#6a8089]">Full trend graphical recall</p>
                      </div>
                      <div className="rounded-xl border border-white bg-white/90 p-3 shadow-xs">
                        <p className="font-bold text-[#14364b]">AASM Compliance</p>
                        <p className="text-[.7rem] text-[#6a8089]">Hospital sleep laboratory</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex min-h-[200px] w-full items-center justify-center sm:w-60">
                    <div className="absolute h-40 w-40 rounded-full bg-[#14b8a6]/20 blur-2xl" />
                    <img
                      src="/products/libra-multipara-monitor-clean.png"
                      alt="Libra MPM"
                      className="product-float product-shadow relative z-10 max-h-[190px] object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between border-t border-[#a5f3fc]/60 pt-4">
                  <span className="text-xs font-semibold text-[#6b899e]">
                    Bedside ICU, CCU, OR, and Clinical Sleep Labs
                  </span>
                  <Link
                    href="/products/libra-mpm"
                    className="flex items-center gap-1.5 text-xs font-bold text-[#14b8a6] hover:underline"
                  >
                    Explore Monitoring Systems <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. YOUTUBE CORPORATE CINEMA (Deep Dark Theater Background)     */}
        {/* ============================================================== */}
        <section id="video" className="border-y border-[#0d2a3f] bg-[#081b29] py-20 lg:py-24 text-white">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="text-center">
              <span className="eyebrow text-[#38bdf8]">Engineering Excellence In Motion</span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Allengers Milestones — Corporate Documentary
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#9cbcd0]">
                Take a virtual tour of our cleanroom manufacturing facilities, precision testing laboratories, and 50+ year legacy in Chandigarh, India.
              </p>
            </div>

            {/* Cinema Video Frame with Ambient Blue Halo */}
            <div className="relative mx-auto mt-10 max-w-4xl">
              <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#079cd4]/30 via-[#38bdf8]/20 to-[#e33136]/30 blur-2xl" />

              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-2 border-[#194e70] bg-black shadow-2xl">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/3rZmaoAjxNM?si=1TqBOxwzX4siMD3H"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Video Info Caption Bar */}
              <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-md sm:flex-row">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#079cd4]/25 text-[#38bdf8]">
                    <Play size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Allengers Milestones — Global Healthcare Pioneer
                    </p>
                    <p className="text-[.72rem] text-[#9cbcd0]">
                      Chandigarh Headquarters • 50+ Years Engineering Heritage
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="https://www.youtube.com/watch?v=3rZmaoAjxNM"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-[#38bdf8] hover:underline"
                  >
                    Open on YouTube <ArrowUpRight size={14} />
                  </a>
                  <button
                    onClick={() => setEnquiryModalProduct(products[0].name)}
                    className="cursor-pointer rounded-full bg-[#079cd4] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#0284c7]"
                  >
                    Contact Engineers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. FEATURED PRODUCTS CATALOG (Cool Ice-Blue Tinted BG)         */}
        {/* ============================================================== */}
        <section className="border-b border-[#cfe0e8] bg-[#e6eff3] py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-4 border-b border-[#cfe0e8] pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow text-[#079cd4]">Certified Product Catalog</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-[#14364b] sm:text-4xl">
                  Featured Clinical Systems
                </h2>
              </div>
              <Link
                href="/products"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#079cd4] hover:underline"
              >
                Browse Complete Catalog (10 Systems) <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <EnhancedProductCard
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
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. ABOUT ALLENGERS GLOBAL HEALTHCARE (Soft Steel Slate BG)     */}
        {/* ============================================================== */}
        <section id="about" className="bg-[#edf4f7] py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
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
                    Direct Hospital Enquiry
                  </button>
                  <a
                    href="tel:18002668800"
                    className="flex items-center gap-2 rounded-full border border-[#cfe0e8] bg-white px-5 py-3 text-xs font-bold text-[#14364b] shadow-xs transition hover:bg-[#ebf3f6]"
                  >
                    <Phone size={14} className="text-[#079cd4]" /> 1800-266-8800
                  </a>
                </div>
              </div>

              {/* Right Quick Info Card (Dark Blue Container) */}
              <div className="rounded-3xl border border-[#0f344d] bg-[#0b2436] p-8 shadow-xl text-white">
                <h3 className="font-display text-xl font-bold text-white">
                  Corporate Headquarters & Verification
                </h3>

                <div className="mt-6 space-y-4 text-xs text-[#9fc0d4]">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-[#38bdf8]" />
                    <div>
                      <p className="font-bold text-white">Registered Headquarters</p>
                      <p>S.C.O 212-213-214, Sector 34-A, Chandigarh (U.T.), 160022, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-[#38bdf8]" />
                    <div>
                      <p className="font-bold text-white">Corporate Enquiries</p>
                      <p>enquiries@allengersglobal.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[#38bdf8]" />
                    <div>
                      <p className="font-bold text-white">Accreditations</p>
                      <p>ISO 9001:2015, EN ISO 13485:2016, BIS, and CE Certified</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="mt-0.5 shrink-0 text-[#38bdf8]" />
                    <div>
                      <p className="font-bold text-white">Helpline Desk</p>
                      <p>Toll Free (India): 1800-266-8800 | Direct: 0172 – 6618001</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-white/10 p-4 text-center border border-white/10">
                  <p className="text-xs font-bold text-[#38bdf8]">50+ Years Medical Heritage</p>
                  <p className="mt-0.5 text-[.7rem] text-[#9fc0d4]">
                    Reliable Indian manufacturing trusted across 36+ export nations.
                  </p>
                </div>
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
// PAGE 2: PRODUCTS CATALOG (Rich Colored Banner & Tinted Background)
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
        {/* Banner with Deep Ocean Gradient */}
        <section className="border-b border-[#0f344d] bg-gradient-to-r from-[#0b2538] via-[#0f344e] to-[#081c2b] py-16 lg:py-20 text-white">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              <Sparkles size={14} /> Full Equipment Ecosystem
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                Certified Precision <br />
                <span className="text-[#38bdf8]">You Can Put to Work.</span>
              </h1>
              <p className="text-base leading-7 text-[#9fc0d4]">
                Explore our full line of surgical lasers, electro-diagnostics, stress testing systems, and acute care monitoring devices.
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search on Cool Slate Background */}
        <section className="bg-[#f0f5f8] py-12 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex flex-col gap-4 border-b border-[#cfe0e8] pb-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Pills with Counts */}
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
                {categories.map((category) => {
                  const count =
                    category === 'All products'
                      ? products.length
                      : products.filter((p) => p.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`cursor-pointer shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                        activeCategory === category
                          ? 'bg-[#079cd4] text-white shadow-xs'
                          : 'bg-white text-[#5b707d] border border-[#cfe0e8] hover:bg-[#dbeafe] hover:text-[#079cd4]'
                      }`}
                    >
                      <span>{category}</span>
                      <span
                        className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[.6rem] ${
                          activeCategory === category ? 'bg-white/25 text-white' : 'bg-[#e2edf3] text-[#385365]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <label className="flex items-center gap-2 rounded-full border border-[#cfe0e8] bg-white px-4 py-2 text-sm text-[#6a8089] lg:w-72 shadow-xs">
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
                <EnhancedProductCard
                  key={product.slug}
                  product={product}
                  onEnquire={(name) => setEnquiryModalProduct(name)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-12 rounded-2xl bg-white border border-[#cfe0e8] py-16 text-center shadow-xs">
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
          </div>
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
// PAGE 3: PRODUCT DETAIL (Cinematic Showcase with Interactive Tabs)
// =============================================================================
function ProductDetail({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState<'specs' | 'applications' | 'features' | 'compliance'>('specs');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const product = products.find((item) => item.slug === slug) ?? products[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Related systems in the same category
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category);

  return (
    <Shell onEnquire={() => setEnquiryModalOpen(true)}>
      <main className="pb-24 bg-[#f0f5f8]">
        {/* Top Breadcrumb & Status */}
        <div className="mx-auto max-w-[1280px] px-5 pt-8 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6a8089] transition hover:text-[#079cd4]"
            >
              <ChevronRight size={14} className="rotate-180" /> Back to All Products
            </Link>

            <span className="rounded-full bg-white border border-[#cfe0e8] px-3 py-1 text-xs font-bold text-[#385365] shadow-xs">
              ISO 13485:2016 & CE Verified
            </span>
          </div>
        </div>

        {/* Cinematic Product Spotlight Stage */}
        <section
          className={`mx-auto mt-6 grid max-w-[1280px] overflow-hidden rounded-3xl border border-[#cfe0e8] bg-gradient-to-br ${product.accent} px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-16 lg:py-16 shadow-md`}
        >
          {/* Left Details */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#079cd4] shadow-xs">
                {product.category}
              </span>
              <span className="text-xs font-semibold text-[#6a8089]">
                {product.badge}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#14364b] sm:text-5xl lg:leading-[1.1]">
              {product.name}
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#506875] sm:text-base">
              {product.description}
            </p>

            {/* Key Spec Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.specs.slice(0, 3).map((spec) => (
                <span
                  key={spec}
                  className="rounded-lg border border-white bg-white/90 px-3 py-1.5 text-xs font-bold text-[#385365] shadow-xs"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="cursor-pointer flex items-center gap-2 rounded-full bg-[#079cd4] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#0284c7]"
              >
                Request Quote / Demo <ArrowUpRight size={15} />
              </button>
              <a
                href="tel:18002668800"
                className="flex items-center gap-2 rounded-full border border-[#b5ced0] bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#14364b] shadow-xs transition hover:bg-[#ebf3f6]"
              >
                <Phone size={14} className="text-[#079cd4]" /> Call 1800-266-8800
              </a>
            </div>
          </div>

          {/* Right Product 3D Hero Display */}
          <div className="order-1 relative flex min-h-[320px] items-center justify-center lg:order-2 lg:min-h-[440px]">
            {/* Soft Radial Aura */}
            <div className="absolute h-72 w-72 rounded-full bg-white/90 blur-3xl" />
            <div className="absolute h-64 w-64 rounded-full border border-white/80 hud-spin" />

            {product.secondaryImage ? (
              <div className="relative z-10 flex items-end justify-center">
                <img
                  src={product.image}
                  alt={`${product.name} Model 1`}
                  className="product-float product-shadow-3d relative z-20 max-h-[330px] sm:max-h-[380px] w-auto object-contain"
                />
                <img
                  src={product.secondaryImage}
                  alt={`${product.name} Model 2`}
                  className="product-float product-shadow-3d relative z-10 max-h-[270px] sm:max-h-[320px] w-auto object-contain -ml-6 sm:-ml-10 opacity-95"
                  style={{ animationDelay: '1.2s' }}
                />
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="product-float product-shadow-3d relative z-10 max-h-[360px] w-auto max-w-[85%] object-contain"
              />
            )}
          </div>
        </section>

        {/* ============================================================== */}
        {/* INTERACTIVE MULTI-TAB SPECIFICATION CONSOLE                    */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-[1280px] px-5 pt-16 lg:px-8">
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#cfe0e8] overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('specs')}
              className={`cursor-pointer pb-4 px-4 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#079cd4] text-[#079cd4]'
                  : 'border-transparent text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`cursor-pointer pb-4 px-4 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                activeTab === 'applications'
                  ? 'border-[#079cd4] text-[#079cd4]'
                  : 'border-transparent text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Clinical Applications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`cursor-pointer pb-4 px-4 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                activeTab === 'features'
                  ? 'border-[#079cd4] text-[#079cd4]'
                  : 'border-transparent text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Clinical Highlights
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`cursor-pointer pb-4 px-4 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                activeTab === 'compliance'
                  ? 'border-[#079cd4] text-[#079cd4]'
                  : 'border-transparent text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Compliance & Safety
            </button>
          </div>

          {/* Tab 1: Technical Specifications */}
          {activeTab === 'specs' && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.specs.map((spec, idx) => (
                <div
                  key={spec}
                  className="rounded-2xl border border-[#cfe0e8] bg-white p-6 shadow-xs transition duration-200 hover:border-[#079cd4]"
                >
                  <span className="font-mono text-xs font-bold text-[#079cd4]">
                    0{idx + 1}.
                  </span>
                  <p className="mt-3 text-xs font-bold leading-5 text-[#385365]">{spec}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Clinical Applications */}
          {activeTab === 'applications' && (
            <div className="mt-8 rounded-3xl border border-[#cfe0e8] bg-white p-8 shadow-xs">
              <h3 className="font-display text-xl font-bold text-[#14364b]">
                Target Clinical Procedures & Specialties
              </h3>
              <p className="mt-1 text-xs text-[#6a8089]">
                Engineered for specialized hospital environments, diagnostic centers, and operating theaters.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(product.applications || [
                  'Hospital Inpatient & Outpatient Departments',
                  'Specialty Diagnostic Clinics',
                  'Tertiary Care Surgical Suites',
                ]).map((app) => (
                  <div key={app} className="flex items-start gap-3 rounded-xl bg-[#ebf3f6] p-4 border border-[#cfe0e8]">
                    <Sparkles size={16} className="mt-0.5 shrink-0 text-[#079cd4]" />
                    <span className="text-xs font-bold text-[#14364b]">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Clinical Highlights */}
          {activeTab === 'features' && (
            <div className="mt-8 rounded-3xl border border-[#cfe0e8] bg-white p-8 shadow-xs">
              <h3 className="font-display text-xl font-bold text-[#14364b]">
                Key Engineering & Operator Highlights
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
          )}

          {/* Tab 4: Compliance & Safety */}
          {activeTab === 'compliance' && (
            <div className="mt-8 rounded-3xl border border-[#cfe0e8] bg-white p-8 shadow-xs">
              <h3 className="font-display text-xl font-bold text-[#14364b]">
                Accredited Standards & Quality Assurance
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#cfe0e8] bg-[#ebf3f6] p-5">
                  <BadgeCheck size={24} className="text-[#079cd4]" />
                  <p className="mt-3 font-bold text-sm text-[#14364b]">EN ISO 13485:2016</p>
                  <p className="mt-1 text-xs text-[#6a8089]">Medical Device Quality Management System</p>
                </div>
                <div className="rounded-2xl border border-[#cfe0e8] bg-[#ebf3f6] p-5">
                  <Award size={24} className="text-[#e33136]" />
                  <p className="mt-3 font-bold text-sm text-[#14364b]">CE Marking</p>
                  <p className="mt-1 text-xs text-[#6a8089]">European Medical Device Directives Compliant</p>
                </div>
                <div className="rounded-2xl border border-[#cfe0e8] bg-[#ebf3f6] p-5">
                  <ShieldCheck size={24} className="text-[#10b981]" />
                  <p className="mt-3 font-bold text-sm text-[#14364b]">BIS Standards</p>
                  <p className="mt-1 text-xs text-[#6a8089]">Bureau of Indian Standards Certified Precision</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Related Systems in the Same Modality */}
        {related.length > 0 && (
          <section className="mx-auto max-w-[1280px] px-5 pt-20 lg:px-8">
            <div className="border-t border-[#cfe0e8] pt-12">
              <h3 className="font-display text-2xl font-bold text-[#14364b]">
                Complementary Systems in {product.category}
              </h3>
              <p className="mt-1 text-xs text-[#6a8089]">
                Explore related diagnostic and surgical configurations for your clinical team.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rel) => (
                  <EnhancedProductCard
                    key={rel.slug}
                    product={rel}
                    onEnquire={() => setEnquiryModalOpen(true)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
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
      <main className="mx-auto flex min-h-[60vh] max-w-[1280px] flex-col items-center justify-center px-5 text-center">
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
