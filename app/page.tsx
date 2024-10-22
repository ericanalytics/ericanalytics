'use client';
import Script from 'next/script';
import React, { useEffect } from 'react';
import Header from '../components/header'; 
import Footer from '../components/footer'; 
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './/style.css'; 

const images = [
  { src: '/images/R44 Performance 3.png', width: 800, height: 600 },
  { src: '/images/pr-2.png', width: 800, height: 600 },
  { src: '/images/pr-3.png', width: 800, height: 600 },
  { src: '/images/Manna.png', width: 800, height: 600 },
  { src: '/images/Manna-2.png', width: 800, height: 600 },
  { src: '/images/Manna-3.png', width: 800, height: 600 },
  { src: '/images/Vital.jpg', width: 800, height: 600 },
  { src: '/images/Vital-2.png', width: 800, height: 600 },
  { src: '/images/Vital-3.png', width: 800, height: 600 },
];

export default function Home() {

 
    // Scroll function to navigate to specific sections
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };



  useEffect(() => {
    // Dynamically import Bootstrap JS after the component mounts
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []); // This effect runs only once when the component mounts

  return (
    <>
      {/* Add your components here */}
      {/* Using Next.js Script component for loading external scripts */}
      <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js" strategy="lazyOnload" />
      
      
      {/* Adding fonts using link tags */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

    <div>
    <Header />

  {/* Hero Section */}
  <section className="hero">
    <div className="container">
      <div className="row align-items-center">
        {/* Content Section */}
        <div className="col-12 col-md-6">
          <h1 className="custom-heading text-white">Achieve Digital Excellence with Data Analytics Exploration</h1>
          <p className="content text-white">
            Maximize your website&apos;s performance with Data Analytics Consulting services. As an expert in <span className="spn_1">Digital Marketing Analytics</span>, Web Analytics, and Google Data Analytics, I offer tailored solutions and actionable insights to help you achieve your digital marketing goals.
          </p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-light me-2 cs-btn">Browse My Work</a>
            <a href="#" className="btn btn-default cs-btn">Chat With Me</a>
          </div>
        </div>
        {/* Image Section */}
        <div className="col-12 col-md-6 text-center">
          <video className="img-fluid" autoPlay muted loop playsInline>
            <source src="/images/topvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </section>
{/* New Logo Section */}
<section className="sec_2">
  <div className="container">
    <div className="row">
      <div className="col">
        <Image  src="/images/wix-logo.png" className="img-fluid" alt="Wix log" width={200} height={100} />
      </div>
      <div className="col">
        <Image  src="/images/google-logo.png" className="img-fluid" alt="Google" width={200} height={100} />
      </div>
      <div className="col">
        <Image  src="/images/microsoft-logo.png" className="img-fluid" alt="Microsoft" width={200} height={100} />
      </div>
      <div className="col">
        <Image  src="/images/meta-logo.png" className="img-fluid" alt="Meta" width={200} height={100} />
      </div>
      <div className="col">
        <Image  src="/images/shopify-logo.png" className="img-fluid" alt="Shopify" width={200} height={100} />
      </div>
      <div className="col">
        <Image  src="/images/magento-logo.png" className="img-fluid" alt="Magento" width={200} height={100} />
      </div>
      <div className="col">
        <Image  src="/images/wordpress-logo.png" className="img-fluid" alt="WordPress" width={200} height={100} />
      </div>
      <div className="col"> 
        <Image  src="/images/unbounce-logo.png" className="img-fluid" alt="Unbounce" width={200} height={100} />
      </div>
    </div>
  </div>
</section>

{/* New Section 3: Data Analytics */}
<div className="section3 text-white">
  <div className="container">
    <div className="upr_cnt12 max_widt1 text-center">
      <h2>Let&apos;s Unlock the Power of Your Data</h2>
      <p>
        Are you ready to transform your website data into a powerful asset that drives business growth? As a dedicated digital data analytics expert, I&apos;m here to help you unlock the full potential of your data.
      </p>
    </div>
    <div className="row align-items-center">
      {/* Left side: Image or icon structure */}
      <div className="col-md-6 ds_img1">
        <Image  src="/images/ds.png" className="dsimg" alt="Data visualization image" width={371} height={636}/>
      </div>

      {/* Right side: Text content with timeline and line */}
      <div className="col-md-6 position-relative">
        <div className="timeline-line"></div>

        <div className="content-block">
          <div className="timeline-point"></div>
          <h3>Gain a Competitive Advantage</h3>
          <p>
            Leverage data insights to keep you ahead of the curve with the <span className="spn_1">Digital Marketing Analytics</span> solutions. <span className="spn_1">Data Analytics Services</span> enable you to understand user behavior trends in your industry, empowering you to make informed decisions that differentiate you from competitors. With my expertise as a <span className="spn_1">Web Analytics Expert</span>, you can harness data&apos;s power to drive growth and foster innovation.
          </p>
        </div>

        <div className="content-block">
          <div className="timeline-point"></div>
          <h3>Optimize Marketing Spend</h3>
          <p>
            Stop wasting money on ineffective marketing campaigns. Use <span className="spn_1">Digital Marketing Analytics</span> to target your ideal audience and measure the ROI of your marketing efforts with laser precision.
          </p>
        </div>

        <div className="content-block">
          <div className="timeline-point"></div>
          <h3>Boost Website Conversions</h3>
          <p>
            Convert more website visitors into leads and customers. As a leading <span className="spn_1">Web Analytics Consultant</span>, I leverage data insights to drive actionable strategies that enhance user experience and maximize conversion rates.
          </p>
        </div>

        <div className="content-block">
          <div className="timeline-point"></div>
          <h3>Make Data-Driven Decisions with Confidence</h3>
          <p>
            I never operate on a hunch. My data-driven approach empowers me to make strategic decisions based on real user behavior and insights, not guesswork. As a <span className="spn_1">Web Analytics Expert</span>, I offer comprehensive services that provide a clear understanding of your audience&apos;s actions.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Success */}
<div id="about" className="container content-section dv-7">
  <div className="upr_cnt12 text-center text-white">
    <h2>Your Success Partner: Why Choosing Me Makes Sense</h2>
    <p>Trust me to optimize your online performance with precision analytics.</p>
  </div>
  <div className="row align-items-center">
    {/* YouTube Video */}
    <div className="col-lg-6 mb-4 youtube-video">
      <div style={{ position: 'relative', width: '560px', height: '315px' }}>
        <a href="https://www.youtube.com/watch?v=5cJOeSlWZ7Y" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/images/Youtube.png"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            width={560}
            height={315}
            alt="YouTube Thumbnail"
          />
        </a>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/5cJOeSlWZ7Y"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'none' }}
          title="YouTube Video"
        ></iframe>
      </div>
    </div>

    {/* Content Section */}
    <div className="col-lg-6">
      <h3 className="highlight">Hi, I&apos;m Eric Case</h3>
      <p className="gag_1">
        Specializing in Google Analytics and Google Ads
        <Image  className="inlineimg1" src="/images/inline.png" alt="Description of image" width={200} height={100}/>
      </p>
      <p>
        As your dedicated Success Partner, I integrate expertise and innovation to provide actionable insights that drive your business forward. Whether you&apos;re looking to improve website performance, enhance marketing strategies, or refine customer engagement, I am committed to your success.
      </p>

      <p>
        Whether you&apos;re seeking to optimize performance, refine your digital strategy, or enhance customer engagement, explore my comprehensive range of <span className="spn_1">Data Analytics Services</span> to optimize performance, refine your digital strategy, and elevate customer engagement. Contact me today to schedule a consultation and discover how I can help maximize your online potential with personalized <br /><span className="spn_1">Data Analytics Consulting.</span>
      </p>

      <p className='sub-p'>Let&apos;s connect to help your business thrive.</p>

      {/* Stats */}
      <div className="d-flex justify-content-between mt-4">
        <div className="stats">
          Experience
          <span className="stats-number">10+</span>
        </div>
        <div className="stats">
          Projects Delivered
          <span className="stats-number">250+</span>
        </div>
        <div className="stats">
          Happy Clients
          <span className="stats-number">90+</span>
        </div>
      </div>
    </div>
  </div>
</div>

   {/* Drive Business Growth with Advanced Web & Data Analytics Services */}
<div id="services"  className="container sec_4">
  <div className="upr_cnt12 icnbx_contnt32 text-center text-white">
    <h2>
      Drive Business Growth with <br />
      Advanced Web & Data Analytics Services
    </h2>
    <p>
      I specialize in setting up and configuring essential digital analytics tools to optimize your online presence. Enhancing your website&apos;s performance requires the right digital analytics services and expertise. Here&apos;s how I can help you achieve this with my digital marketing services:
    </p>
  </div>

  <div className="row">
    {/* Card 1 */}
    <div className="col-md-4 mb-4">
      <div className="service-card">
        <div className="icon-box">
          <Image  src="/images/one.png" alt="Google Analytics Setup" className="service-logo" width={200} height={100} />
        </div>
        <div className="number-box">01</div>
        <h3>Google Analytics Setup & Configuration</h3>
        <p>By implementing Google Analytics, I can accurately track your website traffic, user behavior, and conversions. This setup provides you with valuable insights into how visitors interact with your site. I also configure custom reports and dashboards tailored to your business goals and KPIs, ensuring you have the information you need to make data-driven decisions.</p>
      </div>
    </div>
      
    {/* Card 2 */}
    <div className="col-md-4 mb-4">
      <div className="service-card">
        <div className="icon-box">
          <Image  src="/images/two.png" alt="Google Tag Manager Integration" className="service-logo" width={200} height={100} />
        </div>
        <div className="number-box">02</div>
        <h3>Google Tag Manager Integration</h3>
        <p>Integrating Google Tag Manager streamlines your tag management process and enhances data collection across your website. I set up tags, triggers, and variables to track specific user interactions and events crucial for understanding user journeys.</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-md-4 mb-4">
      <div className="service-card">
        <div className="icon-box">
          <Image  src="/images/three.png" alt="Google Search Console Optimization" className="service-logo" width={200} height={100} />
        </div>
        <div className="number-box">03</div>
        <h3>Google Search Console Optimization</h3>
        <p>Connecting Google Search Console enables you to monitor and optimize your website&apos;s search performance. I utilize search analytics data to improve keyword targeting, click-through rates, and overall SEO strategy. By analyzing search queries, impressions, and click data, I help you identify opportunities for growth and ensure your site meets Google&apos;s search standards.</p>
      </div>
    </div>
  </div>

  <div className="row">
    {/* Card 4 */}
    <div className="col-md-4 mb-4">
      <div className="service-card">
        <div className="icon-box">
          <Image  src="/images/four.png" alt="Looker Studio Implementation" className="service-logo" width={200} height={100} />
        </div>
        <div className="number-box">04</div>
        <h3>Looker Studio Implementation Services</h3>
        <p>Implementing Looker Studio allows you to visualize and analyze data from Google Analytics and other sources effectively. I customize reports and dashboards in Looker Studio to gain actionable insights into your website&apos;s performance and user engagement. This visualization tool helps you understand complex data sets, making it easier to identify trends and areas for improvement.</p>
      </div>
    </div>

    {/* Card 5 */}
    <div className="col-md-4 mb-4">
      <div className="service-card">
        <div className="icon-box">
          <Image  src="/images/five.png" alt="Google Ads Optimization" className="service-logo" width={200} height={100} />
        </div>
        <div className="number-box">05</div>
        <h3>Google Ads Optimization Services</h3>
        <p>Optimizing your Google Ads campaigns is crucial for maximizing your ROI. I analyze your ad performance, identify high-performing keywords, and adjust bids and budgets to ensure your ads reach the right audience. By refining your ad copy and targeting, I help you achieve higher click-through rates and conversions.</p>
      </div>
    </div>

    {/* Card 6 */}
    <div className="col-md-4 mb-4">
      <div className="service-card">
        <div className="icon-box">
          <Image  src="/images/six.png" alt="Conversion Optimization Services" className="service-logo" width={200} height={100} />
        </div>
        <div className="number-box">06</div>
        <h3>Conversion Optimization Services</h3>
        <p>Connecting Google Search Console enables you to monitor and optimize your website&apos;s search performance. I utilize search analytics data to improve keyword targeting, click-through rates, and overall SEO strategy. By analyzing search queries, impressions, and click data, I help you identify opportunities for growth and ensure your site meets Google&apos;s search standards.</p>
      </div>
    </div>
  </div>
</div>

{/* Project Showcase */}
<div className='img-bg-clr'>
  <div className="bg-color">
    <Image  src="/images/Frame.png" alt="Background" width={100} height={100}/>
  </div>
  <div id="projects" className='laptop-sec' style={{ position: 'relative' }}>
    <div className="upr_cnt12 max_widt1 text-center text-white">
      <h2>Web & Data Analytics Project Showcase</h2>
      <p>
        Explore my web and data analytics project showcase! As a data analytics specialist, I am excited to present some of my most impactful projects, demonstrating my expertise in <span className="spn_1">digital marketing analytics</span>. I have consistently delivered data-driven solutions that empower clients to achieve remarkable success.
      </p>
    </div>

    {/* Carousel Buttons */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <Image src="/images/left1.png" alt="Previous" width={22} height={22} />
      <span className="visually-hidden">Previous</span>
    </button>

    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <Image src="/images/right1.png" alt="Next" width={22} height={22} />
      <span className="visually-hidden">Next</span>
    </button>

    <div className="laptopFrame">
      <div className="laptopScreen">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {images.map((src, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <Image src={src} className="d-block w-100" alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

     {/* Review Carousel Section */}
     <div id="reviewCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="upr_cnt12 max_widt1 text-center text-white">
          <h2>Hear What My Clients Have to Say</h2>
          <p>
            Discover what my satisfied clients have to say about my web analytics services and data analytics services. I take pride in delivering exceptional client service and greatly value their feedback.
          </p>
        </div>
        
        {/* Indicators/dots */}
        <div className="carousel-indicators cci">
          <button type="button" data-bs-target="#reviewCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" style={{ width: '10px', height: '10px' }}></button>
          <button type="button" data-bs-target="#reviewCarousel" data-bs-slide-to="1" aria-label="Slide 2" style={{ width: '10px', height: '10px' }}></button>
        </div>

        {/* The slideshow/carousel */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row justify-content-center rv_box1">
              <div className="col-lg-5 review-box">
                <div className="review-author">Mike Davis</div>
                <div className="review-role">Bonjoon Ku, CEO</div>
                <p className="review-content">
                  Working with Eric was a great experience. Their advertising campaigns were expertly crafted. Eric is a highly skilled and professional individual, and I would not hesitate to work with them again. I wholeheartedly recommend him to anyone looking for an exceptional advertising campaign. Thank you for the fantastic work!
                </p>
                <div className="rating-stars">★★★★★</div>
              </div>
              <div className="col-lg-5 review-box">
                <div className="review-author">Jake</div>
                <div className="review-role">Bonjoon Ku, CEO</div>
                <p className="review-content">
                  Eric was easy to communicate with, responsive and knowledgeable with all things Google. I am very impressed with the work that he did in setting up our GA and GTM for our website. I will be using Eric again for SEO and Google Adwords advice and implementation as our website builds traction.
                </p>
                <div className="rating-stars">★★★★★</div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="row justify-content-center">
              <div className="col-lg-5 review-box">
                <div className="review-author">Anna Smith</div>
                <div className="review-role">CEO, Tech Solutions</div>
                <p className="review-content">
                  Eric is a wonderful professional to work with. He delivers results that consistently exceed expectations. I would highly recommend his services to anyone looking for real digital marketing expertise.
                </p>
                <div className="rating-stars">★★★★★</div>
              </div>
              <div className="col-lg-5 review-box">
                <div className="review-author">John Carter</div>
                <div className="review-role">COO, Web Innovations</div>
                <p className="review-content">
                  Eric&apos;s dedication to his work is outstanding. His detailed understanding of Google Analytics and ad strategies helped our business achieve significant growth.
                </p>
                <div className="rating-stars">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* Contact Section */}
      <div id="contact" className="container">
        <div className="contact-section row">
          <div className="contact-info col-md-5">
            <div className="ang_1">
              <h3>Get In Touch</h3>
              <p>
                For Web Analytics and Google Analytics services to make data-driven decisions that enhance your business growth.
              </p>
            </div>
            <Image  className="objct" src="/images/object.png" alt="Object" width={200} height={100}/>
          </div>

          <div className="col-md-7">
            <form className="fom_1">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="text" className="form-control" placeholder="Name*" required />
                </div>
                <div className="col-md-6 mb-3">
                  <input type="email" className="form-control" placeholder="E-mail*" required />
                </div>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" placeholder="Message"></textarea>
              </div>
              <button type="submit" className="btn btn-block snd_msg1">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer scrollToSection={scrollToSection} />
    </div>
    </>
  );
}
