import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (sectionId: string, path: string) => {
        // Change the URL without reloading the page
        router.push(path, undefined, { shallow: true });

        // Smoothly scroll to the section
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container justify-content-between">
                    <a className="navbar-brand" onClick={() => handleNavigation('home', '/')}>
                        <Image className="logo" src="/images/log.png" alt="Logo" width={100} height={50} />
                    </a>
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('about-sec', '/about')}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('services', '/services')}>Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('showcase', '/showcase')}>Showcase</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('testimonial', '/testimonial')}>Testimonial</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('contact', '/contact')}>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
