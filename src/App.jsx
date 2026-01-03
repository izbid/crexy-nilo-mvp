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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [builderState, setBuilderState] = useState({
    category: CATEGORIES[0],
    material: MATERIALS[0],
    initials: '',
  });

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartId: Date.now() }]);
    setView('cart');
    setIsMenuOpen(false);
  };

  // --- Sub-Components ---
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-[#f5f5f4]/90 backdrop-blur-md border-b border-stone-200 w-full">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4 cursor-pointer" onClick={() => { setView('home'); setIsMenuOpen(false); }}>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#064e3b] flex items-center justify-center rounded-sm transition-transform active:scale-90">
            <span className="text-[#fef3c7] font-bold text-lg md:text-xl tracking-tighter">CN</span>
          </div>
          <h1 className="font-serif font-bold text-xl md:text-2xl tracking-tight text-[#064e3b] hidden xs:block">Crexy&Nilo</h1>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[12px] uppercase tracking-[0.2em] font-black text-stone-500">
          <button onClick={() => setView('shop')} className={`hover:text-[#064e3b] transition-colors ${view === 'shop' ? 'text-[#064e3b]' : ''}`}>Shop</button>
          <button onClick={() => setView('builder')} className={`hover:text-[#064e3b] transition-colors ${view === 'builder' ? 'text-[#064e3b]' : ''}`}>Custom Studio</button>
          <button className="hover:text-[#064e3b] transition-colors">Transparency</button>
        </div>
        
        <div className="flex items-center gap-4 md:gap-10">
          <button onClick={() => setView('cart')} className="relative group p-2 transition-transform active:scale-90">
            <ShoppingBag size={22} className="text-stone-800 group-hover:text-[#064e3b] transition-colors" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#064e3b] text-[#fef3c7] text-[9px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                {cart.length}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-stone-800 transition-transform active:scale-90">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-sm font-black uppercase tracking-[0.3em] text-stone-600">
              <button onClick={() => { setView('shop'); setIsMenuOpen(false); }} className="text-left py-2 hover:text-[#064e3b]">Shop Collection</button>
              <button onClick={() => { setView('builder'); setIsMenuOpen(false); }} className="text-left py-2 hover:text-[#064e3b]">Custom Studio</button>
              <button onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-[#064e3b]">Transparency Report</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  const ShopView = () => {
    const filteredProducts = activeFilter === 'All' 
      ? SHOP_PRODUCTS 
      : SHOP_PRODUCTS.filter(p => p.category === activeFilter);

    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="w-full px-4 md:px-12 py-10 md:py-16"
      >
        <div className="max-w-[1800px] mx-auto mb-10 md:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="px-2">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-[#064e3b] mb-3 md:mb-4 block">Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Capsule Collection</h2>
            <p className="text-stone-500 text-base md:text-lg font-medium max-w-xl">Ready-to-ship essentials crafted from our signature bio-materials.</p>
          </div>
          
          <div className="flex bg-stone-100 p-1 rounded-full w-full md:w-fit overflow-x-auto no-scrollbar shadow-inner">
            {['All', 'Wallets', 'Bags', 'Belts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex-1 md:flex-none px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                  activeFilter === tab 
                    ? 'bg-white text-[#064e3b] shadow-md' 
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                layout
                key={prod.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group cursor-pointer px-2"
              >
                <div className={`aspect-[3/4] rounded-sm ${prod.col} mb-4 md:mb-6 relative overflow-hidden flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-500`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <button 
                    onClick={() => addToCart({ ...prod, details: prod.mat })}
                    className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-white text-[#064e3b] px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all shadow-xl active:scale-95"
                  >
                    Add to Bag
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-lg md:text-xl text-stone-900 group-hover:text-[#064e3b] transition-colors">{prod.name}</h4>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black text-stone-400 mt-1 md:mt-2">{prod.mat}</p>
                  </div>
                  <p className="font-bold text-lg md:text-xl text-[#064e3b]">£{prod.price}</p>
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
      <div className="w-full px-4 md:px-16 py-8 md:py-16">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Visual Canvas - Dynamic Height */}
          <div className="w-full lg:flex-1 lg:sticky lg:top-32 h-fit lg:h-[calc(100vh-160px)] min-h-[400px] md:min-h-[600px]">
            <div className="w-full h-full bg-white border border-stone-200 rounded-sm flex flex-col items-center justify-center p-8 md:p-16 relative shadow-xl md:shadow-2xl shadow-stone-200/50 overflow-hidden">
              <div className="absolute top-6 left-6 md:top-10 md:left-10 opacity-10 md:opacity-20 pointer-events-none select-none">
                <span className="text-[60px] md:text-[120px] font-serif font-black text-stone-100 leading-none">BUILD</span>
              </div>
              <motion.div 
                animate={{ backgroundColor: builderState.material.color.replace('bg-', '') }}
                className={`w-[250px] md:w-[450px] max-w-full aspect-square ${builderState.material.color} shadow-2xl relative flex items-center justify-center transform transition-transform duration-700`}
              >
                <div className="absolute inset-4 md:inset-6 border border-white/10" />
                {builderState.initials && (
                  <span className="text-white/20 font-serif text-4xl md:text-7xl uppercase tracking-[0.4em] select-none break-all text-center px-4">
                    {builderState.initials}
                  </span>
                )}
              </motion.div>
              <div className="mt-8 md:mt-16 text-center px-4">
                <span className="text-[10px] md:text-[12px] uppercase font-black text-stone-400 tracking-[0.5em] block mb-2 md:mb-4 italic">Bespoke Specs</span>
                <h3 className="text-2xl md:text-4xl font-serif text-stone-900">Custom {builderState.category.name}</h3>
                <p className="text-2xl md:text-3xl font-black text-[#064e3b] mt-2 md:mt-4 tracking-tighter">£{totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Config Panel */}
          <div className="w-full lg:flex-1 space-y-10 md:space-y-16 py-6 lg:py-10">
            <header className="px-2">
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600 block mb-3 underline underline-offset-4">Studio Personalization</span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4 md:mb-6 leading-tight">Your Masterpiece</h2>
              <p className="text-stone-500 text-base md:text-lg leading-relaxed max-w-lg">Each custom design is meticulously crafted. Current build time: 2-4 weeks.</p>
            </header>

            <section className="px-2">
              <h4 className="text-[11px] md:text-[12px] uppercase font-black text-stone-400 tracking-[0.3em] mb-6 md:mb-8">01. Choose Silhouette</h4>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setBuilderState({...builderState, category: cat})}
                    className={`flex items-center justify-between p-5 md:p-7 rounded-sm border-2 transition-all duration-300 active:scale-[0.98] ${
                      builderState.category.id === cat.id ? 'border-[#064e3b] bg-white shadow-lg' : 'border-stone-100 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-wider">{cat.name}</span>
                    <div className={builderState.category.id === cat.id ? 'text-[#064e3b]' : 'text-stone-400'}>{cat.icon}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="px-2">
              <h4 className="text-[11px] md:text-[12px] uppercase font-black text-stone-400 tracking-[0.3em] mb-6 md:mb-8">02. Select Bio-Leather</h4>
              <div className="space-y-3 md:space-y-4">
                {MATERIALS.map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => setBuilderState({...builderState, material: mat})}
                    className={`w-full flex items-center gap-4 md:gap-6 p-5 md:p-7 rounded-sm border-2 transition-all duration-300 text-left active:scale-[0.99] ${
                      builderState.material.id === mat.id ? 'border-[#064e3b] bg-white shadow-lg' : 'border-stone-100 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div className={`w-12 h-12 md:w-16 md:h-16 flex-shrink-0 ${mat.color} border border-black/5 shadow-inner`} />
                    <div className="flex-1">
                      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-1 md:mb-2 gap-1">
                        <p className="text-xs font-black uppercase tracking-tight">{mat.name}</p>
                        <span className="text-[9px] md:text-[11px] bg-[#fef3c7] text-[#064e3b] px-2 md:px-3 py-0.5 md:py-1 font-black rounded-full whitespace-nowrap">{mat.impact} CO2</span>
                      </div>
                      <p className="text-[12px] md:text-sm text-stone-500 leading-snug">{mat.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="px-2">
              <h4 className="text-[11px] md:text-[12px] uppercase font-black text-stone-400 tracking-[0.3em] mb-6 md:mb-8">03. Embossing</h4>
              <div className="p-6 md:p-8 bg-stone-50 border border-stone-200 rounded-sm">
                <label className="text-[9px] md:text-[10px] uppercase font-black text-stone-400 tracking-widest block mb-3 italic">Personal Initials</label>
                <input 
                  type="text" 
                  maxLength={3}
                  placeholder="X.Y.Z"
                  className="w-full bg-transparent border-b-2 border-stone-300 py-3 md:py-4 text-3xl md:text-4xl font-serif text-stone-800 focus:outline-none focus:border-[#064e3b] transition-colors placeholder:text-stone-200"
                  value={builderState.initials}
                  onChange={(e) => setBuilderState({...builderState, initials: e.target.value})}
                />
              </div>
            </section>

            <div className="px-2 pb-10">
              <button 
                onClick={() => addToCart({
                  name: `Custom ${builderState.category.name}`,
                  details: `${builderState.material.name} | Initials: ${builderState.initials || 'None'}`,
                  price: totalPrice,
                  color: builderState.material.color
                })}
                className="w-full bg-[#064e3b] text-[#fef3c7] py-6 md:py-8 rounded-sm font-black text-[12px] md:text-sm uppercase tracking-[0.4em] shadow-2xl hover:bg-[#043d2e] transition-all transform active:scale-[0.98]"
              >
                Add to Bag — £{totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Cart = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto py-12 md:py-24 px-6 md:px-8"
    >
      <header className="mb-12 md:mb-16 border-b border-stone-100 pb-8 md:pb-10">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#064e3b] mb-4 block underline underline-offset-8">Checkout Bag</span>
        <h3 className="text-4xl md:text-5xl font-serif text-stone-900">Your Selection</h3>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-24 md:py-32 bg-stone-50 border border-stone-200 rounded-sm">
          <p className="text-stone-400 text-lg md:text-xl italic font-serif">The bag is currently empty.</p>
          <button onClick={() => setView('shop')} className="mt-8 text-[#064e3b] font-black text-[10px] md:text-xs uppercase tracking-widest border-b-2 border-[#064e3b] pb-2 active:opacity-50">Explore Goods</button>
        </div>
      ) : (
        <div className="space-y-10 md:space-y-12">
          {cart.map((item) => (
            <div key={item.cartId} className="flex flex-col sm:flex-row gap-6 md:gap-8 pb-10 md:pb-12 border-b border-stone-100">
              <div className={`w-full sm:w-32 md:w-40 aspect-square ${item.color || 'bg-stone-200'} shadow-lg`} />
              <div className="flex-1">
                <div className="flex flex-col xs:flex-row justify-between items-start gap-2 font-serif text-2xl md:text-3xl">
                  <span>{item.name}</span>
                  <span className="font-sans font-black text-xl md:text-2xl text-[#064e3b]">£{item.price}</span>
                </div>
                <p className="text-[11px] md:text-[12px] uppercase font-black text-stone-400 mt-3 md:mt-4 tracking-widest leading-relaxed">{item.details}</p>
                <button 
                  onClick={() => setCart(cart.filter(c => c.cartId !== item.cartId))}
                  className="text-[9px] md:text-[10px] text-red-800 font-black uppercase mt-6 md:mt-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity active:scale-95"
                >
                  <X size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
          <div className="pt-8 md:pt-12">
            <div className="flex justify-between text-3xl md:text-4xl font-serif text-stone-900 mb-10 md:mb-12">
              <span>Subtotal</span>
              <span className="font-sans font-black tracking-tighter">£{cart.reduce((s, i) => s + i.price, 0)}</span>
            </div>
            <button className="w-full bg-[#064e3b] text-[#fef3c7] py-6 md:py-8 rounded-sm font-black text-xs md:text-sm uppercase tracking-[0.4em] shadow-2xl active:scale-[0.98]">
              Confirm Order & Pay
            </button>
            <p className="text-center mt-6 text-[10px] md:text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em]">Carbon-Neutral Fulfillment Worldwide</p>
          </div>
        </div>
      )}
    </motion.div>
  );

  const Home = () => (
    <div className="w-full">
      {/* Immersive Responsive Hero */}
      <section className="relative min-h-[100dvh] flex items-center bg-[#f5f5f4] w-full pt-16 md:pt-0">
        <div className="w-full px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="z-10 text-center lg:text-left"
          >
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-[#064e3b] mb-4 md:mb-6 inline-block lg:block border-b-2 lg:border-b-0 lg:border-l-4 border-[#064e3b] lg:pl-6 pb-1 lg:pb-0">Spring Capsule '25</span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-stone-900 leading-[0.9] mb-8 md:mb-10 tracking-tighter">
              Bespoke <br className="hidden xs:block" /> Luxury <br className="hidden md:block" /> <span className="text-[#064e3b] italic">Ethically Born.</span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-stone-500 text-base md:text-lg leading-relaxed mb-10 md:mb-12 px-2">
              Revolutionary bio-materials met with artisanal precision. Crexy&Nilo redefines affordable luxury for a conscious generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <button onClick={() => setView('builder')} className="bg-[#064e3b] text-[#fef3c7] px-10 py-5 md:py-6 text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all">Custom Studio</button>
              <button onClick={() => setView('shop')} className="border-2 border-stone-800 px-10 py-5 md:py-6 text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] hover:bg-stone-900 hover:text-white transition-all active:scale-95">Shop Now</button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }}
            className="relative hidden lg:block h-[70vh] xl:h-[80vh]"
          >
            <div className="w-full h-full bg-[#064e3b] rounded-sm shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
              <div className="absolute inset-12 border-2 border-white/10 group-hover:border-white/30 transition-all duration-1000" />
              <div className="absolute bottom-16 left-16">
                <span className="text-[#fef3c7] text-xs font-black uppercase tracking-[0.8em] opacity-40 group-hover:opacity-100 transition-opacity duration-1000">Vegan Heritage</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 opacity-20">
          <span className="text-[9px] uppercase font-black tracking-widest text-stone-400 vertical-text">Scroll</span>
          <div className="w-[1px] h-12 bg-stone-300" />
        </div>
      </section>

      {/* Stats Section - Fluid Grid */}
      <section className="bg-[#064e3b] py-20 md:py-32 px-6 md:px-12 text-[#fef3c7] w-full">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 text-center">
          {[
            { value: '35%', label: 'Less Carbon Footprint' },
            { value: '5x', label: 'Reduced Water Usage' },
            { value: '100%', label: 'Bio-Waste Sourcing' }
          ].map((stat, idx) => (
            <motion.div key={idx} whileInView={{ opacity: [0, 1], y: [20, 0] }} transition={{ delay: idx * 0.1 }}>
              <p className="text-6xl md:text-7xl lg:text-8xl font-serif mb-4 md:mb-6 leading-none tracking-tighter">{stat.value}</p>
              <p className="text-[10px] md:text-[12px] uppercase font-black tracking-[0.4em] opacity-50 px-4">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-white w-full">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative aspect-square bg-stone-100 rounded-sm shadow-xl overflow-hidden order-2 lg:order-1">
             <div className="absolute inset-0 bg-[#064e3b]/5" />
          </div>
          <div className="order-1 lg:order-2 px-2">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-[#064e3b] mb-4 md:mb-6 block underline underline-offset-8">Transparency</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 md:mb-8 leading-tight">Crafted for <br /> the Earth.</h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
              We leverage upcycled food-industry waste to create high-performance architectural fibers. Our process outshines conventional leathers in durability, texture, and environmental impact.
            </p>
            <button className="flex items-center gap-4 text-[#064e3b] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] group active:scale-95">
              Material Origin Report <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-stone-900 selection:bg-[#fef3c7] selection:text-[#064e3b] flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          {view === 'home' && <Home key="home" />}
          {view === 'builder' && <Builder key="builder" />}
          {view === 'shop' && <ShopView key="shop" />}
          {view === 'cart' && <Cart key="cart" />}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-stone-200 py-20 md:py-32 px-6 md:px-12 w-full">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl md:text-3xl mb-6 md:mb-8 tracking-tighter text-[#064e3b]">Crexy&Nilo</h3>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed">
              Pioneering the shift toward ethical luxury with radical transparency and bio-waste innovation.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.3em] text-stone-400 mb-8 md:mb-10">Shop</h5>
            <ul className="text-[12px] md:text-[13px] font-bold space-y-4 md:space-y-5 text-stone-600 uppercase tracking-tighter">
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('shop')}>Wallets</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('shop')}>Handbags</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('shop')}>Pet Collars</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('shop')}>Belts</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.3em] text-stone-400 mb-8 md:mb-10">Brand</h5>
            <ul className="text-[12px] md:text-[13px] font-bold space-y-4 md:space-y-5 text-stone-500 uppercase tracking-tighter">
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors">Materiality</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors" onClick={() => setView('builder')}>Customizer</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors">Supply Chain</li>
              <li className="hover:text-[#064e3b] cursor-pointer transition-colors">Our Story</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.3em] text-stone-400 mb-8 md:mb-10">Connect</h5>
            <div className="flex gap-4 md:gap-6">
              {['ig', 'tk', 'fb'].map(social => (
                <div key={social} className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-stone-100 flex items-center justify-center hover:bg-[#fef3c7] transition-all cursor-pointer text-stone-800">
                  <span className="font-serif italic text-base md:text-lg">{social}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] md:text-[11px] text-stone-400 mt-8 md:mt-10 font-bold uppercase tracking-[0.2em]">Crexy & Nilo Ltd. UK</p>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto mt-20 md:mt-24 pt-10 md:pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <p className="text-[9px] md:text-[10px] text-stone-300 uppercase font-black tracking-[0.6em] md:tracking-[0.8em] text-center md:text-left">Sustainability First Philosophy</p>
          <div className="flex gap-8 md:gap-10 text-stone-300">
             <ShieldCheck size={18} />
             <Leaf size={18} />
             <Heart size={18} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;