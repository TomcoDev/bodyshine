
import { Product, Professional, WellnessTip, VirtualLook, ProductCategory, SkinType, HairConcern } from './types';

export const GEMINI_MODEL_NAME = 'gemini-3-flash-preview';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Limpiador Facial Suave',
    brand: 'BellezaPura',
    category: ProductCategory.CUIDADO_PIEL,
    description: 'Un limpiador facial suave formulado con extractos botánicos para eliminar impurezas sin resecar la piel. Ideal para pieles sensibles.',
    imageUrl: 'https://images.pexels.com/photos/27272555/pexels-photo-27272555.jpeg',
    price: 18.99,
    ingredients: [
      { id: 'ing1', name: 'Agua (Aqua)', safetyRating: 'Seguro' },
      { id: 'ing2', name: 'Glicerina', safetyRating: 'Seguro' },
      { id: 'ing3', name: 'Extracto de Aloe Vera', safetyRating: 'Seguro' },
      { id: 'ing4', name: 'Coco-Glucósido', safetyRating: 'Seguro' },
      { id: 'ing5', name: 'Parabeno X', safetyRating: 'Evitar', description: "Conservante potencialmente disruptor endocrino." },
    ],
    tags: ['Sin Sulfatos', 'Piel Sensible', 'Vegano'],
    rating: 4.5,
    skinTypeRecommendation: [SkinType.SENSIBLE, SkinType.NORMAL, SkinType.SECA],
  },
  {
    id: 'prod2',
    name: 'Sérum Rejuvenecedor con Vitamina C',
    brand: 'EternaJuventud',
    category: ProductCategory.CUIDADO_PIEL,
    description: 'Potente sérum antioxidante con Vitamina C estabilizada para iluminar la piel, reducir manchas y combatir los signos del envejecimiento.',
    imageUrl: 'https://images.pexels.com/photos/28255124/pexels-photo-28255124.jpeg',
    price: 35.50,
    ingredients: [
      { id: 'ing1', name: 'Agua (Aqua)', safetyRating: 'Seguro' },
      { id: 'ing6', name: 'Ácido Ascórbico (Vitamina C)', safetyRating: 'Seguro' },
      { id: 'ing7', name: 'Ácido Hialurónico', safetyRating: 'Seguro' },
      { id: 'ing8', name: 'Ftalato Y', safetyRating: 'Evitar', description: "Puede afectar el sistema reproductivo." },
    ],
    tags: ['Antiedad', 'Iluminador', 'Libre de Parabenos'],
    rating: 4.8,
    skinTypeRecommendation: [SkinType.GRASA, SkinType.MIXTA, SkinType.NORMAL],
  },
  {
    id: 'prod3',
    name: 'Shampoo Reparador de Argán',
    brand: 'CabelloSano',
    category: ProductCategory.CUIDADO_CABELLO,
    description: 'Champú nutritivo con aceite de argán para reparar el cabello dañado, aportar brillo y suavidad.',
    imageUrl: 'https://images.pexels.com/photos/9909784/pexels-photo-9909784.jpeg',
    price: 22.00,
    ingredients: [
      { id: 'ing1', name: 'Agua (Aqua)', safetyRating: 'Seguro' },
      { id: 'ing9', name: 'Lauril Sulfato de Sodio', safetyRating: 'Precaución', description: "Puede ser irritante para algunas personas." },
      { id: 'ing10', name: 'Aceite de Argán', safetyRating: 'Seguro' },
    ],
    tags: ['Reparador', 'Brillo', 'Sin Siliconas'],
    rating: 4.2,
    hairConcernRecommendation: [HairConcern.DANADO, HairConcern.SEQUEDAD],
  },
  {
    id: 'prod4',
    name: 'Base de Maquillaje Cobertura Total',
    brand: 'GlamFace',
    category: ProductCategory.MAQUILLAJE,
    description: 'Base de maquillaje de larga duración y cobertura total para un acabado impecable y uniforme.',
    imageUrl: 'https://images.pexels.com/photos/12344805/pexels-photo-12344805.jpeg',
    price: 28.75,
    ingredients: [
      { id: 'ing1', name: 'Agua (Aqua)', safetyRating: 'Seguro' },
      { id: 'ing11', name: 'Dióxido de Titanio', safetyRating: 'Seguro' },
      { id: 'ing12', name: 'Talco', safetyRating: 'Precaución', description: "Algunos estudios lo ligan a problemas respiratorios si se inhala." },
    ],
    tags: ['Larga Duración', 'Cobertura Total'],
    rating: 4.6,
  },
];

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 'prof1',
    name: 'Laura Gómez Estilista',
    specialty: 'Peluquería y Coloración',
    location: 'Madrid Centro',
    imageUrl: 'https://images.pexels.com/photos/7755553/pexels-photo-7755553.jpeg',
    services: [
      { name: 'Corte de Mujer', price: 45, duration: 60 },
      { name: 'Coloración Completa', price: 90, duration: 120 },
      { name: 'Peinado de Evento', price: 60, duration: 75 },
    ],
    rating: 4.9,
    availability: ['Lunes a Viernes: 10:00 - 19:00', 'Sábados: 10:00 - 14:00'],
  },
  {
    id: 'prof2',
    name: 'Carlos Ruiz Maquillador',
    specialty: 'Maquillaje Profesional',
    location: 'Barcelona Eixample',
    imageUrl: 'https://images.pexels.com/photos/8088393/pexels-photo-8088393.jpeg',
    services: [
      { name: 'Maquillaje de Día', price: 50, duration: 60 },
      { name: 'Maquillaje de Noche/Evento', price: 75, duration: 90 },
      { name: 'Clase de Automaquillaje', price: 100, duration: 120 },
    ],
    rating: 4.7,
    availability: ['Martes a Sábado: 11:00 - 20:00'],
  },
  {
    id: 'prof3',
    name: 'Ana Torres Nails & Spa',
    specialty: 'Manicura y Pedicura',
    location: 'Valencia Ruzafa',
    imageUrl: 'https://images.pexels.com/photos/4783269/pexels-photo-4783269.jpeg',
    services: [
      { name: 'Manicura Completa', price: 25, duration: 45 },
      { name: 'Pedicura Spa', price: 40, duration: 60 },
      { name: 'Uñas Acrílicas', price: 55, duration: 90 },
    ],
    rating: 4.8,
    availability: ['Lunes a Sábado: 09:00 - 18:00'],
  },
];

