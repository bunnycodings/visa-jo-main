"use client";

import { useEffect, useState } from 'react';
import type { ContactContent } from '@/types/models/SiteContent';
import type { ContactFormData } from '@/types';
import { siteConfig } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';

export default function ArabicContactPage() {
  const { t } = useLanguage();
  const [content, setContent] = useState<ContactContent | null>(null);
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '', subject: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/content/contact?locale=ar', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (e) {
        console.error('Failed to load contact content', e);
      }
    };
    run();
  }, []);

  const title = content?.title || t('contact.title');
  const intro = content?.intro || t('contact.description');
  const infoTitle = content?.infoTitle || t('contact.findUs');
  const infoItems = content?.infoItems || [
    { label: t('common.phone'), value: siteConfig.getFormattedPhone() },
    { label: t('common.email'), value: siteConfig.contactEmail },
    { label: t('common.address'), value: siteConfig.contactAddress },
    { label: t('common.workingHours'), value: siteConfig.businessHours },
  ];

  interface InfoItem {
    label: string;
    value: string;
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent('Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n\n` +
      `Message:\n${form.message}`
    );
    
    // Open email client
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
    
    // Show success message
    setStatus('success');
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', message: '', subject: '' });
      setStatus('idle');
    }, 2000);
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-cyan-300 font-medium">{t('common.getInTouch')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">{intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{infoTitle}</h2>
              </div>
              <ul className="space-y-6">
                {infoItems.map((item: InfoItem, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 group-hover:scale-125 transition-transform duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">{item.label}</p>
                      <p className="text-gray-900 font-semibold text-lg">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">{t('contact.needImmediateHelp')}</h3>
              <p className="text-blue-100 mb-6">{t('contact.teamAvailable')}</p>
              <div className="space-y-3">
                <a 
                  href={siteConfig.getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {t('contact.startWhatsAppChat')}
                </a>
                <a 
                  href={siteConfig.getTelLink()} 
                  className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('contact.callUsNow')}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={submitForm} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{t('contact.contactConsultants')}</h2>
                <p className="text-gray-600 text-lg mt-2">{t('contact.leaveMessage')}</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.nameLabel')} *</label>
                  <input 
                    className="w-full border-2 border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                    placeholder={t('contact.namePlaceholder')}
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.phoneLabel')} *</label>
                  <input 
                    className="w-full border-2 border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                    placeholder="+962 7X XXX XXXX"
                    value={form.phone} 
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.inquiriesLabel')} *</label>
                  <textarea 
                    rows={4}
                    className="w-full border-2 border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                    placeholder={t('contact.messagePlaceholder')}
                    value={form.message} 
                    onChange={(e) => setForm({ ...form, message: e.target.value })} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.emailLabel')} *</label>
                  <input 
                    type="email" 
                    className="w-full border-2 border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                    placeholder={t('contact.emailPlaceholder')}
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    required 
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button 
                  type="submit" 
                  disabled={status === 'submitting'} 
                  className="w-full px-6 py-3 bg-[#145EFF] text-white rounded-xl font-semibold hover:bg-[#145EFF] transition-all duration-300 text-center"
                >
                  {t('contact.send')}
                </button>
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-6 py-3 rounded-xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/>
                    </svg>
                    <span className="font-semibold">{t('contact.thanksMessage')}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

