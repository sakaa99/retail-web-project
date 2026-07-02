import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Package } from "lucide-react";
import { SiFacebook, SiX, SiInstagram } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="bg-app-green text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="size-10 bg-white/10 rounded-xl flex-center">
              <Package className="size-6 text-white" />
            </div>
            <span className="font-serif text-xl font-bold">TokoKita</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Belanja kebutuhan sehari-hari dengan mudah, aman, dan cepat. Dari
            supermarket terbaik langsung ke pintu Anda.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="size-9 bg-white/10 rounded-lg flex-center hover:bg-white/20 transition-colors">
              <SiFacebook className="size-4" />
            </a>
            <a href="#" className="size-9 bg-white/10 rounded-lg flex-center hover:bg-white/20 transition-colors">
              <SiX className="size-4" />
            </a>
            <a href="#" className="size-9 bg-white/10 rounded-lg flex-center hover:bg-white/20 transition-colors">
              <SiInstagram className="size-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link to="/products" className="text-white/70 hover:text-white text-sm transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-white/70 hover:text-white text-sm transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="text-white/70 hover:text-white text-sm transition-colors">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-white/70 hover:text-white text-sm transition-colors">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
            Customer Service
          </h3>
          <ul className="space-y-2.5">
            <li>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Payment Methods
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
            Contact Us
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-white/70 text-sm">
              <MapPin className="size-4 mt-0.5 shrink-0" />
              <span>Jl. Merdeka No. 123, Jakarta Pusat</span>
            </li>
            <li className="flex items-center gap-3 text-white/70 text-sm">
              <Phone className="size-4 shrink-0" />
              <span>+62 21 1234 5678</span>
            </li>
            <li className="flex items-center gap-3 text-white/70 text-sm">
              <Mail className="size-4 shrink-0" />
              <span>hello@tokokita.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© 2026 TokoKita. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
