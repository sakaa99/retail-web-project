import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, CreditCard } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { dummyAddressData } from "../../assets/assets";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(dummyAddressData[0]._id);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate("/orders?success=true");
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-app-green mb-4">Your cart is empty</h2>
        <p className="text-zinc-500 mb-6">Add some items to your cart before checkout.</p>
        <Link
          to="/products"
          className="inline-flex px-8 py-3.5 bg-app-orange hover:bg-app-orange-dark text-white font-medium rounded-xl transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-app-green mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl border border-app-border p-6">
            <h3 className="font-semibold text-app-green mb-4 flex items-center gap-2">
              <MapPin className="size-5" />
              Shipping Address
            </h3>
            <div className="space-y-3">
              {dummyAddressData.map((addr) => (
                <label
                  key={addr._id}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedAddress === addr._id
                      ? "border-app-orange bg-app-orange/5"
                      : "border-app-border hover:border-app-green/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr._id}
                    checked={selectedAddress === addr._id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="mt-1 accent-app-orange"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-xs bg-app-green/10 text-app-green px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600 mt-1">
                      {addr.address}, {addr.city}, {addr.state} {addr.zip}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-app-border p-6">
            <h3 className="font-semibold text-app-green mb-4 flex items-center gap-2">
              <CreditCard className="size-5" />
              Payment Method
            </h3>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "cash"
                    ? "border-app-orange bg-app-orange/5"
                    : "border-app-border hover:border-app-green/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-app-orange"
                />
                <div>
                  <span className="font-medium text-sm">Cash on Delivery</span>
                  <p className="text-xs text-zinc-500 mt-0.5">Pay when you receive</p>
                </div>
              </label>
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-app-orange bg-app-orange/5"
                    : "border-app-border hover:border-app-green/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-app-orange"
                />
                <div>
                  <span className="font-medium text-sm">Credit/Debit Card</span>
                  <p className="text-xs text-zinc-500 mt-0.5">Visa, Mastercard, etc.</p>
                </div>
              </label>
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "bank"
                    ? "border-app-orange bg-app-orange/5"
                    : "border-app-border hover:border-app-green/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-app-orange"
                />
                <div>
                  <span className="font-medium text-sm">Bank Transfer</span>
                  <p className="text-xs text-zinc-500 mt-0.5">BCA, Mandiri, BNI</p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Items Review */}
          <div className="bg-white rounded-2xl border border-app-border p-6">
            <h3 className="font-semibold text-app-green mb-4">
              Items Review ({items.length})
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center gap-3 py-2 border-b border-app-border last:border-0"
                >
                  <div className="size-12 bg-app-cream rounded-lg flex-center p-2 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">
                    Rp{(item.product.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-app-border p-6 sticky top-32">
            <h3 className="font-semibold text-lg text-app-green mb-4">Summary</h3>

            <div className="space-y-3 mb-4 pb-4 border-b border-app-border">
              {items.map((item) => (
                <div key={item.product._id} className="flex justify-between text-sm">
                  <span className="text-zinc-600 truncate max-w-[160px]">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    Rp{(item.product.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-app-border">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Subtotal</span>
                <span className="font-medium">Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Delivery</span>
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
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-app-green">
                Rp{Math.round(total).toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-3.5 bg-app-orange hover:bg-app-orange-dark disabled:bg-zinc-300 text-white font-semibold rounded-xl transition-colors"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                "Place Order"
              )}
            </button>

            <p className="text-xs text-zinc-500 text-center mt-3">
              By placing this order, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
