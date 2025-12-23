import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaClock, FaUser, FaArrowLeft, FaEye, FaTag } from "react-icons/fa";
import Banner from "../components/landing/Banner";
import NavBar from "../components/landing/NavBar";
import Footer from "../components/landing/Footer";
import { API_BASE_URL } from "../services/api";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/blog/slug/${slug}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data.blog);
      } else {
        setError('Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Banner />
        <NavBar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <p className="text-gray-400 mt-4">Loading blog...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black">
        <Banner />
        <NavBar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
            <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blog')}
              className="bg-cyan-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-cyan-300 transition"
            >
              Back to Blogs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Prepend API_BASE_URL to get full image URL
  const imageUrl = blog.featuredImage ? `${API_BASE_URL}${blog.featuredImage}` : null;

  return (
    <div className="min-h-screen bg-black">
      <Banner />
      <NavBar />

      {/* Blog Content */}
      <article className="relative bg-[#0E0E0E] text-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blogs</span>
          </button>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-4 py-1.5 text-sm">
              <FaTag className="text-cyan-400" />
              <span className="text-cyan-400 font-semibold">{blog.category}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 pb-6 mb-8 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                <FaUser className="text-black text-sm" />
              </div>
              <div>
                <p className="font-medium text-white">{blog.author}</p>
                <p className="text-sm text-gray-400">
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <FaClock className="text-cyan-400" />
                <span>5 min read</span>
              </div>
              {blog.views > 0 && (
                <div className="flex items-center gap-2">
                  <FaEye className="text-cyan-400" />
                  <span>{blog.views} views</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-cyan-400/30">
              <img
                src={imageUrl}
                alt={blog.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Excerpt */}
          <div className="mb-8 p-6 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border-l-4 border-cyan-400 rounded-lg">
            <p className="text-lg text-gray-300 italic leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-cyan max-w-none">
            <div
              className="text-gray-300 leading-relaxed space-y-6"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75',
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-cyan-400/10 rounded-full text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/20 transition-colors text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-300 hover:to-cyan-500 text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] hover:scale-105"
            >
              <FaArrowLeft />
              Back to All Blogs
            </button>
          </div>
        </div>
      </article>

      <Footer />

      <style>{`
        .prose h1 {
          color: #ffffff;
          font-size: 2em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
        .prose h2 {
          color: #00f0ff;
          font-size: 1.5em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
        .prose h3 {
          color: #00f0ff;
          font-size: 1.25em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        .prose p {
          margin-bottom: 1.25em;
        }
        .prose a {
          color: #00f0ff;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #00d4e0;
        }
        .prose ul, .prose ol {
          margin: 1.25em 0;
          padding-left: 1.5em;
        }
        .prose li {
          margin: 0.5em 0;
        }
        .prose strong {
          color: #ffffff;
          font-weight: 600;
        }
        .prose code {
          background-color: rgba(0, 240, 255, 0.1);
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
          color: #00f0ff;
        }
        .prose pre {
          background-color: #1a1a1a;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          border: 1px solid rgba(0, 240, 255, 0.3);
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
          color: #e5e5e5;
        }
        .prose blockquote {
          border-left: 4px solid #00f0ff;
          padding-left: 1em;
          font-style: italic;
          color: #a0a0a0;
          margin: 1.5em 0;
        }
        .prose img {
          border-radius: 0.5em;
          margin: 1.5em 0;
        }
      `}</style>
    </div>
  );
};

export default BlogDetailPage;
