import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const BundleModal = ({ isOpen, onClose, onConfirm, packageName }) => {
  const modalRef = useRef(null);
  const confirmButtonRef = useRef(null);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Close on ESC
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap: Tab within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus the confirm button when modal opens
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - optimized for mobile with proper spacing and touch targets */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="relative z-10 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-8 max-w-md w-full shadow-2xl transition-all transform scale-100 opacity-100"
      >
        {/* Close button with proper touch target (min 44px) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-neutral-800 active:bg-neutral-700 rounded-lg transition-colors text-neutral-400 hover:text-neutral-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <h2 id="modal-title" className="text-xl sm:text-2xl font-black uppercase mb-2 pr-10">
          Build a Custom Bundle?
        </h2>
        <p id="modal-description" className="text-neutral-300 mb-6 sm:mb-8 text-sm sm:text-base">
          Would you like to start building a custom bundle based on the <span className="text-cyan-400 font-bold">{packageName}</span> package?
        </p>

        {/* Buttons with proper touch targets (min 44px height) */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onConfirm}
            ref={confirmButtonRef}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-300 text-black font-black uppercase px-5 sm:px-6 py-3.5 min-h-[48px] rounded-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-neutral-900 text-sm sm:text-base"
          >
            Yes, build a bundle
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-neutral-100 font-black uppercase px-5 sm:px-6 py-3.5 min-h-[48px] rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900 text-sm sm:text-base"
          >
            No, thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default BundleModal;
