import { getVisasByCountry } from '@/lib/utils/db-helpers';
import { VisaType } from '@/types/models/VisaApplication';
import { autoInitializeDatabase } from '@/lib/utils/auto-init';

interface VisaDetailsProps {
  country: string;
  title?: string;
}

// Server component: renders visas from MySQL
export default async function VisaDetails({ country, title }: VisaDetailsProps) {
  let visas: VisaType[] = [];

  try {
    await autoInitializeDatabase();
    visas = await getVisasByCountry(country);
  } catch (error) {
    // During build time or when DB is unavailable, gracefully handle the error
    console.warn('Database connection unavailable during build:', error);
    // Return empty array so page still renders with "no visas" message
  }

  if (!visas.length) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{title || 'Visa Information'}</h1>
        <p className="text-gray-600">No active visas found for this country.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{title || 'Visa Information'}</h1>
              <p className="text-blue-100 text-lg">Complete visa services with expert guidance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {visas.map((visa) => (
          <div key={visa.name} className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-all">
            <div className="mb-6 flex items-start gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{visa.name}</h2>
                {visa.description && (
                  <p className="text-gray-600 mt-2 text-lg">{visa.description}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H14V10H12V11H15A1,1 0 0,1 16,12V15A1,1 0 0,1 15,16H11V17Z" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Processing Time</div>
                </div>
                <div className="text-xl font-bold text-gray-900">{visa.processingTime}</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-600 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Validity</div>
                </div>
                <div className="text-xl font-bold text-gray-900">{visa.validity}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Total Fee</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 whitespace-nowrap">{`JOD ${visa.fees.total.toFixed(2)}`}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Consultation Fee</div>
                <div className="text-lg font-semibold text-gray-900 whitespace-nowrap">{`JOD ${visa.fees.consultation.toFixed(2)}`}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Government Fee</div>
                <div className="text-lg font-semibold text-gray-900 whitespace-nowrap">{`JOD ${visa.fees.government.toFixed(2)}`}</div>
              </div>
            </div>

            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9,10A1,1 0 0,0 8,11V18H10V11A1,1 0 0,0 9,10M12,5A1,1 0 0,0 11,6V18H13V6A1,1 0 0,0 12,5M15,15A1,1 0 0,0 14,16V18H16V16A1,1 0 0,0 15,15Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Requirements</h3>
              </div>
              <ul className="space-y-3">
                {visa.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
                    </svg>
                    <span className="text-gray-700 text-lg">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {visa.notes && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 text-amber-900 p-5 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                  <div>
                    <strong className="text-amber-800 font-semibold">Important Notes:</strong>
                    <p className="text-amber-900 mt-1">{visa.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}