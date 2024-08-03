import landingImage from "../../assets/pexels-mockupbee-221716013-12039670.jpg";
import { BsTwitterX, BsLinkedin, BsGithub } from "react-icons/bs";
import { FaRegCopyright } from "react-icons/fa6";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

import "./index.css";

const ContactMe = () => {
    const typedElement = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedElement.current, {
            strings: ["Let's Connect"],
            loop: true,
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
            <div id="contact" className="contact section dark-background">
                <img src={landingImage} alt="" />
                <div className="container text-gray-800">
                    <div className="info p-5 w-auto h-auto">
                        <h4>
                            <span
                                ref={typedElement}
                                style={{ whiteSpace: "pre" }}
                            ></span>
                        </h4>
                        <h3 className="">Tell me about your project.</h3>
                        <h6 className="text-[12px]">
                            Let&apos;s create something great together 🤟.
                        </h6>
                        <a href="mailto:kumarujjwalrathore@gmail.com">
                            <div
                                className="bg-gray-100 flex items-center rounded-md p-2 mt-2 cursor-pointer shadow-lg hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out"
                            >
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex justify-center items-center">
                                    <MdOutlineMail className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col text-sm leading-[1.2] pl-2">
                                    <div>Mail me at</div>
                                    <div className="text-gray-500" >kumarujjwalrathore@gmail.com</div>
                                </div>
                            </div>
                        </a>
                        <a href="https://maps.app.goo.gl/Kuw4VR7YZ9LUMUGg9" target="_blank">
                            <div
                                className="bg-gray-100 flex items-center rounded-md p-2 mt-2 cursor-pointer shadow-lg hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out"
                            >
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex justify-center items-center">
                                    <MdOutlineLocationOn className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col text-sm leading-[1.2] pl-2">
                                    <div>Location</div>
                                    <div className="text-gray-500" >Gurugram, Haryana India</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="form w-80 h-40"></div>
                </div>
            </div>
            <footer id="footer" className="footer dark-background">
                <div className="container">
                    <div className="social-links flex justify-center">
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
                    <div className="container">
                        <div className="copyright">
                            <span className="inline-flex justify-center items-center">
                                Copyright <FaRegCopyright className="pl-0.5" />
                            </span>{" "}
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

export default ContactMe;
