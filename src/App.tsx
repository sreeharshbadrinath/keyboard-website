import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { HeroExact } from './components/HeroExact';
import { PillFeatureNav } from './components/PillFeatureNav';
import { KeyboardStatement } from './components/KeyboardStatement';
import { CustomizableAccessories } from './components/CustomizableAccessories';
import { SwitchExplorer } from './components/SwitchExplorer';
import { ArtisanKeycaps } from './components/ArtisanKeycaps';
import { ProductCatalog } from './components/ProductCatalog';
import { AcousticLabModal } from './components/AcousticLabModal';
import { CartDrawer } from './components/CartDrawer';
import { FooterExact } from './components/FooterExact';
import { KeyboardProduct, SwitchOption } from './types';
import { SWITCH_OPTIONS } from './data/keyboards';

export default function App() {
  const [cartItems, setCartItems] = useState<Array<{
    product: KeyboardProduct;
    selectedSwitch?: SwitchOption;
    quantity: number;
  }>>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSoundLabOpen, setIsSoundLabOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string>('switches');

  const handleAddToCart = (product: KeyboardProduct, sw?: SwitchOption) => {
    const chosenSwitch = sw || SWITCH_OPTIONS[0];
    setCartItems(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.selectedSwitch?.id === chosenSwitch.id
      );
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedSwitch?.id === chosenSwitch.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSwitch: chosenSwitch, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddAccessory = (accessoryData: any) => {
    setCartItems(prev => [...prev, accessoryData]);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollToSection = (sectionId: string) => {
    let target = 'hero-exact';
    if (sectionId === 'keyboards') target = 'keyboards';
    else if (sectionId === 'switches') target = 'switches-section';
    else if (sectionId === 'keycaps') target = 'keycaps-section';
    else if (sectionId === 'accessories') target = 'accessories-section';

    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-neutral-900 selection:bg-[#ff5722] selection:text-white flex flex-col font-sans">
      
      {/* Top Navigation */}
      <TopNav
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSoundLab={() => setIsSoundLabOpen(true)}
        onSelectSection={handleScrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section: Exact Dribbble Layout + 3D Video Floating RGB Animation */}
        <HeroExact
          onExploreClick={() => handleScrollToSection('keyboards')}
          onOpenSoundLab={() => setIsSoundLabOpen(true)}
        />

        {/* 2. Horizontal Pill Navigation with Diamond Bullet Marks */}
        <PillFeatureNav
          activeFeature={activeFeature}
          onSelectFeature={(feat) => setActiveFeature(feat)}
        />

        {/* 3. Massive KEYBOARD Typographic Statement & Manifesto */}
        <KeyboardStatement />

        {/* 4. Customizable Accessories & Support Configurator */}
        <CustomizableAccessories
          onAddToCart={handleAddAccessory}
        />

        {/* 5. Switch Engineering Catalog (01 Cherry Mix, 02 Kailh, 03 Oetemu, 04 Romer G) */}
        <SwitchExplorer />

        {/* 6. Elevate Your Keyboard Experience - Artisan Keycaps */}
        <ArtisanKeycaps
          onShopClick={() => handleScrollToSection('keyboards')}
        />

        {/* 7. Flagship High-Performance Keyboard Catalog */}
        <ProductCatalog
          onAddToCart={handleAddToCart}
          onOpenSoundLab={() => setIsSoundLabOpen(true)}
        />
      </main>

      {/* Footer matching Dribbble screenshot */}
      <FooterExact />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Interactive Acoustic Typing Laboratory Modal */}
      <AcousticLabModal
        isOpen={isSoundLabOpen}
        onClose={() => setIsSoundLabOpen(false)}
      />

    </div>
  );
}
