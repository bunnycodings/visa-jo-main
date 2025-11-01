'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send, CheckCircle } from 'lucide-react'
import { siteConfig } from '@/lib/constants'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visaType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        visaType: '',
        message: ''
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary-600" />,
      title: 'Phone',
      details: siteConfig.getFormattedPhone(),
      description: 'Call us for immediate assistance',
      link: siteConfig.getTelLink()
    },
    {
      icon: <Mail className="h-6 w-6 text-primary-600" />,
      title: 'Email',
      details: siteConfig.contactEmail,
      description: 'Send us your questions anytime',
      link: `mailto:${siteConfig.contactEmail}`
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary-600" />,
      title: 'Address',
      details: siteConfig.contactAddress,
      description: 'Visit our office for consultations'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      title: 'Working Hours',
      details: siteConfig.businessHours,
      description: 'We are here to help'
    }
  ]

  const visaTypes = [
    'UAE Visa',
    'UK Visa',
    'US Visa',
    'Canada Visa',
    'Australia Visa',
    'India Visa',
    'Germany Visa',
    'France Visa',
    'Netherlands Visa',
    'Spain Visa',
    'Italy Visa',
    'Austria Visa',
    'Other'
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your visa application? Contact us today for expert guidance and personalized service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <a href={info.link} className="text-primary-600 font-medium mb-1 hover:underline block">
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-primary-600 font-medium mb-1">
                        {info.details}
                      </p>
                    )}
                    <p className="text-gray-600">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="border-t pt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a
                  href={siteConfig.facebookUrl !== '#' ? siteConfig.facebookUrl : 'https://facebook.com/VisaJor/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  Facebook
                </a>
                <a
                  href={siteConfig.instagramUrl !== '#' ? siteConfig.instagramUrl : 'https://www.instagram.com/visa_jo/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  Instagram
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-primary-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Book Free Consultation
                </button>
                <button className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Download Visa Checklist
                </button>
                <button className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Track Application Status
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Send Us a Message
            </h3>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-green-600">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="+962 79 123 4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-2">
                      Visa Type
                    </label>
                    <select
                      id="visaType"
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select visa type</option>
                      {visaTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Tell us about your visa requirements and any questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Visit Our Office
          </h3>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map will be integrated here</p>
              <p className="text-sm text-gray-500 mt-2">Amman, Jordan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
