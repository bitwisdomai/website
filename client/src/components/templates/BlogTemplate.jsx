const BlogTemplate = ({ content = {}, page }) => {
  const {
    title = page.title,
    author,
    featuredImage,
    excerpt,
    content: blogContent,
    tags = []
  } = content;

  return (
    <div className="blog-template bg-gray-50 min-h-screen py-12">
      <article className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {featuredImage && (
            <div className="w-full h-96 overflow-hidden">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h1>

              {/* Meta */}
              <div className="flex items-center text-gray-600 mb-4">
                {author && (
                  <span className="mr-4">
                    By <span className="font-semibold">{author}</span>
                  </span>
                )}
                {page.publishedAt && (
                  <time dateTime={page.publishedAt}>
                    {new Date(page.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
              </div>

              {/* Excerpt */}
              {excerpt && (
                <p className="text-xl text-gray-700 leading-relaxed border-l-4 border-blue-600 pl-4 italic">
                  {excerpt}
                </p>
              )}
            </header>

            {/* Blog Content */}
            {blogContent && (
              <div
                className="blog-content prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: blogContent }}
              />
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <footer className="mt-12 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-600 font-semibold mr-2">Tags:</span>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </footer>
            )}
          </div>
        </div>

        {/* Share Section (optional) */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Thank you for reading!</p>
        </div>
      </article>
    </div>
  );
};

export default BlogTemplate;
