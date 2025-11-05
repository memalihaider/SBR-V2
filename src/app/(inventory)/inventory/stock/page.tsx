'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import mockData from '@/lib/mock-data';

interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  type: 'increase' | 'decrease' | 'transfer';
  quantity: number;
  reason: string;
  adjustedBy: string;
  date: Date;
}

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'in_stock' | 'low' | 'out'>('all');

  // Mock stock adjustments
  const stockAdjustments: StockAdjustment[] = [
    {
      id: 'ADJ-001',
      productId: mockData.products[0].id,
      productName: mockData.products[0].name,
      type: 'increase',
      quantity: 50,
      reason: 'Purchase Order Received',
      adjustedBy: 'John Doe',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'ADJ-002',
      productId: mockData.products[1].id,
      productName: mockData.products[1].name,
      type: 'decrease',
      quantity: 20,
      reason: 'Damaged Items',
      adjustedBy: 'Jane Smith',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'ADJ-003',
      productId: mockData.products[2].id,
      productName: mockData.products[2].name,
      type: 'increase',
      quantity: 100,
      reason: 'Stock Replenishment',
      adjustedBy: 'John Doe',
      date: new Date(),
    },
  ];

  const getFilteredProducts = () => {
    let filtered = mockData.products;

    if (filterStatus === 'out') {
      filtered = filtered.filter(p => p.currentStock === 0);
    } else if (filterStatus === 'low') {
      filtered = filtered.filter(p => p.currentStock > 0 && p.currentStock <= p.minStockLevel);
    } else if (filterStatus === 'in_stock') {
      filtered = filtered.filter(p => p.currentStock > p.minStockLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const products = getFilteredProducts();
  const outOfStock = mockData.products.filter(p => p.currentStock === 0).length;
  const lowStock = mockData.products.filter(p => p.currentStock > 0 && p.currentStock <= p.minStockLevel).length;
  const inStock = mockData.products.filter(p => p.currentStock > p.minStockLevel).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
          <p className="text-gray-600 mt-1">Monitor and adjust inventory levels</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adjust Stock
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{inStock}</div>
            <p className="text-sm text-gray-500 mt-1">Above minimum level</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{lowStock}</div>
            <p className="text-sm text-gray-500 mt-1">Need reorder</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{outOfStock}</div>
            <p className="text-sm text-gray-500 mt-1">Immediate action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockData.products.length}</div>
            <p className="text-sm text-gray-500 mt-1">In catalog</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by product name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'in_stock' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('in_stock')}
              >
                In Stock
              </Button>
              <Button
                variant={filterStatus === 'low' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('low')}
              >
                Low Stock
              </Button>
              <Button
                variant={filterStatus === 'out' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('out')}
              >
                Out of Stock
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Levels Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels ({products.length} products)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">SKU</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Current Stock</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Min Level</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock Health</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const stockPercentage = product.minStockLevel > 0 
                    ? Math.min((product.currentStock / product.minStockLevel) * 100, 100) 
                    : 100;
                  
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono text-gray-600">{product.sku}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-lg font-bold ${
                          product.currentStock === 0 ? 'text-red-600' :
                          product.currentStock <= product.minStockLevel ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          {product.currentStock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-gray-600">{product.minStockLevel}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1 w-40">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>{stockPercentage.toFixed(0)}%</span>
                            <span>{product.currentStock} / {product.minStockLevel}</span>
                          </div>
                          <Progress 
                            value={stockPercentage} 
                            className="h-2"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {product.currentStock === 0 ? (
                          <Badge className="bg-red-100 text-red-800">Out</Badge>
                        ) : product.currentStock <= product.minStockLevel ? (
                          <Badge className="bg-orange-100 text-orange-800">Low</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">Good</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline">Adjust</Button>
                          <Button size="sm" variant="outline">History</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Stock Adjustments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stockAdjustments.map((adj) => (
              <div key={adj.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    adj.type === 'increase' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {adj.type === 'increase' ? (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{adj.productName}</p>
                    <p className="text-sm text-gray-600">{adj.reason}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>By: {adj.adjustedBy}</span>
                      <span>•</span>
                      <span>{adj.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    adj.type === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {adj.type === 'increase' ? '+' : '-'}{adj.quantity}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{adj.id}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
