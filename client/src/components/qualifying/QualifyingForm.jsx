import React, { useState } from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaIdCard,
  FaUsers,
  FaGlobe,
  FaDollarSign,
  FaFileUpload,
  FaPaperPlane,
  FaTimes
} from "react-icons/fa";
import ParticleNetwork from "../about/ParticleNetwork";

const QualifyingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    businessType: "",
    registrationNumber: "",
    registrationJurisdiction: "",
    beneficialOwners: "",
    nationality: "",
    corporateStructure: "",
    sourceOfFunds: "",
    intendedUse: "",
    taxId: "",
    acceptedTerms: false,
  });

  const [files, setFiles] = useState({
    photoId: null,
    articlesOfIncorporation: null,
    certificateOfIncorporation: null,
    proofOfAddress: null,
  });

  const [fileNames, setFileNames] = useState({
    photoId: "",
    articlesOfIncorporation: "",
    certificateOfIncorporation: "",
    proofOfAddress: "",
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({ ...files, [fieldName]: file });
      setFileNames({ ...fileNames, [fieldName]: file.name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object for file uploads
    const submitData = new FormData();

    // Append form fields
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });

    // Append files
    Object.keys(files).forEach(key => {
      if (files[key]) {
        submitData.append(key, files[key]);
      }
    });

    // Handle form submission logic here
    console.log("Form submitted:", formData);
    console.log("Files:", files);

    // You can add API call here
    // Example: await axios.post('/api/qualifying-customer', submitData);

    alert("Application submitted successfully! We'll review your information and get back to you soon.");
    if (onClose) onClose();
  };

  const businessTypes = [
    "LLC (Limited Liability Company)",
    "Corporation",
    "Sole Proprietorship",
    "Partnership",
    "S Corporation",
    "C Corporation",
    "Non-Profit Organization",
    "Other"
  ];

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-4 md:px-6 flex items-start sm:items-center justify-center">
        <div className="relative bg-[#0E0E0E] border border-cyan-400/30 rounded-xl max-w-5xl w-full my-4 sm:my-8">
          {/* Particle Network Animation */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <ParticleNetwork />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 text-gray-400 hover:text-cyan-400 transition-colors p-2"
            aria-label="Close form"
          >
            <FaTimes className="text-xl sm:text-2xl" />
          </button>

          <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 pr-8 sm:pr-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-300 mb-2 sm:mb-3">
                Qualifying Customer Application
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                Join Our Network - Complete this form to become a qualifying BitWisdom customer
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Business Information Section */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 sm:mb-4">Business Information</h3>

                {/* Full Legal Business Entity Name */}
                <div>
                  <label htmlFor="businessName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Full Legal Business Entity Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/50 text-sm" />
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                      placeholder="Enter full legal business name"
                    />
                  </div>
                </div>

                {/* Business Address */}
                <div>
                  <label htmlFor="businessAddress" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Full Physical Business Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-cyan-400/50 text-sm" />
                    <textarea
                      id="businessAddress"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none"
                      placeholder="Enter complete physical business address where the business operates"
                    ></textarea>
                  </div>
                </div>

                {/* Business Type and Registration Number Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Business Type */}
                  <div>
                    <label htmlFor="businessType" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      Business Type <span className="text-cyan-400">*</span>
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Business Registration Number */}
                  <div>
                    <label htmlFor="registrationNumber" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      Business Registration # <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/50 text-sm" />
                      <input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                        placeholder="Registration number"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Registration Jurisdiction */}
                <div>
                  <label htmlFor="registrationJurisdiction" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Business Registration Jurisdiction <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="registrationJurisdiction"
                    name="registrationJurisdiction"
                    value={formData.registrationJurisdiction}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                    placeholder="State/Country where business is registered"
                  />
                </div>

                {/* Tax Identification Number */}
                <div>
                  <label htmlFor="taxId" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Tax ID (TIN/EIN/SSN) <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="taxId"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                    placeholder="Enter TIN, EIN, or SSN"
                  />
                </div>
              </div>

              {/* Ownership Information Section */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 sm:mb-4">Ownership Information</h3>

                {/* Beneficial Owners */}
                <div>
                  <label htmlFor="beneficialOwners" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Beneficial Owners & Ownership Percentage <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <FaUsers className="absolute left-4 top-4 text-cyan-400/50 text-sm" />
                    <textarea
                      id="beneficialOwners"
                      name="beneficialOwners"
                      value={formData.beneficialOwners}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none"
                      placeholder="List full names and ownership percentages (e.g., John Doe - 51%, Jane Smith - 49%)"
                    ></textarea>
                  </div>
                </div>

                {/* Nationality/Country of Residence */}
                <div>
                  <label htmlFor="nationality" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Nationality/Country of Residence <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/50 text-sm" />
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                      placeholder="Country of residence for beneficial owners"
                    />
                  </div>
                </div>

                {/* Corporate Structure */}
                <div>
                  <label htmlFor="corporateStructure" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Corporate Structure <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="corporateStructure"
                    name="corporateStructure"
                    value={formData.corporateStructure}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none"
                    placeholder="Describe corporate structure (partners, shareholders, directors, etc.)"
                  ></textarea>
                </div>
              </div>

              {/* Financial Information Section */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 sm:mb-4">Financial Information</h3>

                {/* Source of Funds/Wealth */}
                <div>
                  <label htmlFor="sourceOfFunds" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Source of Funds/Wealth <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-4 top-4 text-cyan-400/50 text-sm" />
                    <textarea
                      id="sourceOfFunds"
                      name="sourceOfFunds"
                      value={formData.sourceOfFunds}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none"
                      placeholder="Describe how the business earns its income or wealth"
                    ></textarea>
                  </div>
                </div>

                {/* Intended Use of Service */}
                <div>
                  <label htmlFor="intendedUse" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Intended Use of the Service <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="intendedUse"
                    name="intendedUse"
                    value={formData.intendedUse}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none"
                    placeholder="Describe how you intend to use BitWisdom's services"
                  ></textarea>
                </div>
              </div>

              {/* Document Uploads Section */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 sm:mb-4">Required Documents</h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Please upload clear, legible copies of the following documents:</p>

                {/* Photo ID Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Government-Issued Photo ID <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="photoId"
                      onChange={(e) => handleFileChange(e, "photoId")}
                      accept="image/*,.pdf"
                      required
                      className="hidden"
                    />
                    <label
                      htmlFor="photoId"
                      className="flex items-center justify-center w-full bg-black/50 border border-cyan-400/30 rounded-lg px-3 sm:px-4 py-3 sm:py-4 cursor-pointer hover:border-cyan-400 transition-all duration-300"
                    >
                      <FaFileUpload className="text-cyan-400 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300 text-center break-words">
                        {fileNames.photoId || "Upload passport or driver's license"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Articles of Incorporation Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Articles of Incorporation <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="articlesOfIncorporation"
                      onChange={(e) => handleFileChange(e, "articlesOfIncorporation")}
                      accept="image/*,.pdf"
                      required
                      className="hidden"
                    />
                    <label
                      htmlFor="articlesOfIncorporation"
                      className="flex items-center justify-center w-full bg-black/50 border border-cyan-400/30 rounded-lg px-3 sm:px-4 py-3 sm:py-4 cursor-pointer hover:border-cyan-400 transition-all duration-300"
                    >
                      <FaFileUpload className="text-cyan-400 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300 text-center break-words">
                        {fileNames.articlesOfIncorporation || "Upload Articles of Incorporation"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Certificate of Incorporation Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Certificate of Incorporation or Business Registration <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="certificateOfIncorporation"
                      onChange={(e) => handleFileChange(e, "certificateOfIncorporation")}
                      accept="image/*,.pdf"
                      required
                      className="hidden"
                    />
                    <label
                      htmlFor="certificateOfIncorporation"
                      className="flex items-center justify-center w-full bg-black/50 border border-cyan-400/30 rounded-lg px-3 sm:px-4 py-3 sm:py-4 cursor-pointer hover:border-cyan-400 transition-all duration-300"
                    >
                      <FaFileUpload className="text-cyan-400 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300 text-center break-words">
                        {fileNames.certificateOfIncorporation || "Upload Certificate of Incorporation"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Proof of Address Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Proof of Business Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="proofOfAddress"
                      onChange={(e) => handleFileChange(e, "proofOfAddress")}
                      accept="image/*,.pdf"
                      required
                      className="hidden"
                    />
                    <label
                      htmlFor="proofOfAddress"
                      className="flex items-center justify-center w-full bg-black/50 border border-cyan-400/30 rounded-lg px-3 sm:px-4 py-3 sm:py-4 cursor-pointer hover:border-cyan-400 transition-all duration-300"
                    >
                      <FaFileUpload className="text-cyan-400 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300 text-center break-words">
                        {fileNames.proofOfAddress || "Upload utility bill, bank statement, or official filing (dated within 3 months)"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptedTerms"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-cyan-400/30 bg-black/50 text-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="acceptedTerms" className="text-xs sm:text-sm text-gray-300 cursor-pointer">
                    I agree to the{" "}
                    <a
                      href="/license-agreement"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms and Conditions of License Agreement
                    </a>
                    <span className="text-cyan-400"> *</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2 sm:pt-4">
                <button
                  type="submit"
                  className="group bg-cyan-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-cyan-300 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={!formData.acceptedTerms}
                >
                  Submit Application
                  <FaPaperPlane className="text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualifyingForm;
