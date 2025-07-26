'use client';

import Image from 'next/image';
import Lottie from 'lottie-react';
import animationData from '../public/Scene-11.json';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
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
      <div className="relative z-10 bg-[#725556] text-center py-3 px-6">
        <p className="text-sm text-white font-mono">
          This is a beta version using AI. Use as a guide only and consult a medical professional for accurate advice.
        </p>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-16 py-10">
        <div className="flex items-center gap-16">
          <Image
            src="/rune-logo-white 1.png"
            alt="Rune"
            width={120}
            height={35}
            className="h-8 w-auto"
          />
          <div className="hidden lg:flex items-center gap-10">
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-mono text-sm">How it Works</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-mono text-sm">FAQ</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-mono text-sm">Health Database</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-mono text-sm">About Us</a>
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
      <div className="relative z-10 container mx-auto px-16 py-20 flex items-center justify-between gap-16">
        <div className="flex-1 max-w-lg pl-16">
          <h1 className="text-[72px] font-normal text-white mb-6 font-headline leading-[0.9]">
            Chat With Your<br />
            Biomarkers.
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-400 mb-8"></div>
          
          <div className="flex items-center gap-4">
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
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 800, height: 800 }}
          />
        </div>
      </div>

      {/* Dashboard Section */}
      <section className="relative bg-gray-100 py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/light-background.png"
            alt="Background"
            fill
            className="object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-16">
          <div className="text-center mb-16">
            <h2 className="text-[56px] font-normal text-gray-900 mb-4 font-headline leading-[1.1]">
              Turn Your Labs Into<br />
              Interactive Dashboards
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-400 mx-auto"></div>
          </div>
          
          <div className="relative">
            <Image
              src="/dashboard.png"
              alt="Rune Dashboard"
              width={1200}
              height={800}
              className="w-full rounded-2xl shadow-2xl"
              priority
            />
            
            {/* Floating user avatars */}
            <div className="absolute -right-8 top-1/4 transform translate-x-full">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Image
                    src="/stock-photos/Frame 40.png"
                    alt="User"
                    width={60}
                    height={60}
                    className="rounded-full shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="relative">
                  <Image
                    src="/stock-photos/Frame 41.png"
                    alt="User"
                    width={60}
                    height={60}
                    className="rounded-full shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-8 bottom-1/4 transform -translate-x-full">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Image
                    src="/stock-photos/Frame 42.png"
                    alt="User"
                    width={60}
                    height={60}
                    className="rounded-full shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="relative">
                  <Image
                    src="/stock-photos/Frame 43.png"
                    alt="User"
                    width={60}
                    height={60}
                    className="rounded-full shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}