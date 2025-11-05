'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';

export default function VendorOrdersPage() {
  const metrics = [
    {
      title: 'Active Orders',
      value: '12',
      change: '+3',
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Total Revenue',
      value: '$125K',
      change: '+18%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Products Supplied',
      value: '156',
      change: '+24',
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Performance Score',
      value: '95%',
      change: '+2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ];

  const purchaseOrders = [
    {
      id: 'PO-2024-145',
      items: [
        { name: 'LED Panel 600x600', qty: 50, price: '$75' },
        { name: 'Circuit Breaker 32A', qty: 30, price: '$45' },
      ],
      total: '$5,100',
      status: 'pending',
      orderDate: '2024-10-22',
      deliveryDate: '2024-10-28',
    },
    {
      id: 'PO-2024-142',
      items: [
        { name: 'Cable Wire 2.5mm', qty: 500, price: '$12' },
        { name: 'Junction Box IP65', qty: 100, price: '$18' },
      ],
      total: '$7,800',
      status: 'in_transit',
      orderDate: '2024-10-18',
      deliveryDate: '2024-10-24',
    },
    {
      id: 'PO-2024-138',
      items: [
        { name: 'Smart Switch', qty: 75, price: '$55' },
      ],
      total: '$4,125',
      status: 'delivered',
      orderDate: '2024-10-15',
      deliveryDate: '2024-10-20',
    },
  ];

  const recentPayments = [
    { id: 'PAY-2024-089', order: 'PO-2024-138', amount: '$4,125', date: '2024-10-21', status: 'completed' },
    { id: 'PAY-2024-088', order: 'PO-2024-135', amount: '$8,750', date: '2024-10-18', status: 'completed' },
    { id: 'PAY-2024-087', order: 'PO-2024-132', amount: '$12,300', date: '2024-10-15', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Supplier Dashboard</h1>
        <p className="text-pink-100 mt-1 text-lg">Manage orders, deliveries, and payments</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {metric.title}
                </CardTitle>
                <div className="p-2 bg-pink-100 rounded-lg">
                  <IconComponent className="h-5 w-5 text-pink-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-sm mt-1">
                  <span className="text-green-600 font-semibold">{metric.change}</span>{' '}
                  <span className="text-gray-500">from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Purchase Orders */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Purchase Orders</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Current and recent orders from clients
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {purchaseOrders.map((order) => (
              <div key={order.id} className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{order.id}</h4>
                      <Badge
                        variant={
                          order.status === 'delivered' ? 'default' :
                          order.status === 'in_transit' ? 'secondary' : 'outline'
                        }
                        className="font-semibold"
                      >
                        {order.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="text-gray-600">Qty: <span className="font-semibold">{item.qty}</span> × {item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Order Date</p>
                        <p className="font-semibold text-gray-900">{order.orderDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Delivery Date</p>
                        <p className="font-semibold text-gray-900">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Amount</p>
                        <p className="font-bold text-pink-600 text-lg">{order.total}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Recent Payments</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Payment history and transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-bold text-gray-900">{payment.id}</p>
                    <Badge variant="default">
                      {payment.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Order: {payment.order}</p>
                  <p className="text-xs text-gray-500 mt-1">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{payment.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common vendor tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 hover:border-pink-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">View Orders</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                All purchase orders
              </p>
            </button>
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Update Stock</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Product availability
              </p>
            </button>
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Submit Invoice</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Create new invoice
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
