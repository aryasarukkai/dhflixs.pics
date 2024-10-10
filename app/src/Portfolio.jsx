import React, { lazy, Suspense, useState } from 'react'
import { Menu, X } from 'lucide-react'

const LazyImage = lazy(() => import('./LazyImage'))

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openScheduling = () => setIsSchedulingOpen(true);
  const closeScheduling = () => setIsSchedulingOpen(false);

  return (
    <div className="font-['Libre_Baskerville'] text-white bg-black min-h-screen">
      {/* header */}
      <header className="fixed top-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-50">
        <div className="text-lg ml-4 md:ml-16">dh.flixs</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className={`md:flex items-center space-x-4 mr-4 md:mr-16 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-black p-4' : 'hidden md:flex'}`}>
          <a href="https://instagram.com/dh.flixs/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors py-2 md:py-0">
            Instagram
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors py-2 md:py-0">Photo Library</a>
          <a href="#about" className="hover:text-gray-300 transition-colors py-2 md:py-0">About Me</a>
          <a href="#pricing" className="hover:text-gray-300 transition-colors py-2 md:py-0">Pricing</a>
          <button onClick={openScheduling} className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors mt-2 md:mt-0">Schedule Now</button>
        </nav>
      </header>

      <main className="pt-16">
        {/* hero section */}
        <section className="relative min-h-screen flex flex-col items-center">
          <div className="container mx-auto px-4 flex flex-col justify-between items-center relative z-20 h-full">
            <div className="text-white w-full flex flex-col items-center mb-8 mt-8">
              <div className="max-w-md w-full text-center">
                <h1 className="text-5xl mb-8 animate-fade-in-down font-bold">dh.flixs</h1>
                <div className="w-70 h-0.5 bg-white mb-8"></div>
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl mt-2 mb-4 animate-fade-in-down">David Huan</h1>
                  <div className="text-right">
                    <h2 className="text-2xl mt-1 mb-1 animate-fade-in-down font-bold">photographer videographer</h2>
                    <p className="text-2l mt-3 animate-fade-in-down">capturing moments, creating memories</p>
                  </div>
                </div>
                <button onClick={openScheduling} className="inline-block mt-4 bg-white text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors">
                  Schedule Now
                </button>
              </div>
            </div>
            <div className="w-full animate-fade-in flex justify-center">
              <Suspense fallback={<div>Loading...</div>}>
                <LazyImage src="/header.png" alt="Header image" className="w-full max-w-md md:max-w-full h-auto" />
              </Suspense>
            </div>
            <div className="max-w w-full text-center">
              <br />
              <h2 className="text-4xl md:text-6xl mt-5 mb-4 animate-fade-in-up">Helping <u>record your story</u>.</h2>
              <br />
              <br />
            </div>
          </div>
        </section>

        {/* gallery section */}
        <section className="py-16">
          <h2 className="text-4xl text-center mb-6 animate-fade-in">Some of my work</h2>
          <p className="text-center mb-6 md:hidden">Tap each image to view full photo library!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 ml-4 mr-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Suspense key={num} fallback={<div>Loading...</div>}>
                <div className="relative overflow-hidden group">
                  <LazyImage
                    src={`/collage-image-${num}.png`}
                    alt={`Collage image ${num}`}
                    className="w-full h-64 object-cover"
                    isGalleryItem={true}
                    eventName={`9/${num}/2024 football game saratoga high`}
                  />
                </div>
              </Suspense>
            ))}
          </div>
        </section>

        {/* about me section */}
        <section id="about" className="py-16 px-4">
          <h2 className="text-4xl text-center mb-8 animate-fade-in">About Me</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="mb-4">
              Hi, I'm David Huan, a passionate photographer and videographer based in [Your Location]. 
              I specialize in capturing life's most precious moments, from weddings to sports events and everything in between.
            </p>
            <p>
              With a keen eye for detail and a love for storytelling through visuals, 
              I strive to create memories that will last a lifetime. Let's work together to capture your story!
            </p>
          </div>
        </section>

        <section id="pricing" className="py-16 px-4">
          <h2 className="text-4xl text-center mb-8 animate-fade-in">Pricing</h2>
          <div className="max-w-4xl mx-auto">
            <iframe 
              src="https://dhflixs.setmore.com" 
              title="Pricing and Scheduling"
              className="w-full h-[1200px] border-none"
            />
          </div>
        </section>

        {/* cta section */}
        <section className="py-16 px-4">
          <h2 className="text-4xl text-center mb-8 animate-fade-in">Capturing Moments, Creating Memories</h2>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
            <a
              href="https://instagram.com/dh.flixs/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors animate-fade-in-up text-center"
            >
              Instagram
            </a>
            <a
              href="#"
              className="bg-white text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors animate-fade-in-up animation-delay-300 text-center"
            >
              View All Shots
            </a>
          </div>
        </section>
        {/* footer */}
        <footer className="bg-black text-white text-center p-4">
          <p className="mt-10 mb-6">&copy; 2024 dhflixs.pics All rights reserved. | Website developed by Arya Sarukkai with React, Tailwind, and ❤️</p>
        </footer>
      </main>

      {/* Scheduling popup */}
      {isSchedulingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-4 rounded-lg max-w-3xl w-full h-3/4">
            <button onClick={closeScheduling} className="float-right text-white">&times; Close</button>
            <iframe 
              src="https://dhflixs.setmore.com" 
              title="Schedule Appointment"
              className="w-full h-full border-none mt-4"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio