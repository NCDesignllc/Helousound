
import React, { useState, useEffect } from 'react';
import { Volume2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useSelectedPackage } from '../context/SelectedPackageContext.jsx';
import QuoteModal from '../components/QuoteModal.jsx';
const BundleBuilder = ({ onBack, selectedPackage: initialPackage }) => {
  const { selectedPackage: contextPackage } = useSelectedPackage();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [cart, setCart] = useState({});
  const [scrolled, setScrolled] = useState(false);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set the initially selected package from context or props

  useEffect(() => {
    // Use context package if available, otherwise use props
    if (contextPackage) {
      setSelectedPackage(contextPackage);
    } else if (initialPackage) {
      setSelectedPackage(initialPackage);
    }
  }, [contextPackage, initialPackage]);

  const packages = [
    {
      name: "Interview Quick Kit",
      price: 500,
      displayPrice: "$500",
      target: "Corporate & Sit-downs",
      features: [
        "1 x Mixer/Recorder",
        "1 x Boom Mic",
        "2× Wireless Lavalier",
        "Audio Feed to Camera",
        
      ],
      highlighted: false
    },
    {
      name: "Narrative Film",
      price: 750,
      displayPrice: "$750",
      target: "Shorts & Indie Features",
      features: [
        "1 x Mixer/Recorder",
        "1 x Boom Mic",
        "2× Wireless Lavaliers",
        "2 x Timecode Sync ",
        "2 x IFB Headset ",
       
      ],
      highlighted: true
    },
    {
      name: "Commercial / TV",
      price: 900,
      displayPrice: "$900",
      target: "Branded & Episodic",
      features: [
       "1 x Mixer/Recorder",
        "1 x Boom Mic",
        "2× Wireless Lavaliers",
        "2 x Timecode Sync ",
        "3 x IFB Headset ",
      ],
      highlighted: false
    }
  ];

  const addons = [
    { item: "Additional Wireless Lav", rate: "$100", price: 100 },
    { item: "Wireless Boom Mic", rate: "$100", price: 100 },
    { item: "IFB Headset", rate: "$50", price: 50 },
    { item: "Wireless Camera Audio Link", rate: "$75", price: 75 },
    { item: "Timecode Sync Box", rate: "$50", price: 50 },
    { item: "Timecode Smart Slate", rate: "$75", price: 75 },  
  ];

  const handleUpdateQuantity = (addonName, newQuantity) => {
    const qty = Math.max(0, newQuantity);
    setCart(prev => {
      const updated = { ...prev };
      if (qty === 0) {
        delete updated[addonName];
      } else {
        updated[addonName] = { qty, id: updated[addonName]?.id || Date.now() + Math.random() };
      }
      return updated;
    });
  };

  const handleIncrement = (addonName) => {
    const currentQty = cart[addonName]?.qty || 0;
    handleUpdateQuantity(addonName, currentQty + 1);
  };

  const handleDecrement = (addonName) => {
    const currentQty = cart[addonName]?.qty || 0;
    handleUpdateQuantity(addonName, currentQty - 1);
  };

  const calculateTotal = () => {
    const packagePrice = selectedPackage ? selectedPackage.price : 0;
    const laborCost = selectedPackage ? 800 : 0;
    const addonsTotal = addons.reduce((sum, addon) => {
      const cartItem = cart[addon.item];
      const qty = cartItem?.qty || 0;
      return sum + addon.price * qty;
    }, 0);
    return packagePrice + laborCost + addonsTotal;
  };

  const getAddonQuantity = (addonName) => {
    const cartItem = cart[addonName];
    return cartItem?.qty || 0;
  };

  const getAddonLineTotal = (addonName, price) => {
    const qty = getAddonQuantity(addonName);
    return price * qty;
  };

  const getTotalAddonsCount = () => {
    return Object.values(cart).reduce((sum, item) => sum + (item?.qty || 0), 0);
  };

  const showSummary = selectedPackage || getTotalAddonsCount() > 0;
  // Increased bottom padding on mobile for larger fixed summary bar
  const containerPadding = showSummary ? 'pb-48 sm:pb-40' : '';

  const getBundleData = () => {
    const addonsList = addons
      .filter(addon => getAddonQuantity(addon.item) > 0)
      .map(addon => ({
        item: addon.item,
        price: addon.price,
        quantity: getAddonQuantity(addon.item)
      }));

    return {
      selectedPackage,
      addons: addonsList,
      totalPerDay: calculateTotal()
    };
  };

  return (
    <div className={`min-h-screen bg-neutral-950 text-neutral-100 ${containerPadding}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md py-3 sm:py-4 border-b border-neutral-800' : 'bg-transparent py-4 sm:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Back button with proper touch target */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-300 hover:text-cyan-400 active:text-cyan-300 transition-colors p-2 -ml-2 min-h-[44px]"
            aria-label="Go back to home"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500 p-1.5 rounded-lg">
              <Volume2 className="text-black w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tighter uppercase">Helou<span className="text-cyan-400">Sound</span></span>
          </div>
          {/* Cart icon with proper touch target */}
          <div className="relative p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-cyan-400" />
            {getTotalAddonsCount() > 0 && (
              <span className="absolute top-0 right-0 bg-cyan-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {getTotalAddonsCount()}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase italic mb-4 sm:mb-6">
          Let&apos;s Build <span className="text-cyan-400">A Package</span>
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8">
          Start by selecting a package, then customize it with additional gear to perfectly match your production needs.
        </p>
      </section>

      {/* Packages Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic mb-8 sm:mb-12 text-center">
            Choose Your <span className="text-cyan-400">Sound Package</span>
          </h2>
          {/* Single column on mobile for better touch targets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center max-w-5xl mx-auto">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPackage(pkg)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedPackage(pkg)}
                aria-pressed={selectedPackage?.name === pkg.name}
                className={`relative w-full p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedPackage?.name === pkg.name
                    ? 'bg-cyan-500/10 border-cyan-400 scale-[1.02] sm:scale-105 shadow-lg shadow-cyan-500/20'
                    : pkg.highlighted
                    ? 'bg-gradient-to-br from-neutral-900 to-neutral-950 border-cyan-600 hover:border-cyan-500 active:scale-[0.98]'
                    : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 active:scale-[0.98]'
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-black px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    Popular
                  </div>
                )}
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-black uppercase mb-2">{pkg.name}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">{pkg.target}</p>
                  <p className="text-3xl sm:text-4xl font-black text-cyan-400">{pkg.displayPrice}</p>
                  <p className="text-xs text-neutral-600 uppercase tracking-widest mt-1">Per Day</p>
                  <p className="text-xs text-cyan-400/70 mt-1">Includes labor</p>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="text-xs sm:text-sm text-neutral-400 flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {selectedPackage?.name === pkg.name && (
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-cyan-400 pointer-events-none animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs sm:text-sm text-neutral-500 mt-6 sm:mt-8 max-w-2xl mx-auto px-2">
            * Labor: $800/10hrs +OT x1.5 after 8hrs, x2 after 12hrs and will be reflected in the final quote
          </p>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic mb-3 sm:mb-4 text-center">
            Customize With <span className="text-cyan-400">Add-Ons</span>
          </h2>
          <p className="text-neutral-500 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Add optional gear to enhance your production setup. Mix and match as needed.
          </p>
          {/* Single column on mobile, 2 cols on tablet, 3 cols on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {addons.map((addon, idx) => {
              const qty = getAddonQuantity(addon.item);
              const isSelected = qty > 0;
              
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'bg-neutral-900 border-neutral-800 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg mb-1">{addon.item}</h3>
                      <p className="text-cyan-400 text-xl sm:text-2xl font-black">{addon.rate}</p>
                      <p className="text-[10px] sm:text-xs text-neutral-600 uppercase tracking-widest">Per Day</p>
                    </div>
                    <div className="flex-shrink-0 ml-3 sm:ml-4 text-right">
                      <p className="text-xs sm:text-sm font-bold text-cyan-400 mb-2">Qty {qty}</p>
                    </div>
                  </div>
                  
                  {/* Quantity buttons with proper touch targets (min 44px) */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <button
                      onClick={() => handleDecrement(addon.item)}
                      disabled={qty === 0}
                      aria-label={`Decrease quantity of ${addon.item}`}
                      className={`flex-1 py-3 px-3 min-h-[44px] rounded-lg font-bold transition-all ${
                        qty === 0
                          ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 active:bg-red-500/40 border border-red-500/50'
                      }`}
                    >
                      <Minus className="w-5 h-5 mx-auto" />
                    </button>
                    <div className="flex-1 text-center py-3 px-3 min-h-[44px] bg-neutral-800/50 rounded-lg font-bold text-cyan-400 flex items-center justify-center">
                      {qty}
                    </div>
                    <button
                      onClick={() => handleIncrement(addon.item)}
                      aria-label={`Increase quantity of ${addon.item}`}
                      className="flex-1 py-3 px-3 min-h-[44px] rounded-lg font-bold transition-all bg-cyan-500 text-black hover:bg-cyan-400 active:bg-cyan-300 border border-cyan-400"
                    >
                      <Plus className="w-5 h-5 mx-auto" />
                    </button>
                  </div>

                  {isSelected && (
                    <div className="text-[10px] sm:text-xs text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1">
                      <span>✓</span> Added to bundle
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cart Summary - Fixed Bottom with safe area for iOS */}
      {(selectedPackage || getTotalAddonsCount() > 0) && (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 py-4 sm:py-6 px-4 sm:px-6 z-40 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1 w-full">
                <h3 className="text-base sm:text-lg font-black uppercase mb-2 sm:mb-3">Your Bundle</h3>
                {/* Scrollable summary list with limited height on mobile */}
                <div className="space-y-1.5 sm:space-y-2 max-h-24 sm:max-h-40 overflow-y-auto">
                  {selectedPackage && (
                    <div className="flex items-center justify-between text-xs sm:text-sm bg-neutral-900 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      <span className="font-bold">{selectedPackage.name}</span>
                      <span className="text-cyan-400 font-black">{selectedPackage.displayPrice}/day</span>
                    </div>
                  )}
                  {selectedPackage && (
                    <div className="flex items-center justify-between text-xs sm:text-sm bg-neutral-900 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      <span className="font-bold">Labor (10-hour day)</span>
                      <span className="text-cyan-400 font-black">$800/day</span>
                    </div>
                  )}
                  {addons.map((addon) => {
                    const qty = getAddonQuantity(addon.item);
                    if (qty === 0) return null;
                    const lineTotal = getAddonLineTotal(addon.item, addon.price);
                    return (
                      <div key={addon.item} className="flex items-center justify-between text-xs sm:text-sm bg-neutral-900 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                        <span className="font-bold truncate mr-2">{addon.item} × {qty}</span>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <span className="text-cyan-400 font-bold">${lineTotal}/day</span>
                          <button
                            onClick={() => handleUpdateQuantity(addon.item, 0)}
                            className="text-red-400 hover:text-red-300 active:text-red-200 transition-colors p-1 min-w-[32px] min-h-[32px] flex items-center justify-center"
                            aria-label={`Remove ${addon.item} from bundle`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Mobile-optimized total and CTA button layout */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full lg:w-auto">
                <div className="text-center sm:text-right w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-widest mb-0.5 sm:mb-1">Total Per Day</p>
                  <p className="text-2xl sm:text-4xl font-black text-cyan-400">${calculateTotal()}</p>
                </div>
                <button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-300 text-black px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-sm sm:text-base transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 whitespace-nowrap"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        bundle={getBundleData()}
      />
    </div>
  );
};


export default BundleBuilder;

