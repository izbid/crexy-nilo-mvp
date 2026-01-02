import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Settings, 
  Leaf, 
  ShieldCheck, 
  ChevronRight, 
  Info, 
  Package, 
  Heart,
  Truck,
  Layers,
  CheckCircle,
  Menu,
  X,
  Plus,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Theme Constants ---
const COLORS = {
  emerald: '#064e3b',
  stone: '#f5f5f4',
  amber: '#fef3c7',
  charcoal: '#1c1917'
};

// --- Mock Data ---
const MATERIALS = [
  { id: 'apple', name: 'Apple Skin Leather', color: 'bg-[#5c1a1a]', description: 'Bio-waste from Tyrolian apples.', price: 15, impact: '-35% CO2' },
  { id: 'lemon', name: 'Lemon Skin Leather', color: 'bg-[#eab308]', description: 'Citrus-based architectural fiber.', price: 20, impact: '-40% CO2' },
  { id: 'recycled', name: 'Recycled Faux', color: 'bg-[#292524]', description: 'GRS Certified ocean plastics.', price: 10, impact: '-25% CO2' },
];

const CATEGORIES = [
  { id: 'wallet', name: 'Wallets', basePrice: 45, icon: <Layers size={18} /> },
  { id: 'belt', name: 'Belts', basePrice: 35, icon: <Settings size={18} /> },
  { id: 'handbag', name: 'Handbags', basePrice: 120, icon: <ShoppingBag size={18} /> },
  { id: 'pet', name: 'Pet Collars', basePrice: 25, icon: <Heart size={18} />, note: "Custom Only" },
];

const SHOP_PRODUCTS = [
  { id: 1, name: 'Heritage Wallet', price: 45, category: 'Wallets', mat: 'Apple Skin', col: 'bg-[#4c1d1d]', image: 'W1' },
  { id: 2, name: 'Slim Fold Wallet', price: 40, category: 'Wallets', mat: 'Recycled Faux', col: 'bg-stone-800', image: 'W2' },
  { id: 3, name: 'Signature Tote', price: 180, category: 'Bags', mat: 'Lemon Skin', col: 'bg-yellow-700', image: 'B1' },
  { id: 4, name: 'Everyday Backpack', price: 145, category: 'Bags', mat: 'Apple Skin', col: 'bg-stone-700', image: 'B2' },
  { id: 5, name: 'Crescent Clutch', price: 85, category: 'Bags', mat: 'Recycled Faux', col: 'bg-stone-900', image: 'B3' },
  { id: 6, name: 'Classic Waist Belt', price: 35, category: 'Belts', mat: 'Lemon Skin', col: 'bg-amber-600', image: 'L1' },
  { id: 7, name: 'Formal Stitch Belt', price: 55, category: 'Belts', mat: 'Apple Skin', col: 'bg-red-950', image: 'L2' },
];

