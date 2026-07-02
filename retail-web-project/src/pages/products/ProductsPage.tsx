import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star, SlidersHorizontal, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { dummyProducts, categoriesData } from "../../assets/assets";
import type { Product } from "../../types";

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

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const activeCategory = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "default";

  const filteredProducts = useMemo(() => {
    let result = [...dummyProducts];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-app-green">
            {activeCategory
              ? categoriesData.find((c) => c.slug === activeCategory)?.name || "Products"
              : "All Products"}
          </h1>
          <p className="text-zinc-500 mt-1">{filteredProducts.length} products found</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="px-4 py-2.5 bg-white border border-app-border rounded-xl text-sm text-app-text focus:border-app-orange"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden p-2.5 border border-app-border rounded-xl hover:bg-app-cream"
          >
            <SlidersHorizontal className="size-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${
            showFilters ? "fixed inset-0 z-50 bg-black/50 flex" : "hidden"
          } md:relative md:block md:w-56 shrink-0`}
        >
          <div
            className={`${
              showFilters ? "w-72 bg-white h-full overflow-y-auto p-6" : ""
            } md:p-0`}
          >
            {showFilters && (
              <div className="flex items-center justify-between mb-4 md:hidden">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="size-5" />
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm text-app-text mb-3">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => updateFilter("category", "")}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !activeCategory
                      ? "bg-app-orange/10 text-app-orange font-medium"
                      : "text-zinc-600 hover:bg-app-cream"
                  }`}
                >
                  All Categories
                </button>
                {categoriesData.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => updateFilter("category", cat.slug)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-app-orange/10 text-app-orange font-medium"
                        : "text-zinc-600 hover:bg-app-cream"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 text-lg mb-4">No products found</p>
              <Link
                to="/products"
                className="text-app-orange hover:underline font-medium"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
