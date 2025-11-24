const GenericTemplate = ({ content = {}, page }) => {
  const { header = {}, sections = [] } = content;

  return (
    <div className="generic-template">
      {/* Header Section */}
      {header && (header.title || header.subtitle) && (
        <section className="header bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            {header.title && (
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {header.title}
              </h1>
            )}
            {header.subtitle && (
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {header.subtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Content Sections */}
      {sections && sections.length > 0 && (
        <div className="sections">
          {sections.map((section, index) => (
            <section
              key={index}
              className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="container mx-auto px-4">
                <div
                  className={`flex flex-col ${
                    section.image && index % 2 === 0
                      ? 'md:flex-row'
                      : 'md:flex-row-reverse'
                  } items-center gap-12`}
                >
                  <div className="flex-1">
                    {section.title && (
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                        {section.title}
                      </h2>
                    )}
                    {section.content && (
                      <div
                        className="text-gray-600 text-lg leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}
                  </div>
                  {section.image && (
                    <div className="flex-1">
                      <img
                        src={section.image}
                        alt={section.title || `Section ${index + 1}`}
                        className="rounded-lg shadow-lg w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Fallback if no content */}
      {(!sections || sections.length === 0) && !header.title && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{page.title}</h1>
            <p className="text-gray-600">Content coming soon...</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default GenericTemplate;
