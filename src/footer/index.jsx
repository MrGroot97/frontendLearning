import { FaRegCopyright } from "react-icons/fa6";
import { BsTwitterX, BsLinkedin, BsGithub } from "react-icons/bs";
import "./index.css";

const Footer = () => {
    return (
        <footer id="footer" className="footer dark-background">
            <div className="container">
                <h3 className="sitename">Engineer Babu</h3>
                <p>
                    Always be ready to face the challenges of life. Trying to
                    Become a better version of my yesterday self.
                </p>
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
                            Copyright <FaRegCopyright />
                        </span>{" "}
                        <strong className="px-1 sitename">Engineer Babu</strong>{" "}
                        <span>All Rights Reserved</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
