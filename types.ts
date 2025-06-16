
export interface Ingredient {
  id: string;
  name: string;
  description?: string;
  safetyRating: 'Seguro' | 'Precaución' | 'Evitar'; // Safe, Caution, Avoid
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  description: string;
  imageUrl: string;
  price: number;
  ingredients: Ingredient[];
  tags: string[]; // e.g., "Sin Sulfatos", "Orgánico", "Vegano"
  rating?: number; // 1-5 stars
  skinTypeRecommendation?: SkinType[];
  hairConcernRecommendation?: HairConcern[];
}

export enum ProductCategory {
  CUIDADO_PIEL = "Cuidado de la Piel",
  MAQUILLAJE = "Maquillaje",
  CUIDADO_CABELLO = "Cuidado del Cabello",
  CUIDADO_CUERPO = "Cuidado del Cuerpo",
  FRAGANCIAS = "Fragancias",
}

export interface Professional {
  id: string;
  name: string;
  specialty: string; // e.g., "Peluquería", "Maquillaje Profesional", "Manicura"
  location: string;
  imageUrl: string;
  services: { name: string; price: number; duration: number }[]; // duration in minutes
  rating?: number; // 1-5 stars
  availability: string[]; // e.g., ["Lunes 9-5", "Martes 9-5"]
}

export interface Appointment {
  id: string;
  professionalId: string;
  professionalName: string;
  serviceName: string;
  date: string; // ISO string or a formatted date string
  time: string;
  userName: string;
  userEmail: string;
}

export enum SkinType {
  GRASA = "Grasa",
  SECA = "Seca",
  MIXTA = "Mixta",
  NORMAL = "Normal",
  SENSIBLE = "Sensible",
}

export enum HairConcern {
  CASPA = "Caspa",
  CAIDA_CABELLO = "Caída de Cabello",
  SEQUEDAD = "Sequedad",
  GRASITUD = "Grasitud",
  VOLUMEN = "Falta de Volumen",
  DANADO = "Cabello Dañado",
}

export interface WellnessTip {
  id: string;
  title: string;
  content: string;
  category: 'Nutrición' | 'Ejercicio' | 'Descanso' | 'Manejo del Estrés';
  imageUrl?: string;
}

export interface VirtualLook {
  id: string;
  name: string;
  type: 'Maquillaje' | 'Peinado';
  imageUrl: string;
  description: string;
}

export type Page = 'home' | 'products' | 'tryon' | 'appointments' | 'advisor' | 'wellness';
