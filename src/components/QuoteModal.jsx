import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const QuoteModal = ({ isOpen, onClose, bundle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    productionName: '',
    address: '',
    shootDate: '',
    productionDurationDays: 1,
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [submitError, setSubmitError] = useState('');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        productionName: '',
        address: '',
        shootDate: '',
        productionDurationDays: 1,
        notes: ''
      });
      setErrors({});
      setSubmitStatus(null);
      setSubmitError('');
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field on input
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.shootDate) {
      newErrors.shootDate = 'Shoot date is required';
    }
    if (!formData.productionDurationDays || formData.productionDurationDays < 1) {
      newErrors.productionDurationDays = 'Duration must be at least 1 day';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Encode data for Netlify Forms
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitError('');

    try {
      // Build the quote payload for display
      const addonsList = bundle.addons.map(addon => ({
        item: addon.item,
        pricePerDay: addon.price,
        quantity: addon.quantity,
        lineTotalPerDay: addon.price * addon.quantity
      }));

      // Create formatted data for Netlify
      const netlifyFormData = {
        'form-name': 'quote-request',
        'fullName': formData.fullName.trim(),
        'email': formData.email.trim(),
        'phone': formData.phone.trim() || '',
        'productionName': formData.productionName.trim() || '',
        'address': formData.address.trim() || '',
        'shootDate': formData.shootDate,
        'productionDurationDays': formData.productionDurationDays,
        'notes': formData.notes.trim() || '',
        'selectedPackage': bundle.selectedPackage.name,
        'packagePrice': bundle.selectedPackage.displayPrice,
        'addons': JSON.stringify(addonsList),
        'totalPerDay': bundle.totalPerDay,
        'estimatedTotal': bundle.totalPerDay * parseInt(formData.productionDurationDays, 10)
      };

      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(netlifyFormData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitStatus('success');
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitError('There was an error submitting your request. Please try again or contact us directly.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-neutral-900 rounded-3xl border-2 border-neutral-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Request <span className="text-cyan-400">Quote</span>
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Bundle Summary */}
          <div className="mb-8 p-6 bg-neutral-950 rounded-2xl border border-neutral-800">
            <h3 className="text-sm font-bold uppercase text-neutral-400 tracking-widest mb-4">
              Bundle Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-300">{bundle.selectedPackage.name}</span>
                <span className="text-cyan-400 font-bold">{bundle.selectedPackage.displayPrice}/day</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-300">Labor (10-hour day)</span>
                <span className="text-cyan-400 font-bold">$800/day</span>
              </div>
              {bundle.addons.length > 0 && (
                <>
                  <div className="border-t border-neutral-800 my-2 pt-2">
                    {bundle.addons.map((addon, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-neutral-400">{addon.item} × {addon.quantity}</span>
                        <span className="text-cyan-400 font-bold">${addon.price * addon.quantity}/day</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="border-t border-neutral-800 mt-2 pt-3 flex justify-between">
                <span className="font-bold text-neutral-200">Total Per Day</span>
                <span className="text-xl font-black text-cyan-400">${bundle.totalPerDay}</span>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-400">Quote Request Sent!</p>
                <p className="text-sm text-green-300/80 mt-1">We&apos;ll review your request and get back to you soon.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-400">Submission Error</p>
                <p className="text-sm text-red-300/80 mt-1">{submitError || 'Please check your connection and try again.'}</p>
              </div>
            </div>
          )}

          {/* Form */}
          {submitStatus !== 'success' && (
            <form 
              name="quote-request" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="quote-request" />
              <input type="hidden" name="bot-field" />
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold uppercase text-neutral-300 mb-2 tracking-widest">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  className={`w-full px-4 py-3 bg-neutral-800 rounded-xl border-2 transition-colors ${
                    errors.fullName ? 'border-red-500/50' : 'border-neutral-700 focus:border-cyan-500'
                  } text-neutral-100 placeholder-neutral-500 outline-none`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold uppercase text-neutral-300 mb-2 tracking-widest">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 bg-neutral-800 rounded-xl border-2 transition-colors ${
                    errors.email ? 'border-red-500/50' : 'border-neutral-700 focus:border-cyan-500'
                  } text-neutral-100 placeholder-neutral-500 outline-none`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold uppercase text-neutral-300 mb-2 tracking-widest">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 bg-neutral-800 rounded-xl border-2 border-neutral-700 focus:border-cyan-500 text-neutral-100 placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              {/* Production Name */}
              <div>
                <label className="block text-sm font-bold uppercase text-neutral-300 mb-2 tracking-widest">
                  Production Name
                </label>
                <input
                  type="text"
                  name="productionName"
                  value={formData.productionName}
                  onChange={handleInputChange}
                  placeholder="e.g., Summer Campaign 2024"
                  className="w-full px-4 py-3 bg-neutral-800 rounded-xl border-2 border-neutral-700 focus:border-cyan-500 text-neutral-100 placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-bold uppercase text-neutral-300 mb-2 tracking-widest">
                  Address (Mailing)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, New York, NY 10001"
                  className="w-full px-4 py-3 bg-neutral-800 rounded-xl border-2 border-neutral-700 focus:border-cyan-500 text-neutral-100 placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              {/* Shoot Date */}
              <div>
                <label className="block text-sm font-bold uppercase text-neutral-300 mb-2 tracking-widest">
                  Projected Start Date *
                </label>
                <input
                  type="date"
                  name="shootDate"
                  value={formData.shootDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-neutral-800 rounded-xl border-2 transition-colors ${
                    errors.shootDate ? 'border-red-500/50' : 'border-neutral-700 focus:border-cyan-500'
                  } text-neutral-100 outline-none`}
                />
                {errors.shootDate && (
                  <p className="text-xs text-red-400 mt-1">{errors.shootDate}</p>
                )}
              </div>

              {/* Production Duration */}
              <div>
                <label className="block text-sm font-bold uppercase text-neutral-300 mb-2 tracking-widest">
                  Production Duration (Days) *
                </label>
                <input
                  type="number"
                  name="productionDurationDays"
                  value={formData.productionDurationDays}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-4 py-3 bg-neutral-800 rounded-xl border-2 transition-colors ${
                    errors.productionDurationDays ? 'border-red-500/50' : 'border-neutral-700 focus:border-cyan-500'
                  } text-neutral-100 outline-none`}
                />
                {errors.productionDurationDays && (
                  <p className="text-xs text-red-400 mt-1">{errors.productionDurationDays}</p>
                )}
                <p className="text-xs text-neutral-500 mt-2">
                  Estimated total: <span className="text-cyan-400 font-bold">${bundle.totalPerDay * formData.productionDurationDays}</span>
                </p>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold uppercase text-neutral-300 mb-2 tracking-widest">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requirements, questions, or details..."
                  rows="4"
                  className="w-full px-4 py-3 bg-neutral-800 rounded-xl border-2 border-neutral-700 focus:border-cyan-500 text-neutral-100 placeholder-neutral-500 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Request Quote'
                )}
              </button>

              <p className="text-xs text-neutral-500 text-center">
                * Required fields. We&apos;ll reply to your email with a detailed quote.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