export const MOCK_WELLNESS_TIPS: WellnessTip[] = [
  {
    id: 'well1',
    title: 'La Importancia de la Hidratación para una Piel Radiante',
    content: 'Beber suficiente agua (alrededor de 2 litros al día) es fundamental para mantener la elasticidad y luminosidad de la piel. Ayuda a eliminar toxinas y a mantener las células de la piel bien hidratadas desde dentro.',
    category: 'Nutrición',
    imageUrl: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
  },
  {
    id: 'well2',
    title: 'Yoga Facial: Ejercicios para Tonificar y Rejuvenecer',
    content: 'Practicar yoga facial unos minutos al día puede ayudar a mejorar la circulación, tonificar los músculos faciales y reducir la aparición de arrugas finas. Busca rutinas sencillas online.',
    category: 'Ejercicio',
    imageUrl: 'https://images.pexels.com/photos/8076087/pexels-photo-8076087.jpeg',
  },
  {
    id: 'well3',
    title: 'Duerme Bien para una Piel Descansada',
    content: 'Durante el sueño, la piel se repara y regenera. Intenta dormir entre 7 y 8 horas de calidad cada noche para despertar con una piel fresca y revitalizada. Evita pantallas antes de dormir.',
    category: 'Descanso',
    imageUrl: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg',
  },
];

export const MOCK_VIRTUAL_LOOKS: VirtualLook[] = [
  {
    id: 'look1',
    name: 'Look Labios Rojos Intensos',
    type: 'Maquillaje',
    imageUrl: 'https://images.pexels.com/photos/1161934/pexels-photo-1161934.jpeg',
    description: 'Un clásico atemporal. Labios rojos vibrantes para un toque de glamour instantáneo.'
  },
  {
    id: 'look2',
    name: 'Peinado Ondas Suaves',
    type: 'Peinado',
    imageUrl: 'https://images.pexels.com/photos/29207671/pexels-photo-29207671.jpeg',
    description: 'Ondas naturales y suaves, perfectas para cualquier ocasión.'
  },
  {
    id: 'look3',
    name: 'Smokey Eyes Sofisticado',
    type: 'Maquillaje',
    imageUrl: 'https://images.pexels.com/photos/16465930/pexels-photo-16465930.jpeg',
    description: 'Un look de ojos ahumados elegante para una mirada penetrante.'
  },
   {
    id: 'look4',
    name: 'Corte Fade Moderno',
    type: 'Peinado',
    imageUrl: 'https://images.pexels.com/photos/5700049/pexels-photo-5700049.jpeg',
    description: 'Un corte de cabello fade moderno y limpio, ideal para un look fresco y actual.'
  }
];

export const ALLERGENS_LIST = ['Sulfatos', 'Parabenos', 'Ftalatos', 'Siliconas', 'Fragancias Sintéticas', 'Colorantes Artificiales'];
export const SKIN_TYPES_OPTIONS = Object.values(SkinType);
export const HAIR_CONCERNS_OPTIONS = Object.values(HairConcern);
export const PRODUCT_CATEGORIES_OPTIONS = Object.values(ProductCategory);
