import Typed from "typed.js";
import { useEffect, useRef } from "react";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import ContactForm from "./form";
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
      <div id="contact" className="contact section pt-[10px]">
        <div className="container">
          <div className="info p-5 w-auto h-auto themed-card">
            <h4>
              <span ref={typedElement} style={{ whiteSpace: "pre" }}></span>
            </h4>
            <h3>Tell me about your project.</h3>
            <h6 className="text-[12px]">
              Let&apos;s create something great together 🤟.
            </h6>
            <a href="mailto:kumarujjwalrathore@gmail.com">
              <div className="themed-card flex items-center rounded-md p-2 mt-2 cursor-pointer shadow-lg hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out">
                <div className="w-8 h-8 bg-opacity-20 rounded-lg flex justify-center items-center">
                  <MdOutlineMail className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-sm leading-[1.2] pl-2">
                  <div>Mail me at</div>
                  <div className="opacity-80">kumarujjwalrathore@gmail.com</div>
                </div>
              </div>
            </a>
            <a href="https://maps.app.goo.gl/Kuw4VR7YZ9LUMUGg9" target="_blank">
              <div className="themed-card flex items-center rounded-md p-2 mt-2 cursor-pointer shadow-lg hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out">
                <div className="w-8 h-8 bg-opacity-20 rounded-lg flex justify-center items-center">
                  <MdOutlineLocationOn className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-sm leading-[1.2] pl-2">
                  <div>Location</div>
                  <div className="opacity-80">Gurugram, Haryana India</div>
                </div>
              </div>
            </a>
          </div>
          <div className="form w-80 h-auto themed-card p-5 shadow-lg rounded-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
