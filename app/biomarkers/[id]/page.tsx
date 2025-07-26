'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStaticBiomarker } from '@/hooks/useStaticData';

export default function BiomarkerPage() {
  const params = useParams();
  const router = useRouter();
  const { biomarker, loading, error } = useStaticBiomarker(params.id as string);

  // Function to provide additional context based on category
  const getCategoryInfo = (category: string | undefined) => {
    const categoryInfo: { [key: string]: { description: string; icon: string } } = {
      'Hematology': {
        description: 'Blood-related tests that help evaluate overall health and detect a wide range of disorders.',
        icon: '🩸'
      },
      'Metabolic Panel': {
        description: 'Tests that measure different chemicals in the blood to evaluate organ function.',
        icon: '⚡'
      },
      'Lipid Panel': {
        description: 'Tests that measure cholesterol and triglycerides to assess cardiovascular health.',
        icon: '❤️'
      },
      'Liver Function': {
        description: 'Tests that evaluate how well your liver is working.',
        icon: '🫘'
      },
      'Kidney Function': {
        description: 'Tests that assess how well your kidneys are filtering waste from your blood.',
        icon: '💧'
      },
      'Endocrine / Metabolic': {
        description: 'Tests related to hormone levels and metabolic processes.',
        icon: '🔬'
      },
      'Cardiac Biomarkers': {
        description: 'Tests that help diagnose heart conditions and assess heart health.',
        icon: '💓'
      },
      'Inflammatory Markers': {
        description: 'Tests that measure inflammation levels in the body.',
        icon: '🔥'
      },
      'Vitamins / Nutritional': {
        description: 'Tests that measure vitamin and nutrient levels.',
        icon: '💊'
      },
      'Cancer / Tumor Markers': {
        description: 'Tests that may indicate the presence of certain types of cancer.',
        icon: '🎗️'
      }
    };

    return categoryInfo[category || ''] || {
      description: 'Clinical tests that provide valuable health insights.',
      icon: '🔬'
    };
  };

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
              <Link href="/health-database" className="text-white hover:text-gray-300 hover:underline transition-all font-mono text-sm">Health Database</Link>
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
            {/* Breadcrumb */}
            <div className="mb-8 animate-fadeIn">
              <Link href="/biomarkers" className="text-gray-600 hover:text-gray-800 font-mono text-sm">
                ← Back to Biomarkers Database
              </Link>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-mono">Loading biomarker information...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600 font-mono mb-4">{error}</p>
                <button
                  onClick={() => router.push('/biomarkers')}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all font-mono text-sm"
                >
                  Back to Biomarkers Database
                </button>
              </div>
            )}

            {biomarker && !loading && !error && (
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-12 animate-fadeInUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-[48px] font-normal font-headline leading-[1.1] text-gray-900 mb-4">
                        {biomarker.name}
                      </h1>
                      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-400 mb-4"></div>
                    </div>
                    {biomarker.category && (
                      <div className="text-center">
                        <div className="text-4xl mb-2">{getCategoryInfo(biomarker.category).icon}</div>
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-mono uppercase">
                          {biomarker.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Clinical Use */}
                <div className="mb-10">
                  <h2 className="text-2xl font-normal font-headline mb-4 text-gray-900">Clinical Use</h2>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <p className="text-gray-700 font-mono leading-relaxed">
                      {biomarker.use || 'This biomarker is used for clinical diagnostics and health monitoring.'}
                    </p>
                  </div>
                </div>

                {/* Category Information */}
                {biomarker.category && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-normal font-headline mb-4 text-gray-900">About {biomarker.category} Tests</h2>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 font-mono leading-relaxed">
                        {getCategoryInfo(biomarker.category).description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Key Information */}
                <div className="mb-10">
                  <h2 className="text-2xl font-normal font-headline mb-4 text-gray-900">Key Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-mono text-gray-700 mb-2">Test Type</h3>
                      <p className="text-gray-600 font-mono">
                        {biomarker.type || 'Clinical Biomarker'}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6">
                      <h3 className="text-lg font-mono text-gray-700 mb-2">Sample Required</h3>
                      <p className="text-gray-600 font-mono">
                        Blood sample (typically)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-orange-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-mono text-gray-700 mb-4">Important Notes</h3>
                  <ul className="space-y-2 text-sm font-mono text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>Results should always be interpreted by a healthcare professional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>Reference ranges may vary by laboratory and individual factors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>This biomarker is often tested as part of a comprehensive panel</span>
                    </li>
                  </ul>
                </div>

                {/* Call to Action */}
                <div className="flex gap-4">
                  <Link
                    href="/biomarkers"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all font-mono text-sm uppercase"
                  >
                    Explore More Biomarkers
                  </Link>
                  <button
                    className="px-6 py-3 border border-gray-600 text-gray-700 hover:border-gray-400 hover:text-gray-900 rounded-md transition-all font-mono text-sm uppercase"
                  >
                    Download Info Sheet
                  </button>
                </div>
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