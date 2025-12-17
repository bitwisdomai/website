import React, { useState, useEffect } from "react";
import { FaArrowRight, FaClock, FaUser } from "react-icons/fa";
import { API_BASE_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";

const BlogGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const categoryParam = selectedCategory !== "all" ? `?category=${selectedCategory}` : '?status=published';

      const response = await fetch(`${API_BASE_URL}/blog${categoryParam}`);
      const data = await response.json();

      if (data.success) {
        setBlogPosts(data.data.blogs);

        // Extract unique categories from blogs
        const uniqueCategories = ['All', ...new Set(data.data.blogs.map(blog => blog.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory || post.tags?.includes(selectedCategory));

  const handleBlogClick = (blog) => {
    if (blog.slug) {
      navigate(`/blog/${blog.slug}`);
    }
  };

  return (
    <section className="relative bg-[#0E0E0E] text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-white">All Blog </span>
            <span className="bg-gradient-to-b from-[#00f0ff] to-white bg-clip-text text-transparent">Posts</span>
          </h2>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">Filter By:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black border border-cyan-400/30 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 cursor-pointer flex-1 sm:flex-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat === "All" ? "all" : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <p className="text-gray-400 mt-4">Loading blogs...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No blog posts found. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredPosts.map((post, index) => {
                const imageUrl = post.featuredImage
                  ? `${window.location.protocol}//${window.location.host}/${post.featuredImage}`
                  : null;

                return (
                  <div
                    key={post._id || post.id}
                    onClick={() => handleBlogClick(post)}
                    className="group bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl sm:rounded-2xl overflow-hidden border border-cyan-400/30 hover:border-cyan-400 transition-all duration-500 cursor-pointer hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] hover:-translate-y-2"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Image/Gradient Header */}
                    {imageUrl ? (
                      <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center"><div class="text-2xl font-bold opacity-20 text-white" style="font-family: 'Orbitron', sans-serif;">BitWisdom</div></div>`;
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative h-36 sm:h-40 md:h-48 bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center p-4 sm:p-6">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold opacity-20 text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            BitWisdom
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                      {/* Author Info and Arrow Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaUser className="text-black text-xs" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-white truncate">{post.author}</p>
                            <p className="text-xs text-gray-400">
                              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                        </button>
                      </div>

                      {/* Read Time and Views */}
                      <div className="flex items-center gap-4 text-gray-400 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <FaClock className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                          <span>5 min read</span>
                        </div>
                        {post.views > 0 && (
                          <span>{post.views} views</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold group-hover:text-cyan-400 transition-colors duration-300 leading-tight line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap pt-1 sm:pt-2">
                        {(post.tags || [post.category]).slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 sm:px-3 py-1 bg-cyan-400/10 rounded-full text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/20 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default BlogGrid;
