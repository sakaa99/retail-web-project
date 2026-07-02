import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Menu, X, Package } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-app-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-app-green text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span>🏪 Seller Centre · Become a Seller</span>
          <div className="flex items-center gap-4">
            <Link to="/orders" className="hover:text-app-orange transition-colors">Track Order</Link>
            <Link to="/profile" className="hover:text-app-orange transition-colors">My Account</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-app-text"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="size-9 bg-app-green rounded-lg flex-center">
              <Package className="size-5 text-white" />
            </div>
            <span className="font-serif text-xl text-app-green font-bold hidden sm:block">
              TokoKita
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories, brands..."
                className="w-full pl-4 pr-12 py-2.5 rounded-xl border-2 border-app-green/20 bg-app-cream text-sm focus:border-app-orange focus:bg-white transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 size-9 bg-app-orange rounded-lg flex-center text-white hover:bg-app-orange-dark transition-colors"
              >
                <Search className="size-4" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 text-app-text hover:text-app-orange transition-colors"
            >
              <ShoppingCart className="size-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-5 bg-app-orange text-white text-xs font-bold rounded-full flex-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              to="/profile"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-app-green/5 hover:bg-app-green/10 text-app-text transition-colors"
            >
              <User className="size-5" />
              <span className="text-sm font-medium hidden md:block">Login</span>
              <ChevronDown className="size-4 hidden md:block" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-app-border bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-app-cream text-sm" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block px-3 py-2 rounded-lg hover:bg-app-cream text-sm" onClick={() => setMobileMenuOpen(false)}>All Products</Link>
            <Link to="/cart" className="block px-3 py-2 rounded-lg hover:bg-app-cream text-sm" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            <Link to="/orders" className="block px-3 py-2 rounded-lg hover:bg-app-cream text-sm" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
            <Link to="/profile" className="block px-3 py-2 rounded-lg hover:bg-app-cream text-sm" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
          </div>
        </div>
      )}
    </header>
  );
}
