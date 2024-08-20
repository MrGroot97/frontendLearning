import { useState } from "react";

const ContactForm = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleFormChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h4 className="text-[12px] pb-2">
                Please fill this in decent manner 🙂.
            </h4>
            <hr className="bg-slate-800 h-0.5"></hr>
            <form 
                className="flex flex-col mt-1"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(formState);
                    setFormState({
                        name: "",
                        email: "",
                        message: "",
                    });
                }}
            >
                <div className="flex flex-col mt-2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formState.name}
                        placeholder="Enter your name"
                        className="rounded-sm pl-1"
                        required
                        onChange={handleFormChange}
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        placeholder="Enter your email"
                        className="rounded-sm pl-1"
                        required
                        onChange={handleFormChange}
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formState.message}
                        placeholder="Enter your message"
                        className="rounded-sm pl-1"
                        required
                        onChange={handleFormChange}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-gray-100 text-black rounded-md px-5 max-w-[100px] self-center text-center py-1 mt-2 cursor-pointer shadow-lg hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default ContactForm;
