import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const shipping = subtotal > 80 ? 0 : 15;
  const total = subtotal + (subtotal > 0 ? shipping : 0);

  const handleCheckout = () => {
    soundEngine.playKeySound('clicky', false);
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        onClearCart();
        setOrderComplete(false);
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h3 className="text-xl font-bold text-neutral-950 font-sans tracking-tight">Your Cart</h3>
              <span className="text-xs font-mono px-2 py-0.5 bg-neutral-100 rounded-full text-neutral-600">
                {items.length} items
              </span>
            </div>

            <button
              onClick={() => {
                soundEngine.playKeySound('tactile', false);
                onClose();
              }}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="mt-6 max-h-[50vh] overflow-y-auto space-y-4 pr-1">
            {orderComplete ? (
              <div className="py-12 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
                <h4 className="mt-4 text-xl font-bold text-neutral-900">Order Confirmed!</h4>
                <p className="mt-2 text-xs text-neutral-500 font-mono">
                  Order #KT-9842 is being prepared for express acoustic tuning and dispatch.
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center text-neutral-400">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-30 mb-3" />
                <p className="text-sm font-medium">Your setup cart is currently empty.</p>
                <p className="text-xs font-mono mt-1 text-neutral-500">Explore our high-performance keyboards and custom accessories.</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-neutral-50 border border-neutral-200/80 rounded-xl flex items-center justify-between gap-4"
                >
                  <div>
                    <h5 className="text-sm font-bold text-neutral-900 leading-snug">
                      {item.product.name}
                    </h5>
                    {item.selectedSwitch && (
                      <p className="text-xs text-neutral-500 font-mono mt-0.5">
                        Switch: {item.selectedSwitch.name.replace('Keytron G Pro 3.0 ', '')}
                      </p>
                    )}
                    <div className="text-xs font-mono font-bold text-neutral-900 mt-2">
                      ${item.product.price} × {item.quantity}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playKeySound('tactile', false);
                      onRemoveItem(idx);
                    }}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && !orderComplete && (
          <div className="pt-6 border-t border-neutral-200 space-y-4">
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Express Insured Shipping</span>
                <span className="font-bold text-emerald-600">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>2-Year Manufacturer Warranty & 30-Day Acoustic Guarantee</span>
            </div>

            <button
              id="cart-checkout-btn"
              disabled={isCheckingOut}
              onClick={handleCheckout}
              className="w-full py-4 bg-neutral-950 hover:bg-[#ff5722] text-white rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
            >
              {isCheckingOut ? (
                <span className="animate-pulse">Processing Order...</span>
              ) : (
                <>
                  <span>Complete Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
