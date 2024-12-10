import React, { useState, useEffect, useRef } from 'react';

const CounterSection = () => {
  const [experience, setExperience] = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // To track if the section is in the viewport
  const sectionRef = useRef(null); // Reference to the section

  // Animation function for counting up
  const countUp = (target, setter) => {
    let start = 0;
    const end = target;
    const duration = 2000; // 2 seconds for the animation

    const increment = (end / duration) * 50; // Increment every 50ms
    const interval = setInterval(() => {
      if (start < end) {
        start += increment;
        setter(Math.floor(start));
      } else {
        clearInterval(interval); // Stop when the target is reached
        setter(end); // Ensure the target value is set
      }
    }, 50);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger animation when the section is visible
          observer.disconnect(); // Stop observing after it becomes visible
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      countUp(10, setExperience); // Example for experience
      countUp(350, setProjects);  // Example for projects
      countUp(300, setClients);   // Example for clients
    }
  }, [isVisible]);

  return (
    <div className="d-flex justify-content-between mt-4" ref={sectionRef}>
      <div className="stats">
        <h4>Experience</h4>
        <span className="stats-number">{experience}+</span>
      </div>
      <div className="stats">
        <h4>Projects Delivered</h4>
        <span className="stats-number">{projects}+</span>
      </div>
      <div className="stats">
        <h4>Happy Clients</h4>
        <span className="stats-number">{clients}+</span>
      </div>
    </div>
  );
};

export default CounterSection;