import React, { useState, useEffect } from "react";
import { FaArrowRight, FaClock, FaUser } from "react-icons/fa";
import ParticleNetwork from "../about/ParticleNetwork";
import { API_BASE_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";

const BlogFeatured = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/blog?status=published&limit=3`);
      const data = await response.json();

      if (data.success && data.data.blogs.length > 0) {
        setFeaturedPosts(data.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (featuredPosts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [featuredPosts.length]);

  const handleBlogClick = () => {
    if (currentPost && currentPost.slug) {
      navigate(`/blog/${currentPost.slug}`);
    }
  };

  if (loading) {
    return (
      <section className="relative bg-black text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
        <ParticleNetwork />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <p className="text-gray-400 mt-4">Loading featured blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredPosts.length === 0) {
    return null; // Don't show section if no blogs
  }

  const currentPost = featuredPosts[currentSlide];
  // Prepend API_BASE_URL to get full image URL
  const imageUrl = currentPost.featuredImage ? `${API_BASE_URL}${currentPost.featuredImage}` : null;

  return (
    <section className="relative bg-black text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Particle Network Animation */}
      <ParticleNetwork />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative bg-gradient-to-br from-gray-900/80 via-[#0E0E0E]/80 to-black border border-cyan-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,191,255,0.2)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center" key={currentSlide}>
            {/* Featured Image */}
            <div className="relative order-1">
              <div className="bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-cyan-400/30">
                <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-cyan-400/20">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={currentPost.title}
                      className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center"><div class="text-3xl font-bold opacity-20 text-white" style="font-family: \'Orbitron\', sans-serif;">BitWisdom</div></div>';
                      }}
                    />
                  ) : (
                    <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
                      <div className="text-3xl font-bold opacity-20 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        BitWisdom
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2" style={{ animation: "fadeIn 0.5s ease-in" }}>
              <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm">
                <span className="text-cyan-400 font-semibold">{currentPost.category || 'Featured'}</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white hover:text-cyan-300 transition-colors duration-300">
                {currentPost.title}
              </h2>

              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3">
                {currentPost.excerpt}
              </p>

              <button
                onClick={handleBlogClick}
                className="group flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-300 hover:to-cyan-500 text-black px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] hover:scale-105 active:scale-95"
              >
                Read Article
                <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-cyan-400/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-black text-xs sm:text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm sm:text-base">{currentPost.author}</p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {currentPost.publishedAt
                        ? new Date(currentPost.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                        : new Date(currentPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <FaClock className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                    <span>5 min read</span>
                  </div>
                  {currentPost.views > 0 && (
                    <span>{currentPost.views} views</span>
                  )}
                </div>
              </div>

              {/* Carousel Indicators */}
              {featuredPosts.length > 1 && (
                <div className="flex gap-2 pt-2">
                  {featuredPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'w-8 bg-cyan-400'
                          : 'w-1.5 bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogFeatured;
