import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const Header: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Function to close the mobile menu when a menu item is clicked
    const handleNavClick = () => {
        if (window.innerWidth <= 991) {  // Check for mobile screen size (Bootstrap 'lg' breakpoint is 992px)
            setIsNavOpen(false);
        }
    };

    const schema = {
        "@context": "https://schema.org/",
        "@type": "WebSite",
        "name": "Eric Analytics",
        "url": "https://www.ericanalytics.net/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "{search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
    return (
        <header>
           <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            </Head>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container justify-content-between">
                    <a className="navbar-brand" onClick={() => scrollToSection('home')}>
                        <Image className="logo" src="/images/log.png" alt="Eric Analytics Logo" width={100} height={50} />
                    </a>
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded={isNavOpen ? 'true' : 'false'}
                        aria-label="Toggle navigation"
                        onClick={() => setIsNavOpen(!isNavOpen)} // Toggle the nav state when toggler is clicked
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => { scrollToSection('about'); handleNavClick(); }}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => { scrollToSection('services'); handleNavClick(); }}>Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => { scrollToSection('projects'); handleNavClick(); }}>Showcase</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => { scrollToSection('reviewCarousel'); handleNavClick(); }}>Testimonial</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => { scrollToSection('contact'); handleNavClick(); }}>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
