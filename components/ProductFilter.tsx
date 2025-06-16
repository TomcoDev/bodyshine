
import React from 'react';
import { ProductCategory, SkinType, HairConcern } from '../types';
import { ALLERGENS_LIST, SKIN_TYPES_OPTIONS, HAIR_CONCERNS_OPTIONS, PRODUCT_CATEGORIES_OPTIONS } from '../constants';

interface ProductFilterProps {
  onFilterChange: (filters: { category?: ProductCategory; skinType?: SkinType; hairConcern?: HairConcern; allergens: string[]; searchTerm: string }) => void;
  currentFilters: { category?: ProductCategory; skinType?: SkinType; hairConcern?: HairConcern; allergens: string[]; searchTerm: string };
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange, currentFilters }) => {
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...currentFilters, category: e.target.value as ProductCategory || undefined });
  };

  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...currentFilters, skinType: e.target.value as SkinType || undefined });
  };

  const handleHairConcernChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...currentFilters, hairConcern: e.target.value as HairConcern || undefined });
  };

  const handleAllergenChange = (allergen: string) => {
    const newAllergens = currentFilters.allergens.includes(allergen)
      ? currentFilters.allergens.filter(a => a !== allergen)
      : [...currentFilters.allergens, allergen];
    onFilterChange({ ...currentFilters, allergens: newAllergens });
  };
  
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...currentFilters, searchTerm: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-semibold text-neutral-800 mb-4">Filtrar Productos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="searchTerm" className="block text-sm font-medium text-neutral-700 mb-1">Buscar por nombre</label>
          <input
            type="text"
            id="searchTerm"
            value={currentFilters.searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Ej: Sérum Vitamina C"
            className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">Categoría</label>
          <select 
            id="category" 
            value={currentFilters.category || ''} 
            onChange={handleCategoryChange}
            className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Todas las Categorías</option>
            {PRODUCT_CATEGORIES_OPTIONS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="skinType" className="block text-sm font-medium text-neutral-700 mb-1">Tipo de Piel</label>
          <select 
            id="skinType" 
            value={currentFilters.skinType || ''} 
            onChange={handleSkinTypeChange}
            className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Todos los Tipos</option>
            {SKIN_TYPES_OPTIONS.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="hairConcern" className="block text-sm font-medium text-neutral-700 mb-1">Preocupación Capilar</label>
          <select 
            id="hairConcern" 
            value={currentFilters.hairConcern || ''} 
            onChange={handleHairConcernChange}
            className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Todas las Preocupaciones</option>
            {HAIR_CONCERNS_OPTIONS.map(concern => <option key={concern} value={concern}>{concern}</option>)}
          </select>
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Evitar Ingredientes (Alérgenos)</label>
          <div className="flex flex-wrap gap-2">
            {ALLERGENS_LIST.map(allergen => (
              <button
                key={allergen}
                onClick={() => handleAllergenChange(allergen)}
                className={`px-3 py-1.5 border rounded-full text-sm transition-colors
                  ${currentFilters.allergens.includes(allergen) 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-neutral-600 border-neutral-300 hover:border-primary hover:text-primary'}`}
              >
                {allergen}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
