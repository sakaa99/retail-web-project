import { Link } from "react-router-dom";
import { Truck, Leaf, Clock, ShieldCheck, Star, TrendingUp, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { dummyProducts, categoriesData, heroSectionData } from "../assets/assets";
import type { Product } from "../types";

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-xl border border-app-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <Link to={`/products/${product._id}`} className="block">
        <div className="aspect-square bg-app-cream relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-app-orange text-white text-xs font-bold px-2 py-1 rounded-lg">
              -{product.discount}%
            </span>
          )}
          {product.isOrganic && (
            <span className="absolute top-2 right-2 bg-app-green text-white text-xs font-bold px-2 py-1 rounded-lg">
              Organic
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="font-medium text-app-text text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="size-3.5 text-app-warning fill-app-warning" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-zinc-400">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-app-green">
              Rp{product.price.toLocaleString("id-ID")}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-zinc-400 line-through">
                Rp{product.originalPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400 mt-1">{product.unit}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={() => addItem(product)}
          className="w-full py-2.5 bg-app-orange hover:bg-app-orange-dark text-white text-sm font-medium rounded-xl transition-colors"
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-app-green via-app-green to-app-green-lighter overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
                Belanja Kebutuhan <span className="text-app-orange">Harian</span> Jadi Lebih Mudah
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
                {heroSectionData.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                {heroSectionData.hero_features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
                    <feature.icon className="size-5 text-app-orange" />
                    <div>
                      <p className="text-sm font-medium">{feature.title}</p>
                      <p className="text-xs text-white/60">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="px-8 py-3.5 bg-app-orange hover:bg-app-orange-dark text-white font-medium rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  Shop Now <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl backdrop-blur-sm transition-colors"
                >
                  View Categories
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroSectionData.hero_image}
                  alt="Fresh groceries"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <Truck className="size-8 text-app-green" />
                  <div>
                    <p className="text-sm font-bold text-app-green">Free Delivery</p>
                    <p className="text-xs text-zinc-500">Orders over $20</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-app-green">Categories</h2>
            <p className="text-zinc-500 mt-1">Browse by product category</p>
          </div>
          <Link
            to="/products"
            className="text-app-orange hover:text-app-orange-dark font-medium text-sm flex items-center gap-1"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoriesData.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group bg-white rounded-2xl border border-app-border p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="size-20 mx-auto mb-3 bg-app-cream rounded-2xl flex-center p-3 group-hover:bg-app-orange/10 transition-colors">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-sm font-medium text-app-text group-hover:text-app-orange transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="bg-gradient-to-r from-app-orange/5 via-app-cream to-app-orange/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="size-7 text-app-orange" />
              <div>
                <h2 className="text-3xl font-serif font-bold text-app-green">Flash Deals</h2>
                <p className="text-zinc-500 mt-1">Limited time offers</p>
              </div>
            </div>
            <Link
              to="/products"
              className="text-app-orange hover:text-app-orange-dark font-medium text-sm flex items-center gap-1"
            >
              View All <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {dummyProducts
              .filter((p) => p.discount >= 10)
              .slice(0, 10)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-app-green">Featured Products</h2>
            <p className="text-zinc-500 mt-1">Best selling products this week</p>
          </div>
          <Link
            to="/products"
            className="text-app-orange hover:text-app-orange-dark font-medium text-sm flex items-center gap-1"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dummyProducts.slice(0, 10).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* App Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-app-green to-app-green-lighter rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Download TokoKita App
            </h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Get exclusive deals, real-time tracking, and the freshest selection
              delivered right to your door.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="px-6 py-3 bg-white text-app-green font-medium rounded-xl hover:bg-white/90 transition-colors text-sm">
                Google Play
              </a>
              <a href="#" className="px-6 py-3 bg-white/10 border border-white/30 text-white font-medium rounded-xl hover:bg-white/20 transition-colors text-sm">
                App Store
              </a>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-10">
            <Truck className="size-64" />
          </div>
        </div>
      </section>
    </div>
  );
}
