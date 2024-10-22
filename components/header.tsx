import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        // Use router.push to change the URL and navigate to the new page
        router.push(path);
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container justify-content-between">
                    <a className="navbar-brand" onClick={() => handleNavigation('/')}>
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
                                <a className="nav-link text-white" onClick={() => handleNavigation('/about')}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('/services')}>Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('/showcase')}>Showcase</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('/testimonial')}>Testimonial</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={() => handleNavigation('/contact')}>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
