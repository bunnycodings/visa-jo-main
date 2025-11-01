'use client'

import { useState } from 'react'
import { Users, Award, Clock, Shield, CheckCircle, Star } from 'lucide-react'

const About = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const stats = [
    { number: '5000+', label: 'Successful Applications', icon: <CheckCircle className="h-8 w-8 text-primary-600" /> },
    { number: '15+', label: 'Years Experience', icon: <Award className="h-8 w-8 text-primary-600" /> },
    { number: '50+', label: 'Countries Covered', icon: <Shield className="h-8 w-8 text-primary-600" /> },
    { number: '98%', label: 'Success Rate', icon: <Star className="h-8 w-8 text-primary-600" /> },
  ]

  const team = [
    {
      name: 'Ahmed Al-Rashid',
      position: 'Senior Visa Consultant',
      experience: '12 years',
      specializations: ['US Visas', 'UK Visas', 'Schengen Visas'],
      image: '/assets/img/team/ahmed.jpg'
    },
    {
      name: 'Sarah Johnson',
      position: 'Documentation Specialist',
      experience: '8 years',
      specializations: ['Document Translation', 'Certification', 'Legalization'],
      image: '/assets/img/team/sarah.jpg'
    },
    {
      name: 'Mohammed Hassan',
      position: 'Travel Coordinator',
      experience: '10 years',
      specializations: ['Trip Planning', 'Hotel Bookings', 'Flight Reservations'],
      image: '/assets/img/team/mohammed.jpg'
    },
    {
      name: 'Fatima Al-Zahra',
      position: 'Customer Relations Manager',
      experience: '6 years',
      specializations: ['Customer Support', 'Application Tracking', 'Follow-up'],
      image: '/assets/img/team/fatima.jpg'
    }
  ]

  const values = [
    {
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our dealings with clients and authorities.',
      icon: <Shield className="h-12 w-12 text-primary-600" />
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every visa application and service we provide.',
      icon: <Award className="h-12 w-12 text-primary-600" />
    },
    {
      title: 'Reliability',
      description: 'Our clients can count on us for consistent, dependable service and support.',
      icon: <Clock className="h-12 w-12 text-primary-600" />
    },
    {
      title: 'Transparency',
      description: 'We provide clear, honest communication about processes, costs, and timelines.',
      icon: <Users className="h-12 w-12 text-primary-600" />
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Visa Consulting Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for visa applications and travel services since 2008
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'mission'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'team'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'values'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Our Values
            </button>
          </div>
        </div>

        {/* Mission Tab */}
        {activeTab === 'mission' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  At Visa Consulting Services, we are dedicated to simplifying the visa application process 
                  and making international travel accessible to everyone. Our mission is to provide expert 
                  guidance, reliable service, and personalized support to help our clients achieve their 
                  travel dreams.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We understand that visa applications can be complex and overwhelming. That's why we've 
                  built a team of experienced professionals who are committed to making the process as 
                  smooth and stress-free as possible.
                </p>
                <div className="bg-primary-50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-primary-800 mb-3">
                    Why Choose Us?
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      Expert knowledge of visa requirements and processes
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      Personalized service tailored to your needs
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      High success rate with visa applications
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      Comprehensive support throughout the process
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg p-8 text-white">
                <h4 className="text-2xl font-bold mb-6">Our Commitment</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white/20 rounded-full p-2 mr-4 mt-1">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Transparent Process</h5>
                      <p className="text-primary-100">Clear communication about requirements, costs, and timelines</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white/20 rounded-full p-2 mr-4 mt-1">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Expert Guidance</h5>
                      <p className="text-primary-100">Professional advice from experienced visa consultants</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white/20 rounded-full p-2 mr-4 mt-1">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Ongoing Support</h5>
                      <p className="text-primary-100">Continuous assistance from application to approval</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Expert Team
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our experienced professionals are dedicated to helping you achieve your travel goals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-primary-600 font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {member.experience} experience
                  </p>
                  <div className="space-y-1">
                    {member.specializations.map((spec, idx) => (
                      <span key={idx} className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Values Tab */}
        {activeTab === 'values' && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-6">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Work With Us?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let our experienced team help you with your visa application. Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Free Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                Call +962 79 6090 319
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
