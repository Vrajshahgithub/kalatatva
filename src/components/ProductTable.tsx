import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../Firebase.config';

const ProductTable = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    name: '',
    category: '',
    price: '',
    status: 'Published'
  });

  // Helper function to convert USD → INR
  const usdToInr = (usdPrice:any) => {
    // const exchangeRate = 83; // 1 USD ≈ ₹83 (you can update this or fetch live)
    // return (usdPrice * exchangeRate).toFixed(2);
    return usdPrice; // Assuming prices are already in INR for simplicity
  };


  // Helper function to get image URL (currently unused but kept for future use)
  // const getImageUrl = (image:any) => {
  //   if (image instanceof File) {
  //     return URL.createObjectURL(image);
  //   }
  //   return image; // Assume it's a normal URL string
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      status: product.status
    });
  };

  const handleSave = async (productId: string) => {
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        name: editData.name,
        category: editData.category,
        price: parseFloat(editData.price),
        status: editData.status
      });
      setEditingId(null);
      // Refresh products
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      name: '',
      category: '',
      price: '',
      status: 'Published'
    });
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const productRef = doc(db, 'products', productId);
        await deleteDoc(productRef);
        // Refresh products
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-medium text-gray-800">Recent Products</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product:any) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded object-cover" src={ "./assets/dumy.jpg"} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editData.category}
                      onChange={(e) => setEditData({...editData, category: e.target.value})}
                      className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">{product.category}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-1">₹</span>
                      <input
                        type="number"
                        value={editData.price}
                        onChange={(e) => setEditData({...editData, price: e.target.value})}
                        className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">₹{usdToInr(product.price)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({...editData, status: e.target.value})}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {editingId === product.id ? (
                      <>
                        <button 
                          onClick={() => handleSave(product.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          Save
                        </button>
                        <button 
                          onClick={handleCancel}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleEdit(product)}
                          className="text-pink-600 hover:text-pink-800"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
