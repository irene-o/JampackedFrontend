import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify';

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")

  emailjs.init('G1npnWQTE-f71etJi')

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const emailData = {
      name: senderName,
      email: email,
      message: message
    }

    emailjs.send('gmail_service','template_tgydr6m', emailData)
      .then(() => {
        toast.success("Message sent successfully!");
        setSenderName("")
        setEmail("")
        setMessage("")
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.");
        console.log("Error sending message:", error)
      });
  };

  return (
    <div>
      <h1 className='cherry-bomb-one-regular text-4xl sm:py-2 lg:text-5xl leading-loose text-[#414141]'>Contact Us</h1>
      <p className='text-lg font-medium text-gray-600 mt-5'>Enter your name, email and enquiry and we will get back to you as soon as possible.</p>

      <form onSubmit={onSubmitHandler} className='items-center gap-3 mx-auto my-6 rounded-lg border pl-5'>
        <div>
          <label htmlFor="name" className="block pt-5 m-2 text-lg">Name</label>
          <input
            type="text"
            placeholder="Your name"
            required
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="block p-3 w-52 text-sm text-gray-700 rounded-lg border border-gray-300"
          />
        </div>

        <div>
          <label htmlFor="email" className="block pt-5 m-2 text-lg">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block p-3 w-80 text-sm text-gray-700 rounded-lg border border-gray-300"
          />
        </div>

        <div>
          <label htmlFor="message" className="block pt-5 m-2 text-lg">Your message</label>
          <textarea
            rows="4"
            placeholder="Write your message here..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block p-3 w-3/4 text-sm text-gray-700 rounded-lg border border-gray-300"
          />
        </div>

        <button type="submit" className="bg-pink-600 text-white text-sm px-6 py-3 my-10 rounded-xl">
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
};

export default Contact
