import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase.config';

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  productCount: number;
  status: 'Active' | 'Inactive';
  createdAt: any;
}

interface CategoryCardProps {
  category: Category;
  onCategoryUpdate?: () => void;
}

const CategoryCard = ({ category, onCategoryUpdate }: CategoryCardProps) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const categoryRef = doc(db, 'categories', category.id);
        await deleteDoc(categoryRef);
        onCategoryUpdate?.();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
    
             <img
               src={category?.imageUrl || "./assets/dumy.jpg"}
               alt={category.name}
               className="w-12 h-12 rounded-lg object-cover"
             />
         
          <div>
            <h3 className="font-semibold text-gray-800">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.productCount} products</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          category.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {category.status}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {category.description}
      </p>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Created: {category.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</span>
        <div className="flex space-x-2">
          <button className="text-pink-600 hover:text-pink-700">Edit</button>
           <button 
             onClick={handleDelete}
             className="text-red-600 hover:text-red-700"
           >
             Delete
           </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 