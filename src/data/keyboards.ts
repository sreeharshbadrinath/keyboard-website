import { KeyboardProduct, SwitchOption } from '../types';

export const SWITCH_OPTIONS: SwitchOption[] = [
  {
    id: 'red',
    name: 'Keytron G Pro 3.0 Red',
    type: 'Linear',
    actuationForce: '45 ± 15 gf',
    travelDistance: '2.0 mm pre-travel / 4.0 mm total',
    soundProfile: 'Muted, buttery deep thock',
    stemColor: '#ef4444',
    description: 'Factory pre-lubed smooth linear switch engineered for fluid typing and ultra-fast gaming responses without tactile interruption.',
    tags: ['Gaming', 'Silent Office', 'Ultra-Smooth']
  },
  {
    id: 'banana',
    name: 'Keytron G Pro 3.0 Banana',
    type: 'Tactile',
    actuationForce: '57 ± 10 gf',
    travelDistance: '2.0 mm pre-travel / 3.6 mm total',
    soundProfile: 'Panda-style rounded crisp pop',
    stemColor: '#eab308',
    description: 'Early tactile bump positioned right at the keystroke apex. Highly satisfying feedback inspired by custom holy panda switches.',
    tags: ['Typists Favorite', 'Early Bump', 'Satisfying Clack']
  },
  {
    id: 'brown',
    name: 'Keytron G Pro 3.0 Brown',
    type: 'Tactile',
    actuationForce: '55 ± 15 gf',
    travelDistance: '2.0 mm pre-travel / 4.0 mm total',
    soundProfile: 'Subtle tactile clack',
    stemColor: '#92400e',
    description: 'The golden balance between work productivity and gaming agility. Gentle tactile bump prevents accidental keypresses.',
    tags: ['Balanced', 'Code & Writing', 'Tactile']
  },
  {
    id: 'blue',
    name: 'Keytron G Pro 3.0 Blue',
    type: 'Clicky',
    actuationForce: '60 ± 15 gf',
    travelDistance: '2.3 mm pre-travel / 4.0 mm total',
    soundProfile: 'High-pitch auditory click + sharp snap',
    stemColor: '#3b82f6',
    description: 'Distinct tactile click leaf produces crisp acoustic feedback with every actuating keystroke. Pure typewriter nostalgia.',
    tags: ['Acoustic Click', 'Tactile Snap', 'Typing Feedback']
  },
  {
    id: 'silent',
    name: 'Keytron Silent Black',
    type: 'Silent Linear',
    actuationForce: '50 ± 10 gf',
    travelDistance: '1.9 mm pre-travel / 3.7 mm total',
    soundProfile: 'Whisper-quiet dampened keystroke',
    stemColor: '#374151',
    description: 'Dual silicone dampening pads on switch slider absorb both downstroke bottom-out and upstroke return noise.',
    tags: ['Open Office', 'Late Night', 'Soundproofed']
  }
];

