const LandingTemplate = ({ content = {}, page }) => {
  const { hero = {}, features = [], cta = {} } = content;

  return (
    <div className="landing-template">
      {/* Hero Section */}
      {hero && (
        <section className="hero bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            {hero.title && (
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {hero.title}
              </h1>
            )}
            {hero.subtitle && (
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {hero.subtitle}
              </p>
            )}
            {hero.ctaText && hero.ctaLink && (
              <a
                href={hero.ctaLink}
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
              >
                {hero.ctaText}
              </a>
            )}
            {hero.image && (
              <div className="mt-12">
                <img
                  src={hero.image}
                  alt={hero.title || 'Hero image'}
                  className="mx-auto rounded-lg shadow-2xl max-w-4xl w-full"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="features py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  {feature.icon && (
                    <div className="text-4xl mb-4">{feature.icon}</div>
                  )}
                  {feature.title && (
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      {feature.title}
                    </h3>
                  )}
                  {feature.description && (
                    <p className="text-gray-600">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (cta.title || cta.description) && (
        <section className="cta bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            {cta.title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {cta.title}
              </h2>
            )}
            {cta.description && (
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {cta.description}
              </p>
            )}
            {cta.buttonText && cta.buttonLink && (
              <a
                href={cta.buttonLink}
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
              >
                {cta.buttonText}
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default LandingTemplate;
