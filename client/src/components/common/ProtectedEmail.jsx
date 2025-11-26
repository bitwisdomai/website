import React, { useEffect, useRef } from "react";

// Convert string to HTML entities for additional bot protection
const stringToEntities = (str) => {
  return str.split('').map(char => `&#${char.charCodeAt(0)};`).join('');
};

const ProtectedEmail = ({ user, domain, className = "" }) => {
  const emailRef = useRef(null);

  useEffect(() => {
    // JavaScript Email Obfuscation
    const element = emailRef.current;
    if (element) {
      const username = element.getAttribute('data-user');
      const domainName = element.getAttribute('data-domain');

      // Construct email with HTML entity encoding for extra protection
      const email = `${username}@${domainName}`;
      const encodedEmail = stringToEntities(email);

      element.innerHTML = encodedEmail;

      // Set up click handler
      element.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = `mailto:${username}@${domainName}`;
      });
    }
  }, []);

  return (
    <a
      ref={emailRef}
      href="#"
      className={`email-protect text-cyan-400 hover:text-cyan-300 transition-colors ${className}`}
      data-user={user}
      data-domain={domain}
    >
      {/* Email will be populated by JavaScript with HTML entities */}
    </a>
  );
};

export default ProtectedEmail;
