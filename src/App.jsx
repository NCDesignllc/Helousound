import React, { useState, useEffect } from 'react';
import { 
  Mic2, 
  Music, 
  Volume2, 
  Waves, 
  Film, 
  CheckCircle2,
  Instagram, 
  Twitter, 
  Linkedin,
  Menu,
  X,
  Clock,
  Radio,
  Truck,
  AlertCircle,
  Settings,
  Award,
  Zap,
  Mail
} from 'lucide-react';
import BundleBuilder from './pages/BundleBuilder.jsx';
import WhySoundMatters from './pages/WhySoundMatters.jsx';
import BundleModal from './components/BundleModal.jsx';
import { useSelectedPackage } from './context/SelectedPackageContext.jsx';

// Utility to animate headings letter-by-letter when they enter view
// When keepWordsTogether is true, each word stays intact so lines wrap at word boundaries.
const renderLetters = (text, startDelay = 0, keepWordsTogether = false) => {
  if (!keepWordsTogether) {
    return text.split('').map((char, index) => (
      <span
        key={`${text}-${index}`}
        data-animate-on-view
        className="inline-block opacity-0"
        style={{
          animationDelay: `${startDelay + index * 0.05}s`,
          animationFillMode: 'forwards',
          willChange: 'transform, opacity'
        }}
      >
        {char === ' ' ? '\u00a0' : char}
      </span>
    ));
  }

  const words = text.split(' ').filter(Boolean);
  let currentDelay = startDelay;

  return words.map((word, wordIndex) => {
    const letters = word.split('').map((char, charIndex) => {
      const delay = currentDelay;
      currentDelay += 0.05;

      return (
        <span
          key={`${word}-${wordIndex}-${charIndex}`}
          data-animate-on-view
          className="inline-block opacity-0"
          style={{
            animationDelay: `${delay}s`,
            animationFillMode: 'forwards',
            willChange: 'transform, opacity'
          }}
        >
          {char}
        </span>
      );
    });

    if (wordIndex < words.length - 1) {
      currentDelay += 0.1; // small pause between words for a smoother stagger
    }

    return (
      <span
        key={`${word}-${wordIndex}`}
        className="inline-flex gap-[3px] whitespace-nowrap"
        style={{ marginRight: wordIndex === words.length - 1 ? 0 : '12px' }}
      >
        {letters}
      </span>
    );
  });
};

