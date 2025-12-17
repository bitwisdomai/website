import React, { useState } from "react";
import { API_BASE_URL } from "../../services/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
        mode: "cors",
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! We'll get back to you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          interest: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to submit form. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 md:pb-20">
      <div className="w-full max-w-7xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-7 md:mb-8">
          <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">
            Contact Us
          </span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-400 rounded-md px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-400 rounded-md px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-400 rounded-md px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">I'm Interested In</option>
              <option value="licensing">Licensing</option>
              <option value="partnership">Partnership</option>
              <option value="demo">Product Demo</option>
              <option value="support">Support</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (optional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-400 rounded-md px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full bg-transparent border border-cyan-400 rounded-md px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
          />

          {/* Status Message */}
          {submitStatus.message && (
            <div
              className={`p-3 rounded-md text-sm ${
                submitStatus.type === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-400"
                  : "bg-red-500/20 text-red-400 border border-red-400"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-400 text-black font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-md hover:bg-cyan-300 transition text-xs sm:text-sm md:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Request Contact"}
            </button>
            <a
              href="https://calendly.com/bitwisdomai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cyan-400 text-white font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-md hover:bg-cyan-400 hover:text-black transition text-xs sm:text-sm md:text-base w-full sm:w-auto text-center inline-block"
            >
              Schedule a Call
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
