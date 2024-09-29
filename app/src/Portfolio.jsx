import React, { lazy, Suspense } from 'react';

const LazyImage = lazy(() => import('./LazyImage'));

const Portfolio = () => {
  return (
    <div className="font-['Libre_Baskerville'] text-white bg-black min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-50">
        <div className="text-lg ml-8 md:ml-16">dh.flixs</div>
        <div className="flex items-center space-x-4 mr-8 md:mr-16">
          <a href="https://instagram.com/dh.flixs/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            insta
          </a>
          <div className="h-4 w-px bg-white"></div>
          <a href="#" className="hover:text-gray-300 transition-colors">photo library</a>
        </div>
      </header>

      <main className="pt-16">
        <section className="relative min-h-screen flex flex-col items-center">
          <div className="container mx-auto px-4 flex flex-col justify-between items-center relative z-20 h-full">
            <div className="text-white w-full flex flex-col items-center mb-8 mt-8">
              <div className="max-w-md w-full text-center">
                <h1 className="text-5xl mb-8 animate-fade-in-down font-bold">dh.flixs</h1>
                <div className="w-70 h-0.5 bg-white mb-8"></div>
                <h1 className="text-4xl mt-2 mb-4 animate-fade-in-down">david huan</h1>
                <h2 className="text-2xl mt-1 mb-1 animate-fade-in-down font-bold">photographer, videographer</h2>
                <p className="text-2l mt-3 animate-fade-in-down ">capturing moments, creating memories</p>
              </div>
            </div>
            <div className="w-full animate-fade-in flex justify-center">
              <Suspense fallback={<div>Loading...</div>}>
                <LazyImage src="/header.png" alt="Header image" className="w-full max-w-md md:max-w-full h-auto" />
              </Suspense>
            </div>
            <div className="max-w w-full text-center">
            <br />
                <h2 className="text-4xl md:text-6xl mt-5 mb-4 animate-fade-in-up">Helping <u>record your story</u></h2>
                <br />
                <br />
              </div>
              
          </div>
          
          <Suspense fallback={<div>Loading...</div>}>
            <LazyImage src="/image1.png" alt="Landscape" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          </Suspense>
        </section>

        <section className="py-16">
          <h2 className="text-4xl text-center mb-8 animate-fade-in">Some of my work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Suspense key={num} fallback={<div>Loading...</div>}>
                <div className="overflow-hidden">
                  <LazyImage
                    src={`/collage-image-${num}.png`}
                    alt={`Collage image ${num}`}
                    className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </Suspense>
            ))}
          </div>
          
        </section>

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
              href="#" // Replace with your Google Drive folder link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors animate-fade-in-up animation-delay-300 text-center"
            >
              View All Shots
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;