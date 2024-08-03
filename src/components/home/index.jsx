import landingImage from "../../assets/pexels-danbuilds-633409.jpg";
import { BsTwitterX, BsLinkedin, BsGithub } from "react-icons/bs";
import Typed from "typed.js";
import { useEffect, useRef } from "react";

import { RiJavascriptFill, RiNextjsFill } from "react-icons/ri";
import { FaNode } from "react-icons/fa";
import { TiHtml5 } from "react-icons/ti";
import { SiCsswizardry } from "react-icons/si";
import { IoLogoFigma } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
import { FaPython } from "react-icons/fa6";
import { SiMysql } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiOpencv } from "react-icons/si";
import { SiTensorflow } from "react-icons/si";
import { FaGitSquare } from "react-icons/fa";
import { FaDocker } from "react-icons/fa6";
import { TbBrandDjango } from "react-icons/tb";
import { SiTypescript } from "react-icons/si";
import { FaRegCopyright } from "react-icons/fa6";

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
        });

        // Destropying
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <>
            <div id="hero" className="hero section dark-background">
                <img src={landingImage} alt="" />

                <div
                    className="container"
                    data-aos="zoom-out"
                    data-aos-delay="100"
                >
                    <h2>Ujjwal Kumar</h2>
                    <p>
                        I&apos;m a <span ref={typedElement}></span>
                    </p>
                    <div className="social-links">
                        <a
                            href="https://www.linkedin.com/in/dev-ujjwal/"
                            target="_blank"
                        >
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
                <div className="skills">
                    <RiJavascriptFill />
                </div>
            </div>
            <footer id="footer" className="footer dark-background">
                <div className="container">
                    <h3 className="sitename">Engineer Babu</h3>
                    <p>
                        Always be ready to face the challenges of life. Trying
                        to Become a better version of my yesterday self.
                    </p>
                    <div className="container">
                        <div className="copyright">
                            <span className="inline-flex justify-center items-center">Copyright{" "}<FaRegCopyright /></span>{" "}
                            <strong className="px-1 sitename">
                                Engineer Babu
                            </strong>{" "}
                            <span>All Rights Reserved</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Home;
