'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Building2, DollarSign, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import mockData from '@/lib/mock-data';

const customers = mockData.customers;

export default function AdminSalesCustomersPage() {
  const customerStats = [
    { title: 'Total Customers', value: customers.length.toString(), change: '+18', icon: Users, color: 'blue' },
    { title: 'Active Customers', value: customers.filter(c => c.isActive).length.toString(), change: '+12', icon: Building2, color: 'green' },
    { title: 'Total Revenue', value: '$' + (customers.reduce((sum, c) => sum + c.totalRevenue, 0) / 1000000).toFixed(1) + 'M', change: '+22%', icon: DollarSign, color: 'yellow' },
    { title: 'Avg Order Value', value: '$' + Math.floor(customers.reduce((sum, c) => sum + c.totalRevenue, 0) / customers.length / 1000) + 'K', change: '+8%', icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Customers</h1>
            <p className="text-red-100 mt-1 text-lg">Complete customer database and relationship management</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <Users className="h-5 w-5 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerStats.map((stat, index) => {
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
                  <span className="text-green-600 font-semibold">{stat.change}</span>
                  <span className="text-gray-500"> from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Customers List */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Customer Directory</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            {customers.length} customers with complete business information
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {customers.slice(0, 15).map((customer) => (
              <div
                key={customer.id}
                className="p-5 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-md bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-14 h-14 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {customer.companyName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{customer.companyName}</h4>
                        <Badge variant={customer.isActive ? 'default' : 'secondary'}>
                          {customer.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </Badge>
                        <Badge variant="outline">{customer.customerType.toUpperCase()}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">{customer.industry}</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{customer.primaryContact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{customer.primaryContact.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{customer.address.city}, {customer.address.state}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500">Contact Person</p>
                          <p className="text-sm font-semibold text-gray-700">{customer.primaryContact.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment Terms</p>
                          <p className="text-sm font-semibold text-gray-700">{customer.paymentTerms}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Credit Limit</p>
                          <p className="text-sm font-semibold text-gray-700">${(customer.creditLimit / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <p className="text-2xl font-bold text-green-600">${(customer.totalRevenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500 mt-1">Total Revenue</p>
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
