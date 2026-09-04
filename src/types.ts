export type SwitchId = 'red' | 'brown' | 'blue' | 'banana' | 'silent';

export interface SwitchOption {
  id: SwitchId;
  name: string;
  type: 'Linear' | 'Tactile' | 'Clicky' | 'Silent Linear';
  actuationForce: string;
  travelDistance: string;
  soundProfile: string;
  stemColor: string;
  description: string;
  tags: string[];
}

export interface KeyboardProduct {
  id: string;
  name: string;
  series: 'Pro Series' | 'Max Series' | 'HE Magnetic' | 'Ultra-Slim';
  tagline: string;
  price: number;
  originalPrice?: number;
  layout: string;
  connectivity: string[];
  chassis: string;
  mounting: string;
  pollingRate: string;
  battery: string;
  weight: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  accentColor: string;
  shortDescription: string;
  features: string[];
  switchesAvailable: SwitchId[];
}

export interface CartItem {
  product: KeyboardProduct;
  selectedSwitch: SwitchOption;
  caseColor: string;
  quantity: number;
}

export type RGBEffect = 'spectrum' | 'sunset' | 'cyberpunk' | 'aurora' | 'monochrome' | 'reactive';
