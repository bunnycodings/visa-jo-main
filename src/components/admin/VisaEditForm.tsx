'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VisaType } from '../../types/models/VisaApplication'
import { VISA_TYPES } from '../../lib/constants'

interface VisaEditFormProps {
  visaData?: VisaType;
  isEditing?: boolean;
}

const VisaEditForm = ({ visaData, isEditing = false }: VisaEditFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<VisaType>({
    name: '',
    country: '',
    category: 'travel',
    requirements: [''],
    processingTime: '',
    validity: '',
    fees: {
      government: 0,
      total: 0
    },
    isActive: true,
    embassyInfo: null,
    embassyAppointment: null,
    mainRequirements: null,
    visaTypes: null,
    heroImage: null
  });
  const [heroImageUrl, setHeroImageUrl] = useState<string>('');

  useEffect(() => {
    if (visaData && isEditing) {
      setFormData(visaData);
      if (visaData.heroImage) {
        setHeroImageUrl(visaData.heroImage);
      }
    }
  }, [visaData, isEditing]);

  const handleHeroImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setHeroImageUrl(url);
    setFormData(prev => ({
      ...prev,
      heroImage: url || null
    }));
  };

  const clearHeroImage = () => {
    setHeroImageUrl('');
    setFormData(prev => ({
      ...prev,
      heroImage: null
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    // Avoid spreading union types; only handle top-level fields here.
    // Nested numeric fields like `fees.*` are handled by handleNumberChange.
    if (name.includes('.')) {
      return;
    }
  
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = Number(value);
  
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'fees') {
        setFormData(prev => ({
          ...prev,
          fees: {
            ...prev.fees,
            [child as keyof typeof prev.fees]: isNaN(num) ? 0 : num
          }
        }));
      }
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(num) ? 0 : num
    }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: updatedRequirements
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const removeRequirement = (index: number) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements.splice(index, 1);
    setFormData({
      ...formData,
      requirements: updatedRequirements
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Calculate total fees (only visa fee now, no service fee)
      const totalFees = formData.fees.government;
      const updatedFormData = {
        ...formData,
        fees: {
          ...formData.fees,
          total: totalFees
        }
      };

      const url = isEditing 
        ? `/api/admin/visas/${encodeURIComponent(visaData?.name || '')}` 
        : '/api/admin/visas';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedFormData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(isEditing ? 'Visa updated successfully!' : 'Visa created successfully!');
        setTimeout(() => {
          router.push('/admin/dashboard/visas');
        }, 2000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to save visa data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
        {isEditing ? 'Edit Visa Information' : 'Add New Visa'}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-800 rounded-md flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M11,17V15H13V17H11M13,13H11V7H13V13Z" />
          </svg>
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-600 text-green-800 rounded-md flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
          </svg>
          <span className="font-semibold">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Visa Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Select Country</option>
              {[...VISA_TYPES.TRAVEL, ...VISA_TYPES.SCHENGEN].map((visa) => (
                <option key={visa.code} value={visa.code}>
                  {visa.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="travel">Travel</option>
              <option value="schengen">Schengen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Processing Time *
            </label>
            <input
              type="text"
              name="processingTime"
              value={formData.processingTime}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g. 3-5 business days"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Validity *
            </label>
            <input
              type="text"
              name="validity"
              value={formData.validity}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g. 6 months"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Brief overview of this visa"
              rows={4}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Hero Image URL
            </label>
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="url"
                  name="heroImage"
                  value={heroImageUrl}
                  onChange={handleHeroImageUrlChange}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="https://example.com/image.jpg or /api/images/img_xxx"
                />
                {heroImageUrl && (
                  <button
                    type="button"
                    onClick={clearHeroImage}
                    className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                    aria-label="Clear image URL"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {heroImageUrl && (
                <div className="relative w-full max-w-md border-2 border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={heroImageUrl}
                    alt="Hero preview"
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      setError('Failed to load image. Please check the URL.');
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Preview
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                Enter the URL of the hero image that will be displayed behind the visa title. Can be a full URL (https://...) or an image API endpoint (/api/images/...).
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Additional details, tips, or warnings"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Status
            </label>
            <select
              name="isActive"
              value={formData.isActive.toString()}
              onChange={(e) => setFormData({
                ...formData,
                isActive: e.target.value === 'true'
              })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
            </svg>
            Visa Fees
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Visa Fee (JOD) *
              </label>
              <input
                type="number"
                name="fees.government"
                value={formData.fees.government}
                onChange={handleNumberChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                min="0"
                step="0.01"
                required
              />
              <p className="text-sm text-gray-600 mt-2">Official visa processing fee</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Total Fee (JOD)
              </label>
              <input
                type="number"
                name="fees.total"
                value={formData.fees.government}
                className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg text-gray-900 bg-gray-100 font-semibold"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mb-8 bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
            </svg>
            Embassy Information
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Embassy Information (e.g., "The German Embassy in Jordan")
              </label>
              <textarea
                name="embassyInfo"
                value={formData.embassyInfo || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter embassy information..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Embassy Appointment Information (e.g., "German Embassy Appointment in Jordan")
              </label>
              <textarea
                name="embassyAppointment"
                value={formData.embassyAppointment || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter embassy appointment information..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Main Requirements and Conditions
              </label>
              <textarea
                name="mainRequirements"
                value={formData.mainRequirements || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter main requirements and conditions..."
                rows={6}
              />
            </div>
          </div>
        </div>

        <div className="mb-8 bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
              </svg>
              Types of Visa
            </h3>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  visaTypes: [...(formData.visaTypes || []), '']
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF] transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Visa Type
            </button>
          </div>

          {formData.visaTypes && formData.visaTypes.length > 0 ? (
            formData.visaTypes.map((type, index) => (
              <div key={index} className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={type}
                  onChange={(e) => {
                    const updatedTypes = [...(formData.visaTypes || [])];
                    updatedTypes[index] = e.target.value;
                    setFormData({
                      ...formData,
                      visaTypes: updatedTypes
                    });
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter visa type"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedTypes = [...(formData.visaTypes || [])];
                    updatedTypes.splice(index, 1);
                    setFormData({
                      ...formData,
                      visaTypes: updatedTypes.length > 0 ? updatedTypes : null
                    });
                  }}
                  className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">No visa types added yet. Click "Add Visa Type" to add one.</p>
          )}
        </div>

        <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9,10A1,1 0 0,0 8,11V18H10V11A1,1 0 0,0 9,10M12,5A1,1 0 0,0 11,6V18H13V6A1,1 0 0,0 12,5M15,15A1,1 0 0,0 14,16V18H16V16A1,1 0 0,0 15,15Z" />
              </svg>
              Requirements
            </h3>
            <button
              type="button"
              onClick={addRequirement}
              className="flex items-center gap-2 px-4 py-2 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF] transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Requirement
            </button>
          </div>

          {formData.requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-3 mb-4">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter requirement"
                required
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Visa' : 'Create Visa'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisaEditForm;
