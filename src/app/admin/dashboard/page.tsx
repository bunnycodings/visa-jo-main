'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/admin/DashboardLayout';
import DashboardContent from '@/components/admin/DashboardContent';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default AdminDashboard;
        {/* Hero Section with Welcome */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="relative px-8 py-12">
            <div className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-6`}>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white/90">
                    All Systems Operational
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Welcome back, {username}! 👋
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Manage your website content and visa information from one place
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 text-white font-medium transition-all hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Site
                  </Link>
                  <Link
                    href="/admin/dashboard/visas/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Visa
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-16 h-16 bg-white/20 rounded-xl"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-6">
                <div className={`flex items-center justify-between mb-4`}>
                  <div className={`${stat.bgColor} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={stat.textColor}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.textColor} ${stat.bgColor}`}>
                    {stat.change}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${typeof stat.value === 'number' ? 'text-gray-900' : stat.textColor}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{stat.changeLabel}</p>
                </div>

                {/* Decorative Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  Quick Actions
                </h2>
                <p className="text-sm text-gray-600 mt-1">Quick access to common tasks</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const getColorClasses = (color: string) => {
                      switch (color) {
                        case 'blue':
                          return {
                            hover: 'hover:border-blue-300 hover:from-blue-50 hover:to-blue-100',
                            icon: 'bg-blue-100 group-hover:bg-blue-200 text-blue-600',
                            arrow: 'group-hover:text-blue-600'
                          };
                        case 'purple':
                          return {
                            hover: 'hover:border-purple-300 hover:from-purple-50 hover:to-purple-100',
                            icon: 'bg-purple-100 group-hover:bg-purple-200 text-purple-600',
                            arrow: 'group-hover:text-purple-600'
                          };
                        case 'green':
                          return {
                            hover: 'hover:border-green-300 hover:from-green-50 hover:to-green-100',
                            icon: 'bg-green-100 group-hover:bg-green-200 text-green-600',
                            arrow: 'group-hover:text-green-600'
                          };
                        case 'orange':
                          return {
                            hover: 'hover:border-orange-300 hover:from-orange-50 hover:to-orange-100',
                            icon: 'bg-orange-100 group-hover:bg-orange-200 text-orange-600',
                            arrow: 'group-hover:text-orange-600'
                          };
                        default:
                          return {
                            hover: 'hover:border-blue-300 hover:from-blue-50 hover:to-blue-100',
                            icon: 'bg-blue-100 group-hover:bg-blue-200 text-blue-600',
                            arrow: 'group-hover:text-blue-600'
                          };
                      }
                    };
                    
                    const colors = getColorClasses(action.color);
                    
                    return (
                      <Link
                        key={index}
                        href={action.href}
                        className={`group relative p-5 rounded-xl border-2 border-gray-200 ${colors.hover} bg-gradient-to-br from-white to-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 group-hover:text-gray-900">
                              {typeof action.label === 'string' ? action.label : action.label.en}
                            </p>
                          </div>
                          <svg className={`w-5 h-5 text-gray-400 ${colors.arrow} transition-colors ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                System Status
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-900">Database</span>
                </div>
                <span className="text-sm font-semibold text-green-600">Connected</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-900">API</span>
                </div>
                <span className="text-sm font-semibold text-green-600">Running</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-900">Website</span>
                </div>
                <span className="text-sm font-semibold text-green-600">Active</span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Last Updated</p>
                <p className="text-sm font-semibold text-gray-900">{stats.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links to Website Pages */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
              Page Links
            </h2>
            <p className="text-sm text-gray-600 mt-1">Quick access to your website pages</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: '/', label: { en: 'Homepage', ar: 'الصفحة الرئيسية' }, icon: '🏠' },
                { href: '/about', label: { en: 'About', ar: 'حول' }, icon: '📄' },
                { href: '/services', label: { en: 'Services', ar: 'الخدمات' }, icon: '🎁' },
                { href: '/contact', label: { en: 'Contact', ar: 'اتصل بنا' }, icon: '✉️' }
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  className="group flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                  <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {link.label.en}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default AdminDashboard;
