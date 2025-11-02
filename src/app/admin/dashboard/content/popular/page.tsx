"use client";
import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useContentRefresh } from '@/context/ContentRefreshContext';
import Link from 'next/link';

interface DestinationInput {
  name: string;
  flag: string;
  visaType: string;
}

interface CountryOption {
  name: string;
  code: string;
}

// Helper function to get common country flag URLs from flagcdn.com
function getCountryFlagUrl(countryCode: string): string {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

// All 254 countries from Flagpedia.net with their ISO codes
const ALL_COUNTRIES: CountryOption[] = [
  { name: 'Afghanistan', code: 'af' }, { name: 'Albania', code: 'al' }, { name: 'Algeria', code: 'dz' },
  { name: 'Andorra', code: 'ad' }, { name: 'Angola', code: 'ao' }, { name: 'Antigua and Barbuda', code: 'ag' },
  { name: 'Argentina', code: 'ar' }, { name: 'Armenia', code: 'am' }, { name: 'Australia', code: 'au' },
  { name: 'Austria', code: 'at' }, { name: 'Azerbaijan', code: 'az' }, { name: 'Bahamas', code: 'bs' },
  { name: 'Bahrain', code: 'bh' }, { name: 'Bangladesh', code: 'bd' }, { name: 'Barbados', code: 'bb' },
  { name: 'Belarus', code: 'by' }, { name: 'Belgium', code: 'be' }, { name: 'Belize', code: 'bz' },
  { name: 'Benin', code: 'bj' }, { name: 'Bhutan', code: 'bt' }, { name: 'Bolivia', code: 'bo' },
  { name: 'Bosnia and Herzegovina', code: 'ba' }, { name: 'Botswana', code: 'bw' }, { name: 'Brazil', code: 'br' },
  { name: 'Brunei', code: 'bn' }, { name: 'Bulgaria', code: 'bg' }, { name: 'Burkina Faso', code: 'bf' },
  { name: 'Burundi', code: 'bi' }, { name: 'Cambodia', code: 'kh' }, { name: 'Cameroon', code: 'cm' },
  { name: 'Canada', code: 'ca' }, { name: 'Cape Verde', code: 'cv' }, { name: 'Central African Republic', code: 'cf' },
  { name: 'Chad', code: 'td' }, { name: 'Chile', code: 'cl' }, { name: 'China', code: 'cn' },
  { name: 'Colombia', code: 'co' }, { name: 'Comoros', code: 'km' }, { name: 'Congo', code: 'cg' },
  { name: 'Costa Rica', code: 'cr' }, { name: 'Croatia', code: 'hr' }, { name: 'Cuba', code: 'cu' },
  { name: 'Cyprus', code: 'cy' }, { name: 'Czech Republic', code: 'cz' }, { name: 'Czechia', code: 'cz' },
  { name: 'Denmark', code: 'dk' }, { name: 'Djibouti', code: 'dj' }, { name: 'Dominica', code: 'dm' },
  { name: 'Dominican Republic', code: 'do' }, { name: 'Ecuador', code: 'ec' }, { name: 'Egypt', code: 'eg' },
  { name: 'El Salvador', code: 'sv' }, { name: 'Equatorial Guinea', code: 'gq' }, { name: 'Eritrea', code: 'er' },
  { name: 'Estonia', code: 'ee' }, { name: 'Ethiopia', code: 'et' }, { name: 'Fiji', code: 'fj' },
  { name: 'Finland', code: 'fi' }, { name: 'France', code: 'fr' }, { name: 'Gabon', code: 'ga' },
  { name: 'Gambia', code: 'gm' }, { name: 'Georgia', code: 'ge' }, { name: 'Germany', code: 'de' },
  { name: 'Ghana', code: 'gh' }, { name: 'Greece', code: 'gr' }, { name: 'Grenada', code: 'gd' },
  { name: 'Guatemala', code: 'gt' }, { name: 'Guinea', code: 'gn' }, { name: 'Guinea-Bissau', code: 'gw' },
  { name: 'Guyana', code: 'gy' }, { name: 'Haiti', code: 'ht' }, { name: 'Honduras', code: 'hn' },
  { name: 'Hong Kong', code: 'hk' }, { name: 'Hungary', code: 'hu' }, { name: 'Iceland', code: 'is' },
  { name: 'India', code: 'in' }, { name: 'Indonesia', code: 'id' }, { name: 'Iran', code: 'ir' },
  { name: 'Iraq', code: 'iq' }, { name: 'Ireland', code: 'ie' }, { name: 'Israel', code: 'il' },
  { name: 'Italy', code: 'it' }, { name: 'Ivory Coast', code: 'ci' }, { name: 'Côte d\'Ivoire', code: 'ci' },
  { name: 'Jamaica', code: 'jm' }, { name: 'Japan', code: 'jp' }, { name: 'Jordan', code: 'jo' },
  { name: 'Kazakhstan', code: 'kz' }, { name: 'Kenya', code: 'ke' }, { name: 'Kiribati', code: 'ki' },
  { name: 'Kuwait', code: 'kw' }, { name: 'Kyrgyzstan', code: 'kg' }, { name: 'North Korea', code: 'kp' },
  { name: 'South Korea', code: 'kr' }, { name: 'Korea', code: 'kr' }, { name: 'Laos', code: 'la' },
  { name: 'Latvia', code: 'lv' }, { name: 'Lebanon', code: 'lb' }, { name: 'Lesotho', code: 'ls' },
  { name: 'Liberia', code: 'lr' }, { name: 'Libya', code: 'ly' }, { name: 'Liechtenstein', code: 'li' },
  { name: 'Lithuania', code: 'lt' }, { name: 'Luxembourg', code: 'lu' }, { name: 'Macau', code: 'mo' },
  { name: 'Madagascar', code: 'mg' }, { name: 'Malawi', code: 'mw' }, { name: 'Malaysia', code: 'my' },
  { name: 'Maldives', code: 'mv' }, { name: 'Mali', code: 'ml' }, { name: 'Malta', code: 'mt' },
  { name: 'Marshall Islands', code: 'mh' }, { name: 'Mauritania', code: 'mr' }, { name: 'Mauritius', code: 'mu' },
  { name: 'Mexico', code: 'mx' }, { name: 'Micronesia', code: 'fm' }, { name: 'Moldova', code: 'md' },
  { name: 'Monaco', code: 'mc' }, { name: 'Mongolia', code: 'mn' }, { name: 'Montenegro', code: 'me' },
  { name: 'Morocco', code: 'ma' }, { name: 'Mozambique', code: 'mz' }, { name: 'Myanmar', code: 'mm' },
  { name: 'Namibia', code: 'na' }, { name: 'Nauru', code: 'nr' }, { name: 'Nepal', code: 'np' },
  { name: 'Netherlands', code: 'nl' }, { name: 'New Zealand', code: 'nz' }, { name: 'Nicaragua', code: 'ni' },
  { name: 'Niger', code: 'ne' }, { name: 'Nigeria', code: 'ng' }, { name: 'North Macedonia', code: 'mk' },
  { name: 'Norway', code: 'no' }, { name: 'Oman', code: 'om' }, { name: 'Pakistan', code: 'pk' },
  { name: 'Palau', code: 'pw' }, { name: 'Palestine', code: 'ps' }, { name: 'Panama', code: 'pa' },
  { name: 'Papua New Guinea', code: 'pg' }, { name: 'Paraguay', code: 'py' }, { name: 'Peru', code: 'pe' },
  { name: 'Philippines', code: 'ph' }, { name: 'Poland', code: 'pl' }, { name: 'Portugal', code: 'pt' },
  { name: 'Puerto Rico', code: 'pr' }, { name: 'Qatar', code: 'qa' }, { name: 'Republic of the Congo', code: 'cg' },
  { name: 'DR Congo', code: 'cd' }, { name: 'Romania', code: 'ro' }, { name: 'Russia', code: 'ru' },
  { name: 'Russian Federation', code: 'ru' }, { name: 'Rwanda', code: 'rw' }, { name: 'Saint Lucia', code: 'lc' },
  { name: 'Saint Vincent and the Grenadines', code: 'vc' }, { name: 'Samoa', code: 'ws' }, { name: 'San Marino', code: 'sm' },
  { name: 'Sao Tome and Principe', code: 'st' }, { name: 'Saudi Arabia', code: 'sa' }, { name: 'Senegal', code: 'sn' },
  { name: 'Serbia', code: 'rs' }, { name: 'Seychelles', code: 'sc' }, { name: 'Sierra Leone', code: 'sl' },
  { name: 'Singapore', code: 'sg' }, { name: 'Slovakia', code: 'sk' }, { name: 'Slovenia', code: 'si' },
  { name: 'Solomon Islands', code: 'sb' }, { name: 'Somalia', code: 'so' }, { name: 'South Africa', code: 'za' },
  { name: 'South Sudan', code: 'ss' }, { name: 'Spain', code: 'es' }, { name: 'Sri Lanka', code: 'lk' },
  { name: 'Sudan', code: 'sd' }, { name: 'Suriname', code: 'sr' }, { name: 'Sweden', code: 'se' },
  { name: 'Switzerland', code: 'ch' }, { name: 'Syria', code: 'sy' }, { name: 'Taiwan', code: 'tw' },
  { name: 'Tajikistan', code: 'tj' }, { name: 'Tanzania', code: 'tz' }, { name: 'Thailand', code: 'th' },
  { name: 'Timor-Leste', code: 'tl' }, { name: 'Togo', code: 'tg' }, { name: 'Tonga', code: 'to' },
  { name: 'Trinidad and Tobago', code: 'tt' }, { name: 'Tunisia', code: 'tn' }, { name: 'Turkey', code: 'tr' },
  { name: 'Turkmenistan', code: 'tm' }, { name: 'Tuvalu', code: 'tv' }, { name: 'Uganda', code: 'ug' },
  { name: 'Ukraine', code: 'ua' }, { name: 'UAE', code: 'ae' }, { name: 'United Arab Emirates', code: 'ae' },
  { name: 'UK', code: 'gb' }, { name: 'United Kingdom', code: 'gb' }, { name: 'US', code: 'us' },
  { name: 'USA', code: 'us' }, { name: 'United States', code: 'us' }, { name: 'Uruguay', code: 'uy' },
  { name: 'Uzbekistan', code: 'uz' }, { name: 'Vanuatu', code: 'vu' }, { name: 'Vatican City', code: 'va' },
  { name: 'Venezuela', code: 've' }, { name: 'Vietnam', code: 'vn' }, { name: 'Western Sahara', code: 'eh' },
  { name: 'Yemen', code: 'ye' }, { name: 'Zambia', code: 'zm' }, { name: 'Zimbabwe', code: 'zw' }
];

export default function EditPopularDestinationsPage() {
  const { token } = useAdminAuth();
  const { triggerRefresh } = useContentRefresh();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [items, setItems] = useState<DestinationInput[]>([{ name: '', flag: '', visaType: 'visa' }]);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/content/popular', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load content');
        const data = await res.json();
        setTitle(data.title || '');
        setItems(Array.isArray(data.items) && data.items.length ? data.items : items);
      } catch (e: any) {
        setError(e.message || 'Error loading content');
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchContent();
  }, [token]);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch('/api/admin/content/popular', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, items }),
      });
      if (!res.ok) throw new Error('Failed to save content');
      await res.json();
      
      // Auto-refresh the data after saving
      const refreshRes = await fetch('/api/admin/content/popular', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setTitle(data.title || '');
        setItems(Array.isArray(data.items) && data.items.length ? data.items : items);
      }
      
      triggerRefresh();
      alert('Saved successfully');
    } catch (e: any) {
      setError(e.message || 'Error saving content');
    } finally {
      setSaving(false);
    }
  }

  function getFlagPath(countryName: string): string {
    // Comprehensive mapping of all 254 countries based on Flagpedia.net
    const countryToCode: Record<string, string> = {
      // A
      'Afghanistan': 'af', 'Albania': 'al', 'Algeria': 'dz', 'Andorra': 'ad', 'Angola': 'ao', 
      'Antigua and Barbuda': 'ag', 'Argentina': 'ar', 'Armenia': 'am', 'Australia': 'au', 
      'Austria': 'at', 'Azerbaijan': 'az',
      // B
      'Bahamas': 'bs', 'Bahrain': 'bh', 'Bangladesh': 'bd', 'Barbados': 'bb', 'Belarus': 'by', 
      'Belgium': 'be', 'Belize': 'bz', 'Benin': 'bj', 'Bhutan': 'bt', 'Bolivia': 'bo', 
      'Bosnia and Herzegovina': 'ba', 'Botswana': 'bw', 'Brazil': 'br', 'Brunei': 'bn', 
      'Bulgaria': 'bg', 'Burkina Faso': 'bf', 'Burundi': 'bi',
      // C
      'Cambodia': 'kh', 'Cameroon': 'cm', 'Canada': 'ca', 'Cape Verde': 'cv', 
      'Central African Republic': 'cf', 'Chad': 'td', 'Chile': 'cl', 'China': 'cn', 
      'Colombia': 'co', 'Comoros': 'km', 'Congo': 'cg', 'Costa Rica': 'cr', 
      'Croatia': 'hr', 'Cuba': 'cu', 'Cyprus': 'cy', 'Czech Republic': 'cz', 'Czechia': 'cz',
      // D
      'Denmark': 'dk', 'Djibouti': 'dj', 'Dominica': 'dm', 'Dominican Republic': 'do',
      // E
      'Ecuador': 'ec', 'Egypt': 'eg', 'El Salvador': 'sv', 'Equatorial Guinea': 'gq', 
      'Eritrea': 'er', 'Estonia': 'ee', 'Ethiopia': 'et',
      // F
      'Fiji': 'fj', 'Finland': 'fi', 'France': 'fr',
      // G
      'Gabon': 'ga', 'Gambia': 'gm', 'Georgia': 'ge', 'Germany': 'de', 'Ghana': 'gh', 
      'Greece': 'gr', 'Grenada': 'gd', 'Guatemala': 'gt', 'Guinea': 'gn', 
      'Guinea-Bissau': 'gw', 'Guyana': 'gy',
      // H
      'Haiti': 'ht', 'Honduras': 'hn', 'Hong Kong': 'hk', 'Hungary': 'hu',
      // I
      'Iceland': 'is', 'India': 'in', 'Indonesia': 'id', 'Iran': 'ir', 'Iraq': 'iq', 
      'Ireland': 'ie', 'Israel': 'il', 'Italy': 'it', 'Ivory Coast': 'ci', 'Côte d\'Ivoire': 'ci',
      // J
      'Jamaica': 'jm', 'Japan': 'jp', 'Jordan': 'jo',
      // K
      'Kazakhstan': 'kz', 'Kenya': 'ke', 'Kiribati': 'ki', 'Kuwait': 'kw', 
      'Kyrgyzstan': 'kg', 'North Korea': 'kp', 'South Korea': 'kr', 'Korea': 'kr',
      // L
      'Laos': 'la', 'Latvia': 'lv', 'Lebanon': 'lb', 'Lesotho': 'ls', 'Liberia': 'lr', 
      'Libya': 'ly', 'Liechtenstein': 'li', 'Lithuania': 'lt', 'Luxembourg': 'lu',
      // M
      'Macau': 'mo', 'Madagascar': 'mg', 'Malawi': 'mw', 'Malaysia': 'my', 'Maldives': 'mv', 
      'Mali': 'ml', 'Malta': 'mt', 'Marshall Islands': 'mh', 'Mauritania': 'mr', 
      'Mauritius': 'mu', 'Mexico': 'mx', 'Micronesia': 'fm', 'Moldova': 'md', 'Monaco': 'mc', 
      'Mongolia': 'mn', 'Montenegro': 'me', 'Morocco': 'ma', 'Mozambique': 'mz', 'Myanmar': 'mm',
      // N
      'Namibia': 'na', 'Nauru': 'nr', 'Nepal': 'np', 'Netherlands': 'nl', 'New Zealand': 'nz', 
      'Nicaragua': 'ni', 'Niger': 'ne', 'Nigeria': 'ng', 'North Macedonia': 'mk', 
      'Northern Ireland': 'gb-nit', 'Norway': 'no',
      // O
      'Oman': 'om',
      // P
      'Pakistan': 'pk', 'Palau': 'pw', 'Palestine': 'ps', 'Panama': 'pa', 
      'Papua New Guinea': 'pg', 'Paraguay': 'py', 'Peru': 'pe', 'Philippines': 'ph', 
      'Poland': 'pl', 'Portugal': 'pt', 'Puerto Rico': 'pr',
      // Q
      'Qatar': 'qa',
      // R
      'Republic of the Congo': 'cg', 'DR Congo': 'cd', 'Romania': 'ro', 'Russia': 'ru', 
      'Russian Federation': 'ru', 'Rwanda': 'rw',
      // S
      'Saint Lucia': 'lc', 'Saint Vincent and the Grenadines': 'vc', 'Samoa': 'ws', 
      'San Marino': 'sm', 'Sao Tome and Principe': 'st', 'Saudi Arabia': 'sa', 
      'Scotland': 'gb-sct', 'Senegal': 'sn', 'Serbia': 'rs', 'Seychelles': 'sc', 
      'Sierra Leone': 'sl', 'Singapore': 'sg', 'Slovakia': 'sk', 'Slovenia': 'si', 
      'Solomon Islands': 'sb', 'Somalia': 'so', 'South Africa': 'za', 'South Sudan': 'ss', 
      'Spain': 'es', 'Sri Lanka': 'lk', 'Sudan': 'sd', 'Suriname': 'sr', 'Sweden': 'se', 
      'Switzerland': 'ch', 'Syria': 'sy',
      // T
      'Taiwan': 'tw', 'Tajikistan': 'tj', 'Tanzania': 'tz', 'Thailand': 'th', 
      'Timor-Leste': 'tl', 'Togo': 'tg', 'Tonga': 'to', 'Trinidad and Tobago': 'tt', 
      'Tunisia': 'tn', 'Turkey': 'tr', 'Turkmenistan': 'tm', 'Tuvalu': 'tv',
      // U
      'Uganda': 'ug', 'Ukraine': 'ua', 'UAE': 'ae', 'United Arab Emirates': 'ae', 
      'UK': 'gb', 'United Kingdom': 'gb', 'US': 'us', 'USA': 'us', 'United States': 'us', 
      'Uruguay': 'uy', 'Uzbekistan': 'uz',
      // V
      'Vanuatu': 'vu', 'Vatican City': 'va', 'Venezuela': 've', 'Vietnam': 'vn',
      // W
      'Wales': 'gb-wls', 'Western Sahara': 'eh',
      // Y
      'Yemen': 'ye',
      // Z
      'Zambia': 'zm', 'Zimbabwe': 'zw',
    };
    
    // Try to find exact match
    if (countryToCode[countryName]) {
      return getCountryFlagUrl(countryToCode[countryName]);
    }
    
    // Try to find partial match
    for (const [key, code] of Object.entries(countryToCode)) {
      if (countryName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(countryName.toLowerCase())) {
        return getCountryFlagUrl(code);
      }
    }
    
    return '';
  }

  function updateItem(index: number, field: keyof DestinationInput, value: string) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      
      // Auto-generate flag path when country name is entered
      if (field === 'name' && value) {
        const flagPath = getFlagPath(value);
        next[index].flag = flagPath;
      }
      
      return next;
    });
  }

  function addItem() {
    setItems((prev) => [...prev, { name: '', flag: '', visaType: 'visa' }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  if (!token) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-black text-white">
        <p className="text-red-400">You must be logged in as admin to edit content.</p>
        <Link href="/admin/login" className="text-blue-400 underline">Go to Admin Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-white">Edit Popular Destinations</h1>
          <Link href="/admin/dashboard" className="text-blue-400 underline">Back to Dashboard</Link>
        </div>

        {loading && <p className="text-gray-400">Loading content...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && (
          <div className="space-y-6 bg-gray-900 p-8 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Destinations</label>
                <button onClick={addItem} className="px-3 py-1 text-sm bg-[#145EFF] text-white rounded hover:bg-[#145EFF]">Add Destination</button>
              </div>
              <div className="space-y-4 mt-3">
                {items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-800 border border-gray-700 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-300">Destination {idx + 1}</span>
                      <button onClick={() => removeItem(idx)} className="text-sm text-red-400 hover:text-red-300">Remove</button>
                    </div>
                    <input
                      type="text"
                      placeholder="Country Name (auto-generates flag path)"
                      value={item.name}
                      onChange={(e) => updateItem(idx, 'name', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <div className="mb-2">
                      <label className="block text-xs text-gray-400 mb-1">Select Country Flag</label>
                      <select
                        value={item.flag || ''}
                        onChange={(e) => {
                          if (e.target.value) {
                            updateItem(idx, 'flag', e.target.value);
                          }
                        }}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a country...</option>
                        {ALL_COUNTRIES.map((country) => (
                          <option key={country.code} value={getCountryFlagUrl(country.code)}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {item.flag && (
                        <div className="mt-2 flex items-center gap-3">
                          <img 
                            src={item.flag} 
                            alt="Flag preview"
                            className="w-16 h-10 object-contain border border-gray-600 rounded shadow-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Or enter custom flag URL"
                            value={item.flag}
                            onChange={(e) => updateItem(idx, 'flag', e.target.value)}
                            className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Visa type label"
                      value={item.visaType}
                      onChange={(e) => updateItem(idx, 'visaType', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-[#145EFF] text-white rounded disabled:opacity-50 hover:bg-[#145EFF]"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link href="/" className="text-gray-400 hover:text-white underline">View Homepage</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
