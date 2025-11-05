'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, TrendingDown, AlertTriangle, DollarSign, Search } from 'lucide-react';
import mockData from '@/lib/mock-data';

const products = mockData.products;

export default function AdminInventoryProductsPage() {
  const productStats = [
    { title: 'Total Products', value: products.length.toString(), change: '+42', icon: Package, color: 'blue' },
    { title: 'Low Stock Items', value: products.filter(p => p.currentStock <= p.minStockLevel).length.toString(), change: '+8', icon: AlertTriangle, color: 'red' },
    { title: 'Out of Stock', value: products.filter(p => p.currentStock === 0).length.toString(), change: '-5', icon: TrendingDown, color: 'yellow' },
    { title: 'Total Inventory Value', value: '$' + (products.reduce((sum, p) => sum + (p.costPrice * p.currentStock), 0) / 1000000).toFixed(1) + 'M', change: '+12%', icon: DollarSign, color: 'green' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Products</h1>
            <p className="text-red-100 mt-1 text-lg">Complete product catalog and inventory management</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <Package className="h-5 w-5 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">{stat.title}</CardTitle>
                <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                  <IconComponent className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{stat.change}</span>
                  <span className="text-gray-500"> from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search */}
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, SKU, or category..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
              />
            </div>
            <Button variant="outline" className="px-6">Filter</Button>
            <Button variant="outline" className="px-6">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Product Catalog ({products.length})</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Complete product inventory with stock levels and pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {products.slice(0, 20).map((product) => (
              <div
                key={product.id}
                className="p-5 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-md bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{product.name}</h4>
                      <Badge variant="outline">{product.category.toUpperCase()}</Badge>
                      {product.currentStock <= product.minStockLevel && (
                        <Badge variant="destructive" className="text-xs">LOW STOCK</Badge>
                      )}
                      {product.currentStock === 0 && (
                        <Badge variant="destructive" className="text-xs">OUT OF STOCK</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">SKU: {product.sku} | Model: {product.modelNumber}</p>
                    <div className="grid grid-cols-4 gap-4 mt-3 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Manufacturer</p>
                        <p className="text-sm font-semibold text-gray-700">{product.manufacturer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Current Stock</p>
                        <p className="text-sm font-semibold text-gray-700">{product.currentStock} units</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Min Level</p>
                        <p className="text-sm font-semibold text-gray-700">{product.minStockLevel} units</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Cost Price</p>
                        <p className="text-sm font-semibold text-gray-700">${product.costPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <p className="text-2xl font-bold text-green-600">${product.sellingPrice.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">Selling Price</p>
                    <p className="text-sm font-semibold text-gray-600 mt-1">{(product.margin * 100).toFixed(0)}% margin</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
