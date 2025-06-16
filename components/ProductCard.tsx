
import React, { useState } from 'react';
import { Product, Ingredient } from '../types';
import Modal from './Modal';
import { getIngredientInfo } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [ingredientInfo, setIngredientInfo] = useState<string>('');
  const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(false);

  const handleIngredientClick = async (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
    if (ingredient.description) {
        setIngredientInfo(ingredient.description);
    } else {
        setIsLoadingInfo(true);
        const info = await getIngredientInfo(ingredient.name);
        setIngredientInfo(info);
        setIsLoadingInfo(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIngredient(null);
    setIngredientInfo('');
  };

  const getSafetyRatingColor = (rating: Ingredient['safetyRating']) => {
    switch (rating) {
      case 'Seguro': return 'bg-green-100 text-green-700';
      case 'Precaución': return 'bg-yellow-100 text-yellow-700';
      case 'Evitar': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-neutral-800 mb-1">{product.name}</h3>
          <p className="text-sm text-neutral-500 mb-2">{product.brand} - <span className="font-medium text-primary">{product.category}</span></p>
          <p className="text-neutral-600 text-sm mb-3 flex-grow">{product.description.substring(0,100)}{product.description.length > 100 ? '...' : ''}</p>
          
          <div className="mb-3">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.rating && (
              <span className="ml-2 text-yellow-500">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))} ({product.rating})</span>
            )}
          </div>

          <div className="mb-3">
            <h4 className="text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">Etiquetas:</h4>
            <div className="flex flex-wrap gap-1">
              {product.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => handleIngredientClick(product.ingredients[0])} // Mock: Show first ingredient, ideally a button "Ver Ingredientes"
            className="mt-auto w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-200 text-sm font-medium"
          >
            Ver Detalles e Ingredientes
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedIngredient ? `Ingrediente: ${selectedIngredient.name}` : "Detalles del Producto"}>
        {selectedIngredient ? (
            <>
                <p className={`px-2 py-1 text-xs rounded-full inline-block mb-2 ${getSafetyRatingColor(selectedIngredient.safetyRating)}`}>
                    Nivel de Seguridad: {selectedIngredient.safetyRating}
                </p>
                {isLoadingInfo ? <LoadingSpinner /> : <p className="text-neutral-700 whitespace-pre-wrap">{ingredientInfo}</p>}
                
                <h4 className="font-semibold mt-4 mb-2 text-neutral-700">Todos los Ingredientes de {product.name}:</h4>
                <ul className="list-disc list-inside text-sm text-neutral-600 max-h-60 overflow-y-auto">
                    {product.ingredients.map(ing => (
                        <li key={ing.id} className="mb-1 p-1 hover:bg-neutral-100 rounded cursor-pointer" onClick={() => handleIngredientClick(ing)}>
                            {ing.name} <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${getSafetyRatingColor(ing.safetyRating)}`}>{ing.safetyRating}</span>
                        </li>
                    ))}
                </ul>
            </>
        ) : (
          <p>Selecciona un ingrediente para ver más detalles.</p>
        )}
      </Modal>
    </>
  );
};

export default ProductCard;
