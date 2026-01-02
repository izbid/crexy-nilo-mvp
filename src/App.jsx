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
    <nav className="sticky top-0 z-50 bg-[#f5f5f4]/80 backdrop-blur-md border-b border-stone-200 px-8 py-5 flex items-center justify-between w-full">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
        <div className="w-10 h-10 bg-[#064e3b] flex items-center justify-center rounded-sm">
          <span className="text-[#fef3c7] font-bold text-xl tracking-tighter">CN</span>
        </div>
        <h1 className="font-serif font-bold text-2xl tracking-tight text-[#064e3b] hidden sm:block">Crexy&Nilo</h1>
      </div>
      
      <div className="flex items-center gap-10">
        <div className="hidden md:flex gap-8 text-[12px] uppercase tracking-[0.2em] font-black text-stone-500">
          <button onClick={() => setView('shop')} className={`hover:text-[#064e3b] transition-colors ${view === 'shop' ? 'text-[#064e3b]' : ''}`}>Shop</button>
          <button onClick={() => setView('builder')} className={`hover:text-[#064e3b] transition-colors ${view === 'builder' ? 'text-[#064e3b]' : ''}`}>Custom Studio</button>
          <button className="hover:text-[#064e3b] transition-colors">Transparency</button>
        </div>
        <button onClick={() => setView('cart')} className="relative group p-1">
          <ShoppingBag size={24} className="text-stone-800 group-hover:text-[#064e3b] transition-colors" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#064e3b] text-[#fef3c7] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
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
        className="w-full px-8 md:px-12 py-16"
      >
        <div className="max-w-[1800px] mx-auto mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#064e3b] mb-4 block underline underline-offset-8">Browse All</span>
            <h2 className="text-5xl font-serif text-stone-900 mb-4">Capsule Collection</h2>
            <p className="text-stone-500 text-lg font-medium max-w-xl">Sustainable, ready-to-ship essentials crafted from our signature bio-materials.</p>
          </div>
          
          <div className="flex bg-stone-100 p-1.5 rounded-full w-fit shadow-inner">
            {['All', 'Wallets', 'Bags', 'Belts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === tab 
                    ? 'bg-white text-[#064e3b] shadow-md scale-105' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                layout
                key={prod.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group cursor-pointer"
              >
                <div className={`aspect-[3/4] rounded-sm ${prod.col} mb-6 relative overflow-hidden flex items-center justify-center shadow-md group-hover:shadow-2xl transition-all duration-500`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <button 
                    onClick={() => addToCart({ ...prod, details: prod.mat })}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-[#064e3b] px-8 py-4 text-[11px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-2xl"
                  >
                    Add to Bag
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-xl text-stone-900 group-hover:text-[#064e3b] transition-colors">{prod.name}</h4>
                    <p className="text-[11px] uppercase tracking-[0.2em] font-black text-stone-400 mt-2">{prod.mat}</p>
                  </div>
                  <p className="font-bold text-xl text-[#064e3b]">£{prod.price}</p>
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
      <div className="w-full px-8 md:px-16 py-16">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-20">
          {/* Visual Canvas - Full Height Column */}
          <div className="flex-1 lg:sticky lg:top-32 h-[calc(100vh-160px)] min-h-[600px]">
            <div className="w-full h-full bg-white border border-stone-200 rounded-sm flex flex-col items-center justify-center p-16 relative shadow-2xl shadow-stone-200/50 overflow-hidden">
              <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
                <span className="text-[120px] font-serif font-black text-stone-100 leading-none">BUILD</span>
              </div>
              <motion.div 
                animate={{ backgroundColor: builderState.material.color.replace('bg-', '') }}
                className={`w-[450px] max-w-full aspect-square ${builderState.material.color} shadow-2xl relative flex items-center justify-center transform hover:scale-105 transition-transform duration-700`}
              >
                <div className="absolute inset-6 border border-white/10" />
                {builderState.initials && (
                  <span className="text-white/20 font-serif text-7xl uppercase tracking-[0.4em] select-none">
                    {builderState.initials}
                  </span>
                )}
              </motion.div>
              <div className="mt-16 text-center">
                <span className="text-[12px] uppercase font-black text-stone-400 tracking-[0.5em] block mb-4 italic">Specifications Confirmed</span>
                <h3 className="text-4xl font-serif text-stone-900">Custom {builderState.category.name}</h3>
                <p className="text-3xl font-black text-[#064e3b] mt-4 tracking-tighter">£{totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Config Panel - Scrollable Column */}
          <div className="flex-1 space-y-16 py-10">
            <header>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600 block mb-4 underline">Bespoke Manufacturing</span>
              <h2 className="text-5xl font-serif text-stone-900 mb-6 leading-tight">Create Your Masterpiece</h2>
              <p className="text-stone-500 text-lg leading-relaxed max-w-lg">Every bespoke order is hand-finished in our vetted ethical workshops. Expect delivery within 2-4 weeks.</p>
            </header>

            <section>
              <h4 className="text-[12px] uppercase font-black text-stone-400 tracking-[0.3em] mb-8">Step 01. The Silhouette</h4>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setBuilderState({...builderState, category: cat})}
                    className={`flex items-center justify-between p-7 rounded-sm border-2 transition-all duration-300 ${
                      builderState.category.id === cat.id ? 'border-[#064e3b] bg-white shadow-xl scale-[1.02]' : 'border-stone-100 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-sm font-black uppercase tracking-wider">{cat.name}</span>
                    <div className={builderState.category.id === cat.id ? 'text-[#064e3b]' : 'text-stone-400'}>{cat.icon}</div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-[12px] uppercase font-black text-stone-400 tracking-[0.3em] mb-8">Step 02. The Material</h4>
              <div className="space-y-4">
                {MATERIALS.map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => setBuilderState({...builderState, material: mat})}
                    className={`w-full flex items-center gap-6 p-7 rounded-sm border-2 transition-all duration-300 text-left ${
                      builderState.material.id === mat.id ? 'border-[#064e3b] bg-white shadow-xl scale-[1.01]' : 'border-stone-100 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div className={`w-16 h-16 ${mat.color} border border-black/5 shadow-inner`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-black uppercase tracking-tight">{mat.name}</p>
                        <span className="text-[11px] bg-[#fef3c7] text-[#064e3b] px-3 py-1 font-black rounded-full">{mat.impact} Impact</span>
                      </div>
                      <p className="text-sm text-stone-500 leading-relaxed">{mat.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-[12px] uppercase font-black text-stone-400 tracking-[0.3em] mb-8">Step 03. Customization</h4>
              <div className="p-8 bg-stone-50 border border-stone-200 rounded-sm">
                <label className="text-[10px] uppercase font-black text-stone-400 tracking-widest block mb-4 italic">Initials (Engraved into material)</label>
                <input 
                  type="text" 
                  maxLength={3}
                  placeholder="A.B.C"
                  className="w-full bg-transparent border-b-2 border-stone-300 py-4 text-4xl font-serif text-stone-800 focus:outline-none focus:border-[#064e3b] transition-colors placeholder:text-stone-200"
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
              className="w-full bg-[#064e3b] text-[#fef3c7] py-8 rounded-sm font-black text-sm uppercase tracking-[0.4em] shadow-2xl hover:bg-[#043d2e] transition-all transform active:scale-[0.98]"
            >
              Confirm Design — £{totalPrice}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Cart = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto py-24 px-8"
    >
      <header className="mb-16 border-b border-stone-100 pb-10">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#064e3b] mb-4 block underline underline-offset-8">Review Bag</span>
        <h3 className="text-5xl font-serif text-stone-900">Your Selection</h3>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-32 bg-stone-50 border border-stone-200 rounded-sm">
          <p className="text-stone-400 text-xl italic font-serif">The bag is currently empty.</p>
          <button onClick={() => setView('shop')} className="mt-8 text-[#064e3b] font-black text-xs uppercase tracking-widest border-b-2 border-[#064e3b] pb-2 hover:opacity-70 transition-opacity">Start Your Journey</button>
        </div>
      ) : (
        <div className="space-y-12">
          {cart.map((item) => (
            <div key={item.cartId} className="flex flex-col sm:flex-row gap-8 pb-12 border-b border-stone-100">
              <div className={`w-full sm:w-40 aspect-square ${item.color || 'bg-stone-200'} shadow-lg`} />
              <div className="flex-1">
                <div className="flex justify-between font-serif text-3xl">
                  <span>{item.name}</span>
                  <span className="font-sans font-black text-2xl text-[#064e3b]">£{item.price}</span>
                </div>
                <p className="text-[12px] uppercase font-black text-stone-400 mt-4 tracking-widest">{item.details}</p>
                <button 
                  onClick={() => setCart(cart.filter(c => c.cartId !== item.cartId))}
                  className="text-[10px] text-red-800 font-black uppercase mt-8 opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  <X size={12} /> Remove Product
                </button>
              </div>
            </div>
          ))}
          <div className="pt-12">
            <div className="flex justify-between text-4xl font-serif text-stone-900 mb-12">
              <span>Subtotal</span>
              <span className="font-sans font-black">£{cart.reduce((s, i) => s + i.price, 0)}</span>
            </div>
            <button className="w-full bg-[#064e3b] text-[#fef3c7] py-8 rounded-sm font-black text-sm uppercase tracking-[0.4em] shadow-2xl hover:bg-[#043d2e] transition-all">
              Secure Checkout & Pay
            </button>
            <p className="text-center mt-6 text-[11px] font-bold text-stone-400 uppercase tracking-widest">Free Carbon-Neutral Shipping Worldwide</p>
          </div>
        </div>
      )}
    </motion.div>
  );

  const Home = () => (
    <div className="w-full overflow-hidden">
      {/* Immersive Hero Section */}
      <section className="relative h-screen flex items-center bg-[#f5f5f4] w-full">
        <div className="w-full px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-[12px] font-black uppercase tracking-[0.6em] text-[#064e3b] mb-6 block border-l-4 border-[#064e3b] pl-6">Spring Capsule '25</span>
            <h1 className="text-7xl md:text-9xl font-serif text-stone-900 leading-[0.85] mb-10 tracking-tighter">
              Bespoke <br /> Luxury <br /> <span className="text-[#064e3b] italic">Ethically Born.</span>
            </h1>
            <p className="max-w-xl text-stone-500 text-lg leading-relaxed mb-12">
              Transforming Tyrolian apple waste and citrus architectural fiber into timeless couture. Crexy&Nilo redefines affordable luxury for the generation that refuses to compromise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => setView('builder')} className="bg-[#064e3b] text-[#fef3c7] px-12 py-6 text-[12px] font-black uppercase tracking-[0.3em] shadow-[20px_20px_60px_rgba(6,78,59,0.2)] hover:scale-105 transition-transform duration-500">The Custom Studio</button>
              <button onClick={() => setView('shop')} className="border-2 border-stone-800 px-12 py-6 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-stone-900 hover:text-white transition-all duration-500">The Collection</button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }}
            className="relative hidden lg:block h-[80vh]"
          >
            <div className="w-full h-full bg-[#064e3b] rounded-sm shadow-[40px_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
              <div className="absolute inset-16 border-2 border-white/10 group-hover:border-white/30 transition-all duration-1000" />
              <div className="absolute bottom-20 left-20">
                <span className="text-[#fef3c7] text-sm font-black uppercase tracking-[1em] opacity-40 group-hover:opacity-100 transition-opacity duration-1000">Vegan Craftsmanship</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] uppercase font-black tracking-widest text-stone-400 vertical-text">Discover</span>
          <div className="w-[1px] h-16 bg-stone-300" />
        </div>
      </section>

      {/* Full-width Stats */}
      <section className="bg-[#064e3b] py-32 px-12 text-[#fef3c7] w-full">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
          <motion.div whileInView={{ opacity: [0, 1], y: [20, 0] }}>
            <p className="text-7xl font-serif mb-6 leading-none tracking-tighter">35%</p>
            <p className="text-[12px] uppercase font-black tracking-[0.4em] opacity-50">Less Carbon than Animal Leather</p>
          </motion.div>
          <motion.div whileInView={{ opacity: [0, 1], y: [20, 0] }} transition={{ delay: 0.2 }}>
            <p className="text-7xl font-serif mb-6 leading-none tracking-tighter">5x</p>
            <p className="text-[12px] uppercase font-black tracking-[0.4em] opacity-50">Reduced Water Footprint</p>
          </motion.div>
          <motion.div whileInView={{ opacity: [0, 1], y: [20, 0] }} transition={{ delay: 0.4 }}>
            <p className="text-7xl font-serif mb-6 leading-none tracking-tighter">100%</p>
            <p className="text-[12px] uppercase font-black tracking-[0.4em] opacity-50">Certified Bio-Waste Sourcing</p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 px-8 bg-white w-full">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-square bg-stone-100 rounded-sm shadow-2xl overflow-hidden">
             <div className="absolute inset-0 bg-[#064e3b]/5" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#064e3b] mb-6 block">Our Philosophy</span>
            <h2 className="text-6xl font-serif text-stone-900 mb-8 leading-tight">Style without <br /> Compromise.</h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-10">
              We believe luxury should be an extension of your values. By upcycling apple and lemon waste from the European food industry, we create high-performance architectural fibers that outshine synthetic and animal leather in both durability and environmental impact.
            </p>
            <button className="flex items-center gap-4 text-[#064e3b] font-black text-xs uppercase tracking-[0.3em] group">
              Read our transparency report <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-stone-900 selection:bg-[#fef3c7] selection:text-[#064e3b] flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          {view === 'home' && <Home key="home" />}
          {view === 'builder' && <Builder key="builder" />}
          {view === 'shop' && <ShopView key="shop" />}
          {view === 'cart' && <Cart key="cart" />}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-stone-200 py-32 px-12 w-full">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-3xl mb-8 tracking-tighter text-[#064e3b]">Crexy&Nilo</h3>
            <p className="text-stone-500 text-base max-w-xs leading-relaxed">
              Leading the shift toward ethical luxury through plant-based innovation. Affordable, sustainable, and built for the future.
            </p>
          </div>
          <div>
            <h5 className="text-[11px] uppercase font-black tracking-[0.3em] text-stone-400 mb-10">Collection</h5>
            <ul className="text-[13px] font-bold space-y-5 text-stone-600 uppercase tracking-tighter">
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('shop')}>Wallets & Small Goods</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('shop')}>Bespoke Handbags</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('shop')}>Animal Care Accessories</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('shop')}>Sustainable Belts</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[11px] uppercase font-black tracking-[0.3em] text-stone-400 mb-10">Brand</h5>
            <ul className="text-[13px] font-bold space-y-5 text-stone-500 uppercase tracking-tighter">
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors">Our Materials</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('builder')}>Custom Studio</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors">Supply Chain Audit</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[11px] uppercase font-black tracking-[0.3em] text-stone-400 mb-10">Connect</h5>
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center hover:bg-[#fef3c7] transition-all cursor-pointer text-stone-800">
                <span className="font-serif italic text-lg">ig</span>
              </div>
              <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center hover:bg-[#fef3c7] transition-all cursor-pointer text-stone-800">
                <span className="font-serif italic text-lg">tk</span>
              </div>
              <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center hover:bg-[#fef3c7] transition-all cursor-pointer text-stone-800">
                <span className="font-serif italic text-lg">fb</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 mt-10 font-bold uppercase tracking-widest">Crexy & Nilo Ltd. UK</p>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto mt-24 pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-stone-300 uppercase font-black tracking-[0.8em]">Rooted in Radical Transparency</p>
          <div className="flex gap-10 text-stone-300">
             <ShieldCheck size={20} />
             <Leaf size={20} />
             <Heart size={20} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;