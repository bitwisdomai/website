import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { pagesAPI } from '../services/api';

// Import template components
import LandingTemplate from '../components/templates/LandingTemplate';
import GenericTemplate from '../components/templates/GenericTemplate';
import LegalTemplate from '../components/templates/LegalTemplate';
import BlogTemplate from '../components/templates/BlogTemplate';

const templateComponents = {
  landing: LandingTemplate,
  generic: GenericTemplate,
  legal: LegalTemplate,
  blog: BlogTemplate
};

const DynamicPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await pagesAPI.getBySlug(slug);

        // Merge selectedSeoVariant into page.seo if it exists
        const pageData = response.data.data.page;
        const selectedVariant = response.data.data.selectedSeoVariant;

        if (selectedVariant) {
          // Use the selected variant's SEO data
          pageData.seo = {
            ...pageData.seo,
            metaTitle: selectedVariant.metaTitle || pageData.seo?.metaTitle,
            metaDescription: selectedVariant.metaDescription || pageData.seo?.metaDescription,
            metaKeywords: selectedVariant.metaKeywords || pageData.seo?.metaKeywords,
            ogTitle: selectedVariant.ogTitle || pageData.seo?.ogTitle,
            ogDescription: selectedVariant.ogDescription || pageData.seo?.ogDescription,
            ogImage: selectedVariant.ogImage || pageData.seo?.ogImage,
          };
          pageData._activeVariant = selectedVariant.name; // Store for debugging
        }

        setPage(pageData);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError(err.response?.data?.message || 'Page not found');

        // Redirect to 404 after a short delay
        setTimeout(() => {
          navigate('/404', { replace: true });
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!page) {
    return null;
  }

  // Get the appropriate template component
  const TemplateComponent = templateComponents[page.templateType] || GenericTemplate;

  // Prepare SEO meta tags
  const {
    metaTitle = page.title,
    metaDescription = '',
    metaKeywords = [],
    ogTitle = page.title,
    ogDescription = metaDescription,
    ogImage = '',
    canonicalUrl = '',
    noindex = false,
    nofollow = false
  } = page.seo || {};

  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaKeywords && metaKeywords.length > 0 && (
          <meta name="keywords" content={metaKeywords.join(', ')} />
        )}
        <meta name="robots" content={robotsContent} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle} />
        {ogDescription && <meta property="og:description" content={ogDescription} />}
        {ogImage && <meta property="og:image" content={ogImage} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        {ogDescription && <meta name="twitter:description" content={ogDescription} />}
        {ogImage && <meta name="twitter:image" content={ogImage} />}

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>

      <TemplateComponent content={page.content} page={page} />
    </>
  );
};

export default DynamicPage;
