import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

const LazyImage = lazy(() => import('./LazyImage'));

// Simplified photo data - one photo per event category
const heroSlideshow = [
  {src: '/sjevrsl3(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
  {src: '/hsvfb9(1).jpg', caption: 'High School Football'},
  {src: '/vbs6(1).jpg', caption: 'High School Boys Soccer'},
  {src: '/hsjbb3(1).jpg', caption: 'High School Basketball'},
  {src: '/gvb8(1).jpg', caption: 'High School Girls Volleyball'},
  {src: '/gfhsn2(1).jpg', caption: 'High School Girls Field Hockey Senior Night'},
];

// Full photo collections for each category
const portfolioCategories = [
  {
    id: 'mls',
    title: 'MLS Soccer',
    coverImage: '/sjevrsl5(1).jpg',
    photos: [
      {src: '/sjevrsl(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
      {src: '/sjevrsl2(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
      {src: '/sjevrsl3(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
      {src: '/sjevrsl4(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
      {src: '/sjevrsl5(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
      {src: '/sjevrsl6(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
      {src: '/sjevrsl7(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
    ]
  },
  {
    id: 'football',
    title: 'High School Football',
    coverImage: '/hsvfb6(1).jpg',
    photos: [
      {src: '/main(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb1(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb2(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb3(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb4(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb5(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb6(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb7(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb8(1).jpg', caption: 'High School Football'},
      {src: '/hsvfb9(1).jpg', caption: 'High School Football'},
    ]
  },
  {
    id: 'soccer',
    title: 'High School Soccer',
    coverImage: '/vbs1(1).jpg',
    photos: [
      {src: '/vbs1(1).jpg', caption: 'High School Boys Soccer'},
      {src: '/vbs2(1).jpg', caption: 'High School Boys Soccer'},
      {src: '/vbs3(1).jpg', caption: 'High School Boys Soccer'},
      {src: '/vbs4(1).jpg', caption: 'High School Boys Soccer'},
      {src: '/vbs5(1).jpg', caption: 'High School Boys Soccer'},
      {src: '/vbs6(1).jpg', caption: 'High School Boys Soccer'},
    ]
  },
  {
    id: 'basketball',
    title: 'High School Basketball',
    coverImage: '/hsjbb2(1).jpg',
    photos: [
      {src: '/hsjbb1(1).jpg', caption: 'High School Basketball'},
      {src: '/hsjbb2(1).jpg', caption: 'High School Basketball'},
      {src: '/hsjbb3(1).jpg', caption: 'High School Basketball'},
      {src: '/hsjbb4(1).jpg', caption: 'High School Basketball'},
    ]
  },
  {
    id: 'volleyball',
    title: 'High School Volleyball',
    coverImage: '/gvb1(1).jpg',
    photos: [
      {src: '/gvb1(1).jpg', caption: 'High School Girls Volleyball'},
      {src: '/gvb2(1).jpg', caption: 'High School Girls Volleyball'},
      {src: '/gvb3(1).jpg', caption: 'High School Girls Volleyball'},
      {src: '/gvb4(1).jpg', caption: 'High School Girls Volleyball'},
      {src: '/gvb5(1).jpg', caption: 'High School Girls Volleyball'},
      {src: '/gvb6(1).jpg', caption: 'High School Girls Volleyball'},
      {src: '/gvb7(1).jpg', caption: 'High School Girls Volleyball'},
      {src: '/gvb8(1).jpg', caption: 'High School Girls Volleyball'},
    ]
  },
  {
    id: 'fieldhockey',
    title: 'High School Field Hockey',
    coverImage: '/gfhsn3(1).jpg',
    photos: [
      {src: '/gfhsn1(1).jpg', caption: 'High School Girls Field Hockey Senior Night'},
      {src: '/gfhsn2(1).jpg', caption: 'High School Girls Field Hockey Senior Night'},
      {src: '/gfhsn3(1).jpg', caption: 'High School Girls Field Hockey Senior Night'},
      {src: '/gfhsn4(1).jpg', caption: 'High School Girls Field Hockey Senior Night'},
      {src: '/gfhsn5(1).jpg', caption: 'High School Girls Field Hockey Senior Night'},
      {src: '/gfhsn6(1).jpg', caption: 'High School Girls Field Hockey Senior Night'},
      {src: '/gfhsn7(1).jpg', caption: 'High School Girls Field Hockey Senior Night'},
    ]
  }
];

// Reviews data
const reviewsData = [
  { 
    stars: 5, 
    text: "David has a keen eye for detail, and it shows. His variety of photos and their quality is no joke either. Having had the pleasure of working with him before, its apparent that he takes time and consideration into the selection and production of his works.", 
    name: "Viggo J." 
  },
  { 
    stars: 5, 
    text: "David took incredible photos of our charity show and captured every single moment beautifully! He's very accommodating and easy to work with!", 
    name: "Shaan J." 
  },
  { 
    stars: 5, 
    text: "David is absolutely amazing! His eye for detail, creativity, and ability to capture perfect moments made all our photos perfect!", 
    name: "Savio S." 
  }
];

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideshowPaused, setSlideshowPaused] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Gallery viewer state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [galleryCurrentSlide, setGalleryCurrentSlide] = useState(0);
  
  // Image loading optimization
  const [loadedImages, setLoadedImages] = useState({});
  
  // Refs for sections to track visibility
  const sectionRefs = useRef([]);
  const slideInterval = useRef(null);
  
  // Preload images for main slideshow only
  useEffect(() => {
    heroSlideshow.forEach(photo => {
      const img = new Image();
      img.src = photo.src;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [photo.src]: true
        }));
      };
    });
  }, []);
  
  // Slideshow interval - only for hero slideshow (simplified)
  useEffect(() => {
    if (!slideshowPaused) {
      slideInterval.current = setInterval(() => {
        goToNextSlide();
      }, 5000);
    }
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [slideshowPaused, currentSlide]);
  
  // Initialize animations after component mounts
  useEffect(() => {
    // Force any animations to trigger properly
    setTimeout(() => {
      const sections = document.querySelectorAll('.opacity-0');
      sections.forEach(section => {
        section.classList.add('animate-fade-in');
      });
    }, 100);
  }, []);
  
  // Scroll behavior for header and animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Header hide/show logic
      if (scrollY > 100) {
        setIsHeaderVisible(scrollY < lastScrollY);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(scrollY);
      
      // Check section visibility for animations
      sectionRefs.current.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          
          if (isVisible) {
            section.classList.add('animate-fade-in');
          }
        }
      });

      // Update active section based on scroll position
      const sections = ['home', 'about', 'portfolio', 'reviews', 'pricing', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  // Slideshow navigation functions
  const goToNextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlideshow.length);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };
  
  const goToPrevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlideshow.length) % heroSlideshow.length);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };
  
  // Gallery navigation functions
  const goToNextGallerySlide = () => {
    if (!selectedCategory) return;
    setGalleryCurrentSlide((prev) => 
      (prev + 1) % portfolioCategories.find(c => c.id === selectedCategory).photos.length
    );
  };
  
  const goToPrevGallerySlide = () => {
    if (!selectedCategory) return;
    const category = portfolioCategories.find(c => c.id === selectedCategory);
    setGalleryCurrentSlide((prev) => 
      (prev - 1 + category.photos.length) % category.photos.length
    );
  };
  
  // Pause slideshow on hover/interaction
  const pauseSlideshow = () => {
    setSlideshowPaused(true);
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };
  
  const resumeSlideshow = () => {
    setSlideshowPaused(false);
  };
  
  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };
  
  // Open/close modal functions
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openScheduling = () => setIsSchedulingOpen(true);
  const closeScheduling = () => setIsSchedulingOpen(false);
  
  // Gallery functions
  const openGallery = (categoryId) => {
    setSelectedCategory(categoryId);
    setGalleryCurrentSlide(0);
    setGalleryOpen(true);
    // Preload the images of this category
    const category = portfolioCategories.find(c => c.id === categoryId);
    if (category) {
      category.photos.forEach(photo => {
        const img = new Image();
        img.src = photo.src;
      });
    }
  };
  
  const closeGallery = () => {
    setGalleryOpen(false);
    setSelectedCategory(null);
    setGalleryCurrentSlide(0);
  };

  // Render the Portfolio view - with improved hover effects and buttons
  const renderPortfolio = () => {
    return (
      <section
        id="portfolio"
        className="py-20 px-4 opacity-0 transition-opacity duration-1000"
        ref={el => sectionRefs.current[1] = el}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-12 relative">
            Portfolio
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white mt-4"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Portfolio categories with mobile-first interaction */}
            {portfolioCategories.map((category) => (
              <div
                key={category.id}
                className="overflow-hidden rounded-lg group relative cursor-pointer"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Suspense fallback={<div className="w-full h-full bg-gray-900 flex items-center justify-center">Loading...</div>}>
                    <LazyImage
                      src={category.coverImage}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Suspense>
                </div>
                {/* Overlay that's visible by default on mobile, with hover effects on desktop */}
                <div className="absolute inset-0 bg-black bg-opacity-50 md:bg-opacity-0 md:group-hover:bg-opacity-50 transition-all duration-300">
                  {/* Content container that's visible by default on mobile, with hover effects on desktop */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-100 md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible transform md:translate-y-8 md:group-hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-xl font-medium text-white">{category.title}</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openGallery(category.id);
                        }}
                        className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1"
                      >
                        View Slideshow
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openScheduling();
                        }}
                        className="bg-transparent border border-white text-white px-4 py-2 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Render the Contact section
  const renderContact = () => {
    return (
      <section 
        id="contact" 
        className="py-20 px-4 opacity-0 transition-opacity duration-1000"
        ref={el => sectionRefs.current[3] = el}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-center mb-12 relative">
            Contact
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white mt-4"></span>
          </h2>
          
          <div className="bg-gray-900 bg-opacity-40 p-8 rounded-lg">
            <div className="text-center mb-8">
              <p className="text-xl mb-6">Please contact me before booking to discuss your project requirements and details.</p>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:davidhuanmedia@gmail.com" className="hover:text-gray-300 transition-colors">davidhuanmedia@gmail.com</a>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <a href="tel:+14085551234" className="hover:text-gray-300 transition-colors">(669) 639-0896</a>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://instagram.com/dh.flixs/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Instagram size={28} />
                </a>
                <a
                  href="https://linktr.ee/dh.flixs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.5 21H5.25C4.0075 21 3 19.9925 3 18.75V5.25C3 4.0075 4.0075 3 5.25 3H7.5V21Z" />
                    <path d="M16.5 21H18.75C19.9925 21 21 19.9925 21 18.75V5.25C21 4.0075 19.9925 3 18.75 3H16.5V21Z" />
                    <path d="M16.5 12H7.5V16.5H16.5V12Z" />
                    <path d="M16.5 3H7.5V7.5H16.5V3Z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={openScheduling}
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="font-['Libre_Baskerville'] text-white bg-black min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-md text-white py-5 flex justify-between items-center z-50 transition-transform duration-300 ${!isHeaderVisible ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="flex items-center ml-6 md:ml-16">
          <img src="/davidhuanmedia.jpg" alt="David Huan Media Logo" className="h-12 w-12 rounded-full mr-4" />
          <div className="flex flex-col">
            <div className="text-xl font-medium">David Huan Media | dh.flixs</div>
            <div className="text-sm text-gray-300">Sports Media Agency</div>
          </div>
        </div>
        
        <div className="md:hidden mr-6">
          <button onClick={toggleMenu} className="text-white p-2">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        <nav className={`md:flex items-center space-x-8 mr-6 md:mr-16 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-black bg-opacity-95 p-6' : 'hidden md:flex'}`}>
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
            className={`hover:text-gray-300 transition-colors py-3 md:py-0 relative group ${activeSection === 'home' ? 'text-white' : 'text-gray-400'}`}
          >
            Home
            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          <a 
            href="#portfolio" 
            onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }} 
            className={`hover:text-gray-300 transition-colors py-3 md:py-0 relative group ${activeSection === 'portfolio' ? 'text-white' : 'text-gray-400'}`}
          >
            Portfolio
            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'portfolio' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} 
            className={`hover:text-gray-300 transition-colors py-3 md:py-0 relative group ${activeSection === 'about' ? 'text-white' : 'text-gray-400'}`}
          >
            About
            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }} 
            className={`hover:text-gray-300 transition-colors py-3 md:py-0 relative group ${activeSection === 'reviews' ? 'text-white' : 'text-gray-400'}`}
          >
            Reviews
            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'reviews' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>

          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} 
            className={`hover:text-gray-300 transition-colors py-3 md:py-0 relative group ${activeSection === 'contact' ? 'text-white' : 'text-gray-400'}`}
          >
            Contact
            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }} 
            className={`hover:text-gray-300 transition-colors py-3 md:py-0 relative group ${activeSection === 'pricing' ? 'text-white' : 'text-gray-400'}`}
          >
            Pricing
            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'pricing' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          
          <a 
            href="https://instagram.com/dh.flixs/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-gradient-to-tr from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            <Instagram size={18} />
            <span>Instagram</span>
          </a>
          <button 
            onClick={openScheduling} 
            className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Book Now
          </button>
        </nav>
      </header>

      <main className="pt-16">
        {/* Hero section with optimized slideshow */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-between pt-20 md:pt-24">
          <div className="container mx-auto px-4 flex flex-col items-center relative z-20 mb-12">
            <div className="text-white w-full flex flex-col items-center mb-8 mt-8 opacity-0 animate-fade-in">
              <div className="max-w-4xl w-full text-center">
                <h1 className="text-5xl md:text-6xl mb-8 font-bold">David Huan Media | dh.flixs</h1>
                <h3 className="text-xl md:text-2xl mb-6 font-medium">Professional Sports Photography & Videography | Bay Area, CA</h3>
                
                <div className="w-24 h-0.5 bg-white mx-auto mb-6"></div>
                <a href="#contact" className="text-lg mb-8 font-light">Please <u>contact us</u> before booking! </a>
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                  <button 
                    onClick={openScheduling} 
                    className="bg-white text-black px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    Schedule Now
                  </button>
                  <a 
                    href="https://instagram.com/dh.flixs/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 bg-gradient-to-tr from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:opacity-90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Optimized Slideshow - fewer images, better performance */}
          <div 
            className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden rounded-lg mx-auto max-w-6xl px-4 mb-8 md:mb-0 opacity-0 animate-fade-in animation-delay-500"
            onMouseEnter={pauseSlideshow}
            onMouseLeave={resumeSlideshow}
          >
            {heroSlideshow.map((photo, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-all duration-600 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 z-10 scale-100' 
                    : 'opacity-0 z-0 scale-105'
                }`}
              >
                <Suspense fallback={<div className="w-full h-full bg-gray-900 flex items-center justify-center">Loading...</div>}>
                  {(loadedImages[photo.src] || index === currentSlide) && (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <LazyImage 
                        src={photo.src} 
                        alt={photo.caption} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </Suspense>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-100 flex items-end p-6">
                  <div className="w-full flex justify-between items-end">
                    <h3 className="text-xl md:text-2xl font-medium">{photo.caption}</h3>
                    <button 
                      onClick={openScheduling}
                      className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-20 transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                goToPrevSlide();
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-20 transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                goToNextSlide();
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
            
            {/* Slide Indicators - simplified */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 z-20 px-4">
              {heroSlideshow.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentSlide(index);
                      setTimeout(() => {
                        setIsTransitioning(false);
                      }, 600);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl w-full text-center mt-12 mb-20 px-4 opacity-0 animate-fade-in animation-delay-700">
            <h2 className="text-4xl md:text-5xl font-light">
              Bringing <u className="underline-offset-8 decoration-1">your athletic journey</u> to life.
            </h2>
          </div>
        </section>

        {/* Portfolio section */}
        {renderPortfolio()}

        {/* About Me section */}
        <section 
          id="about" 
          className="py-20 px-4 opacity-0 transition-opacity duration-1000"
          ref={el => sectionRefs.current[0] = el}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-center mb-12 relative">
              About Me
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white mt-4"></span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyImage 
                    src="/dh_profilephoto.jpg" 
                    alt="David Huan" 
                    className="w-full h-auto rounded-lg shadow-lg" 
                  />
                </Suspense>
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <p>
                I'm David Huan, a sports photographer and videographer in the California Bay Area with a passion for capturing the game's most unforgettable moments. Whether it's a fast-paced highlight reel or a perfectly timed action shot, my goal is to showcase the skill, emotion, and dedication of every athlete. Based in the Bay Area, I've worked with teams and programs to create professional, high-impact visuals that leave a lasting impression.
                </p>
                <p>
                David Huan Media delivers high-quality sports photography and videography, capturing the intensity, passion, and raw energy of every game. Specializing in cinematic hype videos and action-packed photography, we create professional content that brings athletes' moments to life. From school teams to elite club programs, our visuals are crafted to stand out.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={openScheduling}
                    className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    Work With Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Reviews section */}
        <section 
          id="reviews" 
          className="py-20 px-4 bg-black opacity-0 transition-opacity duration-1000"
          ref={el => sectionRefs.current[2] = el}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl text-center mb-12 relative">
              Client Reviews
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white mt-4"></span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {reviewsData.map((review, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900 bg-opacity-40 p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="text-yellow-400 text-xl mb-4">
                    {"★".repeat(review.stars)}
                  </div>
                  <p className="italic mb-6">{review.text}</p>
                  <p className="text-right font-medium">— {review.name}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="https://dhflixs.setmore.com/reviews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
              >
                View All Reviews
              </a>
            </div>
          </div>
        </section>
        {/* Contact section */}
        {renderContact()}
        
        

        
        
        
         

        {/* Services & Pricing section */}
        <section 
          id="pricing" 
          className="py-20 px-4 opacity-0 transition-opacity duration-1000"
          ref={el => sectionRefs.current[2] = el}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl text-center mb-12 relative">
              Services & Pricing
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white mt-4"></span>
            </h2>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <iframe 
                src="https://dhflixs.setmore.com" 
                title="Pricing and Scheduling"
                className="w-full h-[800px] border-none"
              />
            </div>
          </div>
        </section>

       

        {/* CTA section */}
        <section 
          className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black opacity-0 transition-opacity duration-1000"
          ref={el => sectionRefs.current[3] = el}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-12">Elevating Athletic Excellence Through Visual Storytelling</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a
                href="https://instagram.com/dh.flixs/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-tr from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:opacity-90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full md:w-auto"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
              <button
                onClick={openScheduling}
                className="bg-white text-black px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full md:w-auto"
              >
                Schedule Now
              </button>
              <a
                href="https://linktr.ee/dh.flixs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full md:w-auto"
              >
                All Links
              </a>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-black text-white text-center p-6 border-t border-gray-800">
          <p className="mt-6 mb-4 opacity-80">
            &copy; 2025 David Huan Media. All rights reserved.
            <br /><br />
            Website developed exclusively for David Huan Media by Arya Sarukkai.
          </p>
        </footer>
      </main>

      {/* Scheduling modal */}
      {isSchedulingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-black p-6 rounded-3xl max-w-4xl w-full md:w-3/4 h-3/4 shadow-2xl relative animate-scale-in">
            <button 
              onClick={closeScheduling} 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={28} />
            </button>
            <iframe 
              src="https://dhflixs.setmore.com" 
              title="Schedule Appointment"
              className="w-full h-full border-none mt-2 rounded-2xl"
            />
          </div>
        </div>
      )}
      
      {/* Gallery Slideshow Modal */}
      {galleryOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="w-full h-full max-w-6xl mx-auto p-6 relative animate-scale-in">
            <button 
              onClick={closeGallery} 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={28} />
            </button>
            
            <div className="w-full h-full flex flex-col">
              <h3 className="text-2xl font-medium mb-4 text-center">
                {portfolioCategories.find(c => c.id === selectedCategory)?.title}
              </h3>
              
              <div className="relative flex-1 overflow-hidden">
                {portfolioCategories.find(c => c.id === selectedCategory)?.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === galleryCurrentSlide 
                        ? 'opacity-100 z-10 scale-100' 
                        : 'opacity-0 z-0 scale-105'
                    }`}
                  >
                    <Suspense fallback={<div className="w-full h-full bg-gray-900 flex items-center justify-center">Loading...</div>}>
                      <div className="w-full h-full flex items-center justify-center">
                        <LazyImage 
                          src={photo.src} 
                          alt={photo.caption} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </Suspense>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <p className="text-lg">{photo.caption}</p>
                    </div>
                  </div>
                ))}
                
                {/* Navigation Buttons */}
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 z-20 transition-all duration-300 hover:scale-110"
                  onClick={goToPrevGallerySlide}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={32} />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 z-20 transition-all duration-300 hover:scale-110"
                  onClick={goToNextGallerySlide}
                  aria-label="Next slide"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
              
              {/* Slide indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {portfolioCategories.find(c => c.id === selectedCategory)?.photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === galleryCurrentSlide ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={openScheduling}
                  className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  Book a Shoot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          opacity: 1 !important;
          animation: fadeIn 1s forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        
        /* Fix hover effects for mobile */
        @media (hover: hover) {
          .hover-overlay {
            opacity: 0;
          }
          
          .hover-overlay:hover {
            opacity: 1;
          }
        }
        
        /* Make sure slideshow is fully visible */
        .slideshow-container {
          height: 70vh;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;