import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  const deliveryFee = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="size-24 bg-app-cream rounded-3xl flex-center mx-auto mb-6">
            <ShoppingBag className="size-12 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold text-app-green mb-2">Your Cart is Empty</h2>
          <p className="text-zinc-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-app-orange hover:bg-app-orange-dark text-white font-medium rounded-xl transition-colors"
          >
            <ArrowLeft className="size-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-app-green">Shopping Cart</h1>
          <p className="text-zinc-500 mt-1">{items.length} items in your cart</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCart}
            className="px-4 py-2.5 text-sm text-app-error hover:bg-red-50 rounded-xl transition-colors"
          >
            Clear All
          </button>
          <Link
            to="/products"
            className="px-4 py-2.5 text-sm text-app-orange hover:bg-orange-50 rounded-xl transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-2xl border border-app-border p-4 flex gap-4 animate-fade-in"
            >
              {/* Product Image */}
              <Link
                to={`/products/${item.product._id}`}
                className="size-24 md:size-28 bg-app-cream rounded-xl flex-center shrink-0 p-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
              </Link>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${item.product._id}`}
                  className="text-sm font-medium text-app-text hover:text-app-orange line-clamp-1 transition-colors"
                >
                  {item.product.name}
                </Link>
                <p className="text-xs text-zinc-500 mt-1">{item.product.category}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{item.product.unit}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-app-border rounded-xl">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-app-cream transition-colors"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center border-x border-app-border">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-app-cream transition-colors"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold text-app-green">
                      Rp{(item.product.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                    <p className="text-xs text-zinc-400">
                      Rp{item.product.price.toLocaleString("id-ID")} / {item.product.unit}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="mt-2 text-xs text-app-error hover:text-red-700 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-app-border p-6 sticky top-32">
            <h3 className="font-semibold text-lg text-app-green mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4 pb-4 border-b border-app-border">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Subtotal</span>
                <span className="font-medium">Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Delivery Fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-app-success">FREE</span>
                  ) : (
                    `Rp${deliveryFee.toLocaleString("id-ID")}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Tax (8%)</span>
                <span className="font-medium">Rp{Math.round(tax).toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-app-text">Total</span>
              <span className="text-2xl font-bold text-app-green">
                Rp{Math.round(total).toLocaleString("id-ID")}
              </span>
            </div>

            <Link
              to="/checkout"
              className="w-full py-3.5 bg-app-orange hover:bg-app-orange-dark text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <ShieldCheck className="size-5" />
              Proceed to Checkout
            </Link>

            {subtotal < 200 && (
              <p className="text-xs text-zinc-500 text-center">
                Add Rp{(200 - subtotal).toLocaleString("id-ID")} more for free delivery
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
