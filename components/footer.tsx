// components/Footer.tsx
import React from 'react';
import Image from 'next/image';

interface FooterProps {
    scrollToSection: (sectionId: string) => void; // Define the prop type
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
    return (
        <footer className="footer container">
            <div className="footer-container">
                {/* Footer Logo */}
                <div className="footer-logo">
                    <a className="navbar-brand1" href="#">
                        <Image className="logo" src="/images/log.png" alt="Eric Analytics Website Logo" width={200} height={100} />
                    </a>
                </div>

                {/* Footer Navigation */}
                <div className="footer-nav d-flex">
                    <a className="nav-link" onClick={() => scrollToSection('about')}>About</a>
                    <a className="nav-link" onClick={() => scrollToSection('services')}>Services</a>
                    <a className="nav-link" onClick={() => scrollToSection('projects')}>Showcase</a>
                    <a className="nav-link" onClick={() => scrollToSection('reviewCarousel')}>Testimonial</a>
                    <a className="nav-link" onClick={() => scrollToSection('faq')}>FAQ</a>
                    <a className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a>
                </div>

                {/* Footer Email */}
                <div className="footer-email">
                    <Image src="/images/mail.png" alt="Mail Icon" width={200} height={100} />
                    <a href="mailto:info@ericanalytics.net" className="text-white mail_ft1">
                        info@ericanalytics.net
                    </a>
                </div>
            </div>

            <div className="line">
                <Image src="/images/line.png" alt="Line" width={200} height={100} />
            </div>

            {/* Social Media Icons */}


            {/* Copyright Section */}
            <div className="footer-copyright">
                Copyright © 2025. All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
