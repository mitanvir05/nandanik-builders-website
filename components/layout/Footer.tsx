import Link from "next/link";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { navLinks, services } from "@/data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-6">
          {/* Brand & About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-white">
              NANDANIK
            </h3>
            <p className="text-sm text-gray-300 font-medium pb-2">
              BUILDERS LTD
            </p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Innovative Excellence in Precast Pile Driving Technologies.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2 inline-block text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors text-sm flex items-center"
                  >
                    <span className="mr-2 text-accent text-xs">▹</span>{" "}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2 inline-block text-white">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-400 hover:text-accent transition-colors text-sm flex items-center"
                  >
                    <span className="mr-2 text-accent text-xs">▹</span>{" "}
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Map */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2 inline-block text-white">
              Contact Us
            </h4>
            <ul className="space-y-4 mb-6">
              {/* Embedded Google Map iframe */}
              <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-700/50 hover:border-accent transition-colors group relative">
                {/* Invisible overlay link so clicking the map opens the app/full site */}
                <a
                  href="https://maps.app.goo.gl/V9Hi2PkSukn7Som49"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label="Open Map"
                ></a>
                <iframe
                  src="https://maps.google.com/maps?q=Saiham%20Sky%20View%20Tower,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none  opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-colors duration-500"
                ></iframe>
              </div>
              <li className="flex items-start">
                <FiMapPin
                  className="text-accent mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                {/* Made the address a clickable link to your Google Maps URL */}
                <a
                  href="https://maps.app.goo.gl/V9Hi2PkSukn7Som49"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                  title="View on Google Maps"
                >
                  Saiham Sky View Tower (C-10)
                  <br />
                  195, Sayed Nazrul Islam Sarani
                  <br />
                  Bijoynagar, Dhaka-1000
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-accent mr-3 flex-shrink-0" size={18} />
                <a
                  href="tel:+8801234567890"
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                  +880 1234 567 890
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="text-accent mr-3 flex-shrink-0" size={18} />
                <a
                  href="mailto:nandanikbuilders@gmail.com"
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                  nandanikbuilders@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-2 border-t border-gray-800 flex flex-col items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Nandanik Builders Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
