import React, { useState, useEffect } from 'react';
import { Volume2, ArrowLeft, Mic2, Film, Headphones, Settings, Users, Layers } from 'lucide-react';

const WhySoundMatters = ({ onBack }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      title: "Sound Is Half the Story",
      subtitle: "Audiences may forgive a soft focus shot or a shaky frame. They will not forgive bad sound.",
      content: [
        "In film and video, sound is not an accessory — it carries emotion, clarity, and realism. Dialogue, movement, and atmosphere are what make a scene believable.",
        "If the sound fails, the story breaks."
      ],
      icon: <Film className="w-12 h-12" />
    },
    {
      title: "Bad Sound Pulls the Audience Out of the Moment",
      subtitle: "Even when viewers can't explain why something feels 'off,' they feel it immediately:",
      content: [
        "Dialogue that's hard to understand",
        "Inconsistent levels between shots",
        "Background noise that distracts from performance",
        "Audio that feels disconnected from the image"
      ],
      note: "Once an audience notices the sound, they stop watching the story and start watching the production.",
      icon: <Headphones className="w-12 h-12" />
    },
    {
      title: "Good Production Sound Is Invisible",
      subtitle: "When sound is done right:",
      content: [
        "Dialogue is clear without sounding processed",
        "Performances feel natural and grounded",
        "Backgrounds feel intentional, not noisy",
        "Editors aren't fighting problems in post"
      ],
      note: "The goal isn't flashy sound — it's believable sound. Good sound disappears so the story can take center stage.",
      icon: <Layers className="w-12 h-12" />
    }
  ];

  const productionSections = [
    {
      title: "Clean Dialogue Saves Time and Money",
      subtitle: "Poor audio leads to:",
      content: [
        "ADR sessions",
        "compromised performances",
        "extra post-production costs",
        "scenes that never quite feel right"
      ],
      note: "Capturing clean sound on set protects both the schedule and the final cut.",
      icon: <Mic2 className="w-12 h-12" />
    },
    {
      title: "Performance Depends on Trust",
      subtitle: "Actors perform better when:",
      content: [
        "they don't need to project unnaturally",
        "they can move freely without technical distractions",
        "the boom is placed precisely, not invasively"
      ],
      note: "A skilled sound team supports performance without interfering with it.",
      icon: <Users className="w-12 h-12" />
    },
    {
      title: "Sound Design Starts on Location",
      subtitle: "Great sound design doesn't begin in post. It begins with:",
      content: [
        "controlled dialogue capture",
        "intentional room tone",
        "clean ambiences and textures"
      ],
      note: "These elements give editors and sound designers the foundation they need to elevate the project.",
      icon: <Layers className="w-12 h-12" />
    },
    {
      title: "It's Not Just the Gear — It's the Craft",
      subtitle: "High-end microphones alone don't guarantee great sound. Professional production audio depends on:",
      content: [
        "mic choice for each scene and environment",
        "precise boom placement and movement",
        "understanding reflections, wind, and location noise",
        "anticipating problems before they happen"
      ],
      note: "Experience is what allows sound to be captured cleanly in unpredictable environments.",
      icon: <Settings className="w-12 h-12" />
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md py-3 sm:py-4 border-b border-neutral-800' : 'bg-neutral-950/80 backdrop-blur-md py-4 sm:py-6 border-b border-neutral-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Back button with proper touch target */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-cyan-400 active:text-cyan-300 transition-colors group p-2 -ml-2 min-h-[44px]"
            aria-label="Go back to home"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs sm:text-sm">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500 p-1.5 rounded-lg">
              <Volume2 className="text-black w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tighter uppercase">Helou<span className="text-cyan-400">Sound</span></span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase italic leading-tight mb-4 sm:mb-6">
            Why Good Sound <br />
            <span className="text-cyan-400">Matters</span>
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            Understanding why professional audio isn&apos;t optional — it&apos;s essential.
          </p>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* 2-column grid that stacks on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
            <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 group">
              <img 
                src="/professional-sound-cart-on-location.jpg"
                alt="Professional sound cart with mixing equipment on location film set"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-400">Professional Sound Cart</p>
                <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Mobile mixing station for complex productions</p>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 group">
              <img 
                src="/location-sound-recording-equipment.jpg"
                alt="Location sound recording equipment cart for film and video production"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-400">Location Recording Setup</p>
                <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Versatile cart for on-location shoots</p>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] md:aspect-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 group">
              <img 
                src="/audio-mixing-gear-setup.jpg"
                alt="Professional audio mixing equipment and gear for film production sound"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-400">Audio Mixing Gear</p>
                <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Industry-standard recording equipment</p>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] md:aspect-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 group">
              <img 
                src="/boom-microphone-recording-session.jpg"
                alt="Boom microphone recording session in professional film production environment"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-400">Boom Recording Session</p>
                <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Precision dialogue capture on set</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-16">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="text-cyan-400 flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic mb-2 sm:mb-3">
                    {section.title}
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-300 font-medium">
                    {section.subtitle}
                  </p>
                </div>
              </div>
              
              <div className="pl-0 sm:pl-0 md:pl-[72px] space-y-3 sm:space-y-4">
                <ul className="space-y-2 sm:space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-sm sm:text-base text-neutral-400 leading-relaxed flex items-start gap-2 sm:gap-3">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {section.note && (
                  <p className="text-sm sm:text-base text-neutral-300 font-medium italic mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-neutral-800">
                    {section.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Production Sound Matters on Set */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic text-center mb-10 sm:mb-16">
            Why Production Sound <br />
            <span className="text-cyan-400">Matters on Set</span>
          </h2>
          
          <div className="space-y-8 sm:space-y-12">
            {productionSections.map((section, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-8 md:p-12 rounded-3xl"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="text-cyan-400 flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic mb-2 sm:mb-3">
                      {section.title}
                    </h3>
                    <p className="text-base sm:text-lg text-neutral-300 font-medium">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
                
                <div className="pl-0 sm:pl-0 md:pl-[72px] space-y-3 sm:space-y-4">
                  <ul className="space-y-2 sm:space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="text-sm sm:text-base text-neutral-400 leading-relaxed flex items-start gap-2 sm:gap-3">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {section.note && (
                    <p className="text-sm sm:text-base text-neutral-300 font-medium italic mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-neutral-800">
                      {section.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sound That Serves the Story */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-950/20 to-neutral-950 border border-cyan-800/30 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase italic mb-4 sm:mb-6">
              Sound That Serves <span className="text-cyan-400">the Story</span>
            </h2>
            
            <p className="text-base sm:text-lg text-neutral-300 mb-4 sm:mb-6">
              The role of a production sound mixer isn&apos;t to show off technique.
            </p>
            
            <p className="text-lg sm:text-xl text-neutral-200 font-bold mb-3 sm:mb-4">It&apos;s to:</p>
            
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                "protect dialogue",
                "respect performances",
                "adapt to fast-moving sets",
                "deliver audio that cuts smoothly in post"
              ].map((item, i) => (
                <li key={i} className="text-sm sm:text-base text-neutral-400 leading-relaxed flex items-start gap-2 sm:gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-sm sm:text-base text-neutral-300 font-medium italic pt-4 sm:pt-6 border-t border-neutral-800">
              Every decision on set should support the story — not slow it down.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic text-center mb-8 sm:mb-12">
            Our <span className="text-cyan-400">Approach</span>
          </h2>
          
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl">
            <p className="text-base sm:text-lg text-neutral-300 mb-6 sm:mb-8">
              We provide professional location sound for film and video production with a focus on:
            </p>
            
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[
                "Clean, natural dialogue capture",
                "Reliable boom and wireless workflows",
                "Efficient, low-profile operation on set",
                "Audio delivered ready for post"
              ].map((item, i) => (
                <li key={i} className="text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed flex items-start gap-2 sm:gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-6 sm:pt-8 border-t border-neutral-800">
              <p className="text-lg sm:text-xl text-neutral-200 font-bold mb-2">The goal is simple:</p>
              <p className="text-xl sm:text-2xl text-cyan-400 font-black italic">sound you don&apos;t have to fix later.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-950/30 to-neutral-950 border-2 border-cyan-500/30 p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[4rem] text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase italic mb-4 sm:mb-6">
              Let&apos;s Make Sound <br />
              <span className="text-cyan-400">One Less Thing to Worry About</span>
            </h2>
            
            <p className="text-base sm:text-lg text-neutral-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
              If sound is captured correctly on set, it disappears from the list of problems — and stays where it belongs: supporting the story.
            </p>
            
            {/* CTA button with proper touch target */}
            <button
              onClick={onBack}
              className="inline-block bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-300 text-black px-8 sm:px-10 py-4 min-h-[48px] rounded-full font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer with safe area padding */}
      <footer className="py-8 sm:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] border-t border-neutral-900 text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Volume2 className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-black tracking-tighter uppercase italic text-sm sm:text-base">Helou Sound</span>
        </div>
        <p className="text-neutral-600 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em]">Richard Helou • Professional Audio Post & Location Recording © 2024</p>
      </footer>
    </div>
  );
};

export default WhySoundMatters;
