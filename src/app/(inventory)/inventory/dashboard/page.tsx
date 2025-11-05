'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

export default function InventoryDashboard() {
  const metrics = [
    {
      title: 'Total Products',
      value: '524',
      change: '+12',
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '+5',
      changeType: 'negative' as const,
      icon: AlertTriangle,
    },
    {
      title: 'Out of Stock',
      value: '8',
      change: '-2',
      changeType: 'positive' as const,
      icon: TrendingDown,
    },
    {
      title: 'Active Suppliers',
      value: '47',
      change: '+3',
      changeType: 'positive' as const,
      icon: CheckCircle,
    },
  ];

  const lowStockItems = [
    { name: 'LED Panel 600x600', sku: 'SKU-12345', current: 15, minimum: 50, status: 'low' },
    { name: 'Circuit Breaker 32A', sku: 'SKU-12346', current: 8, minimum: 30, status: 'critical' },
    { name: 'Cable Wire 2.5mm', sku: 'SKU-12347', current: 120, minimum: 200, status: 'low' },
    { name: 'Junction Box IP65', sku: 'SKU-12348', current: 0, minimum: 25, status: 'out' },
  ];

  const recentOrders = [
    { id: 'PO-2024-001', supplier: 'ElectroSupply Co', items: 15, total: '$12,450', status: 'pending', date: '2024-10-20' },
    { id: 'PO-2024-002', supplier: 'PowerTech Ltd', items: 8, total: '$8,900', status: 'delivered', date: '2024-10-19' },
    { id: 'PO-2024-003', supplier: 'LightWorks Inc', items: 22, total: '$18,750', status: 'in_transit', date: '2024-10-18' },
    { id: 'PO-2024-004', supplier: 'ElectroSupply Co', items: 12, total: '$9,200', status: 'delivered', date: '2024-10-17' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Inventory Overview</h1>
        <p className="text-blue-100 mt-1 text-lg">Monitor stock levels and manage supply chain</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {metric.title}
                </CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-sm mt-1">
                  <span
                    className={
                      metric.changeType === 'positive'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {metric.change}
                  </span>{' '}
                  <span className="text-gray-500">from last week</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Stock Alerts</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Items requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.sku}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Current: <span className="font-semibold">{item.current}</span> / Min: <span className="font-semibold">{item.minimum}</span>
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.status === 'out' ? 'destructive' :
                      item.status === 'critical' ? 'destructive' : 'secondary'
                    }
                    className="font-semibold"
                  >
                    {item.status === 'out' ? 'OUT OF STOCK' :
                     item.status === 'critical' ? 'CRITICAL' : 'LOW STOCK'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Purchase Orders */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Recent Orders</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Latest purchase orders
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-bold text-gray-900">{order.id}</p>
                      <Badge
                        variant={
                          order.status === 'delivered' ? 'default' :
                          order.status === 'in_transit' ? 'secondary' : 'outline'
                        }
                      >
                        {order.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.supplier}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.items} items • {order.total} • {order.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common inventory tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Add Product</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Register new inventory item
              </p>
            </button>
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Stock Adjustment</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Update stock quantities
              </p>
            </button>
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <AlertTriangle className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Create PO</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                New purchase order
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
