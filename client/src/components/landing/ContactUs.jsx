import React, { useState } from 'react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    interestedIn: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission logic here
  }

  return (
    <div id="contact" className="bg-black text-white py-20 px-28">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-12">Contact Us</h2>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Your Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-brand-primary transition"
                placeholder="Enter your name"
              />
            </div>

            {/* I'm Interested In */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                I'm Interested In *
              </label>
              <select
                name="interestedIn"
                value={formData.interestedIn}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-brand-primary transition"
              >
                <option value="">Select an option</option>
                <option value="running-node">Running a Crypto Node</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="merchant-services">Merchant Services</option>
                <option value="technical-support">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-brand-primary transition"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-brand-primary transition"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-brand-primary transition resize-none"
              placeholder="Tell us about your inquiry..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-brand-primary text-black px-8 py-3 rounded font-semibold hover:bg-cyan-400 transition"
            >
              Submit Message
            </button>
            <button
              type="button"
              className="border border-gray-600 px-8 py-3 rounded hover:bg-gray-800 transition"
            >
              Schedule A Call
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
