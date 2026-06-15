export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  price: number;
  icon: string;
}

export interface Booking {
  id: string;
  customerName: string;
  whatsapp: string;
  address: string;
  serviceId: string;
  date: string;
  time: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  stars: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export interface GeminiEstimateResponse {
  success: boolean;
  serviceRecommendation: string;
  estimatedWeightKg?: number;
  estimatedPrice: number;
  breakdown: string;
  errorMessage?: string;
}
