'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminLogin() {
  const router = useRouter();
  const { setToken } = useAdminAuth();
  const { locale } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRTL = locale === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in context and localStorage
        setToken(data.token);
        // Redirect to dashboard in the same language
        const dashboardPath = locale === 'ar' ? '/ar/admin/dashboard' : '/admin/dashboard';
        router.push(dashboardPath);
      } else {
        setError(locale === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
      }
    } catch (error) {
      setError(locale === 'ar' ? 'حدث خطأ. يرجى المحاولة مجددا.' : 'An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Language Switcher in corner */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            {locale === 'ar' ? 'دخول المشرف' : 'Admin Login'}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {locale === 'ar' ? 'تسجيل الدخول إلى لوحة تحكم الإدارة' : 'Sign in to your admin dashboard'}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {locale === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={locale === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (locale === 'ar' ? 'جاري التحميل...' : 'Loading...') : (locale === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            {locale === 'ar' ? 'هذا النظام مخصص للمسؤولين فقط' : 'This system is for administrators only'}
          </p>
        </div>
      </div>
    </div>
  );
}
