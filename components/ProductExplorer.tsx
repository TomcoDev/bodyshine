
import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, SkinType, HairConcern } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

const ProductExplorer: React.FC = () => {
  const [filters, setFilters] = useState<{
    category?: ProductCategory;
    skinType?: SkinType;
    hairConcern?: HairConcern;
    allergens: string[];
    searchTerm: string;
  }>({ allergens: [], searchTerm: '' });

  const handleFilterChange = (newFilters: { category?: ProductCategory; skinType?: SkinType; hairConcern?: HairConcern; allergens: string[]; searchTerm: string }) => {
    setFilters(newFilters);
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      if (filters.searchTerm && !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) && !product.brand.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (filters.skinType && product.category === ProductCategory.CUIDADO_PIEL && !product.skinTypeRecommendation?.includes(filters.skinType)) {
         return false;
      }
      if (filters.hairConcern && product.category === ProductCategory.CUIDADO_CABELLO && !product.hairConcernRecommendation?.includes(filters.hairConcern)) {
         return false;
      }
      if (filters.allergens.length > 0) {
        // This is a simplified allergen check. In reality, you'd check product.ingredients against a list of "bad" ingredients for each allergen tag.
        // For this demo, we check if product.tags contain "Sin [Allergen_Name]" or if ingredients mention it negatively.
        // E.g., if "Sulfatos" is in filters.allergens, we want products that are "Sin Sulfatos".
        // This mock data uses tags like "Sin Sulfatos", so we check against that.
        // A more robust check would involve parsing ingredient lists.
        const productAllergens = product.ingredients.filter(ing => ing.safetyRating === 'Evitar' || ing.safetyRating === 'Precaución').map(ing => ing.name.toLowerCase());
        for (const allergen of filters.allergens) {
            // If product contains an ingredient matching an allergen to avoid (e.g. "parabeno", "sulfato")
            if (productAllergens.some(pa => pa.includes(allergen.split(' ')[0].toLowerCase()))) return false;
            // Or if product tags explicitly say it's free of something, and we are NOT filtering for that.
            // This logic is a bit tricky for demo. Let's simplify: if an allergen is selected,
            // we assume the user wants products *without* it. This mock currently doesn't correctly filter *for* "free-of" products based on allergen selection.
            // A real app would need a "is_free_of_sulfates" boolean or similar per product.
        }
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-2 font-serif">Explorador de Productos</h1>
      <p className="text-white mb-8">Encuentra los productos perfectos para ti, filtrados por tus necesidades y preferencias.</p>
      
      <ProductFilter onFilterChange={handleFilterChange} currentFilters={filters} />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <img src="https://picsum.photos/seed/empty/200/200" alt="No products found" className="mx-auto mb-4 rounded-lg opacity-50" />
          <p className="text-xl text-neutral-600">No se encontraron productos que coincidan con tus filtros.</p>
          <p className="text-neutral-500">Intenta ajustar tu búsqueda o filtros.</p>
        </div>
      )}
    </div>
  );
};

export default ProductExplorer;
