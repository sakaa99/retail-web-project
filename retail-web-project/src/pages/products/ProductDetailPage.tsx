import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { dummyProducts, categoriesData } from "../../assets/assets";
import DummyReviewsSection from "../../assets/DummyReviewsSection";
import type { Product } from "../../types";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = dummyProducts.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-app-green mb-4">Product Not Found</h2>
        <p className="text-zinc-500 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="text-app-orange hover:underline font-medium">
          Browse Products
        </Link>
      </div>
    );
  }

  const relatedProducts = dummyProducts
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  const cartItem = items.find((i) => i.product._id === product._id);
  const currentQty = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  const categoryName = categoriesData.find((c) => c.slug === product.category)?.name || product.category;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link to="/" className="hover:text-app-orange">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-app-orange">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-app-orange">
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-app-text font-medium truncate">{product.name}</span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-app-orange mb-6 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>

      {/* Product Main */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="bg-app-cream rounded-3xl p-8 aspect-square flex-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-app-orange bg-app-orange/10 px-3 py-1 rounded-full">
              {categoryName}
            </span>
            {product.isOrganic && (
              <span className="text-xs font-medium text-app-green bg-app-green/10 px-3 py-1 rounded-full">
                Organic
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-app-green mb-3">
            {product.name}
          </h1>

          <p className="text-zinc-600 mb-4">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-4 ${
                    s <= Math.round(product.rating)
                      ? "text-app-warning fill-app-warning"
                      : "text-app-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-zinc-400">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-app-green">
                Rp{product.price.toLocaleString("id-ID")}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-zinc-400 line-through">
                    Rp{product.originalPrice.toLocaleString("id-ID")}
                  </span>
                  <span className="text-sm font-medium text-app-orange bg-app-orange/10 px-2 py-0.5 rounded-lg">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-zinc-500 mt-1">Price per {product.unit}</p>
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-sm text-app-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-app-success" />
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-sm text-app-error flex items-center gap-1">
                <span className="size-2 rounded-full bg-app-error" />
                Out of Stock
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-zinc-600">Quantity:</span>
            <div className="flex items-center border border-app-border rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-app-cream transition-colors"
              >
                <Minus className="size-4" />
              </button>
              <span className="px-6 py-3 font-medium text-sm min-w-[60px] text-center border-x border-app-border">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-3 hover:bg-app-cream transition-colors"
              >
                <Plus className="size-4" />
              </button>
            </div>
            {currentQty > 0 && (
              <span className="text-xs text-zinc-500">
                {currentQty} in cart
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full py-4 bg-app-orange hover:bg-app-orange-dark disabled:bg-zinc-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
          >
            <ShoppingCart className="size-5" />
            Add to Cart — Rp{(product.price * quantity).toLocaleString("id-ID")}
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-app-cream rounded-2xl">
            <div className="text-center">
              <Truck className="size-6 text-app-green mx-auto mb-1" />
              <p className="text-xs font-medium">Free Delivery</p>
              <p className="text-xs text-zinc-500">Orders over $20</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="size-6 text-app-green mx-auto mb-1" />
              <p className="text-xs font-medium">Secure Pay</p>
              <p className="text-xs text-zinc-500">Safe checkout</p>
            </div>
            <div className="text-center">
              <RefreshCw className="size-6 text-app-green mx-auto mb-1" />
              <p className="text-xs font-medium">Easy Returns</p>
              <p className="text-xs text-zinc-500">7 days return</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <DummyReviewsSection product={product as Product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-app-green mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <Link
                key={p._id}
                to={`/products/${p._id}`}
                className="bg-white rounded-xl border border-app-border p-4 hover:shadow-lg transition-all group"
              >
                <div className="aspect-square bg-app-cream rounded-lg mb-3 flex-center p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-sm font-medium text-app-text line-clamp-2 mb-2">{p.name}</p>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="size-3 text-app-warning fill-app-warning" />
                  <span className="text-xs text-zinc-500">{p.rating}</span>
                </div>
                <span className="text-base font-bold text-app-green">
                  Rp{p.price.toLocaleString("id-ID")}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
