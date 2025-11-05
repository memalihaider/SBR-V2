'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock supplier data
const mockSuppliers = [
  {
    id: 1,
    name: 'Global Tech Supplies',
    contactPerson: 'John Smith',
    email: 'john@globaltech.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, New York, NY 10001',
    productsSupplied: 45,
    totalOrders: 128,
    status: 'active',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Premium Electronics Ltd',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@premiumelec.com',
    phone: '+1 (555) 234-5678',
    address: '456 Commerce St, Los Angeles, CA 90001',
    productsSupplied: 32,
    totalOrders: 95,
    status: 'active',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Industrial Parts Co',
    contactPerson: 'Mike Brown',
    email: 'mike@indparts.com',
    phone: '+1 (555) 345-6789',
    address: '789 Industry Blvd, Chicago, IL 60601',
    productsSupplied: 67,
    totalOrders: 203,
    status: 'active',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Eco Materials Supply',
    contactPerson: 'Emily Davis',
    email: 'emily@ecomaterials.com',
    phone: '+1 (555) 456-7890',
    address: '321 Green Way, Portland, OR 97201',
    productsSupplied: 28,
    totalOrders: 56,
    status: 'pending',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Quick Ship Distributors',
    contactPerson: 'Robert Wilson',
    email: 'robert@quickship.com',
    phone: '+1 (555) 567-8901',
    address: '654 Logistics Dr, Miami, FL 33101',
    productsSupplied: 52,
    totalOrders: 167,
    status: 'active',
    rating: 4.7,
  },
];

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending'>('all');

  const getFilteredSuppliers = () => {
    let filtered = mockSuppliers;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const suppliers = getFilteredSuppliers();
  const activeSuppliers = mockSuppliers.filter(s => s.status === 'active').length;
  const totalProducts = mockSuppliers.reduce((sum, s) => sum + s.productsSupplied, 0);
  const averageRating = (mockSuppliers.reduce((sum, s) => sum + s.rating, 0) / mockSuppliers.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-1">Manage your supplier relationships</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Supplier
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockSuppliers.length}</div>
            <p className="text-sm text-gray-500 mt-1">Registered vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{activeSuppliers}</div>
            <p className="text-sm text-gray-500 mt-1">Currently supplying</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Products Supplied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalProducts}</div>
            <p className="text-sm text-gray-500 mt-1">Unique items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{averageRating} ★</div>
            <p className="text-sm text-gray-500 mt-1">Supplier quality</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search suppliers by name, contact, or email..."
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
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{supplier.contactPerson}</p>
                </div>
                <Badge className={supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {supplier.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {supplier.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {supplier.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {supplier.address}
                </div>

                <div className="pt-3 border-t grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{supplier.productsSupplied}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{supplier.totalOrders}</div>
                    <div className="text-xs text-gray-500">Orders</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-600">{supplier.rating} ★</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                <div className="pt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                  <Button size="sm" variant="outline" className="flex-1">Contact</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
