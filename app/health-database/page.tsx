'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Symptom, Remedy } from '@/lib/bigquery';
import { useStaticSymptoms, useStaticRemedies } from '@/hooks/useStaticData';

export default function HealthDatabase() {
  const searchParams = useSearchParams();
  const { symptoms, loading: symptomsLoading, error: symptomsError } = useStaticSymptoms();
  const { remedies, loading: remediesLoading, error: remediesError } = useStaticRemedies();
  const [selectedTab, setSelectedTab] = useState<'symptoms' | 'remedies'>('symptoms');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  
  const loading = symptomsLoading || remediesLoading;
  const error = symptomsError || remediesError;

  useEffect(() => {
    // Check URL params for tab selection
    const tabParam = searchParams.get('tab');
    if (tabParam === 'remedies') {
      setSelectedTab('remedies');
    }
  }, [searchParams]);

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symptom.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRemedies = remedies.filter(remedy =>
    remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    remedy.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen relative bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

      {/* Beta Warning Banner */}
      <div className="relative z-10 bg-[#725556] text-center py-3 px-6 animate-fadeIn">
        <p className="text-sm text-white font-mono">
          This is a beta version using AI. Use as a guide only and consult a medical professional for accurate advice.
        </p>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-16 py-10 animate-fadeIn animation-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="flex items-center gap-16">
          <Link href="/">
            <Image
              src="/rune-logo-white 1.png"
              alt="Rune"
              width={120}
              height={35}
              className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            <a href="#" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">How it Works</a>
            <a href="#" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">FAQ</a>
            <Link href="/health-database" className="text-orange-500 hover:text-orange-400 hover:underline transition-all font-mono text-sm">Health Database</Link>
            <Link href="/biomarkers" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">Biomarkers</Link>
            <Link href="/blog" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">Blog</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-8 py-3 text-white border border-gray-600 rounded-md hover:border-gray-400 hover:text-gray-300 transition-all font-mono text-sm uppercase">
            LOG IN
          </button>
          <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all font-mono text-sm uppercase">
            SIGN UP
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-16 py-12 pb-20">
        <h1 className="text-[72px] font-normal text-white mb-6 font-headline leading-[0.9] animate-fadeInUp opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          Health Database
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-400 mb-8 animate-scaleIn opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}></div>
        <p className="text-xl text-gray-300 font-mono max-w-2xl animate-fadeInUp opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          Explore our comprehensive database of symptoms and natural remedies. 
          Find evidence-based information to support your health journey.
        </p>
      </div>

      {/* Main Content */}
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/light-background.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-16">
        {/* Search and Tabs */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 mb-8 animate-fadeInUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search symptoms or remedies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab('symptoms')}
                className={`px-8 py-3 rounded-md font-mono text-sm transition-all uppercase ${
                  selectedTab === 'symptoms'
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'border border-gray-600 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                Symptoms
              </button>
              <button
                onClick={() => setSelectedTab('remedies')}
                className={`px-8 py-3 rounded-md font-mono text-sm transition-all uppercase ${
                  selectedTab === 'remedies'
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'border border-gray-600 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                Remedies
              </button>
            </div>
          </div>

          {/* Results Count and View Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-mono text-sm">
              Showing <span className="font-semibold text-gray-900">{selectedTab === 'symptoms' ? filteredSymptoms.length : filteredRemedies.length}</span> results
            </p>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-mono text-sm mr-2">View:</span>
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'card'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Card View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'table'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Table View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-mono">Loading health data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-mono">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all font-mono text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content - Card View */}
        {!loading && !error && viewMode === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedTab === 'symptoms' && filteredSymptoms.map((symptom, index) => (
              <Link
                key={symptom.id}
                href={`/health-database/symptoms/${encodeURIComponent(symptom.id)}`}
                className="block"
              >
                <div
                  className="bg-white/95 backdrop-blur rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-200 hover:border-orange-200 animate-fadeInUp opacity-0 cursor-pointer h-full"
                  style={{ animationDelay: `${(index % 6) * 100 + 400}ms`, animationFillMode: 'forwards' }}
                >
                  <h3 className="text-2xl font-normal mb-3 font-headline text-gray-900">
                    {symptom.name}
                  </h3>
                  {symptom.category && (
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-mono mb-3 uppercase">
                      {symptom.category}
                    </span>
                  )}
                  <p className="text-gray-600 font-mono text-sm line-clamp-3">
                    {symptom.description || 'No description available'}
                  </p>
                  <p className="mt-4 text-orange-500 hover:text-orange-600 font-mono text-sm hover:underline transition-all">
                    View Details →
                  </p>
                </div>
              </Link>
            ))}

            {selectedTab === 'remedies' && filteredRemedies.map((remedy, index) => (
              <Link
                key={remedy.id}
                href={`/health-database/remedies/${encodeURIComponent(remedy.id)}`}
                className="block"
              >
                <div
                  className="bg-white/95 backdrop-blur rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-200 hover:border-green-200 animate-fadeInUp opacity-0 cursor-pointer h-full flex flex-col"
                  style={{ animationDelay: `${(index % 6) * 100 + 400}ms`, animationFillMode: 'forwards' }}
                >
                  <h3 className="text-2xl font-normal mb-3 font-headline text-gray-900">
                    {remedy.name}
                  </h3>
                  {remedy.imageUrl && (
                    <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={remedy.imageUrl} 
                        alt={remedy.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  {remedy.alternateNames && (
                    <p className="text-sm text-gray-500 font-mono mb-2">
                      Also known as: {remedy.alternateNames}
                    </p>
                  )}
                  <p className="text-gray-600 font-mono text-sm line-clamp-3 flex-grow">
                    {remedy.description || 'No description available'}
                  </p>
                  <p className="mt-4 text-green-600 hover:text-green-700 font-mono text-sm hover:underline transition-all">
                    View Details →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Content - Table View */}
        {!loading && !error && viewMode === 'table' && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl overflow-hidden animate-fadeInUp opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {selectedTab === 'symptoms' ? (
                      <>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Action</th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Also Known As</th>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-mono text-gray-700 uppercase tracking-wider">Action</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedTab === 'symptoms' && filteredSymptoms.map((symptom, index) => (
                    <tr key={symptom.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/health-database/symptoms/${encodeURIComponent(symptom.id)}`} className="text-gray-900 font-headline text-lg hover:text-orange-600 transition-colors">
                          {symptom.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        {symptom.category && (
                          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-mono uppercase">
                            {symptom.category}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600 font-mono text-sm line-clamp-2 max-w-md">
                          {symptom.description || 'No description available'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/health-database/symptoms/${encodeURIComponent(symptom.id)}`} className="text-orange-500 hover:text-orange-600 font-mono text-sm hover:underline">
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                  
                  {selectedTab === 'remedies' && filteredRemedies.map((remedy, index) => (
                    <tr key={remedy.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {remedy.imageUrl && (
                          <div className="w-16 h-16 overflow-hidden rounded-lg">
                            <img 
                              src={remedy.imageUrl} 
                              alt={remedy.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/health-database/remedies/${encodeURIComponent(remedy.id)}`} className="text-gray-900 font-headline text-lg hover:text-green-600 transition-colors">
                          {remedy.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-500 font-mono text-sm">
                          {remedy.alternateNames || '-'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600 font-mono text-sm line-clamp-2 max-w-md">
                          {remedy.description || 'No description available'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/health-database/remedies/${encodeURIComponent(remedy.id)}`} className="text-green-600 hover:text-green-700 font-mono text-sm hover:underline">
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && selectedTab === 'symptoms' && filteredSymptoms.length === 0 && (
          <div className="text-center py-12 bg-white/90 backdrop-blur rounded-xl">
            <p className="text-gray-600 font-mono text-lg">No symptoms found matching "{searchTerm}"</p>
          </div>
        )}

        {!loading && !error && selectedTab === 'remedies' && filteredRemedies.length === 0 && (
          <div className="text-center py-12 bg-white/90 backdrop-blur rounded-xl">
            <p className="text-gray-600 font-mono text-lg">No remedies found matching "{searchTerm}"</p>
          </div>
        )}
        </div>
      </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#323232] text-white py-16">
        <div className="container mx-auto px-16">
          <div className="flex flex-col items-center mb-12">
            <Image
              src="/big-logo.png"
              alt="Rune"
              width={400}
              height={150}
              className="h-32 w-auto mb-8"
            />
            <div className="flex gap-12 mb-8">
              <a href="#" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">How it Works</a>
              <a href="#" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">FAQ</a>
              <Link href="/health-database" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">Health Database</Link>
              <Link href="/biomarkers" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">Biomarkers</Link>
              <Link href="/blog" className="text-gray-400 hover:text-white hover:underline transition-all font-mono text-sm">Blog</Link>
            </div>
            <div className="flex gap-4 mb-8">
              <button className="px-8 py-3 text-white border border-gray-600 rounded-md hover:border-gray-400 hover:bg-white/10 transition-all font-mono text-sm uppercase">
                LOG IN
              </button>
              <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all font-mono text-sm uppercase">
                SIGN UP
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm font-mono mb-2">
              © 2024 Rune. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs font-mono">
              This is a beta version using AI. Use as a guide only and consult a medical professional for accurate advice.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}