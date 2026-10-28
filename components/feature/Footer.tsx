'use client';

const footerNav = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer id="contact" className="bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="mb-14">
          <img
            src="/images/eric-analytics/logo.png"
            alt="Eric Analytics - Data Analytics Consulting Agency"
            className="h-20 w-auto object-contain"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column - Description */}
          <div className="lg:col-span-5">
            <p className="text-white text-sm leading-relaxed mb-3 max-w-md">
              Eric Analytics is a data analytics consulting agency specializing in Google Ads optimization using GA4, GA4 audit and optimization services, Google Tag Manager (GTM), conversion tracking, and server-side tracking for Meta Ads.
            </p>
            <p className="text-white text-sm leading-relaxed max-w-md">
              We help businesses improve ROAS with accurate tracking, optimize marketing performance, and make data-driven decisions that support measurable business growth.
            </p>
          </div>

          {/* Middle Column - Company Nav */}
          <div className="lg:col-span-3">
            <p className="text-white font-semibold mb-7 text-xs uppercase tracking-[0.2em]">
              Company
            </p>
            <ul className="space-y-4">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="group flex items-center gap-2 text-white text-sm hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-1 h-px bg-white/40 transition-all duration-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div className="lg:col-span-4">
            <p className="text-white font-semibold mb-7 text-xs uppercase tracking-[0.2em]">
              Contact
            </p>
           <ul className="space-y-4 mb-8">
  <li>
    <a
      href="mailto:info@ericanalytics.net"
      className="group flex items-center gap-3 text-white text-sm hover:text-white transition-colors duration-200"
    >
      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-300">
        <i className="ri-mail-line text-sm" />
      </div>
      info@ericanalytics.net
    </a>
  </li>

  <li>
    <a
      href="https://www.youtube.com/@eric_case"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      className="group flex items-center gap-3 text-white text-sm hover:text-white transition-colors duration-200"
    >
      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-300">
        <i className="ri-youtube-fill text-sm" />
      </div>

      <span>YouTube</span>
    </a>
  </li>

  <li>
  <a
    href="https://www.upwork.com/freelancers/ericanalytics"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Upwork"
    className="group flex items-center gap-3 text-white text-sm hover:text-white transition-colors duration-200"
  >
    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-300">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[14px] h-[14px]"
        aria-hidden="true"
      >
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    </div>

    <span>Upwork</span>
  </a>
</li>
</ul>

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 border-t border-white/[0.04]">
          <p className="text-white text-xs">
            &copy; 2026 Eric Analytics. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}