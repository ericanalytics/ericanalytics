'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

const serviceOptions = [
  'GA4 Setup & Audit',
  'GTM Implementation',
  'Server-Side Tracking',
  'Google Ads Management',
  'Conversion Tracking & Attribution',
  'Meta Ads Tracking Setup',
  'Analytics Audit',
  'Other',
];

export default function ContactSection() {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const [formError, setFormError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    // --------------------------------------------------
    // Honeypot spam protection
    // --------------------------------------------------
    const honeypot = (
      new FormData(form).get('company_alt') as string
    )?.trim();

    if (honeypot) {
      setStatus('success');
      form.reset();
      setCharCount(0);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);

      return;
    }

    // --------------------------------------------------
    // reCAPTCHA validation
    // --------------------------------------------------
    if (!captchaToken) {
      setFormError('Please complete the reCAPTCHA verification.');
      setStatus('error');

      return;
    }

    // --------------------------------------------------
    // Start submitting
    // --------------------------------------------------
    setStatus('submitting');
    setFormError('');

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        {
          publicKey:
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        }
      );

      // --------------------------------------------------
      // Success
      // --------------------------------------------------
      setStatus('success');

      form.reset();
      setCharCount(0);

      recaptchaRef.current?.reset();
      setCaptchaToken(null);

      // Return button to normal after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    } catch (err) {
      console.error('EmailJS error:', err);

      setFormError(
        'Something went wrong. Please try again later.'
      );

      setStatus('error');

      // Reset CAPTCHA so user can try again
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  const handleMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCharCount(e.target.value.length);
  };

  return (
    <section
      id="contact"
      className="relative md:py-40 py-20 bg-black overflow-hidden"
    >
      {/* =====================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[900px] bg-gradient-to-b from-blue-500/[0.07] via-blue-600/[0.03] to-transparent rounded-full blur-[200px]" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[500px] bg-gradient-to-t from-blue-600/[0.05] via-blue-500/[0.02] to-transparent rounded-full blur-[160px]" />

        <div className="absolute top-1/4 right-[12%] w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[180px]" />

        <div className="absolute bottom-1/4 left-[8%] w-[450px] h-[450px] bg-cyan-500/[0.03] rounded-full blur-[140px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>

      {/* =====================================================
          FLOATING PARTICLES
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[18%] left-[5%] w-2 h-2 rounded-full bg-blue-400/25 blur-[1px] animate-pulse" />

        <div className="absolute top-[22%] right-[18%] w-1.5 h-1.5 rounded-full bg-cyan-400/20 blur-[1px] animate-pulse" />

        <div className="absolute bottom-[28%] left-[22%] w-1.5 h-1.5 rounded-full bg-blue-400/18 blur-[1px] animate-pulse" />

        <div className="absolute bottom-[32%] right-[12%] w-2 h-2 rounded-full bg-indigo-400/20 blur-[1px] animate-pulse" />

        <div className="absolute top-[45%] left-[3%] w-1 h-1 rounded-full bg-blue-300/25 blur-[1px] animate-pulse" />

        <div className="absolute top-[58%] right-[6%] w-1 h-1 rounded-full bg-cyan-300/20 blur-[1px] animate-pulse" />
      </div>

      {/* =====================================================
          DIVIDER LINES
      ====================================================== */}

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div>
            <p className="text-white text-xs uppercase tracking-[0.3em] mb-8 font-medium">
              Start Today
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8 leading-tight">
              Ready to Fix Your Tracking &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60ccf1] to-[#3372f1]">
                Scale with Confidence?
              </span>
            </h2>

            <p className="text-white text-lg max-w-xl leading-relaxed mb-5">
              Get a clear understanding of what&apos;s working,
              what&apos;s broken, and where your business is losing
              valuable marketing data.
            </p>

            <p className="text-white text-lg max-w-xl leading-relaxed">
              We help businesses improve tracking accuracy,
              optimize campaign performance, and scale marketing
              efforts with confidence.
            </p>
          </div>

          {/* =================================================
              RIGHT SIDE - FORM
          ================================================== */}

          <div>
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="bg-black border border-white/[0.08] rounded-2xl p-8 lg:p-10"
            >

              {/* =============================================
                  FIRST / LAST NAME
              ============================================== */}

              <div className="grid grid-cols-2 gap-4 mb-4">

                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs uppercase tracking-[0.15em] text-white font-medium mb-2"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="John"
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#60ccf1]/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(96,204,241,0.06)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs uppercase tracking-[0.15em] text-white font-medium mb-2"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#60ccf1]/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(96,204,241,0.06)]"
                  />
                </div>

              </div>

              {/* =============================================
                  EMAIL
              ============================================== */}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-[0.15em] text-white font-medium mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#60ccf1]/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(96,204,241,0.06)]"
                />
              </div>

              {/* =============================================
                  SUBJECT
              ============================================== */}

              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-xs uppercase tracking-[0.15em] text-white font-medium mb-2"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Tracking Audit Request"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#60ccf1]/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(96,204,241,0.06)]"
                />
              </div>

              {/* =============================================
                  SERVICE
              ============================================== */}

              <div className="mb-4">
                <label
                  htmlFor="service"
                  className="block text-xs uppercase tracking-[0.15em] text-white font-medium mb-2"
                >
                  Service Required
                </label>

                <div className="relative">

                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-[#60ccf1]/50 appearance-none cursor-pointer"
                  >
                    <option
                      value=""
                      disabled
                      className="text-[#111111]"
                    >
                      Select a service...
                    </option>

                    {serviceOptions.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="text-[#111111]"
                      >
                        {s}
                      </option>
                    ))}
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
                    <i className="ri-arrow-down-s-line text-lg" />
                  </span>

                </div>
              </div>

              {/* =============================================
                  MESSAGE
              ============================================== */}

              <div className="mb-6">

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-[0.15em] text-white font-medium"
                  >
                    Message
                  </label>

                  <span className="text-xs text-white/25">
                    {charCount}/500
                  </span>

                </div>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your tracking challenges..."
                  rows={4}
                  maxLength={500}
                  required
                  onChange={handleMessageChange}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#60ccf1]/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(96,204,241,0.06)] resize-none"
                />

              </div>

              {/* =============================================
                  GOOGLE reCAPTCHA V2
              ============================================== */}

              <div className="mb-6">

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={
                    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
                  }
                  onChange={(token) => {
                    setCaptchaToken(token);
                    setFormError('');

                    if (status === 'error') {
                      setStatus('idle');
                    }
                  }}
                  onExpired={() => {
                    setCaptchaToken(null);
                  }}
                  onErrored={() => {
                    setCaptchaToken(null);

                    setFormError(
                      'reCAPTCHA could not be loaded. Please refresh the page and try again.'
                    );

                    setStatus('error');
                  }}
                />

              </div>

              {/* =============================================
                  HONEYPOT
              ============================================== */}

              <div
                className="hp-field"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: 0,
                  height: 0,
                  overflow: 'hidden',
                }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="company_alt"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* =============================================
                  SUBMIT BUTTON
              ============================================== */}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-3 bg-white text-[#080808] px-10 py-4 rounded-xl font-semibold text-base whitespace-nowrap transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(255,255,255,0.12)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
              >

                {status === 'submitting' ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <i className="ri-check-line" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <i className="ri-arrow-right-line" />
                  </>
                )}

              </button>

              {/* =============================================
                  ERROR MESSAGE
              ============================================== */}

              {status === 'error' && formError && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-sm text-white">
                  {formError}
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}