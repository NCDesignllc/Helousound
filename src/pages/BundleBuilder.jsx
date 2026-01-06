import React, { useState, useEffect } from 'react';
import { Volume2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';

const BundleBuilder = ({ onBack }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [cart, setCart] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { item: "Additional Wireless Lav", rate: "$100", price: 100 },
    { item: "Wireless Boom Mic", rate: "$100", price: 100 },
    { item: "IFB Headset (Individual)", rate: "$50", price: 50 },
    { item: "Wireless Camera Audio Link", rate: "$75", price: 75 },
    { item: "Timecode Sync Box", rate: "$50", price: 50 },
    { item: "Timecode Smart Slate", rate: "$75", price: 75 },
    { item: "Playback Speakers (Pair)", rate: "$250", price: 250 }
  ];

  const handleAddToCart = (addon) => {
    setCart([...cart, { ...addon, id: Date.now() }]);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    const packagePrice = selectedPackage ? selectedPackage.price : 0;
    const addonsTotal = cart.reduce((sum, item) => sum + item.price, 0);
    return packagePrice + addonsTotal;
  };

  const isAddonIncluded = (addonName) => {
    return selectedPackage?.included.includes(addonName);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md py-4 border-b border-neutral-800' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500 p-1.5 rounded-lg">
              <Volume2 className="text-black w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">Helou<span className="text-cyan-400">Sound</span></span>
          </div>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-cyan-400" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase italic mb-6">
          Let's Build <span className="text-cyan-400">A Bundle</span>
        </h1>
        <p className="text-neutral-400 text-lg max-w-3xl mx-auto mb-8">
          Start by selecting a package, then customize it with additional gear to perfectly match your production needs.
        </p>
      </section>

      {/* Packages Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-12 text-center">
            Choose Your <span className="text-cyan-400">Base Package</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedPackage?.name === pkg.name
                    ? 'bg-cyan-500/10 border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20'
                    : pkg.highlighted
                    ? 'bg-gradient-to-br from-neutral-900 to-neutral-950 border-cyan-600 hover:border-cyan-500'
                    : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black uppercase mb-2">{pkg.name}</h3>
                  <p className="text-neutral-500 text-sm uppercase tracking-widest mb-4">{pkg.target}</p>
                  <p className="text-4xl font-black text-cyan-400">{pkg.displayPrice}</p>
                  <p className="text-xs text-neutral-600 uppercase tracking-widest mt-1">Per Day</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="text-sm text-neutral-400 flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {selectedPackage?.name === pkg.name && (
                  <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400 pointer-events-none animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-12 px-6 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-4 text-center">
            Customize With <span className="text-cyan-400">Add-Ons</span>
          </h2>
          <p className="text-neutral-500 text-center mb-12 max-w-2xl mx-auto">
            {selectedPackage 
              ? `Enhance your ${selectedPackage.name} package with additional gear`
              : 'Select a package above to customize with add-ons'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon, idx) => {
              const included = isAddonIncluded(addon.item);
              const inCart = cart.filter(item => item.item === addon.item).length;
              
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all ${
                    included
                      ? 'bg-cyan-500/5 border-cyan-700 opacity-60'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{addon.item}</h3>
                      <p className="text-cyan-400 text-2xl font-black">{addon.rate}</p>
                      <p className="text-xs text-neutral-600 uppercase tracking-widest">Per Day</p>
                    </div>
                    {!included && selectedPackage && (
                      <button
                        onClick={() => handleAddToCart(addon)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-xl transition-all transform hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {included && (
                    <div className="text-xs text-cyan-400 uppercase tracking-widest font-bold">
                      ✓ Included in package
                    </div>
                  )}
                  {inCart > 0 && !included && (
                    <div className="text-xs text-cyan-400 uppercase tracking-widest font-bold">
                      {inCart}× in cart
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cart Summary - Fixed Bottom */}
      {(selectedPackage || cart.length > 0) && (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 py-6 px-6 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1 w-full">
                <h3 className="text-lg font-black uppercase mb-3">Your Bundle</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedPackage && (
                    <div className="flex items-center justify-between text-sm bg-neutral-900 p-3 rounded-xl">
                      <span className="font-bold">{selectedPackage.name}</span>
                      <span className="text-cyan-400 font-black">{selectedPackage.displayPrice}</span>
                    </div>
                  )}
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm bg-neutral-900 p-3 rounded-xl">
                      <span>{item.item}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-bold">${item.price}</span>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-neutral-500 uppercase tracking-widest mb-1">Total Per Day</p>
                  <p className="text-4xl font-black text-cyan-400">${calculateTotal()}</p>
                </div>
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 whitespace-nowrap">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BundleBuilder;
