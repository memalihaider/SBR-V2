'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock expense data
const mockExpenses = [
  {
    id: 1,
    category: 'Office Supplies',
    description: 'Printer ink and paper',
    amount: 245.50,
    date: new Date('2025-10-20'),
    vendor: 'Office Depot',
    status: 'approved',
    approvedBy: 'Sarah Johnson',
    paymentMethod: 'Company Card',
  },
  {
    id: 2,
    category: 'Travel',
    description: 'Client meeting - NYC',
    amount: 1250.00,
    date: new Date('2025-10-18'),
    vendor: 'Delta Airlines',
    status: 'approved',
    approvedBy: 'Michael Chen',
    paymentMethod: 'Corporate Account',
  },
  {
    id: 3,
    category: 'Software',
    description: 'Adobe Creative Cloud - Annual',
    amount: 599.88,
    date: new Date('2025-10-15'),
    vendor: 'Adobe Inc.',
    status: 'approved',
    approvedBy: 'Sarah Johnson',
    paymentMethod: 'Company Card',
  },
  {
    id: 4,
    category: 'Marketing',
    description: 'Google Ads Campaign - October',
    amount: 3500.00,
    date: new Date('2025-10-12'),
    vendor: 'Google LLC',
    status: 'pending',
    approvedBy: null,
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 5,
    category: 'Utilities',
    description: 'Internet and Phone Services',
    amount: 450.00,
    date: new Date('2025-10-10'),
    vendor: 'Verizon',
    status: 'approved',
    approvedBy: 'Sarah Johnson',
    paymentMethod: 'Auto-Pay',
  },
  {
    id: 6,
    category: 'Office Supplies',
    description: 'Desk chairs and accessories',
    amount: 1850.00,
    date: new Date('2025-10-08'),
    vendor: 'IKEA Business',
    status: 'rejected',
    approvedBy: 'Michael Chen',
    paymentMethod: 'Purchase Order',
  },
  {
    id: 7,
    category: 'Travel',
    description: 'Hotel accommodation - Conference',
    amount: 780.00,
    date: new Date('2025-10-05'),
    vendor: 'Marriott Hotels',
    status: 'approved',
    approvedBy: 'Sarah Johnson',
    paymentMethod: 'Company Card',
  },
  {
    id: 8,
    category: 'Equipment',
    description: 'Laptop for new developer',
    amount: 2199.00,
    date: new Date('2025-10-03'),
    vendor: 'Apple Store',
    status: 'pending',
    approvedBy: null,
    paymentMethod: 'Purchase Order',
  },
];

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  const getFilteredExpenses = () => {
    let filtered = mockExpenses;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(e => e.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.vendor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const expenses = getFilteredExpenses();
  const totalExpenses = mockExpenses.reduce((sum, e) => sum + e.amount, 0);
  const approvedExpenses = mockExpenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = mockExpenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
  const pendingCount = mockExpenses.filter(e => e.status === 'pending').length;

  const getStatusBadge = (status: string) => {
    if (status === 'approved') return 'bg-green-100 text-green-800';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-1">Track and manage company expenses</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Expense
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${approvedExpenses.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Paid/Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">${pendingExpenses.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">{pendingCount} items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{mockExpenses.length}</div>
            <p className="text-sm text-gray-500 mt-1">Total transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by description, category, or vendor..."
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
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('approved')}
              >
                Approved
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('rejected')}
              >
                Rejected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Records ({expenses.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Vendor</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Method</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Approved By</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {expense.date.toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{expense.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{expense.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{expense.vendor}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-bold text-gray-900">${expense.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{expense.paymentMethod}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={getStatusBadge(expense.status)}>
                        {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {expense.approvedBy || '-'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        {expense.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
