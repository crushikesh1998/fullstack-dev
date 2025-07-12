// HeroSection.tsx

import Image from 'next/image';
 import bgImage from '../public/art-img.jpg'; // Place your background image in /public

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-black overflow-hidden">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Background"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10  " />

      {/* Content */}
      <div className="relative z-20 px-4 md:px-12 lg:px-24 py-6 flex flex-col min-h-screen">

    
</div>
    </div>
  );
}
