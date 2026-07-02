import { Link, useSearchParams } from "react-router-dom";
import { Package, CheckCircle, Clock, PackageOpen } from "lucide-react";
import { dummyDashboardOrdersData, statusColors } from "../../assets/assets";

export default function OrdersPage() {
  const [searchParams] = useSearchParams();
  const showSuccess = searchParams.get("success") === "true";

  const orders = dummyDashboardOrdersData;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-app-success/10 border border-app-success/20 rounded-2xl p-6 mb-8 flex items-start gap-4 animate-slide-in-up">
          <CheckCircle className="size-8 text-app-success shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-app-green">Order Placed Successfully!</h2>
            <p className="text-sm text-zinc-600 mt-1">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 mt-3 text-sm text-app-orange hover:underline font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-app-green">My Orders</h1>
          <p className="text-zinc-500 mt-1">Track and manage your orders</p>
        </div>
        <Link
          to="/products"
          className="px-4 py-2.5 bg-app-orange hover:bg-app-orange-dark text-white text-sm font-medium rounded-xl transition-colors"
        >
          Shop Again
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="size-24 bg-app-cream rounded-3xl flex-center mx-auto mb-6">
            <PackageOpen className="size-12 text-zinc-400" />
          </div>
          <h2 className="text-xl font-bold text-app-green mb-2">No Orders Yet</h2>
          <p className="text-zinc-500 mb-6">
            You haven't placed any orders yet. Start shopping!
          </p>
          <Link
            to="/products"
            className="inline-flex px-8 py-3.5 bg-app-orange hover:bg-app-orange-dark text-white font-medium rounded-xl transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-app-border p-6 hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-app-border">
                <div>
                  <p className="text-xs text-zinc-500">Order ID</p>
                  <p className="text-sm font-mono text-app-text">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Placed on</p>
                  <p className="text-sm font-medium">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    statusColors[order.status] || "bg-zinc-100 text-zinc-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="size-14 bg-app-cream rounded-xl flex-center p-2 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-zinc-500">Qty: {item.quantity} × {item.unit}</p>
                    </div>
                    <span className="text-sm font-medium">
                      Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-app-border">
                <div className="flex items-center gap-4 text-sm text-zinc-600">
                  <span className="flex items-center gap-1">
                    <Package className="size-4" />
                    {order.items.length} items
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {order.status === "Delivered" ? "Delivered" : "In Progress"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Total</p>
                  <p className="text-lg font-bold text-app-green">
                    Rp{Math.round(order.total).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
