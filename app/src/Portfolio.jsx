import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

const LazyImage = lazy(() => import('./LazyImage'));

// Simplified photo data - one photo per event category
const heroSlideshow = [
  {src: '/sjevrsl3(1).jpg', caption: 'San Jose Earthquakes vs Real Salt Lake'},
  {src: '/hsvfb9(1).jpg', caption: 'High School Football'},
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
      {src: '/main(1).jpg', caption: 'High School Boys Soccer'},
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

// Video Portfolio data
const videoPortfolioData = [
  {
    title: 'High School Football Hype Video',
    description: 'Cinematic hype video showcasing the intensity of high school football',
    thumbnail: '/hsvfb1(1).jpg',
    embedUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE' // Replace with actual video URLs
  },
  {
    title: 'Basketball Highlight Reel',
    description: 'Fast-paced highlight reel capturing the best moments from the season',
    thumbnail: '/hsjbb1(1).jpg',
    embedUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE' // Replace with actual video URLs
  },
  {
    title: 'MLS Soccer Action',
    description: 'Professional soccer coverage from San Jose Earthquakes matches',
    thumbnail: '/sjevrsl1(1).jpg',
    embedUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE' // Replace with actual video URLs
  }
];

// Reviews data
const reviewsData = [
  {
    stars: 5,
    text: "David is professional, reliable, and communicates brilliantly. Above all, he's highly talented and his videos are fantastic. He provided me with exactly what I wanted and I cannot recommend him highly enough.",
    name: "Player ONE Performance",
    occupation: "High Performance Soccer Training & Camps",
    logo: "/p1pl.png"
  },
  {
    stars: 5,
    text: "David has a keen eye for detail, and it shows. His variety of photos and their quality is no joke either. Having had the pleasure of working with him before, its apparent that he takes time and consideration into the selection and production of his works.",
    name: "Viggo J.",
    occupation: "High School Student",
    logo: null
  },
  {
    stars: 5,
    text: "David took incredible photos of our charity show and captured every single moment beautifully! He's very accommodating and easy to work with!",
    name: "Shaan J.",
    occupation: "High School Student",
    logo: null
  }
];

// News/Blog data
const newsData = [
  {
    id: 1,
    title: "Bay Area High School Football Season Highlights",
    excerpt: "Capturing the intensity and passion of local high school football teams across the Bay Area...",
    date: "2025-01-15",
    image: "/hsvfb1(1).jpg",
    content: "This football season has been incredible for capturing the raw emotion and athletic prowess of Bay Area high school teams. From game-winning touchdowns to team celebrations, every moment tells a story of dedication and teamwork."
  },
  {
    id: 2,
    title: "Behind the Scenes: San Jose Earthquakes Photography",
    excerpt: "Working with professional MLS teams brings unique challenges and rewards...",
    date: "2025-01-10",
    image: "/sjevrsl3(1).jpg",
    content: "Being on the sidelines during San Jose Earthquakes matches provides an incredible perspective on professional soccer. The speed, precision, and intensity at this level requires specialized techniques and equipment to capture those perfect moments."
  },
  {
    id: 3,
    title: "The Art of Sports Videography: Creating Compelling Hype Videos",
    excerpt: "How we transform raw game footage into cinematic experiences that motivate and inspire...",
    date: "2025-01-05",
    image: "/gvb3(1).jpg",
    content: "Creating hype videos isn't just about editing highlights together. It's about understanding the emotion, the story, and the passion behind each play. We focus on cinematic techniques that elevate sports content to an art form."
  }
];

// Google Business data
const googleBusinessData = {
  name: "DVH Visuals",
  rating: 5.0,
  reviewCount: 12,
  address: "Bay Area, CA",
  phone: "(408) 647-5135",
  website: "https://dvhvisuals.com",
  description: "Professional sports photography and videography across the Bay Area. Specializing in transforming real-time action into lasting memories."
};

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
  
  // News section state
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  
  // Video gallery state
  const [videoGalleryOpen, setVideoGalleryOpen] = useState(false);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState(null);
  const [videoCurrentSlide, setVideoCurrentSlide] = useState(0);
  
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
      const sections = ['home', 'about', 'portfolio', 'video-portfolio', 'reviews', 'news', 'pricing', 'contact'];
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

  // News functions
  const openNews = (newsItem) => {
    setSelectedNews(newsItem);
    setNewsModalOpen(true);
  };

  const closeNews = () => {
    setNewsModalOpen(false);
    setSelectedNews(null);
  };

  // Video gallery functions
  const openVideoGallery = (categoryId) => {
    setSelectedVideoCategory(categoryId);
    setVideoCurrentSlide(0);
    setVideoGalleryOpen(true);
  };

  const closeVideoGallery = () => {
    setVideoGalleryOpen(false);
    setSelectedVideoCategory(null);
    setVideoCurrentSlide(0);
  };

  const goToNextVideo = () => {
    if (!selectedVideoCategory) return;
    const category = portfolioCategories.find(c => c.id === selectedVideoCategory);
    setVideoCurrentSlide((prev) => 
      (prev + 1) % category.videos.length
    );
  };

  const goToPrevVideo = () => {
    if (!selectedVideoCategory) return;
    const category = portfolioCategories.find(c => c.id === selectedVideoCategory);
    setVideoCurrentSlide((prev) => 
      (prev - 1 + category.videos.length) % category.videos.length
    );
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
                          if (category.videos) {
                            openVideoGallery(category.id);
                          } else {
                            openGallery(category.id);
                          }
                        }}
                        className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1"
                      >
                        {category.videos ? 'View Videos' : 'View Slideshow'}
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

  // Render the News section
  const renderNews = () => {
    const [newsPhotoSlide, setNewsPhotoSlide] = useState(0);
    const newsPhotos = ['/hsvfb1(1).jpg', '/sjevrsl3(1).jpg', '/gvb3(1).jpg', '/hsjbb2(1).jpg', '/gfhsn3(1).jpg'];
    
    useEffect(() => {
      const interval = setInterval(() => {
        setNewsPhotoSlide((prev) => (prev + 1) % newsPhotos.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [newsPhotos.length]);
    
    return (
      <section
        id="news"
        className="py-20 px-4 opacity-0 transition-opacity duration-1000"
        ref={el => sectionRefs.current[4] = el}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-12 relative">
            Sports News & Updates
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white mt-4"></span>
          </h2>
          
          {/* News Photos Slideshow */}
          <div className="mb-16">
            <h3 className="text-2xl text-center mb-8">Recent Event Photos</h3>
            <div className="relative h-[35vh] md:h-[45vh] rounded-lg overflow-hidden bg-black max-w-4xl mx-auto">
              {newsPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === newsPhotoSlide 
                      ? 'opacity-100 z-10' 
                      : 'opacity-0 z-0'
                  }`}
                >
                  <Suspense fallback={<div className="w-full h-full bg-gray-900 flex items-center justify-center">Loading...</div>}>
                    <LazyImage 
                      src={photo} 
                      alt={`Event photo ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </Suspense>
                </div>
              ))}
              
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {newsPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setNewsPhotoSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === newsPhotoSlide ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((news) => (
              <div
                key={news.id}
                className="bg-gray-900 bg-opacity-40 rounded-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                onClick={() => openNews(news)}
              >
                <div className="h-48 overflow-hidden">
                  <Suspense fallback={<div className="w-full h-48 bg-gray-800 flex items-center justify-center">Loading...</div>}>
                    <LazyImage
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </Suspense>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-400 mb-2">{new Date(news.date).toLocaleDateString()}</div>
                  <h3 className="text-xl font-medium mb-3">{news.title}</h3>
                  <p className="text-gray-300 mb-4">{news.excerpt}</p>
                  <button className="text-white hover:text-gray-300 transition-colors font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Render the Google Business section
  const renderGoogleBusiness = () => {
    return (
      <section className="py-12 px-4 bg-gray-900 bg-opacity-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-medium mb-4">Find Us on Google</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400">{googleBusinessData.rating}</div>
                <div className="text-yellow-400 text-xl mb-2">{"★".repeat(Math.floor(googleBusinessData.rating))}</div>
                <div className="text-gray-300">{googleBusinessData.reviewCount} Google Reviews</div>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-medium mb-2">{googleBusinessData.name}</h4>
                <p className="text-gray-300 mb-2">{googleBusinessData.address}</p>
                <p className="text-gray-300 mb-4">{googleBusinessData.phone}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://g.co/kgs/hqd62gq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    View on Google
                  </a>
                  <a
                    href="https://www.google.com/search?kgmid=/g/11yfdbb17_&hl=en-US&q=DVH+Visuals&shndl=30&shem=lcuae&source=sh/x/loc/osrp/m5/1&kgs=eb5f183fb0b75b53#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    Write a Review
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Render Instagram feeds
  const renderInstagramFeeds = () => {
    return (
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-medium text-center mb-8">Follow Us on Instagram</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="text-xl mb-4">@dh.flixs (Personal)</h4>
              <div className="bg-gray-900 bg-opacity-40 rounded-lg p-6">
                <p className="text-gray-300 mb-4">Latest posts from my personal Instagram</p>
                <a
                  href="https://instagram.com/dh.flixs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-tr from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram size={20} />
                  View Profile
                </a>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-xl mb-4">@dvhvisuals (Business)</h4>
              <div className="bg-gray-900 bg-opacity-40 rounded-lg p-6">
                <p className="text-gray-300 mb-4">Latest posts from DVH Visuals</p>
                <a
                  href="https://instagram.com/dvhvisuals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-tr from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram size={20} />
                  View Profile
                </a>
              </div>
            </div>
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
              <p className="text-xl mb-6">Please contact us before booking to discuss your project requirements and details.</p>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:david@dvhvisuals.com" className="hover:text-gray-300 transition-colors">david@dvhvisuals.com</a>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <a href="tel:+14086475135" className="hover:text-gray-300 transition-colors">(408) 647-5135</a>
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
          <img src="/davidhuanmedia.jpg" alt="DVH Visuals Logo" className="h-12 w-12 rounded-full mr-4" />
          <div className="flex flex-col">
            <div className="text-xl font-medium">DVH Visuals | dh.flixs</div>
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
            href="#news" 
            onClick={(e) => { e.preventDefault(); scrollToSection('news'); }} 
            className={`hover:text-gray-300 transition-colors py-3 md:py-0 relative group ${activeSection === 'news' ? 'text-white' : 'text-gray-400'}`}
          >
            News
            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'news' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>

          <a 
            href="#video-portfolio" 
            onClick={(e) => { e.preventDefault(); scrollToSection('video-portfolio'); }} 
            className={`hover:text-gray-300 transition-colors py-3 md:py-0 relative group ${activeSection === 'video-portfolio' ? 'text-white' : 'text-gray-400'}`}
          >
            Videos
            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'video-portfolio' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
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
        <section id="home" className="relative min-h-screen flex flex-col items-c</main>enter justify-between pt-20 md:pt-24">
          <div className="container mx-auto px-4 flex flex-col items-center relative z-20 mb-12">
            <div className="text-white w-full flex flex-col items-center mb-8 mt-8 opacity-0 animate-fade-in">
              <div className="max-w-4xl w-full text-center">
                <h1 className="text-5xl md:text-6xl mb-8 font-bold">DVH Visuals | dh.flixs</h1>
                <h3 className="text-2xl md:text-2xl mb-6 font-medium">Professional Sports Photography & Videography</h3>
                <areatext id="area" className="text-l text-green md:text-2xl mb-6 font-medium">📍 Bay Area, CA</areatext>
                
                <div className="w-24 h-0.5 mt-6 bg-white mx-auto mb-6"></div>
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
            <h2 className="text-4xl text-center mt-8 mb-12 relative">
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
                I'm David Huan, the founder and lead creative behind DVH Visuals. For the past three years, I've specialized in sports photography and videography, working with high school teams, brands, club programs, and professional organizations like CONCACAF and the San Jose Earthquakes. I cover a wide range of sports, with a focus on football, soccer, basketball, and volleyball. From cinematic hype videos to clean highlight reels and action-packed photo sets, I handle everything from filming and editing to creative direction to ensure every project meets the standard I've built my name on. My goal is to capture the emotion, intensity, and story behind each moment, not just to document the game, but to bring it to life.
                </p>
                <p>
                DVH Visuals provides professional sports photography and videography across the Bay Area. We specialize in transforming real-time action into lasting memories, delivering dynamic game-day photos, electrifying highlight reels, hype videos, college recruitment content, media day portraits, and compelling event coverage. Trusted by local schools, athletes, teams, clubs, major brands, and professional organizations like CONCACAF and the San Jose Earthquakes, DVH Visuals captures the intensity of game day and turns it into captivating content that celebrates your achievements and brings your vision to life.
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
                  <div className="flex items-center mb-4">
                    {review.logo ? (
                      <img 
                        src={review.logo} 
                        alt={`${review.name} logo`} 
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                        <span className="text-xl font-bold">{review.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <p className="text-sm text-gray-400">{review.occupation}</p>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-xl mb-3">
                    {"★".repeat(review.stars)}
                  </div>
                  <p className="italic mb-6">{review.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href="https://dvhvisuals.setmore.com/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
              >
                View All Reviews
              </a>
            </div>
          </div>
        </section>

        {/* Google Business Integration */}
        {renderGoogleBusiness()}

        {/* Video Portfolio section */}
        <section
          id="video-portfolio"
          className="py-20 px-4 opacity-0 transition-opacity duration-1000 bg-gray-900 bg-opacity-20"
          ref={el => sectionRefs.current[8] = el}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl text-center mb-12 relative">
              Video Portfolio
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white mt-4"></span>
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden bg-black">
                {videoPortfolioData.map((video, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === videoCurrentSlide 
                        ? 'opacity-100 z-10' 
                        : 'opacity-0 z-0'
                    }`}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-8">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="w-full h-4/5 max-w-4xl rounded-lg shadow-2xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="mt-6 text-center">
                        <h3 className="text-2xl font-bold mb-2">{video.title}</h3>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">{video.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Navigation Buttons */}
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 z-20 transition-all duration-300 hover:scale-110"
                  onClick={() => {
                    setVideoCurrentSlide((prev) => (prev - 1 + videoPortfolioData.length) % videoPortfolioData.length);
                  }}
                  aria-label="Previous video"
                >
                  <ChevronLeft size={32} />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 z-20 transition-all duration-300 hover:scale-110"
                  onClick={() => {
                    setVideoCurrentSlide((prev) => (prev + 1) % videoPortfolioData.length);
                  }}
                  aria-label="Next video"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
              
              {/* Video indicators */}
              <div className="flex justify-center gap-3 mt-6">
                {videoPortfolioData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setVideoCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === videoCurrentSlide ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News section */}
        {renderNews()}

        {/* Instagram feeds */}
        {renderInstagramFeeds()}
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
                src="https://dvhvisuals.setmore.com" 
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
            &copy; 2025 DVH Visuals. All rights reserved.
            <br /><br />
            Website developed exclusively for DVH Visuals by Arya Sarukkai.
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
              src="https://dvhvisuals.setmore.com" 
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
              
            </div>
          </div>
        </div>
      )}

      {/* Video Gallery Modal */}
      {videoGalleryOpen && selectedVideoCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="w-full h-full max-w-6xl mx-auto p-6 relative animate-scale-in">
            <button 
              onClick={closeVideoGallery} 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={28} />
            </button>
            
            <div className="w-full h-full flex flex-col">
              <h3 className="text-2xl font-medium mb-4 text-center">
                {portfolioCategories.find(c => c.id === selectedVideoCategory)?.title}
              </h3>
              
              <div className="relative flex-1 overflow-hidden">
                {portfolioCategories.find(c => c.id === selectedVideoCategory)?.videos.map((video, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === videoCurrentSlide 
                        ? 'opacity-100 z-10' 
                        : 'opacity-0 z-0'
                    }`}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="w-full h-3/4 max-w-4xl rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="mt-4 text-center">
                        <h4 className="text-xl font-medium mb-2">{video.title}</h4>
                        <p className="text-gray-300">{video.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Navigation Buttons */}
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 z-20 transition-all duration-300 hover:scale-110"
                  onClick={goToPrevVideo}
                  aria-label="Previous video"
                >
                  <ChevronLeft size={32} />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 z-20 transition-all duration-300 hover:scale-110"
                  onClick={goToNextVideo}
                  aria-label="Next video"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
              
              {/* Video indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {portfolioCategories.find(c => c.id === selectedVideoCategory)?.videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setVideoCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === videoCurrentSlide ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Modal */}
      {newsModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-900 p-8 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-in mx-4">
            <button 
              onClick={closeNews} 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={28} />
            </button>
            
            <div className="mb-6">
              <img 
                src={selectedNews.image} 
                alt={selectedNews.title} 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="text-sm text-gray-400 mb-2">
                {new Date(selectedNews.date).toLocaleDateString()}
              </div>
              <h2 className="text-3xl font-bold mb-4">{selectedNews.title}</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{selectedNews.content}</p>
            </div>
            
            <div className="text-center">
              <button 
                onClick={closeNews}
                className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                Close
              </button>
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