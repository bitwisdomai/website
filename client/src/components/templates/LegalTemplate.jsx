const LegalTemplate = ({ content = {}, page }) => {
  const { title = page.title, lastUpdated, sections = [] } = content;

  return (
    <div className="legal-template bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <header className="mb-8 border-b pb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            {lastUpdated && (
              <p className="text-gray-600">
                Last Updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </header>

          {/* Sections */}
          {sections && sections.length > 0 ? (
            <div className="legal-content space-y-8">
              {sections.map((section, index) => (
                <section key={index} className="legal-section">
                  {section.heading && (
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {index + 1}. {section.heading}
                    </h2>
                  )}
                  {section.content && (
                    <div
                      className="text-gray-700 leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-12">
              <p>Content is being prepared. Please check back soon.</p>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t text-center text-gray-600 text-sm">
            <p>
              If you have any questions about this document, please contact us.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LegalTemplate;
