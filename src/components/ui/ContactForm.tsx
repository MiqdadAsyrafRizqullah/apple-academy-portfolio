import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { validateContactForm } from '../../utils/validationUtils';
import type { FormState, FormErrors, SubmitStatus } from '../../types';

/**
 * Contact form with client-side validation and EmailJS integration.
 * Displays inline validation errors ≤ 200ms.
 * Shows loading → success/error state on submit.
 */
export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitStatus('loading');

    try {
      // EmailJS integration using environment variables
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle size={48} className="text-green-500 mb-4" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
          Message Terkirim!
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Terima kasih telah menghubungi saya. Saya akan membalas secepatnya.
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus('idle')}
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm hover:opacity-90 transition-opacity"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulir kontak">
      {/* Error banner */}
      {submitStatus === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
        >
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm">
            Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
            Name <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-2.5 rounded-lg bg-[var(--color-background)] border text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors ${
              errors.name ? 'border-red-500' : 'border-[var(--color-border)]'
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
            Email <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-2.5 rounded-lg bg-[var(--color-background)] border text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors ${
              errors.email ? 'border-red-500' : 'border-[var(--color-border)]'
            }`}
            placeholder="email@example.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
          Subject <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={`w-full px-4 py-2.5 rounded-lg bg-[var(--color-background)] border text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors ${
            errors.subject ? 'border-red-500' : 'border-[var(--color-border)]'
          }`}
          placeholder="Message subject"
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1 text-xs text-red-400">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
          Message <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full px-4 py-2.5 rounded-lg bg-[var(--color-background)] border text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors resize-none ${
            errors.message ? 'border-red-500' : 'border-[var(--color-border)]'
          }`}
          placeholder="Write your message here..."
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitStatus === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
        aria-label={submitStatus === 'loading' ? 'Mengirim pesan...' : 'Kirim pesan'}
      >
        {submitStatus === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Mengirim...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

export default ContactForm;
