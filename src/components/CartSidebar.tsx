import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useProductStore } from "../store/useProductStore";

const CartSidebar = () => {
  const { cart, updateQuantity, cartTotal, removeFromCart } = useProductStore();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  if (cart.length === 0) return null;

  return (
    <>
      {/* Mobile Floating Button */}
      {isMobile && !open && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed bottom-4 right-4 z-50 bg-[#415444] text-white px-4 py-2 rounded-full shadow-lg"
        >
          Cart ({cart.length})
        </button>
      )}

      <aside
        className={`${
          isMobile
            ? `fixed top-0 right-0 z-40 h-full w-80 bg-black border-l p-6 shadow-lg transform transition-transform ${
                open ? "translate-x-0" : "translate-x-full"
              }`
            : "lg:block hidden sticky top-28 self-start w-[28rem] p-6 bg-black shadow-md border rounded-xl"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">My Cart</h3>
          {isMobile && (
            <button onClick={() => setOpen(false)} className="text-gray-600">
              <FaTimes />
            </button>
          )}
        </div>

        <div className="flex-grow space-y-6 overflow-auto max-h-[60vh] pr-1">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover border"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  ${item.price.toFixed(2)}
                </p>
                <div className="mt-2 flex items-center justify-start">
                  <div className="flex items-center gap-4 bg-gray-100 rounded-full px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-lg text-gray-700 hover:text-black"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-lg text-gray-700 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:underline mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total & Checkout */}
        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between text-base">
            <span>Subtotal</span>
            <span>${cartTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>${cartTotal().toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-[#415444] hover:bg-[#354a3b] text-white py-3 rounded-lg text-center font-semibold">
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
