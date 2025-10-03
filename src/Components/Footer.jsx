function Footer() {
  return (
    <footer className="footer bg-gray-900 text-white py-12">
      <div className="footer-container max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section - Logo & About */}
        <div className="footer-section text-center md:text-left">
          <h2 className="footer-logo text-3xl font-extrabold mb-4 tracking-wide text-yellow-400 select-none">
            TechNova
          </h2>
          <p className="footer-about text-gray-400 leading-relaxed text-sm md:text-base max-w-md mx-auto md:mx-0">
            Premium quality laptops and accessories. Providing technology that empowers you to achieve more.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-section text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-yellow-300 transition-colors duration-300 font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="/Shop" className="hover:text-yellow-300 transition-colors duration-300 font-medium">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-300 transition-colors duration-300 font-medium">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-300 transition-colors duration-300 font-medium">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-section text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Contact</h3>
          <p className="text-gray-400 text-sm md:text-base">Email: <a href="mailto:support@yournova.com" className="hover:text-yellow-300 transition-colors duration-300">support@yournova.com</a></p>
          <p className="text-gray-400 text-sm md:text-base mt-1">Phone: <a href="tel:+923001234567" className="hover:text-yellow-300 transition-colors duration-300">+92 300 1234567</a></p>
          <div className="footer-socials flex justify-center md:justify-start space-x-5 mt-5 text-yellow-400 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-yellow-300 transition-colors duration-300"><i className="bi bi-facebook"></i></a>
            <a href="#" aria-label="Instagram" className="hover:text-yellow-300 transition-colors duration-300"><i className="bi bi-instagram"></i></a>
            <a href="#" aria-label="Twitter" className="hover:text-yellow-300 transition-colors duration-300"><i className="bi bi-twitter"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom text-center mt-10 border-t border-gray-700 pt-6 text-gray-500 text-xs md:text-sm select-none">
        <p>© {new Date().getFullYear()} TechNova. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