const App = () => {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [builderState, setBuilderState] = useState({
    category: CATEGORIES[0],
    material: MATERIALS[0],
    initials: '',
  });

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartId: Date.now() }]);
    setView('cart');
  };

  // --- Sub-Components ---
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-[#f5f5f4]/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
        <div className="w-9 h-9 bg-[#064e3b] flex items-center justify-center rounded-sm">
          <span className="text-[#fef3c7] font-bold text-lg tracking-tighter">CN</span>
        </div>
        <h1 className="font-serif font-bold text-xl tracking-tight text-[#064e3b] hidden sm:block">Crexy&Nilo</h1>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6 text-[11px] uppercase tracking-widest font-bold text-stone-500">
          <button onClick={() => setView('shop')} className={`hover:text-[#064e3b] ${view === 'shop' ? 'text-[#064e3b]' : ''}`}>Shop</button>
          <button onClick={() => setView('builder')} className={`hover:text-[#064e3b] ${view === 'builder' ? 'text-[#064e3b]' : ''}`}>Customizer</button>
          <button className="hover:text-[#064e3b]">Transparency</button>
        </div>
        <button onClick={() => setView('cart')} className="relative group">
          <ShoppingBag size={20} className="text-stone-800 group-hover:text-[#064e3b] transition-colors" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#064e3b] text-[#fef3c7] text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );

  const ShopView = () => {
    const filteredProducts = activeFilter === 'All' 
      ? SHOP_PRODUCTS 
      : SHOP_PRODUCTS.filter(p => p.category === activeFilter);

    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto py-12 px-6"
      >
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-serif text-stone-900 mb-2">Capsule Collection</h2>
            <p className="text-stone-500 font-medium">Ready-to-wear essentials crafted from bio-materials.</p>
          </div>
          
          {/* Functional Sub-tabs */}
          <div className="flex bg-stone-100 p-1 rounded-full w-fit">
            {['All', 'Wallets', 'Bags', 'Belts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === tab 
                    ? 'bg-white text-[#064e3b] shadow-sm' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                layout
                key={prod.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer"
              >
                <div className={`aspect-[4/5] rounded-sm ${prod.col} mb-4 relative overflow-hidden flex items-center justify-center shadow-sm`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <button 
                    onClick={() => addToCart({ ...prod, details: prod.mat })}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#064e3b] px-6 py-3 text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-xl"
                  >
                    Add to Bag
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-lg text-stone-900">{prod.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mt-1">{prod.mat}</p>
                  </div>
                  <p className="font-bold text-[#064e3b]">£{prod.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  const Builder = () => {
    const totalPrice = builderState.category.basePrice + builderState.material.price;
    
    return (
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Visual Canvas */}
          <div className="flex-1 lg:sticky lg:top-32 h-fit">
            <div className="aspect-square bg-white border border-stone-200 rounded-sm flex flex-col items-center justify-center p-12 relative shadow-2xl shadow-stone-200/50">
              <motion.div 
                animate={{ backgroundColor: builderState.material.color.replace('bg-', '') }}
                className={`w-72 h-72 ${builderState.material.color} shadow-2xl relative flex items-center justify-center`}
              >
                <div className="absolute inset-4 border border-white/10" />
                {builderState.initials && (
                  <span className="text-white/30 font-serif text-5xl uppercase tracking-[0.5em] select-none">
                    {builderState.initials}
                  </span>
                )}
              </motion.div>
              <div className="mt-12 text-center">
                <span className="text-[10px] uppercase font-black text-stone-400 tracking-[0.3em]">Your Design</span>
                <h3 className="text-2xl font-serif mt-2">Custom {builderState.category.name}</h3>
                <p className="text-xl font-bold text-[#064e3b] mt-1">£{totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Config Panel */}
          <div className="flex-1 space-y-12">
            <header>
              <h2 className="text-3xl font-serif text-stone-900 mb-2">The Studio</h2>
              <p className="text-stone-500 text-sm">Every piece is built-to-order. Estimated turnover: 2-4 weeks.</p>
            </header>

            <section>
              <h4 className="text-[10px] uppercase font-black text-stone-400 tracking-widest mb-6">01. Silhouette</h4>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setBuilderState({...builderState, category: cat})}
                    className={`flex items-center justify-between p-5 rounded-sm border transition-all ${
                      builderState.category.id === cat.id ? 'border-[#064e3b] bg-white shadow-md' : 'border-stone-200 bg-stone-50'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-tight">{cat.name}</span>
                    {cat.icon}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-[10px] uppercase font-black text-stone-400 tracking-widest mb-6">02. Bio-Material Selection</h4>
              <div className="space-y-3">
                {MATERIALS.map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => setBuilderState({...builderState, material: mat})}
                    className={`w-full flex items-center gap-5 p-5 rounded-sm border transition-all text-left ${
                      builderState.material.id === mat.id ? 'border-[#064e3b] bg-white shadow-md' : 'border-stone-200 bg-stone-50'
                    }`}
                  >
                    <div className={`w-12 h-12 ${mat.color} border border-black/5 shadow-inner`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-black uppercase tracking-tighter">{mat.name}</p>
                        <span className="text-[10px] text-emerald-600 font-bold">{mat.impact} Impact</span>
                      </div>
                      <p className="text-[11px] text-stone-500">{mat.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-[10px] uppercase font-black text-stone-400 tracking-widest mb-6">03. Personalization</h4>
              <div className="p-6 bg-stone-50 border border-stone-200">
                <label className="text-[9px] uppercase font-black text-stone-400 tracking-widest block mb-2">Initials (Max 3 Characters)</label>
                <input 
                  type="text" 
                  maxLength={3}
                  placeholder="C.N"
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-stone-800 focus:outline-none focus:border-[#064e3b] transition-colors"
                  value={builderState.initials}
                  onChange={(e) => setBuilderState({...builderState, initials: e.target.value})}
                />
              </div>
            </section>

            <button 
              onClick={() => addToCart({
                name: `Custom ${builderState.category.name}`,
                details: `${builderState.material.name} | Initials: ${builderState.initials || 'None'}`,
                price: totalPrice,
                color: builderState.material.color
              })}
              className="w-full bg-[#064e3b] text-[#fef3c7] py-6 rounded-sm font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-[#043d2e] transition-all"
            >
              Add to Bag — £{totalPrice}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Cart = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto py-16 px-6"
    >
      <h3 className="text-3xl font-serif text-stone-900 mb-10">Your Selection</h3>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 border border-stone-200">
          <p className="text-stone-400 text-sm italic font-serif">Your bag is currently empty.</p>
          <button onClick={() => setView('shop')} className="mt-6 text-[#064e3b] font-black text-[10px] uppercase tracking-widest border-b border-[#064e3b] pb-1">Begin Exploring</button>
        </div>
      ) : (
        <div className="space-y-8">
          {cart.map((item) => (
            <div key={item.cartId} className="flex gap-6 pb-8 border-b border-stone-100">
              <div className={`w-24 h-24 ${item.color || 'bg-stone-200'} shadow-sm`} />
              <div className="flex-1">
                <div className="flex justify-between font-serif text-xl">
                  <span>{item.name}</span>
                  <span className="font-sans font-bold text-base">£{item.price}</span>
                </div>
                <p className="text-[10px] uppercase font-bold text-stone-400 mt-2">{item.details}</p>
                <button 
                  onClick={() => setCart(cart.filter(c => c.cartId !== item.cartId))}
                  className="text-[9px] text-red-800 font-black uppercase mt-4 opacity-50 hover:opacity-100 transition-opacity"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}
          <div className="pt-8">
            <div className="flex justify-between text-2xl font-serif text-stone-900 mb-8">
              <span>Total</span>
              <span className="font-sans font-bold">£{cart.reduce((s, i) => s + i.price, 0)}</span>
            </div>
            <button className="w-full bg-[#064e3b] text-[#fef3c7] py-6 rounded-sm font-black text-xs uppercase tracking-[0.3em]">
              Checkout securely
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  const Home = () => (
    <div className="overflow-hidden">
      <section className="relative h-[85vh] flex items-center bg-[#f5f5f4]">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#064e3b] mb-4 block">Spring Capsule '25</span>
            <h1 className="text-6xl md:text-8xl font-serif text-stone-900 leading-[0.9] mb-8">
              Luxury <br /> Without <br /> <span className="text-[#064e3b] italic">Consequence.</span>
            </h1>
            <p className="max-w-md text-stone-500 text-sm leading-relaxed mb-10">
              Ethically crafted accessories using upcycled bio-materials. Crexy&Nilo redefines affordable luxury for the conscious generation.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setView('builder')} className="bg-[#064e3b] text-[#fef3c7] px-8 py-4 text-[10px] font-black uppercase tracking-widest shadow-xl">Start Design</button>
              <button onClick={() => setView('shop')} className="border border-stone-300 px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors">Shop Now</button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="w-full aspect-[4/5] bg-[#064e3b] rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-12 border border-white/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transparency Stats */}
      <section className="bg-[#064e3b] py-24 px-6 text-[#fef3c7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div>
            <p className="text-5xl font-serif mb-3">35%</p>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Less Carbon than Cow Leather</p>
          </div>
          <div>
            <p className="text-5xl font-serif mb-3">5x</p>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Less Water Consumption</p>
          </div>
          <div>
            <p className="text-5xl font-serif mb-3">100%</p>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Certified Vegan Materials</p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-stone-900 selection:bg-[#fef3c7] selection:text-[#064e3b]">
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' && <Home key="home" />}
          {view === 'builder' && <Builder key="builder" />}
          {view === 'shop' && <ShopView key="shop" />}
          {view === 'cart' && <Cart key="cart" />}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-stone-200 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl mb-4">Crexy&Nilo</h3>
            <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
              Sustainable affordable fashion for all ages. Made with love in vetted, ethical micro-factories.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-6">Explore</h5>
            <ul className="text-[11px] font-bold space-y-3 text-stone-500 uppercase tracking-tighter">
              <li className="hover:text-[#064e3b] cursor-pointer" onClick={() => setView('shop')}>Collection</li>
              <li className="hover:text-[#064e3b] cursor-pointer" onClick={() => setView('builder')}>Custom Studio</li>
              <li className="hover:text-[#064e3b] cursor-pointer">Impact Report</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-6">Follow</h5>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-[#fef3c7] transition-colors cursor-pointer text-stone-600">
                <span className="font-serif italic text-sm">ig</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-[#fef3c7] transition-colors cursor-pointer text-stone-600">
                <span className="font-serif italic text-sm">tk</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;