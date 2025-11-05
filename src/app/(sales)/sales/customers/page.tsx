'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import mockData from '@/lib/mock-data';

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'enterprise' | 'sme' | 'government' | 'individual'>('all');

  const getFilteredCustomers = () => {
    let filtered = mockData.customers;

    if (filterType !== 'all') {
      filtered = filtered.filter(c => c.customerType === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.primaryContact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.primaryContact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const customers = getFilteredCustomers();
  const totalCustomers = mockData.customers.length;
  const enterpriseCount = mockData.customers.filter(c => c.customerType === 'enterprise').length;
  const smeCount = mockData.customers.filter(c => c.customerType === 'sme').length;
  const totalRevenue = mockData.customers.reduce((sum, c) => sum + c.totalRevenue, 0);

  const getTypeBadge = (type: string) => {
    const badges: Record<string, string> = {
      enterprise: 'bg-purple-100 text-purple-800',
      sme: 'bg-blue-100 text-blue-800',
      government: 'bg-green-100 text-green-800',
      individual: 'bg-gray-100 text-gray-800',
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer relationships</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalCustomers}</div>
            <p className="text-sm text-gray-500 mt-1">Active accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{enterpriseCount}</div>
            <p className="text-sm text-gray-500 mt-1">Large accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">SME</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{smeCount}</div>
            <p className="text-sm text-gray-500 mt-1">Small/Medium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Customer value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by company, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'enterprise' ? 'default' : 'outline'}
                onClick={() => setFilterType('enterprise')}
              >
                Enterprise
              </Button>
              <Button
                variant={filterType === 'sme' ? 'default' : 'outline'}
                onClick={() => setFilterType('sme')}
              >
                SME
              </Button>
              <Button
                variant={filterType === 'government' ? 'default' : 'outline'}
                onClick={() => setFilterType('government')}
              >
                Government
              </Button>
              <Button
                variant={filterType === 'individual' ? 'default' : 'outline'}
                onClick={() => setFilterType('individual')}
              >
                Individual
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Accounts ({customers.length} accounts)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact Person</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Revenue</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Active Projects</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{customer.companyName}</div>
                      <div className="text-sm text-gray-500">{customer.industry}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{customer.primaryContact.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{customer.primaryContact.email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{customer.primaryContact.phone}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={getTypeBadge(customer.customerType)}>
                        {customer.customerType.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-bold text-green-600">${customer.totalRevenue.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium text-gray-900">{customer.projects.length}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {customers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-lg font-medium">No customers found</p>
              <p className="text-sm">Try adjusting your filters or search term</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
