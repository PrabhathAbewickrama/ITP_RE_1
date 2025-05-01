import React from "react";

function Footer() {
  return (
    <footer className="bg-[#1a202c] text-white py-10 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Info</h3>
          <ul>
            <li>Formats</li>
            <li>Compression</li>
            <li>Pricing</li>
            <li>FAQ</li>
            <li>Status</li>
            <li>Policy</li>
          </ul>
        </div>

        {/* Getting Started Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
          <ul>
            <li>Introduction</li>
            <li>Themes</li>
            <li>Documentation</li>
            <li>Usages</li>
            <li>Elements</li>
            <li>Global</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul>
            <li>API</li>
            <li>Form Validation</li>
            <li>Accessibility</li>
            <li>Marketplace</li>
            <li>Visibility</li>
            <li>Community</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">
            Subscribe to our newsletter for a weekly dose of news, updates,
            helpful tips, and exclusive offers.
          </p>
          <div className="flex space-x-2 mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-blue-600">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:text-blue-600">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="hover:text-blue-600">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-sm">
        <p>&copy; 2025 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
