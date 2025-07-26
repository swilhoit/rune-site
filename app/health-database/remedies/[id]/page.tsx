'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStaticRemedy } from '@/hooks/useStaticData';

export default function RemedyPage() {
  const params = useParams();
  const router = useRouter();
  const { remedy, loading, error } = useStaticRemedy(params.id as string);

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
                className="h-8 w-auto cursor-pointer"
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
              <Link href="/health-database" className="text-gray-600 hover:text-gray-800 font-mono text-sm">
                ← Back to Health Database
              </Link>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-mono">Loading remedy information...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600 font-mono mb-4">{error}</p>
                <button
                  onClick={() => router.push('/health-database')}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all font-mono text-sm"
                >
                  Back to Health Database
                </button>
              </div>
            )}

            {remedy && !loading && !error && (
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl overflow-hidden animate-fadeInUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image Section */}
                  {remedy.imageUrl && (
                    <div className="relative h-[500px] lg:h-auto">
                      <Image
                        src={remedy.imageUrl}
                        alt={remedy.name}
                        width={800}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className={`p-12 ${!remedy.imageUrl ? 'lg:col-span-2' : ''}`}>
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-[56px] font-normal font-headline leading-[1.1] text-gray-900">
                          {remedy.name}
                        </h1>
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-mono uppercase">
                          Remedy
                        </span>
                      </div>
                      <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-400 mb-4"></div>
                      
                      {/* Alternate Names */}
                      {remedy.alternateNames && (
                        <p className="text-gray-500 font-mono text-sm">
                          Also known as: <span className="text-gray-700">{remedy.alternateNames}</span>
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    {remedy.description && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-normal font-headline mb-4 text-gray-900">About This Remedy</h2>
                        <p className="text-gray-600 font-mono leading-relaxed">
                          {remedy.description}
                        </p>
                      </div>
                    )}

                    {/* Additional Details */}
                    {remedy.details && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-normal font-headline mb-4 text-gray-900">Health Benefits</h2>
                        <div className="bg-green-50 rounded-xl p-6">
                          <p className="text-gray-600 font-mono leading-relaxed">
                            {remedy.details}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Key Information Box */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                      <h3 className="text-lg font-mono text-gray-700 mb-4">Important Information</h3>
                      <ul className="space-y-2 text-sm font-mono text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>Always consult with a healthcare provider before starting any new remedy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>Natural remedies can interact with medications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>Individual results may vary</span>
                        </li>
                      </ul>
                    </div>

                    {/* Call to Action */}
                    <div className="flex gap-4">
                      <Link
                        href="/health-database?tab=remedies"
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all font-mono text-sm uppercase"
                      >
                        Explore More Remedies
                      </Link>
                      <Link
                        href="/health-database?tab=symptoms"
                        className="px-6 py-3 border border-gray-600 text-gray-700 hover:border-gray-400 hover:text-gray-900 rounded-md transition-all font-mono text-sm uppercase"
                      >
                        Browse Symptoms
                      </Link>
                    </div>
                  </div>
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