import { BsTwitterX, BsLinkedin, BsGithub } from "react-icons/bs";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import Skills from "./skills";

import "./index.css";

const Home = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "Software Engineer",
        "Web Developer",
        "Frontend Developer",
        "Backend Developer",
        "Web srapper",
        "Badminton Player",
      ],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 600,
      loop: true,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div id="hero" className="hero section">
      <div className="container flex justify-between">
        <div>
          <h2>Ujjwal Kumar</h2>
          <p>
            I&apos;m a <span ref={typedElement}></span>
          </p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/dev-ujjwal/" target="_blank">
              <BsLinkedin />
            </a>
            <a href="https://github.com/MrGroot97" target="_blank">
              <BsGithub />
            </a>
            <a href="https://x.com/Oye_ujju" target="_blank">
              <BsTwitterX />
            </a>
          </div>
        </div>
        <Skills />
      </div>
    </div>
  );
};

export default Home;
