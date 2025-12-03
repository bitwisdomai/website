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
  FaTimes,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// ✅ Prevents white page crash if file is missing
let ParticleNetwork;
try {
  ParticleNetwork = require("../about/ParticleNetwork").default;
} catch (e) {
  ParticleNetwork = () => null;
}

const QualifyingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    phoneNumber: "",
    emailAddress: "",
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
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
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

    const submitData = new FormData();
    Object.keys(formData).forEach((key) =>
      submitData.append(key, formData[key])
    );
    Object.keys(files).forEach((key) => {
      if (files[key]) submitData.append(key, files[key]);
    });

    alert("Application submitted successfully!");
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
    "Other",
  ];

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-4 md:px-6 flex items-start sm:items-center justify-center">
        <div className="relative bg-[#0E0E0E] border border-cyan-400/30 rounded-xl max-w-5xl w-full my-4 sm:my-8">
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <ParticleNetwork />
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 text-gray-400 hover:text-cyan-400 transition-colors p-2"
          >
            <FaTimes className="text-xl sm:text-2xl" />
          </button>

          <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="text-center mb-6 sm:mb-8 pr-8 sm:pr-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-300 mb-2 sm:mb-3">
                Qualifying Customer Application
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                Join our network by completing this form
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Business Information */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Business Name *
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/50" />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Business Address *
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-cyan-400/50" />
                    <textarea
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-white resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/50" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/50" />
                      <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                    >
                      <option value="">Select</option>
                      {(businessTypes ?? []).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Registration # *
                    </label>
                    <div className="relative">
                      <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/50" />
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/50 border border-cyan-400/30 rounded-lg pl-11 pr-4 py-3 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Registration Jurisdiction *
                  </label>
                  <input
                    type="text"
                    name="registrationJurisdiction"
                    value={formData.registrationJurisdiction}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Tax ID *
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              {/* Ownership */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Beneficial Owners *
                  </label>
                  <textarea
                    name="beneficialOwners"
                    value={formData.beneficialOwners}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Corporate Structure *
                  </label>
                  <textarea
                    name="corporateStructure"
                    value={formData.corporateStructure}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white resize-none"
                  />
                </div>
              </div>

              {/* Financial */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Source of Funds *
                  </label>
                  <textarea
                    name="sourceOfFunds"
                    value={formData.sourceOfFunds}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Intended Use *
                  </label>
                  <textarea
                    name="intendedUse"
                    value={formData.intendedUse}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-white resize-none"
                  />
                </div>
              </div>

              {/* Files */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4 md:p-6 space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Government ID *
                  </label>
                  <input
                    type="file"
                    id="photoId"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "photoId")}
                    accept="image/*,.pdf"
                    required
                  />
                  <label
                    htmlFor="photoId"
                    className="cursor-pointer flex items-center justify-center w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 hover:border-cyan-400"
                  >
                    <FaFileUpload className="text-cyan-400 mr-3" />
                    <span className="text-gray-300">
                      {fileNames.photoId || "Upload ID"}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Articles of Incorporation *
                  </label>
                  <input
                    type="file"
                    id="articlesOfIncorporation"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(e, "articlesOfIncorporation")
                    }
                    accept="image/*,.pdf"
                    required
                  />
                  <label
                    htmlFor="articlesOfIncorporation"
                    className="cursor-pointer flex items-center justify-center w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 hover:border-cyan-400"
                  >
                    <FaFileUpload className="text-cyan-400 mr-3" />
                    <span className="text-gray-300">
                      {fileNames.articlesOfIncorporation ||
                        "Upload Articles of Incorporation"}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Certificate of Incorporation *
                  </label>
                  <input
                    type="file"
                    id="certificateOfIncorporation"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(e, "certificateOfIncorporation")
                    }
                    accept="image/*,.pdf"
                    required
                  />
                  <label
                    htmlFor="certificateOfIncorporation"
                    className="cursor-pointer flex items-center justify-center w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 hover:border-cyan-400"
                  >
                    <FaFileUpload className="text-cyan-400 mr-3" />
                    <span className="text-gray-300">
                      {fileNames.certificateOfIncorporation ||
                        "Upload Certificate"}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Proof of Address *
                  </label>
                  <input
                    type="file"
                    id="proofOfAddress"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "proofOfAddress")}
                    accept="image/*,.pdf"
                    required
                  />
                  <label
                    htmlFor="proofOfAddress"
                    className="cursor-pointer flex items-center justify-center w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 hover:border-cyan-400"
                  >
                    <FaFileUpload className="text-cyan-400 mr-3" />
                    <span className="text-gray-300">
                      {fileNames.proofOfAddress || "Upload Proof of Address"}
                    </span>
                  </label>
                </div>
              </div>

              {/* TERMS */}
              <div className="border border-cyan-400/20 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptedTerms"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 accent-cyan-400"
                  />

                  <label
                    htmlFor="acceptedTerms"
                    className="text-gray-300 text-sm"
                  >
                    I agree to the{" "}
                    <Link
                      to="/license-agreement"
                      className="text-cyan-400 underline hover:text-cyan-300"
                    >
                      Terms and Conditions of License Agreement
                    </Link>
                    <span className="text-cyan-400"> *</span>
                  </label>
                </div>
              </div>

              {/* SUBMIT */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={!formData.acceptedTerms}
                  className="bg-cyan-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition shadow-lg hover:shadow-cyan-400/50 disabled:opacity-50"
                >
                  Submit Application
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
