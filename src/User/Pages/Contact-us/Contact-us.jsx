import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { MdPhoneInTalk } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { rounded1Image, roundedImage, sendImage } from '../../../assets/Index';
import emailjs from "@emailjs/browser";

const ConnectUs = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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
        "service_3qrtd8m", // Replace with your SERVICE_ID
        "template_ggw8yqh", // Replace with your TEMPLATE_ID
        {
          from_name: form.name,
          to_name: "ISLAND DAYS", // Replace with your recipient's name
          from_email: form.email.trim().toLowerCase(),
          to_email: "harikumarv7000@gmail.com", // Replace with your template recipient email
          phone: form.phone.trim(),
          message: form.message,
        },
        "Jw0lAtKg3cYnq97gW" // Replace with your PUBLIC_KEY
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
        alert("An error occurred while sending your message. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="pt-32 pb-10 w-full mx-auto rounded-md"
      style={{
        background: "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc, #004080)",
      }}
    >
      <div className="flex flex-col-reverse lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-11/12">
        {/* Left Section */}
        <div className="lg:w-2/5 bg-black flex flex-col justify-between pl-8">
          <div>
            <h1 className="text-white pt-8 font-semibold text-3xl text-start px-5 mt-5">
              Let's Chat and Connect!
            </h1>
            <p className="text-white text-start px-5">We’re here to help. Reach out to us!</p>
          </div>
          <div className="pt-5 pb-10 space-y-8 px-5">
            <div className="flex items-center text-white">
              <MdPhoneInTalk className="mr-2" />
              <span>+91 80785 49682</span>
            </div>
            <div className="flex items-center text-white">
              <MdPhoneInTalk className="mr-2" />
              <span>+91 9344963795</span>
            </div>

            <div className="flex items-center text-white">
              <MdPhoneInTalk className="mr-2" />
              <span>+91 8330018044</span>
            </div>
            {/* <div className="flex items-center text-white">
              <IoIosMail className="mr-2" />
              <span>Islanddays@gmail.com</span>
            </div>
            <div className="flex items-center text-white flex-wrap">
              <ImLocation2 className="mr-2" />
              <span>Island</span>
            </div> */}
          </div>
          <div className="flex">
            <div className="flex justify-start md:pt-20 px-5 gap-5">
              <FaFacebook className="text-white hover:bg-gray-200 cursor-pointer rounded-full hover:text-black px-2 text-4xl" />
              <AiFillInstagram className="text-white hover:bg-gray-200 cursor-pointer rounded-full hover:text-black px-2 text-4xl" />
              <RiTwitterFill className="text-white hover:bg-gray-200 cursor-pointer rounded-full hover:text-black px-2 text-4xl" />
            </div>
            <div className="relative ml-auto flex items-end">
              <img src={roundedImage} alt="image1" className="absolute -top-8" />
              <img src={rounded1Image} alt="image2" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="w-full px-5 lg:w-3/5"
          style={{
            background: "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc, #004080)",
          }}
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-cyan-800 text-center font-moderna py-5">
              Contact
            </h2>
            <div className="mt-4 flex flex-col md:flex-row justify-evenly items-center gap-8">
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
                className="w-full md:w-60"
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
                className="w-full md:w-60"
              />
            </div>
            <div className="  mt-4 flex w-full md:w-10/12 mx-auto ">
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
                className="w-full md:w-1/2  mr-auto"
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
                className="w-full "
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
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={sendImage}
                alt="send message"
                className="w-1/2 max-w-[12rem] -mt-16 hover:cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectUs;
