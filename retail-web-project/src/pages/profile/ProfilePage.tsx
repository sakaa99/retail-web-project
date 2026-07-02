import { Link } from "react-router-dom";
import { Package, MapPin, CreditCard, Settings, LogOut, HelpCircle, ChevronRight, User } from "lucide-react";

const menuItems = [
  { icon: Package, label: "My Orders", to: "/orders", desc: "Track and manage orders" },
  { icon: MapPin, label: "Addresses", to: "#", desc: "Manage shipping addresses" },
  { icon: CreditCard, label: "Payment Methods", to: "#", desc: "Manage payment options" },
  { icon: Settings, label: "Account Settings", to: "#", desc: "Profile and preferences" },
  { icon: HelpCircle, label: "Help Center", to: "#", desc: "FAQs and support" },
];

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-app-green to-app-green-lighter rounded-3xl p-8 text-white mb-8">
        <div className="flex items-center gap-4">
          <div className="size-16 bg-white/20 rounded-2xl flex-center">
            <User className="size-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Welcome</h1>
            <p className="text-white/70 text-sm mt-1">Sign in to manage your account</p>
            <button className="mt-3 px-6 py-2 bg-white text-app-green text-sm font-medium rounded-xl hover:bg-white/90 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-3xl border border-app-border overflow-hidden">
        {menuItems.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="flex items-center gap-4 p-4 hover:bg-app-cream transition-colors border-b border-app-border last:border-0"
          >
            <div className="size-10 bg-app-cream rounded-xl flex-center">
              <item.icon className="size-5 text-app-green" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-zinc-500">{item.desc}</p>
            </div>
            <ChevronRight className="size-4 text-zinc-400" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full mt-4 p-4 bg-white rounded-2xl border border-app-border flex items-center justify-center gap-2 text-app-error hover:bg-red-50 transition-colors text-sm font-medium">
        <LogOut className="size-4" />
        Sign Out
      </button>
    </div>
  );
}
