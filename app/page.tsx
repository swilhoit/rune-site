'use client';

import Image from 'next/image';
import Link from 'next/link';
import Lottie from 'lottie-react';
import animationData from '../public/Scene-11.json';

export default function Home() {
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

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-16 py-6 flex items-center justify-between gap-16">
        <div className="flex-1 max-w-lg pl-16">
          <h1 className="text-[72px] font-normal text-white mb-6 font-headline leading-[0.9] animate-fadeInUp opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            Chat With Your<br />
            Biomarkers.
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-400 mb-8 animate-scaleIn opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}></div>
          
          <div className="flex items-center gap-4 animate-fadeInUp opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <button className="px-8 py-3 border border-gray-600 text-white rounded-md hover:border-gray-400 hover:text-gray-300 transition-all font-mono text-sm uppercase">
              LEARN MORE
            </button>
            <button className="px-8 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all font-mono text-sm uppercase">
              SIGN UP
            </button>
          </div>
        </div>
        
        {/* Lottie Chat Interface */}
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-scaleIn opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: 1000, height: 1000 }}
            />
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
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
          <div className="text-center mb-16">
            <h2 className="text-[56px] font-normal text-gray-900 mb-4 font-headline leading-[1.1] animate-fadeInUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              Turn Your Labs Into<br />
              Interactive Dashboards
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-400 mx-auto animate-scaleIn opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}></div>
          </div>
          
          <div className="flex justify-center mb-20">
            <div className="relative max-w-4xl animate-fadeInUp opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              <Image
                src="/dashboard.png"
                alt="Rune Dashboard"
                width={900}
                height={600}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
          
        </div>
        
        {/* Photo Carousel - Animated Loop */}
        <div className="relative overflow-hidden py-12 -mx-16">
          <div className="animate-scroll flex gap-8">
            {/* First set of photos */}
            <Image src="/stock-photos/Frame 40.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 41.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 42.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 43.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 40.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 41.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 42.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 43.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            {/* Duplicate set for seamless loop */}
            <Image src="/stock-photos/Frame 40.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 41.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 42.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 43.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 40.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 41.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 42.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
            <Image src="/stock-photos/Frame 43.png" alt="User" width={220} height={180} className="rounded-xl flex-shrink-0 object-cover" />
          </div>
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