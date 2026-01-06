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

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    { name: 'Why Sound Matters', href: '#why-sound' },
    { name: 'Rates', href: '#pricing' },
    { name: 'Quote', href: '#quote-form' },
  ];

  const services = [
    {
      title: 'Production Sound',
      description: 'On-set dialogue capture for narrative, commercial, and corporate projects with professional timecode sync.',
      icon: <Mic2 className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: 'Sound Design',
      description: 'Creating immersive sonic worlds and custom SFX that breathe life into every frame.',
      icon: <Waves className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: 'Dialogue Edit',
      description: 'Precision cleanup, noise restoration, and ADR matching for studio-quality performances.',
      icon: <Volume2 className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: 'Final Mixing',
      description: 'Stereo and Surround 5.1 mixing optimized for broadcast, theatrical, and streaming standards.',
      icon: <Music className="w-8 h-8 text-cyan-400" />,
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
      price: 350,
      displayPrice: "$350",
      target: "Corporate & Sit-downs",
      features: [
        "Compact Mixer / Recorder",
        "1× Wireless Lavalier",
        "Audio Feed to Camera",
        "Fast Setup / Small Footprint",
        "Budget-Friendly Entry"
      ],
      included: ["Additional Wireless Lav"],
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
      included: ["Wireless Boom Mic", "IFB Headset (Individual)", "Timecode Sync Box"],
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
      included: ["Wireless Boom Mic", "IFB Headset (Individual)", "Wireless Camera Audio Link", "Timecode Sync Box", "Timecode Smart Slate"],
      highlighted: false
    },
    {
      name: "Full Sound Cart",
      price: 1200,
      displayPrice: "$1,200",
      target: "Features & Multi-Cam",
      features: [
        "Digital Mixer Sound Cart",
        "Up to 4× Wireless Lavs",
        "RF Distro & High-Gain Antennas",
        "Active PA Playback Speakers",
        "Optimized for Complex Sets"
      ],
      included: ["Wireless Boom Mic", "IFB Headset (Individual)", "Wireless Camera Audio Link", "Timecode Sync Box", "Timecode Smart Slate", "Playback Speakers (Pair)"],
      highlighted: false
    }
  ];

  const addons = [
    { item: "Additional Wireless Lav", rate: "$75–$125", price: 100 },
    { item: "Wireless Boom Mic", rate: "$100", price: 100 },
    { item: "IFB Headset (Individual)", rate: "$50", price: 50 },
    { item: "Wireless Camera Audio Link", rate: "$50–$75", price: 65 },
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.shootDate || !formData.location || !formData.productionType) {
      alert('Please fill in all required fields');
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

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md py-4 border-b border-neutral-800' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-cyan-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Volume2 className="text-black w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">Helou<span className="text-cyan-400">Sound</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-neutral-900 rounded-lg transition-colors">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 p-6 space-y-4">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover opacity-40"
            src="/Abstract_Audio_Wave_Video_Generation.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-6 italic">
            Professional Audio for<br /><span className="text-cyan-400">Demanding Filmmakers</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-12 max-w-2xl mx-auto">
            On-set recording, sound design, dialogue editing, and final mixing. Bringing pristine audio to your vision.
          </p>
          <a href="#quote-form" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all transform hover:scale-105">
            Get a Quote
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-neutral-900/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-neutral-800 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <img 
                src="/Meet.avif" 
                className="w-full h-full object-cover" 
                alt="Richard Helou in Studio" 
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-cyan-500 text-black p-8 rounded-[2rem] shadow-2xl">
              <p className="text-4xl font-black italic leading-none">10+</p>
              <p className="text-xs font-bold uppercase tracking-widest mt-1">Years On Set</p>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase italic leading-tight">
              Meet <br />Richard Helou
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              With a decade of experience across narrative features, commercials, and high-stakes episodic TV, 
              I bring more than just gear to your set—I bring a commitment to the sonic narrative.
            </p>
            
            <div className="space-y-4">
              {/* Membership/Award Item 1 */}
              <div className="flex items-center gap-4 text-neutral-200">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center">
                  <Award className="text-cyan-400 w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">
                  CAS Associate Member
                </span>
              </div>
              
              {/* Membership/Award Item 2 */}
              <div className="flex items-center gap-4 text-neutral-200">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center">
                  <Film className="text-cyan-400 w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">
                  Global Production Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16 italic">
            What We <span className="text-cyan-400">Offer</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div key={i} className="group p-8 bg-gradient-to-br from-neutral-800/50 to-neutral-900 border border-neutral-700 rounded-2xl hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold uppercase mb-4 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-neutral-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sound Matters */}
      <section id="why-sound" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16 italic">
            Why Good Sound <span className="text-cyan-400">Matters</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {whySoundMatters.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-400 flex-shrink-0 mt-1">{item.icon}</div>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-cyan-500/20 to-transparent border-l-4 border-cyan-500 p-8 rounded-xl">
            <AlertCircle className="w-6 h-6 text-cyan-400 mb-3" />
            <h3 className="text-2xl font-bold mb-3">Bad Audio is Unforgivable</h3>
            <p className="text-neutral-300">
              Your audience forgives soft lighting, slightly out-of-focus moments, or budget limitations. But they won't forgive bad audio. Invest in professional sound from day one, and your production will feel like a studio project, not a student film.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16 italic">
            Transparent <span className="text-cyan-400">Rates</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl transition-all ${
                  pkg.highlighted
                    ? 'bg-gradient-to-br from-cyan-500/20 to-neutral-900 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20 transform lg:scale-105'
                    : 'bg-neutral-800/50 border border-neutral-700 hover:border-cyan-500/50'
                }`}
              >
                <h3 className="text-2xl font-black uppercase mb-2">{pkg.name}</h3>
                <p className="text-cyan-400 text-sm font-bold uppercase mb-6">{pkg.target}</p>
                <p className="text-4xl font-black mb-8">{pkg.displayPrice}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-8">
            <h3 className="text-2xl font-black uppercase mb-6">Add-On Gear</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-neutral-700">
                  <tr>
                    <th className="text-left py-3 font-bold uppercase">Item</th>
                    <th className="text-right py-3 font-bold uppercase">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700">
                  {addons.map((addon, i) => (
                    <tr key={i} className="hover:bg-neutral-700/30 transition-colors">
                      <td className="py-3">{addon.item}</td>
                      <td className="text-right text-cyan-400 font-bold">{addon.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-2xl mx-auto">
          {!isFormOpen ? (
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 italic">
                Ready for <span className="text-cyan-400">Professional Audio?</span>
              </h2>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all transform hover:scale-105"
              >
                Get a Quote
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-4 italic">
                Get a <span className="text-cyan-400">Quote</span>
              </h2>
              <p className="text-neutral-400 text-center mb-12">
                Fill out the form below and I'll respond within 24 business hours with a personalized quote.
              </p>

              {formSubmitted ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-black uppercase mb-2">Thanks! We'll Review Your Details</h3>
                  <p className="text-neutral-300 text-lg">
                    We'll review your shoot details and respond shortly with a personalized quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 md:p-12 space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest text-cyan-400">Required Information</h3>
                
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g., Jane Smith"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="jane@production.com"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Shoot Date(s)</label>
                  <input
                    type="date"
                    name="shootDate"
                    value={formData.shootDate}
                    onChange={handleFormChange}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Location / Studio</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="e.g., Downtown LA, Stage 5, Brooklyn Loft"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Production Type</label>
                  <select
                    name="productionType"
                    value={formData.productionType}
                    onChange={handleFormChange}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="">Select a type...</option>
                    {productionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest text-cyan-400">Optional Details</h3>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Package Selection</label>
                  <select
                    name="packageSelection"
                    value={formData.packageSelection}
                    onChange={handleFormChange}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 focus:outline-none focus:border-cyan-500 transition-colors"
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
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Estimated Shoot Hours</label>
                  <input
                    type="number"
                    name="estimatedHours"
                    value={formData.estimatedHours}
                    onChange={handleFormChange}
                    placeholder="e.g., 12"
                    min="1"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {formData.packageSelection && (() => {
                  const estimate = calculateEstimate();
                  if (!estimate) return null;
                  return (
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-[1.5rem] p-6">
                      <h4 className="font-bold uppercase tracking-widest mb-4 text-cyan-400">Estimate Breakdown</h4>
                      <div className="space-y-2 text-sm">
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
                          <div className="flex justify-between text-base font-black text-cyan-400">
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
                  <label className="block text-sm font-bold uppercase tracking-widest mb-4">Add-On Gear</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addons.map((addon, i) => (
                      <label key={i} className="flex items-center gap-3 p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg hover:border-cyan-500/50 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          value={addon.item}
                          checked={formData.addOns.includes(addon.item)}
                          onChange={handleFormChange}
                          className="w-4 h-4 accent-cyan-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium">{addon.item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleFormChange}
                    placeholder="Tell us more about your project, any special requirements, or questions..."
                    rows="4"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105"
                >
                  Get Quote
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-neutral-500 text-center">We'll respond to your inquiry within 24 business hours.</p>
            </form>
              )}
            </>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-8">Questions? <br /><span className="text-cyan-400">Let's Talk</span></h2>
            <p className="text-neutral-400 mb-12 text-lg max-w-2xl mx-auto">Prefer to reach out directly? Contact me via email or social media.</p>
            <div className="flex items-center justify-center gap-6 text-neutral-400">
              <a href="mailto:richard@helousound.com" className="hover:text-cyan-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/helousound/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Volume2 className="text-cyan-400 w-5 h-5" />
          <span className="font-black tracking-tighter uppercase italic">Helou Sound</span>
        </div>
        <p className="text-neutral-600 text-[10px] uppercase tracking-[0.4em]">Richard Helou • Professional Audio Post & Location Recording © 2024</p>
      </footer>
    </div>
  );
};

export default App;
