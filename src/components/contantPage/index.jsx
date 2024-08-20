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
            <div
                id="contact"
                className="contact section dark-background pt-[10px]"
            >
                <div className="container text-gray-800">
                    <div className="info p-5 w-auto h-auto bg-[#D8C4A9] shadow-lg rounded-lg">
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
                            <div className="bg-gray-100 flex items-center rounded-md p-2 mt-2 cursor-pointer shadow-lg hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex justify-center items-center">
                                    <MdOutlineMail className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col text-sm leading-[1.2] pl-2">
                                    <div>Mail me at</div>
                                    <div className="text-gray-500">
                                        kumarujjwalrathore@gmail.com
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a
                            href="https://maps.app.goo.gl/Kuw4VR7YZ9LUMUGg9"
                            target="_blank"
                        >
                            <div className="bg-gray-100 flex items-center rounded-md p-2 mt-2 cursor-pointer shadow-lg hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex justify-center items-center">
                                    <MdOutlineLocationOn className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col text-sm leading-[1.2] pl-2">
                                    <div>Location</div>
                                    <div className="text-gray-500">
                                        Gurugram, Haryana India
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="form w-80 h-auto bg-slate-200 p-5 shadow-lg rounded-lg">
                        <h4 className="text-[12px] pb-2">
                            Please fill this in decent manner 🙂.
                        </h4>
                        <hr className="bg-slate-800 h-0.5"></hr>
                        <form
                            action="https://formspree.io/f/xjvjzqzq"
                            method="POST"
                            className="flex flex-col mt-1"
                        >
                            <div className="flex flex-col mt-2">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="rounded-sm pl-1"
                                    required
                                />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="rounded-sm pl-1"
                                    required
                                />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder="Enter your message"
                                    className="rounded-sm pl-1"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-gray-100 text-black rounded-md px-5 max-w-[100px] self-center text-center py-1 mt-2 cursor-pointer shadow-lg hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactMe;
