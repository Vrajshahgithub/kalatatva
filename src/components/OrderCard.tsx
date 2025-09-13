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

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  // Safety check for undefined order
  if (!order) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500">Order data not available</p>
      </div>
    );
  }

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
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">Order #{order.orderNumber}</h3>
          <p className="text-sm text-gray-500">{order.customerName}</p>
          <p className="text-xs text-gray-400">{order.customerEmail}</p>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          <p className="text-sm font-medium text-gray-800 mt-1">${order.totalAmount
          ?.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Items ({order?.items?.length})</h4>
        <div className="space-y-2">
          {order?.items?.slice(0, 2)?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              {item?.imageUrl && (
                <img
                  src={item?.imageUrl}
                  alt={item.productName}
                  className="w-8 h-8 rounded object-cover"
                />
              )}
              <span className="text-gray-600">{item.productName}</span>
              <span className="text-gray-400">x{item.quantity}</span>
              <span className="text-gray-800 font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}
          {order?.items?.length > 2 && (
            <p className="text-xs text-gray-500">+{order?.items?.length - 2} more items</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
        <div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state}</p>
          <p>{order?.paymentMethod}</p>
        </div>
        <div className="flex space-x-2">
          <button className="text-pink-600 hover:text-pink-700 text-sm">View</button>
          <button className="text-blue-600 hover:text-blue-700 text-sm">Update</button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;