export const KEYBOARDS: KeyboardProduct[] = [
  {
    id: 'k2-max',
    name: 'Keytron K2 Max',
    series: 'Max Series',
    tagline: 'The 75% Wireless Mechanical Icon, Refined with Acoustic Foam & 1000Hz 2.4G',
    price: 109,
    originalPrice: 129,
    layout: '75% Compact (84 Keys)',
    connectivity: ['2.4 GHz Wireless (1000 Hz)', 'Bluetooth 5.1 (3 Devices)', 'Type-C Wired'],
    chassis: 'CNC Aluminum Frame + Matte ABS Base',
    mounting: 'Acoustic Sound-Absorbing Multi-Layer Mount',
    pollingRate: '1000 Hz (Wireless & Wired)',
    battery: '4000 mAh Rechargeable (Up to 200 hrs)',
    weight: '1050 g (Aluminum Version)',
    rating: 4.95,
    reviewsCount: 384,
    isFeatured: true,
    accentColor: '#ff5722',
    shortDescription: 'Featured in our flagship video animation. Combines compact desk footprint with dedicated function keys, double-shot PBT keycaps, and dynamic RGB underglow.',
    features: [
      'Dual-tone retro charcoal & slate keycaps with vibrant orange Escape accent',
      'Ultra-fast 2.4GHz 1000Hz polling rate for zero latency',
      'Acoustic sound dampening foam + IXPE switch pad mod pre-installed',
      'South-facing RGB backlighting for maximum shine-through clarity',
      'One-toggle instant switch between macOS & Windows layout with extra keycaps included',
      'QMK/VIA web-based real-time key remapping & macro programming'
    ],
    switchesAvailable: ['red', 'banana', 'brown', 'blue', 'silent']
  },
  {
    id: 'q1-pro',
    name: 'Keytron Q1 Pro',
    series: 'Pro Series',
    tagline: 'Full CNC Anodized 6063 Aluminum Custom Keyboard with Double Gasket Mount',
    price: 199,
    originalPrice: 229,
    layout: '75% Exploded Layout with Rotary Encoder Knob',
    connectivity: ['Bluetooth 5.1', 'Type-C Wired (1000 Hz)'],
    chassis: '100% Solid CNC 6063 Aluminum Body',
    mounting: 'Double-Gasket Suspension Design',
    pollingRate: '1000 Hz',
    battery: '4000 mAh Lithium-ion',
    weight: '1750 g ± 10 g',
    rating: 4.98,
    reviewsCount: 520,
    isNew: true,
    accentColor: '#f97316',
    shortDescription: 'The pinnacle of custom mechanical typing feel. Double gasket structure cushions every bottom-out for a rich, hollow-free acoustic resonance.',
    features: [
      'Precision CNC milled 6063 aluminum polished, sandblasted & anodized',
      'Double-gasket mount system reduces acoustic resonance by 70%',
      'Programmable CNC aluminum rotary knob for volume and media scrub',
      'KSA profile spherical double-shot PBT keycaps',
      'Screw-in PCB-mounted gold-plated stabilizers'
    ],
    switchesAvailable: ['red', 'banana', 'brown', 'silent']
  },
  {
    id: 'q3-he',
    name: 'Keytron Q3 HE',
    series: 'HE Magnetic',
    tagline: 'Hall Effect Magnetic Switch Esports Keyboard with Rapid Trigger & 0.1mm Sensitivity',
    price: 219,
    originalPrice: 249,
    layout: '80% Tenkeyless (87 Keys)',
    connectivity: ['2.4 GHz Ultra-Low Latency', 'Bluetooth 5.1', 'Type-C'],
    chassis: 'Full CNC Aluminum Block Chassis',
    mounting: 'Gasket Dampened Aluminum Plate',
    pollingRate: '8000 Hz Polling Rate',
    battery: '4000 mAh',
    weight: '1980 g',
    rating: 4.97,
    reviewsCount: 290,
    isNew: true,
    accentColor: '#06b6d4',
    shortDescription: 'Equipped with Gateron magnetic Hall Effect switches. Dynamically adjusts actuation and reset points from 0.1mm to 4.0mm with 0.02mm micro-precision.',
    features: [
      'Continuous Rapid Trigger technology for instant counter-strafing',
      'Adjustable actuation points from 0.1mm to 4.0mm',
      '8000Hz hyper-polling rate delivers 0.125ms input latency',
      'Magnetic sensor contactless architecture rated for 150M keystrokes',
      'Web-based HE calibration utility with live depth graph'
    ],
    switchesAvailable: ['red']
  },
  {
    id: 'k3-pro',
    name: 'Keytron K3 Pro',
    series: 'Ultra-Slim',
    tagline: 'Ultra-Thin Low-Profile Wireless Mechanical Keyboard with QMK/VIA',
    price: 94,
    originalPrice: 110,
    layout: '75% Low Profile (84 Keys)',
    connectivity: ['Bluetooth 5.1', 'Type-C Wired'],
    chassis: 'Slim Anodized Aluminum Top Frame',
    mounting: 'Low-Profile Integrated Plate',
    pollingRate: '1000 Hz Wired / 90 Hz BT',
    battery: '1550 mAh (Up to 100 hrs)',
    weight: '525 g',
    rating: 4.88,
    reviewsCount: 410,
    accentColor: '#10b981',
    shortDescription: 'At only 17mm thickness, the K3 Pro delivers ergonomic mechanical travel without requiring a wrist rest. Perfect for nomadic creators and minimalist desks.',
    features: [
      '31% thinner than traditional mechanical keyboards',
      'Gateron low-profile mechanical switches with 2.5mm total travel',
      'Low-profile LSA spherical PBT keycaps',
      'Ergonomic two-level adjustable rubber feet',
      'Ultra-lightweight 525g travel profile'
    ],
    switchesAvailable: ['red', 'brown', 'blue']
  }
];
