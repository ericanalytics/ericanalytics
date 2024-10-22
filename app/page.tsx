// Home.tsx
'use client';
import React, { useEffect } from 'react';
import Script from 'next/script';
import Header from '../components/Header'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; 

const Home: React.FC = () => {
  useEffect(() => {
    // Dynamically import Bootstrap JS after the component mounts
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js" strategy="lazyOnload" />

      {/* Adding fonts using link tags */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

      <div>
        <Header />
        {/* Other components and sections go here */}
        {/* Example sections, replace with your actual content */}
        <section id="home">
          <h1>Home Section</h1>
          {/* Your content */}
        </section>
        <section id="about">
          <h1>About Section</h1>
          {/* Your content */}
        </section>
        {/* Add more sections as necessary */}
      </div>
    </>
  );
};

export default Home;
