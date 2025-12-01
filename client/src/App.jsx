import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import QualifyingPage from "./pages/QualifyingPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import ProductsPage from "./pages/ProductsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import FAQPage from "./pages/FAQPage";
import LicenseAgreementPage from "./pages/LicenseAgreementPage";
import AmlKycPolicyPage from "./pages/AmlKycPolicyPage";
import DynamicPage from "./pages/DynamicPage";

// Admin imports
import ProtectedRoute from "./components/admin/ProtectedRoute";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import PagesListPage from "./pages/admin/PagesListPage";
import PageEditorPage from "./pages/admin/PageEditorPage";
import TemplateManagerPage from "./pages/admin/TemplateManagerPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import SEODashboardPage from "./pages/admin/SEODashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/qualifying" element={<QualifyingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/license-agreement" element={<LicenseAgreementPage />} />
          <Route path="/aml-kyc-policy" element={<AmlKycPolicyPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pages"
            element={
              <ProtectedRoute>
                <PagesListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pages/new"
            element={
              <ProtectedRoute>
                <PageEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pages/edit/:id"
            element={
              <ProtectedRoute>
                <PageEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/templates"
            element={
              <ProtectedRoute>
                <TemplateManagerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/seo"
            element={
              <ProtectedRoute>
                <SEODashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Dynamic Pages Route - Must be last to catch all other routes */}
          <Route path="/:slug" element={<DynamicPage />} />
        </Routes>
      </Router>
  );
}

export default App;
