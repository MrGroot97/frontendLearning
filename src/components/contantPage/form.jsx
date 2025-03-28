import { useState } from "react";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const inputClassName =
    "px-2 py-1 dark:text-white font-medium transition-all duration-200 focus:outline-none focus:border-blue-500";

  return (
    <>
      <h4 className="text-[12px] pb-2">
        Please fill this in decent manner 🙂.
      </h4>
      <hr className="bg-slate-800 h-0.5 dark:bg-slate-500"></hr>
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
          <label htmlFor="name" className="mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formState.name}
            placeholder="Enter your name"
            className={inputClassName}
            required
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            placeholder="Enter your email"
            className={inputClassName}
            required
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="message" className="mb-1">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formState.message}
            placeholder="Enter your message"
            className={inputClassName}
            rows="4"
            required
            onChange={handleFormChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="themed-button max-w-[100px] self-center mt-3"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ContactForm;
