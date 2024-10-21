import React from 'react';
import Image from 'next/image'; 

const Header: React.FC = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container justify-content-between">
                    <a className="navbar-brand" href="#">
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
                            <li className="nav-item"><a className="nav-link text-white" href="#about-sec">About</a></li>
                            <li className="nav-item"><a className="nav-link text-white" href="#services-sec">Services</a></li>
                            <li className="nav-item"><a className="nav-link text-white" href="#projects">Showcase</a></li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link text-white" href="#reviewCarousel">Testimonial</a></li>
                            <li className="nav-item"><a className="nav-link text-white" href="#contact-sec">Contact</a></li>
                            <li className="nav-item">
                                <span className="search-icon d-none d-lg-block">
                                    <Image src="/images/search.png" alt="search" width={22} height={22} />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
