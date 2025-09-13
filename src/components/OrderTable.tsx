import React from 'react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }>;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  createdAt: any;
  updatedAt: any;
}

const OrderTable = () => {
  // Dummy order data
  const orders: Order[] = [
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">#{order.orderNumber}</div>
                    <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.items.slice(0, 2).map(item => item.productName).join(', ')}
                    {order.items.length > 2 && ` +${order.items.length - 2} more`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">₹{order.totalAmount.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.createdAt?.toLocaleDateString() || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-pink-600 hover:text-pink-900">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Update</button>
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

export default OrderTable;