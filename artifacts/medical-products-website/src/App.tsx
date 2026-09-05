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
  Compass,
  Cpu,
  FileText,
  Flame,
  Globe2,
  HeartPulse,
  Layers,
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
      'High-precision holmium laser system with super-imposed modulated pulse shaping to minimize stone retropulsion and accelerate stone ablation efficiency.',
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
    <header className="sticky top-0 z-40 border-b border-[#d8e7e6] bg-[#f7fbfa]/95 shadow-xs backdrop-blur-md">
      {/* Brand Top Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#079cd4] via-[#38bdf8] to-[#e33136]" />

      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
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
            onClick={() => scrollToSection('specialties')}
            className="cursor-pointer text-xs font-bold uppercase tracking-[.1em] text-[#5b707d] transition hover:text-[#079cd4]"
          >
            Specialties
          </button>
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
            About Us
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
            className="cursor-pointer rounded-full bg-[#079cd4] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-[#0284c7] hover:shadow-md"
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
              onClick={() => scrollToSection('specialties')}
              className="text-left text-sm font-bold text-[#14364b]"
            >
              Specialties
            </button>
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
              About Us
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
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:px-8">
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
// INTERACTIVE ENHANCED PRODUCT CARD (With In-Card Specs Tabbing!)
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
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#d8e7e6] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#079cd4]/40 hover:shadow-xl">
      {/* Product Image Stage */}
      <div className={`relative flex min-h-[260px] items-center justify-center bg-gradient-to-br ${product.accent} p-6 overflow-hidden`}>
        {/* Soft Radiant Halo */}
        <div className="absolute h-48 w-48 rounded-full bg-white/70 blur-2xl transition duration-700 group-hover:scale-125" />
        <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-[#079cd4]/10 blur-xl" />

        {/* Concentric Decorative Ring */}
        <div className="pointer-events-none absolute h-52 w-52 rounded-full border border-white/60" />

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

        <span className="absolute bottom-3 right-4 z-20 rounded-full bg-white/85 px-3 py-1 text-[.62rem] font-bold text-[#14364b] shadow-xs">
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
          <div className="mt-3 flex rounded-lg bg-[#edf5f3] p-1 text-[.65rem] font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 rounded-md py-1 transition ${
                activeTab === 'overview' ? 'bg-white text-[#14364b] shadow-xs' : 'text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 rounded-md py-1 transition ${
                activeTab === 'specs' ? 'bg-white text-[#14364b] shadow-xs' : 'text-[#6a8089] hover:text-[#14364b]'
              }`}
            >
              Key Specs
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`flex-1 rounded-md py-1 transition ${
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
              className="cursor-pointer rounded-full bg-[#edf5f3] px-4 py-1.5 text-xs font-bold text-[#14364b] transition hover:bg-[#079cd4] hover:text-white"
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
// PAGE 1: HOME PAGE (Ultra-Modern Interactive Medical Holodeck Hero)
// =============================================================================
function Home() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<string | null>(null);

  // 5 Signature Hero Modalities with Interactive HUD Hotspots
  const heroSystems = [
    {
      slug: 'blaze-prime',
      label: 'BLAZE-prime',
      fullName: 'BLAZE-prime Holmium Laser',
      category: 'Urology',
      tagline: 'High-Energy Precision Lithotripsy & HoLEP Platform',
      highlightBadge: 'Up to 100W Output Power',
      image: '/products/blaze-prime-holmium-laser-clean.png',
      accentGlow: 'from-[#079cd4]/20 via-[#38bdf8]/10 to-transparent',
      hudHotspots: [
        { label: 'Pulse Modulation', desc: 'Minimizes stone retropulsion', pos: 'top-left' },
        { label: '100W / 65W / 30W', desc: '0.1J – 5.0J Energy Range', pos: 'top-right' },
        { label: 'Dual Inverter Cooling', desc: 'Continuous OR duty cycle', pos: 'bottom-left' },
        { label: '12” Swivel Touchscreen', desc: 'Surgeon-first ergonomic console', pos: 'bottom-right' },
      ],
      metrics: [
        { label: 'Max Pulse Rate', value: '80 Hz' },
        { label: 'Pulse Energy', value: '5.0 Joules' },
        { label: 'Laser Source', value: 'Ho:YAG 2.1µm' },
      ],
    },
    {
      slug: 'fiberlaze-plus',
      label: 'FiberLAZE+',
      fullName: 'FiberLAZE+ Thulium Laser',
      category: 'Urology',
      tagline: 'Extreme-Frequency 2500 Hz Thulium Dusting & Soft Tissue Resection',
      highlightBadge: 'Ultra-Fine Dusting & Tissue Surgery',
      image: '/products/fiberlaze-thulium-laser-clean.png',
      accentGlow: 'from-[#00b4d8]/20 via-[#079cd4]/10 to-transparent',
      hudHotspots: [
        { label: '2500 Hz Extreme Rate', desc: 'Sub-millimeter dust formation', pos: 'top-left' },
        { label: 'Hybrid Air Cooling', desc: 'Water-refill free operation', pos: 'top-right' },
        { label: '<0.2 mm Penetration', desc: 'Bloodless soft tissue vaporization', pos: 'bottom-left' },
        { label: 'Hands-free Dual Pedal', desc: 'Instant Ready / Standby toggle', pos: 'bottom-right' },
      ],
      metrics: [
        { label: 'Max Frequency', value: '2500 Hz' },
        { label: 'Cooling Type', value: 'Hybrid Air' },
        { label: 'Power Input', value: '220V 1-Phase' },
      ],
    },
    {
      slug: 'neuroplot',
      label: 'VIRGO EEG',
      fullName: 'Neuroplot / VIRGO EEG',
      category: 'Neurology',
      tagline: 'State-of-the-Art 32-Channel Brain Mapping & Seizure Localization',
      highlightBadge: 'Digital Signal Processing Headbox',
      image: '/products/virgo-electroencephalograph-clean.png',
      accentGlow: 'from-[#6366f1]/20 via-[#3b82f6]/10 to-transparent',
      hudHotspots: [
        { label: '32-Channel DSP', desc: 'Ultra-low-noise headbox', pos: 'top-left' },
        { label: 'Spectral Brain Mapping', desc: 'Frequency & montage analysis', pos: 'top-right' },
        { label: 'Synchronized HD Video', desc: 'Clinical correlation recording', pos: 'bottom-left' },
        { label: 'Universal EDF Export', desc: 'PACS & Hospital EMR integration', pos: 'bottom-right' },
      ],
      metrics: [
        { label: 'Channels', value: '32 / 24 Ch' },
        { label: 'Display', value: 'Full HD Medical' },
        { label: 'Compliance', value: 'Clinical Neuro' },
      ],
    },
    {
      slug: 'gemini-treadmill',
      label: 'Gemini TMT',
      fullName: 'Gemini TMT Machine (GEMINI-A-DX)',
      category: 'Cardiology',
      tagline: 'Rugged Cardiac Stress Test Station with Digital Baseline Stabilization',
      highlightBadge: 'Heavy-Duty 20 km/h AC Motor',
      image: '/products/gemini-treadmill-tmt-clean.png',
      accentGlow: 'from-[#10b981]/20 via-[#059669]/10 to-transparent',
      hudHotspots: [
        { label: '20 km/h AC Drive', desc: '0–22% Grade Elevation', pos: 'top-left' },
        { label: 'Stable Baseline Filter', desc: 'No drift during high cadence', pos: 'top-right' },
        { label: '12-Lead Real-time ECG', desc: 'Bruce & Custom Protocols', pos: 'bottom-left' },
        { label: '200 kg Deck Capacity', desc: 'Reinforced patient platform', pos: 'bottom-right' },
      ],
      metrics: [
        { label: 'Max Speed', value: '20 km/h' },
        { label: 'Max Elevation', value: '22%' },
        { label: 'Leads', value: '12-Lead Stress' },
      ],
    },
    {
      slug: 'libra-mpm',
      label: 'LIBRA MPM',
      fullName: 'Libra Smart / BRIO MPM',
      category: 'Patient Monitoring',
      tagline: 'Hospital Bedside Care with 15.6” Touchscreen & 120h Continuous Trends',
      highlightBadge: 'Critical Care Monitoring',
      image: '/products/libra-multipara-monitor-clean.png',
      accentGlow: 'from-[#14b8a6]/20 via-[#06b6d4]/10 to-transparent',
      hudHotspots: [
        { label: '15.6” Anti-Glare Display', desc: '8 high-contrast waveforms', pos: 'top-left' },
        { label: '120h Continuous Trends', desc: 'Tabular & graphical memory', pos: 'top-right' },
        { label: '360° Visual Alarm Light', desc: 'Immediate caregiver alert', pos: 'bottom-left' },
        { label: 'CNS Wired & Wireless', desc: 'Central nursing station telemetry', pos: 'bottom-right' },
      ],
      metrics: [
        { label: 'Screen Size', value: '15.6” High-Res' },
        { label: 'Waveforms', value: 'Up to 8 Leads' },
        { label: 'Battery', value: 'Li-Ion Backup' },
      ],
    },
  ];

  const currentHero = heroSystems[activeHeroIndex];

  return (
    <Shell onEnquire={(p) => setEnquiryModalProduct(p || products[0].name)}>
      <main>
        {/* ============================================================== */}
        {/* INNOVATIVE INTERACTIVE HERO: THE MEDICAL HOLODECK STAGE        */}
        {/* ============================================================== */}
        <section className="relative overflow-hidden border-b border-[#d8e7e6] bg-gradient-to-b from-[#eef7f6] via-[#f5faf9] to-[#f7fbfa] py-12 lg:py-16">
          {/* Subtle Medical Grid */}
          <div className="site-grid absolute inset-0 opacity-75 pointer-events-none" />

          <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8">
            {/* Top Status Header */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#079cd4]/30 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#079cd4] shadow-xs backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#10b981] pulse-dot" />
                Allengers Global Healthcare • ISO 13485:2016 & CE Certified
              </div>

              <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold tracking-tight text-[#14364b] sm:text-5xl lg:text-6xl">
                Advanced Diagnostic & Surgical Systems
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#506875] sm:text-base">
                Engineered for High-Acuity Precision in Urology, Cardiology, Neurology, and Patient Monitoring.
              </p>
            </div>

            {/* ============================================================ */}
            {/* THE 3D HOLOGRAPHIC EQUIPMENT STAGE                           */}
            {/* ============================================================ */}
            <div className="relative mx-auto mt-8 max-w-5xl">
              {/* Background Circular Rotating HUD Rings */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                {/* Dynamic Radial Aura */}
                <div className={`h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] rounded-full bg-gradient-to-tr ${currentHero.accentGlow} blur-3xl transition-all duration-700`} />
                {/* Rotating Dashed Outer Ring */}
                <div className="absolute h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] rounded-full border border-dashed border-[#079cd4]/25 hud-spin" />
                {/* Counter Rotating Inner Ring */}
                <div className="absolute h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] rounded-full border border-[#079cd4]/15 hud-spin-reverse" />
              </div>

              {/* Central Equipment Image Container */}
              <div className="relative flex min-h-[380px] sm:min-h-[440px] items-center justify-center">
                <img
                  key={currentHero.slug}
                  src={currentHero.image}
                  alt={currentHero.fullName}
                  className="product-float product-shadow-3d relative z-20 max-h-[320px] sm:max-h-[380px] w-auto max-w-[80%] object-contain transition-all duration-500"
                />

                {/* Ground Shadow Ellipse */}
                <div className="absolute bottom-4 h-6 w-[55%] rounded-[50%] bg-[#376b75]/20 blur-xl z-10" />

                {/* 4 Interactive Floating HUD Hotspots (Surrounding the Centerpiece) */}
                {/* Hotspot 1: Top-Left */}
                <div className="absolute left-2 top-6 z-30 hidden sm:block">
                  <div className="rounded-2xl border border-white/90 bg-white/90 p-3.5 shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-[#079cd4]">
                    <div className="flex items-center gap-2 text-[#079cd4]">
                      <Sparkles size={14} className="text-[#079cd4]" />
                      <span className="font-display text-xs font-bold text-[#14364b]">
                        {currentHero.hudHotspots[0].label}
                      </span>
                    </div>
                    <p className="mt-1 text-[.7rem] text-[#6a8089]">
                      {currentHero.hudHotspots[0].desc}
                    </p>
                  </div>
                </div>

                {/* Hotspot 2: Top-Right */}
                <div className="absolute right-2 top-6 z-30 hidden sm:block">
                  <div className="rounded-2xl border border-white/90 bg-white/90 p-3.5 shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-[#079cd4]">
                    <div className="flex items-center gap-2 text-[#079cd4]">
                      <Zap size={14} className="text-[#079cd4]" />
                      <span className="font-display text-xs font-bold text-[#14364b]">
                        {currentHero.hudHotspots[1].label}
                      </span>
                    </div>
                    <p className="mt-1 text-[.7rem] text-[#6a8089]">
                      {currentHero.hudHotspots[1].desc}
                    </p>
                  </div>
                </div>

                {/* Hotspot 3: Bottom-Left */}
                <div className="absolute bottom-12 left-2 z-30 hidden sm:block">
                  <div className="rounded-2xl border border-white/90 bg-white/90 p-3.5 shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-[#079cd4]">
                    <div className="flex items-center gap-2 text-[#079cd4]">
                      <ShieldCheck size={14} className="text-[#079cd4]" />
                      <span className="font-display text-xs font-bold text-[#14364b]">
                        {currentHero.hudHotspots[2].label}
                      </span>
                    </div>
                    <p className="mt-1 text-[.7rem] text-[#6a8089]">
                      {currentHero.hudHotspots[2].desc}
                    </p>
                  </div>
                </div>

                {/* Hotspot 4: Bottom-Right */}
                <div className="absolute bottom-12 right-2 z-30 hidden sm:block">
                  <div className="rounded-2xl border border-white/90 bg-white/90 p-3.5 shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-[#079cd4]">
                    <div className="flex items-center gap-2 text-[#079cd4]">
                      <Cpu size={14} className="text-[#079cd4]" />
                      <span className="font-display text-xs font-bold text-[#14364b]">
                        {currentHero.hudHotspots[3].label}
                      </span>
                    </div>
                    <p className="mt-1 text-[.7rem] text-[#6a8089]">
                      {currentHero.hudHotspots[3].desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Spec Quick Bar */}
              <div className="relative z-30 mx-auto -mt-4 max-w-xl rounded-2xl border border-[#d8e7e6] bg-white/95 p-4 shadow-md backdrop-blur-md">
                <div className="grid grid-cols-3 divide-x divide-[#edf5f3] text-center">
                  {currentHero.metrics.map((m) => (
                    <div key={m.label} className="px-2">
                      <p className="text-[.65rem] font-bold uppercase tracking-wider text-[#8ba2b0]">
                        {m.label}
                      </p>
                      <p className="mt-1 font-display text-sm font-extrabold text-[#14364b] sm:text-base">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Modality Switcher Dock */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {heroSystems.map((item, index) => (
                  <button
                    key={item.slug}
                    onClick={() => setActiveHeroIndex(index)}
                    className={`cursor-pointer flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition duration-200 ${
                      activeHeroIndex === index
                        ? 'bg-[#14364b] text-white shadow-md scale-105'
                        : 'bg-white text-[#506875] border border-[#d8e7e6] hover:bg-[#edf6f5] hover:text-[#14364b]'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        activeHeroIndex === index ? 'bg-[#079cd4]' : 'bg-[#a3bac6]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Direct Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/products/${currentHero.slug}`}
                  className="flex items-center gap-2 rounded-full bg-[#079cd4] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#0284c7] hover:scale-105"
                >
                  Explore {currentHero.label} Specs <ArrowRight size={15} />
                </Link>

                <button
                  onClick={() => setEnquiryModalProduct(currentHero.fullName)}
                  className="cursor-pointer flex items-center gap-2 rounded-full border border-[#14364b] bg-white px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#14364b] transition hover:bg-[#14364b] hover:text-white"
                >
                  Request Official Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ANIMATED TICKER RIBBON                                         */}
        {/* ============================================================== */}
        <section className="overflow-hidden border-b border-[#d8e7e6] bg-white py-4 shadow-xs">
          <div className="flex w-max items-center gap-8 marquee">
            {[
              'EN ISO 13485:2016 Certified Quality',
              'CE Marking Medical Directives Compliant',
              'BIS (Bureau of Indian Standards) Approved',
              '7,000+ Global Hospital Clients',
              '12,000+ Active Equipment Installations',
              'Exported to 36+ Nations Worldwide',
              '24/7 Biomedical Helpline: 1800-266-8800',
              'Headquartered in Chandigarh, India since 2009',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-xs font-bold text-[#506875]">
                <BadgeCheck size={16} className="text-[#079cd4]" />
                <span>{text}</span>
                <span className="text-[#c4d7de]">•</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* ASYMMETRICAL BENTO GRID: CLINICAL SPECIALTIES MATRIX           */}
        {/* ============================================================== */}
        <section id="specialties" className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="eyebrow text-[#079cd4]">Multidisciplinary Portfolio</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
              Specialized Platforms for Every Department
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#506875]">
              Explore our core medical divisions engineered with hospital-grade durability, intuitive clinician controls, and verified international safety standards.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Bento Card 1: Urology Suite (Large 2-Col Span) */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#d8e7e6] bg-gradient-to-br from-[#eaf4fc] via-[#f2f8fd] to-white p-8 shadow-xs transition duration-300 hover:shadow-xl md:col-span-2">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-md">
                  <span className="rounded-full bg-[#079cd4]/15 px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-[#079cd4]">
                    Urology Center of Excellence
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-[#14364b]">
                    Laser Lithotripsy & Soft Tissue Surgery
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#506875]">
                    Comprehensive dual platform: <strong>BLAZE-prime Holmium (100W/65W/30W)</strong> with super-imposed pulse modulation and <strong>FiberLAZE+ Thulium (2500 Hz)</strong> with hybrid air cooling.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-xs">
                      <p className="font-bold text-[#14364b]">Zero Retropulsion</p>
                      <p className="text-[.7rem] text-[#6a8089]">Patented pulse modulation</p>
                    </div>
                    <div className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-xs">
                      <p className="font-bold text-[#14364b]">Ultra-Fine Dusting</p>
                      <p className="text-[.7rem] text-[#6a8089]">Spontaneous stone passage</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex min-h-[220px] w-full items-center justify-center sm:w-60">
                  <div className="absolute h-40 w-40 rounded-full bg-[#079cd4]/15 blur-2xl" />
                  <img
                    src="/products/blaze-prime-holmium-laser-clean.png"
                    alt="Holmium Laser"
                    className="product-float product-shadow relative z-10 max-h-[200px] object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between border-t border-[#d8e7e6]/60 pt-4">
                <span className="text-xs font-semibold text-[#8ba2b0]">
                  Applicable: URS, PCNL, HoLEP, ThuLEP
                </span>
                <Link
                  href="/products/blaze-prime"
                  className="flex items-center gap-1.5 text-xs font-bold text-[#079cd4] hover:underline"
                >
                  Explore Urology Systems <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bento Card 2: Neurology Diagnostics (1-Col Span) */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#d8e7e6] bg-gradient-to-br from-[#f6f2fc] via-[#fbf9fe] to-white p-8 shadow-xs transition duration-300 hover:shadow-xl">
              <div>
                <span className="rounded-full bg-[#6366f1]/15 px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-[#6366f1]">
                  Neuro Diagnostics
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#14364b]">
                  VIRGO EEG & SCORPIO EMG
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#506875]">
                  High-fidelity 32-channel DSP brain mapping, nerve conduction velocity, and evoked potential analysis.
                </p>

                <div className="relative mt-6 flex min-h-[160px] items-center justify-center">
                  <div className="absolute h-32 w-32 rounded-full bg-[#6366f1]/15 blur-2xl" />
                  <img
                    src="/products/virgo-electroencephalograph-clean.png"
                    alt="VIRGO EEG"
                    className="product-shadow relative z-10 max-h-[150px] object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-6 border-t border-[#d8e7e6]/60 pt-4">
                <Link
                  href="/products/neuroplot"
                  className="flex items-center justify-between text-xs font-bold text-[#6366f1] hover:underline"
                >
                  <span>Brain & Nerve Systems</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bento Card 3: Cardiology Stress Suite (1-Col Span) */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#d8e7e6] bg-gradient-to-br from-[#eef8f2] via-[#f7fcf9] to-white p-8 shadow-xs transition duration-300 hover:shadow-xl">
              <div>
                <span className="rounded-full bg-[#10b981]/15 px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-[#10b981]">
                  Cardiology Lab
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#14364b]">
                  Gemini TMT & Pisces ECG
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#506875]">
                  Rugged 20 km/h treadmill stress test platform with digital baseline stabilization, 12-channel diagnostic ECG, and ambulatory Holter.
                </p>

                <div className="relative mt-6 flex min-h-[160px] items-center justify-center">
                  <div className="absolute h-32 w-32 rounded-full bg-[#10b981]/15 blur-2xl" />
                  <img
                    src="/products/gemini-treadmill-tmt-clean.png"
                    alt="Gemini TMT"
                    className="product-shadow relative z-10 max-h-[150px] object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-6 border-t border-[#d8e7e6]/60 pt-4">
                <Link
                  href="/products/gemini-treadmill"
                  className="flex items-center justify-between text-xs font-bold text-[#10b981] hover:underline"
                >
                  <span>Cardiac Diagnostics</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bento Card 4: Patient Monitoring & Acute Care (Large 2-Col Span) */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#d8e7e6] bg-gradient-to-br from-[#e8f7f5] via-[#f2faf9] to-white p-8 shadow-xs transition duration-300 hover:shadow-xl md:col-span-2">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-md">
                  <span className="rounded-full bg-[#14b8a6]/15 px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider text-[#14b8a6]">
                    Acute Care & Monitoring
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-[#14364b]">
                    Libra Smart MPM & Polysomnograph
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#506875]">
                    Crystal clear real-time monitoring for ICU, PACU, and Sleep Labs. Featuring 15.6” touch displays, 120-hour multi-parameter trends, and AASM-compliant sleep staging.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-xs">
                      <p className="font-bold text-[#14364b]">120-Hour Memory</p>
                      <p className="text-[.7rem] text-[#6a8089]">Full trend graphical recall</p>
                    </div>
                    <div className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-xs">
                      <p className="font-bold text-[#14364b]">AASM Compliance</p>
                      <p className="text-[.7rem] text-[#6a8089]">Hospital sleep laboratory</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex min-h-[200px] w-full items-center justify-center sm:w-60">
                  <div className="absolute h-40 w-40 rounded-full bg-[#14b8a6]/15 blur-2xl" />
                  <img
                    src="/products/libra-multipara-monitor-clean.png"
                    alt="Libra MPM"
                    className="product-float product-shadow relative z-10 max-h-[190px] object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between border-t border-[#d8e7e6]/60 pt-4">
                <span className="text-xs font-semibold text-[#8ba2b0]">
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
        </section>

        {/* ============================================================== */}
        {/* YOUTUBE EMBEDDED CORPORATE VIDEO THEATER                       */}
        {/* ============================================================== */}
        <section id="video" className="border-y border-[#d8e7e6] bg-[#edf6f7] py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="text-center">
              <span className="eyebrow text-[#079cd4]">Engineering Excellence In Motion</span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-[#14364b] sm:text-4xl">
                Allengers Milestones — Corporate Documentary
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#506875]">
                Take a virtual tour of our state-of-the-art cleanroom manufacturing plants, biomedical testing labs, and 50+ year legacy in Chandigarh, India.
              </p>
            </div>

            {/* Cinema Video Frame */}
            <div className="relative mx-auto mt-10 max-w-4xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-2 border-[#b5dbe0] bg-black shadow-2xl">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/3rZmaoAjxNM?si=1TqBOxwzX4siMD3H"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Video Info Bar */}
              <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#d8e7e6] bg-white p-4 shadow-sm sm:flex-row">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#079cd4]/15 text-[#079cd4]">
                    <Play size={20} />
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

                <div className="flex items-center gap-4">
                  <a
                    href="https://www.youtube.com/watch?v=3rZmaoAjxNM"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-[#079cd4] hover:underline"
                  >
                    Open on YouTube <ArrowUpRight size={14} />
                  </a>
                  <button
                    onClick={() => setEnquiryModalProduct(products[0].name)}
                    className="cursor-pointer rounded-full bg-[#14364b] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#079cd4]"
                  >
                    Contact Engineers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SIGNATURE PRODUCTS GRID (With In-Card Spec Tabbing)            */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-4 border-b border-[#d8e7e6] pb-6 sm:flex-row sm:items-end">
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
        </section>

        {/* ============================================================== */}
        {/* ABOUT ALLENGERS GLOBAL HEALTHCARE                              */}
        {/* ============================================================== */}
        <section id="about" className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
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
                  className="flex items-center gap-2 rounded-full border border-[#d8e7e6] bg-white px-5 py-3 text-xs font-bold text-[#14364b] shadow-xs transition hover:bg-[#edf5f3]"
                >
                  <Phone size={14} className="text-[#079cd4]" /> 1800-266-8800
                </a>
              </div>
            </div>

            {/* Right Quick Info Card */}
            <div className="rounded-3xl border border-[#d8e7e6] bg-white p-8 shadow-xl">
              <h3 className="font-display text-xl font-bold text-[#14364b]">
                Corporate Headquarters & Verification
              </h3>

              <div className="mt-6 space-y-4 text-xs text-[#506875]">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <div>
                    <p className="font-bold text-[#14364b]">Registered Headquarters</p>
                    <p>S.C.O 212-213-214, Sector 34-A, Chandigarh (U.T.), 160022, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <div>
                    <p className="font-bold text-[#14364b]">Corporate Enquiries</p>
                    <p>enquiries@allengersglobal.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <div>
                    <p className="font-bold text-[#14364b]">Accreditations</p>
                    <p>ISO 9001:2015, EN ISO 13485:2016, BIS, and CE Certified</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-[#079cd4]" />
                  <div>
                    <p className="font-bold text-[#14364b]">Helpline Desk</p>
                    <p>Toll Free (India): 1800-266-8800 | Direct: 0172 – 6618001</p>
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
// PAGE 2: PRODUCTS CATALOG (Enhanced with Category Insights & Tabs)
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
        {/* Banner with Interactive Metric Summary */}
        <section className="site-grid border-b border-[#d8e7e6] bg-[#e8f4f1] py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#079cd4]">
              <Sparkles size={14} /> Full Equipment Ecosystem
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#14364b] sm:text-6xl">
                Certified Precision <br />
                <span className="text-[#079cd4]">You Can Put to Work.</span>
              </h1>
              <p className="text-base leading-7 text-[#506875]">
                Explore our full line of surgical lasers, electro-diagnostics, stress testing systems, and acute care monitoring devices.
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="mx-auto max-w-[1280px] px-5 py-12 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-[#d8e7e6] pb-6 lg:flex-row lg:items-center lg:justify-between">
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
                        ? 'bg-[#14364b] text-white shadow-xs'
                        : 'bg-[#edf5f3] text-[#5b707d] hover:bg-[#d7ebe7]'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[.6rem] ${
                        activeCategory === category ? 'bg-white/25 text-white' : 'bg-[#d8e7e6] text-[#385365]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
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
              <EnhancedProductCard
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
      <main className="pb-24">
        {/* Top Breadcrumb & Status */}
        <div className="mx-auto max-w-[1280px] px-5 pt-8 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6a8089] transition hover:text-[#079cd4]"
            >
              <ChevronRight size={14} className="rotate-180" /> Back to All Products
            </Link>

            <span className="rounded-full bg-[#edf5f3] px-3 py-1 text-xs font-bold text-[#385365]">
              ISO 13485:2016 & CE Verified
            </span>
          </div>
        </div>

        {/* Cinematic Product Spotlight Stage */}
        <section
          className={`mx-auto mt-6 grid max-w-[1280px] overflow-hidden rounded-3xl border border-[#d8e7e6] bg-gradient-to-br ${product.accent} px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-16 lg:py-16`}
        >
          {/* Left Details */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#079cd4] shadow-xs">
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
                  className="rounded-lg border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-[#385365] shadow-xs"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="cursor-pointer flex items-center gap-2 rounded-full bg-[#14364b] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#079cd4]"
              >
                Request Quote / Demo <ArrowUpRight size={15} />
              </button>
              <a
                href="tel:18002668800"
                className="flex items-center gap-2 rounded-full border border-[#b5ced0] bg-white/80 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#14364b] transition hover:bg-white"
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

            <img
              src={product.image}
              alt={product.name}
              className="product-float product-shadow-3d relative z-10 max-h-[360px] w-auto max-w-[85%] object-contain"
            />
          </div>
        </section>

        {/* ============================================================== */}
        {/* INTERACTIVE MULTI-TAB SPECIFICATION CONSOLE                    */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-[1280px] px-5 pt-16 lg:px-8">
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#d8e7e6] overflow-x-auto gap-2">
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
                  className="rounded-2xl border border-[#d8e7e6] bg-white p-6 shadow-xs transition duration-200 hover:border-[#079cd4]"
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
            <div className="mt-8 rounded-3xl border border-[#d8e7e6] bg-white p-8 shadow-xs">
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
                  <div key={app} className="flex items-start gap-3 rounded-xl bg-[#f7fbfa] p-4 border border-[#edf5f3]">
                    <Sparkles size={16} className="mt-0.5 shrink-0 text-[#079cd4]" />
                    <span className="text-xs font-bold text-[#14364b]">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Clinical Highlights */}
          {activeTab === 'features' && (
            <div className="mt-8 rounded-3xl border border-[#d8e7e6] bg-white p-8 shadow-xs">
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
            <div className="mt-8 rounded-3xl border border-[#d8e7e6] bg-white p-8 shadow-xs">
              <h3 className="font-display text-xl font-bold text-[#14364b]">
                Accredited Standards & Quality Assurance
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#edf5f3] bg-[#f7fbfa] p-5">
                  <BadgeCheck size={24} className="text-[#079cd4]" />
                  <p className="mt-3 font-bold text-sm text-[#14364b]">EN ISO 13485:2016</p>
                  <p className="mt-1 text-xs text-[#6a8089]">Medical Device Quality Management System</p>
                </div>
                <div className="rounded-2xl border border-[#edf5f3] bg-[#f7fbfa] p-5">
                  <Award size={24} className="text-[#e33136]" />
                  <p className="mt-3 font-bold text-sm text-[#14364b]">CE Marking</p>
                  <p className="mt-1 text-xs text-[#6a8089]">European Medical Device Directives Compliant</p>
                </div>
                <div className="rounded-2xl border border-[#edf5f3] bg-[#f7fbfa] p-5">
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
            <div className="border-t border-[#d8e7e6] pt-12">
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
