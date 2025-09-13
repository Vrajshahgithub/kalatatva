import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import OrderCard from './components/OrderCard';
import AddProductForm from './components/AddProductForm';
import AddCategoryForm from './components/AddCategoryForm';
import ProductTable from './components/ProductTable';
import CategoryTable from './components/CategoryTable';
import OrderTable from './components/OrderTable';
import { db } from './Firebase.config';
import { collection, getDocs } from 'firebase/firestore';


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  

  function getImageUrl(image: string | File): string {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  return image;
}
  // ✅ Load products from localStorage on first render
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Default initial products (only if nothing in localStorage)
      setProducts([
        {
          id: 1,
          name: 'Pink Floral Dress',
          price: 49.99,
          category: 'Clothing',
          description: 'Beautiful pink floral pattern dress for summer',
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          status: 'Published'
        },
        {
          id: 2,
          name: 'Rose Gold Watch',
          price: 89.99,
          category: 'Accessories',
          description: 'Elegant rose gold watch with leather strap',
          image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          status: 'Published'
        },
        {
          id: 3,
          name: 'Pink Ceramic Mug',
          price: 19.99,
          category: 'Home & Living',
          description: 'Handcrafted ceramic mug in pastel pink',
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          status: 'Draft'
        }
      ]);
    }
  }, []);

  // ✅ Save products to localStorage whenever products state changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const handleAddProduct = (newProduct: any) => {
    const productWithId = { ...newProduct, id: Date.now() }; // give unique id
    setProducts([...products, productWithId]);
    setShowAddProduct(false);
  };

  const handleAddCategory = (newCategory: any) => {
    const categoryWithId = { ...newCategory, id: Date.now() };
    setCategories([...categories, categoryWithId]);
    setShowAddCategory(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Dummy orders data
  useEffect(() => {
    const dummyOrders = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        customerPhone: '+1-555-0123',
        items: [
          {
            productId: 'prod-1',
            productName: 'Tribal Art Painting',
            quantity: 1,
            price: 150.00,
            imageUrl: '/dummy.jpg'
          },
          {
            productId: 'prod-2',
            productName: 'Wooden Sculpture',
            quantity: 2,
            price: 75.00,
            imageUrl: '/dummy.jpg'
          }
        ],
        totalAmount: 300.00,
        status: 'Processing',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        customerPhone: '+1-555-0456',
        items: [
          {
            productId: 'prod-3',
            productName: 'Handwoven Rug',
            quantity: 1,
            price: 200.00,
            imageUrl: '/dummy.jpg'
          }
        ],
        totalAmount: 200.00,
        status: 'Shipped',
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        paymentMethod: 'PayPal',
        paymentStatus: 'Paid',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-16')
      },
      {
        id: '3',
        orderNumber: 'ORD-003',
        customerName: 'Mike Wilson',
        customerEmail: 'mike.wilson@email.com',
        customerPhone: '+1-555-0789',
        items: [
          {
            productId: 'prod-4',
            productName: 'Ceramic Pottery',
            quantity: 3,
            price: 45.00,
            imageUrl: '/dummy.jpg'
          },
          {
            productId: 'prod-5',
            productName: 'Beaded Necklace',
            quantity: 1,
            price: 30.00,
            imageUrl: '/dummy.jpg'
          }
        ],
        totalAmount: 165.00,
        status: 'Delivered',
        shippingAddress: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        paymentMethod: 'Bank Transfer',
        paymentStatus: 'Paid',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: '4',
        orderNumber: 'ORD-004',
        customerName: 'Emily Davis',
        customerEmail: 'emily.davis@email.com',
        customerPhone: '+1-555-0321',
        items: [
          {
            productId: 'prod-6',
            productName: 'Traditional Mask',
            quantity: 1,
            price: 120.00,
            imageUrl: '/dummy.jpg'
          }
        ],
        totalAmount: 120.00,
        status: 'Pending',
        shippingAddress: {
          street: '321 Elm St',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'USA'
        },
        paymentMethod: 'Credit Card',
        paymentStatus: 'Pending',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '5',
        orderNumber: 'ORD-005',
        customerName: 'David Brown',
        customerEmail: 'david.brown@email.com',
        customerPhone: '+1-555-0654',
        items: [
          {
            productId: 'prod-7',
            productName: 'Bamboo Basket',
            quantity: 2,
            price: 35.00,
            imageUrl: '/dummy.jpg'
          },
          {
            productId: 'prod-8',
            productName: 'Stone Carving',
            quantity: 1,
            price: 85.00,
            imageUrl: '/dummy.jpg'
          },
          {
            productId: 'prod-9',
            productName: 'Textile Wall Hanging',
            quantity: 1,
            price: 95.00,
            imageUrl: '/dummy.jpg'
          }
        ],
        totalAmount: 250.00,
        status: 'Cancelled',
        shippingAddress: {
          street: '654 Maple Dr',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        },
        paymentMethod: 'Credit Card',
        paymentStatus: 'Refunded',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-17')
      }
    ];
    setOrders(dummyOrders);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard 
            title="Total Revenue" 
            value="12,548" 
            change={12.3} 
            icon="💰" 
            color="bg-pink-100 text-pink-600" 
          />
          <StatsCard 
            title="Total Orders" 
            value="1,258" 
            change={8.2} 
            icon="📦" 
            color="bg-pink-100 text-pink-600" 
          />
          <StatsCard 
            title="Total Customers" 
            value="2,458" 
            change={5.7} 
            icon="👥" 
            color="bg-pink-100 text-pink-600" 
          />
          <StatsCard 
            title="Total Products" 
            value="3.25%" 
            change={-2.1} 
            icon="📊" 
            color="bg-pink-100 text-pink-600" 
          />
          </div>
          
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-800">Products</h2>
          <button 
            onClick={() => setShowAddProduct(true)}
            className="btn-primary"
          >
            Add Product
          </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          </div>
          
          <ProductTable products={products} />
        </>
        )}

        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
              <button 
                onClick={() => setShowAddProduct(true)}
                className="btn-primary"
              >
                Add Product
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <ProductTable products={products} />
          </>
        )}

        {activeTab === 'categories' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
              <button 
                onClick={() => setShowAddCategory(true)}
                className="btn-primary"
              >
                Add Category
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
            
            <CategoryTable categories={categories} />
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border rounded-lg text-sm">
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm">
                  Export
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
            
            <OrderTable orders={orders} />
          </>
        )}

        {/* Your other tabs unchanged... */}
      </main>
      </div>
      
      {showAddProduct && (
      <AddProductForm 
          onAddProduct={handleAddProduct} 
          onCancel={() => setShowAddProduct(false)} 
        />
      )}

      {showAddCategory && (
        <AddCategoryForm 
          onAddCategory={handleAddCategory} 
          onCancel={() => setShowAddCategory(false)} 
        />
      )}
    </div>
  );
}

export default App;