const App = () => {
  const { selectedPackage, setSelectedPackage } = useSelectedPackage();
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPackageData, setModalPackageData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shootDate: '',
    location: '',
    productionType: '',
    packageSelection: '',
    estimatedHours: '',
    additionalNotes: '',
    uploadCallSheet: null,
    addOns: []
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger animations when elements enter the viewport
  useEffect(() => {
    // Only run on home page
    if (currentPage !== 'home') return;

    const elements = document.querySelectorAll('[data-animate-on-view]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-zoom-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPage]);

  const productionTypes = [
    'Narrative Film',
    'Commercial',
    'Corporate/Interview',
    'Documentary',
    'Music Video',
    'Podcast/Audio',
    'Reality TV',
    'Other'
  ];

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Sound Matters', href: '#why-sound-page', onClick: (e) => { e.preventDefault(); setCurrentPage('why-sound'); window.scrollTo(0, 0); } },
    { name: 'Custom sound package', href: '#bundle', onClick: (e) => { e.preventDefault(); setCurrentPage('bundle'); } },
  ];

  const services = [
    {
      title: 'Production Sound',
      subtitle: 'On-Set Sound Recording',
      description: 'Clean dialogue capture with professional mixers, wireless systems, and timecode sync — designed for fast-moving sets and demanding productions.',
      icon: <Mic2 className="w-8 h-8 text-cyan-400" />,
      highlighted: true
    },
    {
      title: 'Wireless & RF Management',
      subtitle: 'Reliable Wireless Audio',
      description: 'Multi-talent lav setups, boom integration, and RF coordination to ensure clean, uninterrupted audio on set.',
      icon: <Radio className="w-8 h-8 text-cyan-400" />,
      highlighted: false
    },
    {
      title: 'Timecode & Camera Sync',
      subtitle: 'Production-Ready Sync',
      description: 'Accurate timecode for multi-camera shoots to streamline post-production and avoid costly sync issues.',
      icon: <Clock className="w-8 h-8 text-cyan-400" />,
      highlighted: false
    },
    {
      title: 'Director / Client Monitoring',
      subtitle: 'IFB & Playback Monitoring',
      description: 'Real-time monitoring for directors, script supervisors, and clients — hear what the audience will hear.',
      icon: <Volume2 className="w-8 h-8 text-cyan-400" />,
      highlighted: false
    }
  ];

  const whySoundMatters = [
    {
      title: 'Clean Dialogue with Minimal Noise',
      icon: <Mic2 className="w-6 h-6" />
    },
    {
      title: 'Proper Mic Placement & RF Coordination',
      icon: <Radio className="w-6 h-6" />
    },
    {
      title: 'Accurate Timecode Sync for Fast Post-Production',
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: 'Consistent Levels Across Takes and Cameras',
      icon: <Volume2 className="w-6 h-6" />
    }
  ];

  const packages = [
    {
      name: "Interview Quick Kit",
      price: 500,
      displayPrice: "$500",
      target: "Corporate & Sit-downs",
      features: [
        "Compact Mixer / Recorder",
        "1× Wireless Lavalier",
        "Audio Feed to Camera",
        "Fast Setup / Small Footprint",
        "Budget-Friendly Entry"
      ],
      highlighted: false
    },
    {
      name: "Narrative Film",
      price: 750,
      displayPrice: "$750",
      target: "Shorts & Indie Features",
      features: [
        "Mixer/Recorder + Boom Kit",
        "2× Wireless Lavaliers",
        "Timecode Sync + Smart Slate",
        "IFB Headset (Director/Script)",
        "Designed for Scripted Content"
      ],
      highlighted: true
    },
    {
      name: "Commercial / TV",
      price: 900,
      displayPrice: "$900",
      target: "Branded & Episodic",
      features: [
        "Pro Mixer / Recorder",
        "Boom + 2× Wireless Lavs",
        "Wireless Camera Link (S/M)",
        "IFB Headsets & Timecode",
        "Broadcast-Ready Feed"
      ],
      highlighted: false
    }
  ];

  const addons = [
    { item: "Additional Wireless Lav", rate: "$100", price: 100 },
    { item: "Wireless Boom Mic", rate: "$100", price: 100 },
    { item: "IFB Headset (Individual)", rate: "$50", price: 50 },
    { item: "Wireless Camera Audio Link", rate: "$75", price: 75 },
    { item: "Timecode Sync Box", rate: "$50", price: 50 },
    { item: "Timecode Smart Slate", rate: "$75", price: 75 },
    { item: "Playback Speakers (Pair)", rate: "$250", price: 250 }
  ];

  const calculateEstimate = () => {
    const selectedPackage = packages.find(pkg => pkg.name === formData.packageSelection);
    if (!selectedPackage) return null;
    
    const packagePrice = selectedPackage.price;
    const hours = parseInt(formData.estimatedHours) || 10;
    const days = Math.ceil(hours / 10);
    
    const addOnsCost = formData.addOns.reduce((total, addonName) => {
      const addon = addons.find(a => a.item === addonName);
      return total + (addon ? addon.price : 0);
    }, 0);
    
    const dailyTotal = packagePrice + addOnsCost;
    const grandTotal = dailyTotal * days;
    
    return {
      packagePrice,
      addOnsCost,
      dailyTotal,
      grandTotal,
      days,
      hours
    };
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'packageSelection') {
      const selectedPkg = packages.find(pkg => pkg.name === value);
      setFormData(prev => ({
        ...prev,
        packageSelection: value,
        addOns: selectedPkg ? [...selectedPkg.included] : []
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        addOns: checked
          ? [...prev.addOns, value]
          : prev.addOns.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePackageCardClick = (pkg) => {
    setSelectedPackageId(pkg.name);
    setModalPackageData(pkg);
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleBundleModalConfirm = () => {
    setIsModalOpen(false);
    // Pass the selected package to BundleBuilder via context
    setCurrentPage('bundle');
  };

  const handleBundleModalClose = () => {
    setIsModalOpen(false);
    // Keep the card selected
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'shootDate', label: 'Shoot Date' },
      { key: 'location', label: 'Location' },
      { key: 'productionType', label: 'Production Type' },
    ];

    const missingFields = requiredFields
      .filter((field) => !formData[field.key])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      alert(
        `Please fill in all required fields: ${missingFields.join(', ')}`
      );
      return;
    }
    
    const estimate = calculateEstimate();
    const totalEstimate = estimate ? estimate.grandTotal : 0;
    
    const formDataWithEstimate = {
      ...formData,
      estimatedCost: totalEstimate,
      numberOfDays: estimate ? estimate.days : 1
    };
    
    console.log('Form submitted:', formDataWithEstimate);
    console.log('Sending confirmation email to:', formData.email);
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        shootDate: '',
        location: '',
        productionType: '',
        packageSelection: '',
        estimatedHours: '',
        additionalNotes: '',
        uploadCallSheet: null,
        addOns: []
      });
      setFormSubmitted(false);
    }, 3000);
  };

  if (currentPage === 'bundle') {
    return <BundleBuilder onBack={() => setCurrentPage('home')} selectedPackage={selectedPackage} />;
  }

  if (currentPage === 'why-sound') {
    return <WhySoundMatters onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md py-3 sm:py-4 border-b border-neutral-800' : 'bg-transparent py-4 sm:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-cyan-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Volume2 className="text-black w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tighter uppercase">Helou<span className="text-cyan-400">Sound</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={link.onClick}
                className="text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button with proper touch target (min 44px) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-3 hover:bg-neutral-900 active:bg-neutral-800 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu with improved touch targets */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 p-4 sm:p-6">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => { 
                  setIsMenuOpen(false); 
                  if (link.onClick) link.onClick(e);
                }} 
                className="block text-sm font-bold uppercase tracking-widest hover:text-cyan-400 active:text-cyan-300 transition-colors py-3 px-2 min-h-[44px] flex items-center"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40 filter grayscale"
            src="/Abstract_Audio_Wave_Video_Generation.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-2">
          {/* Mobile-optimized hero text with proper sizing and spacing */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase leading-tight mb-6 italic animate-hero-pop">
            <span className="flex justify-center flex-wrap gap-[2px] sm:gap-[3px]">{renderLetters('Professional Audio for', 0, true)}</span>
            <span className="flex justify-center flex-wrap gap-[2px] sm:gap-[3px] text-cyan-400 mt-2">{renderLetters('Demanding Filmmakers', 0.4, true)}</span>
          </h1>
          {/* CTA button with minimum touch target size */}
          <a href="#quote-form" className="inline-block bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-300 text-black px-8 sm:px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 min-h-[48px]">
            Get a Quote
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-neutral-900/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 sm:gap-16 items-center">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-neutral-800 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <img 
                src="/Meet.avif" 
                className="w-full h-full object-cover" 
                alt="Richard Helou in Studio" 
              />
            </div>
          </div>

          {/* Text Content Side */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 uppercase italic leading-tight">
              <span className="flex flex-wrap justify-center md:justify-start gap-[2px]">{renderLetters('Meet', 0)}</span>
              <span className="flex flex-wrap justify-center md:justify-start gap-[2px] text-cyan-400 mt-2">{renderLetters('Richard Helou', 0.35)}</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              With a decade of experience across narrative features, commercials, and high-stakes episodic TV, 
              I bring more than just gear to your set—I bring a commitment to the sonic narrative.
            </p>
            
            {/* Social links with proper touch targets (min 44px) */}
            <div className="space-y-3 flex flex-col items-center md:items-start">
              {/* Social Link Item 1 - Instagram */}
              <a
                href="https://www.instagram.com/helousound/"
                target="_blank"
                rel="noopener noreferrer"
                data-animate-on-view
                className="flex items-center gap-4 text-neutral-200 hover:text-cyan-400 active:text-cyan-300 transition-colors opacity-0 cursor-pointer py-2 min-h-[44px]"
                style={{ animationDelay: '0.45s' }}
                aria-label="Follow on Instagram"
              >
                <div className="w-11 h-11 rounded-xl bg-neutral-800 flex items-center justify-center hover:bg-cyan-500/20 transition-colors">
                  <Instagram className="text-cyan-400 w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">
                  Instagram
                </span>
              </a>
              
              {/* Social Link Item 2 - Twitter/X */}
              <a
                href="https://twitter.com/helousound"
                target="_blank"
                rel="noopener noreferrer"
                data-animate-on-view
                className="flex items-center gap-4 text-neutral-200 hover:text-cyan-400 active:text-cyan-300 transition-colors opacity-0 cursor-pointer py-2 min-h-[44px]"
                style={{ animationDelay: '0.6s' }}
                aria-label="Follow on X (Twitter)"
              >
                <div className="w-11 h-11 rounded-xl bg-neutral-800 flex items-center justify-center hover:bg-cyan-500/20 transition-colors">
                  <Twitter className="text-cyan-400 w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">
                  X
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase text-center mb-10 sm:mb-16 italic">
            What We <span className="text-cyan-400">Offer</span>
          </h2>
          {/* Single column on mobile, 2 cols on tablet, 4 cols on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {services.map((service, i) => (
              <div 
                key={i} 
                className={`group p-6 sm:p-8 rounded-2xl transition-all ${
                  service.highlighted
                    ? 'bg-gradient-to-br from-cyan-500/20 to-neutral-900 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 lg:col-span-1 lg:row-span-2 flex flex-col justify-start'
                    : 'bg-gradient-to-br from-neutral-800/50 to-neutral-900 border border-neutral-700 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10'
                }`}
              >
                <div className={`mb-4 sm:mb-6 ${service.highlighted ? 'text-4xl' : ''}`}>{service.icon}</div>
                <h3 className={`font-black uppercase mb-2 group-hover:text-cyan-400 transition-colors ${service.highlighted ? 'text-lg sm:text-xl text-cyan-400' : 'text-xl sm:text-2xl'}`}>{service.title}</h3>
                <h4 className={`font-bold uppercase mb-3 sm:mb-4 text-cyan-400/70 text-xs sm:text-sm`}>{service.subtitle}</h4>
                <p className={`text-sm sm:text-base ${service.highlighted ? 'text-neutral-200' : 'text-neutral-400'}`}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sound Matters */}
      <section id="why-sound" className="py-16 sm:py-24 px-4 sm:px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase text-center mb-10 sm:mb-16 italic">
            Why Good Sound <span className="text-cyan-400">Matters</span>
          </h2>
          {/* Single column on mobile, 2 cols on tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
            {whySoundMatters.map((item, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-400 flex-shrink-0 mt-1">{item.icon}</div>
                <h3 className="text-base sm:text-lg font-bold">{item.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-cyan-500/20 to-transparent border-l-4 border-cyan-500 p-5 sm:p-8 rounded-xl">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mb-3" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Bad Audio is Unforgivable</h3>
            <p className="text-sm sm:text-base text-neutral-300">
              Your audience forgives soft lighting, slightly out-of-focus moments, or budget limitations. But they won&apos;t forgive bad audio. Invest in professional sound from day one, and your production will feel like a studio project, not a student film.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase text-center mb-10 sm:mb-16 italic">
            Transparent <span className="text-cyan-400">Rates</span>
          </h2>
          
          {/* Single column on mobile for better touch targets and readability */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16 justify-items-center max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <button
                key={i}
                onClick={() => handlePackageCardClick(pkg)}
                className={`w-full p-5 sm:p-8 rounded-2xl transition-all text-left ${
                  selectedPackageId === pkg.name
                    ? 'bg-gradient-to-br from-cyan-500/30 to-neutral-900 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 transform scale-[1.02] sm:scale-105 ring-2 ring-cyan-400/50'
                    : pkg.highlighted
                    ? 'bg-gradient-to-br from-cyan-500/20 to-neutral-900 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20 transform lg:scale-105 hover:border-cyan-400 hover:shadow-cyan-400/30 active:scale-[0.98]'
                    : 'bg-neutral-800/50 border border-neutral-700 hover:border-cyan-500/50 hover:bg-neutral-800/70 active:scale-[0.98]'
                }`}
                aria-pressed={selectedPackageId === pkg.name}
                aria-label={`Select ${pkg.name} package for ${pkg.displayPrice}`}
              >
                <h3 className="text-xl sm:text-2xl font-black uppercase mb-2">{pkg.name}</h3>
                <p className="text-cyan-400 text-xs sm:text-sm font-bold uppercase mb-4 sm:mb-6">{pkg.target}</p>
                <p className="text-3xl sm:text-4xl font-black mb-6 sm:mb-8">{pkg.displayPrice}</p>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm text-neutral-500 mb-10 sm:mb-16 max-w-2xl mx-auto px-2">
            * Labor: $800/10hrs +OT x1.5 after 8hrs, x2 after 12hrs and will be reflected in final quote*
          </p>

        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-16 sm:py-24 px-4 sm:px-6 bg-neutral-950">
        <div className="max-w-2xl mx-auto">
          {!isFormOpen ? (
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-6 sm:mb-8 italic">
                Ready for <span className="text-cyan-400">Professional Audio?</span>
              </h2>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-300 text-black px-8 sm:px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 min-h-[48px]"
              >
                Get a Quote
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase text-center mb-4 italic">
                Get a <span className="text-cyan-400">Quote</span>
              </h2>
              <p className="text-neutral-400 text-center mb-8 sm:mb-12 text-sm sm:text-base">
                Fill out the form below and I&apos;ll respond within 24 business hours with a personalized quote.
              </p>

              {formSubmitted ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 sm:p-12 text-center">
                  <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-black uppercase mb-2">Thanks! We&apos;ll Review Your Details</h3>
                  <p className="text-neutral-300 text-base sm:text-lg">
                    We&apos;ll review your shoot details and respond shortly with a personalized quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8">
              <div className="space-y-5 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-cyan-400">Required Information</h3>
                
                {/* Form inputs with min-height for better touch targets */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g., Jane Smith"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 min-h-[48px] text-base text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="jane@production.com"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 min-h-[48px] text-base text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 min-h-[48px] text-base text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Shoot Date(s)</label>
                  <input
                    type="date"
                    name="shootDate"
                    value={formData.shootDate}
                    onChange={handleFormChange}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 min-h-[48px] text-base text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Location / Studio</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="e.g., Downtown LA, Stage 5, Brooklyn Loft"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 min-h-[48px] text-base text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Production Type</label>
                  <select
                    name="productionType"
                    value={formData.productionType}
                    onChange={handleFormChange}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 min-h-[48px] text-base text-neutral-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">Select a type...</option>
                    {productionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-cyan-400">Optional Details</h3>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Package Selection</label>
                  <select
                    name="packageSelection"
                    value={formData.packageSelection}
                    onChange={handleFormChange}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 min-h-[48px] text-base text-neutral-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">Select a package...</option>
                    {packages.map(pkg => (
                      <option key={pkg.name} value={pkg.name}>
                        {pkg.name} ({pkg.displayPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Estimated Shoot Hours</label>
                  <input
                    type="number"
                    name="estimatedHours"
                    value={formData.estimatedHours}
                    onChange={handleFormChange}
                    placeholder="e.g., 12"
                    min="1"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 min-h-[48px] text-base text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {formData.packageSelection && (() => {
                  const estimate = calculateEstimate();
                  if (!estimate) return null;
                  return (
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-[1.5rem] p-4 sm:p-6">
                      <h4 className="font-bold uppercase tracking-widest mb-4 text-cyan-400 text-sm sm:text-base">Estimate Breakdown</h4>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">{formData.packageSelection}</span>
                          <span className="font-bold">${estimate.packagePrice}/day</span>
                        </div>
                        {estimate.addOnsCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Add-On Gear ({formData.addOns.length} items)</span>
                            <span className="font-bold">${estimate.addOnsCost}/day</span>
                          </div>
                        )}
                        <div className="border-t border-neutral-700 pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Daily Rate</span>
                            <span>${estimate.dailyTotal}</span>
                          </div>
                        </div>
                        {estimate.days > 1 && (
                          <div className="text-neutral-400 text-xs mt-2">
                            {estimate.days} days × ${estimate.dailyTotal}/day
                          </div>
                        )}
                        <div className="border-t border-cyan-500/30 pt-2 mt-2">
                          <div className="flex justify-between text-sm sm:text-base font-black text-cyan-400">
                            <span>Total Estimate</span>
                            <span>${estimate.grandTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 mt-4 italic">*Non-binding estimate. Final quote may vary based on production requirements.</p>
                    </div>
                  );
                })()}

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">Add-On Gear</label>
                  {/* Single column on mobile for better touch targets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {addons.map((addon, i) => (
                      <label key={i} className="flex items-center gap-3 p-3 sm:p-4 min-h-[48px] bg-neutral-800/30 border border-neutral-700 rounded-lg hover:border-cyan-500/50 active:border-cyan-400 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          value={addon.item}
                          checked={formData.addOns.includes(addon.item)}
                          onChange={handleFormChange}
                          className="w-5 h-5 accent-cyan-500 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-medium">{addon.item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleFormChange}
                    placeholder="Tell us more about your project, any special requirements, or questions..."
                    rows="4"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-base text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Form buttons with proper touch targets */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-300 text-black px-6 sm:px-8 py-4 min-h-[48px] rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95"
                >
                  Get Quote
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white px-6 sm:px-8 py-4 min-h-[48px] rounded-2xl font-bold uppercase tracking-widest transition-all"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-neutral-500 text-center">We&apos;ll respond to your inquiry within 24 business hours.</p>
            </form>
              )}
            </>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-12 md:p-20 rounded-[2rem] sm:rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic mb-6 sm:mb-8">Questions? <br /><span className="text-cyan-400">Let&apos;s Talk</span></h2>
            <p className="text-neutral-400 mb-8 sm:mb-12 text-base sm:text-lg max-w-2xl mx-auto">Prefer to reach out directly? Contact me via email or social media.</p>
            <div className="flex flex-col items-center gap-2 mb-8 sm:mb-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-500/20">
                <img
                  src="/Richrad.png"
                  alt="Richard Helou"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-black uppercase tracking-widest text-xs sm:text-sm text-neutral-200">Richard Helou</p>
              <p className="text-neutral-500 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.25em] uppercase">Production Sound Mixer • Location Sound Recordist</p>
            </div>
            {/* Social icons with proper touch targets (min 44px) */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-neutral-400">
              <a 
                href="mailto:helousound@gmail.com" 
                className="hover:text-cyan-400 active:text-cyan-300 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Send email"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/helousound/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 active:text-cyan-300 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 active:text-cyan-300 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Follow on X (Twitter)"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/richardhelou/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 active:text-cyan-300 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with safe area padding for iOS home indicator */}
      <footer className="py-8 sm:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] border-t border-neutral-900 text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Volume2 className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-black tracking-tighter uppercase italic text-sm sm:text-base">Helou Sound</span>
        </div>
        <p className="text-neutral-600 text-[10px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.4em]">Richard Helou • Professional Audio Post & Location Recording © 2024</p>
      </footer>

      {/* Bundle Modal */}
      <BundleModal
        isOpen={isModalOpen}
        onClose={handleBundleModalClose}
        onConfirm={handleBundleModalConfirm}
        packageName={modalPackageData?.name || ''}
      />
    </div>
  );
};

export default App;
