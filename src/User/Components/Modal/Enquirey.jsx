import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TextField from "@mui/material/TextField";
import "./Enquery.css"; // For animation styles

const Enquirey = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Modal state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const { name, email, phone, message } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

    if (name.trim().length < 3) {
      alert("Name must be at least 3 characters long.");
      return false;
    }

    if (!email.trim().toLowerCase().match(emailRegex)) {
      alert("Enter a valid email address.");
      return false;
    }

    if (!phone.trim().match(phoneRegex)) {
      alert("Enter a valid Indian phone number (e.g., +91 9876543210).");
      return false;
    }

    if (message.trim().length < 5) {
      alert("Message must be at least 5 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    emailjs
      .send(
        "service_3qrtd8m",
        "template_ggw8yqh",
        {
          from_name: form.name,
          to_name: "ISLAND DAYS",
          from_email: form.email.trim().toLowerCase(),
          to_email: "harikumarv7000@gmail.com",
          phone: form.phone.trim(),
          message: form.message,
        },
        "Jw0lAtKg3cYnq97gW"
      )
      .then(() => {
        alert("Thanks for contacting us. We'll get back to you soon!");
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("[EMAILJS_ERROR]: ", error);
        alert(
          "An error occurred while sending your message. Please try again later."
        );
      })
      .finally(() => setLoading(false));
  };

  const closeModal = () => {
    setIsOpen(false); // Close the modal
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in"
          onAnimationEnd={(e) => {
            if (!isOpen) e.target.classList.add("animate-fade-out");
          }}
        >
          <div
            className="rounded-lg w-10/12 px-5 lg:w-3/5 shadow-md shadow-blue-700 animate-slide-in"
            style={{
              background:
                "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc, #004080)",
            }}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center py-3  ">
            <button
              onClick={closeModal}
              className="text-gray-600 hover:text-black ml-auto  text-xl"
            >
              ✖
            </button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mt-4 md:flex mx-auto items-center gap-8 md:w-10/12">
                <TextField
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  title="What's your name?"
                  disabled={loading}
                  aria-disabled={loading}
                  variant="standard"
                  label="Name"
                  className="w-full md:w-1/2"
                />
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email ID"
                  title="What's your email?"
                  disabled={loading}
                  aria-disabled={loading}
                  variant="standard"
                  label="Email"
                  className="w-full"
                />
              </div>
              <div className="mt-4 flex w-full md:w-10/12 mx-auto">
                <TextField
                  type="tel"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                  title="Your Indian Phone Number"
                  disabled={loading}
                  aria-disabled={loading}
                  variant="standard"
                  label="Phone"
                  className="w-full md:w-1/2 mr-auto"
                />
              </div>
              <div className="mt-4 md:w-10/12 w-full mx-auto">
                <TextField
                  rows={5}
                  type="text"
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter your Message here"
                  title="What do you want to say?"
                  disabled={loading}
                  aria-disabled={loading}
                  variant="standard"
                  label="Message"
                  multiline
                  className="w-full"
                />
              </div>
              <div className="flex justify-end mx-10">
                <button
                  type="submit"
                  title={loading ? "Sending..." : "Send"}
                  disabled={loading}
                  aria-disabled={loading}
                  className="w-56 bg-black text-white h-14 my-10 rounded-lg text-lg"
                >
                  {loading ? "Sending..." : "Enquire Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Enquirey;
