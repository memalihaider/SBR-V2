'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Expense {
  id: string;
  expenseNumber: string;
  category: string;
  description: string;
  amount: number;
  submittedBy: string;
  submittedDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  approvedBy?: string;
  approvedDate?: Date;
  paidDate?: Date;
  projectId?: string;
  projectName?: string;
  receiptUrl?: string;
  paymentMethod?: string;
}

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'paid'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['Travel', 'Office Supplies', 'Equipment', 'Software', 'Marketing', 'Utilities', 'Training', 'Other'];

  // Generate mock expenses
  const expenses: Expense[] = Array.from({ length: 50 }, (_, i) => {
    const statuses: ('pending' | 'approved' | 'rejected' | 'paid')[] = ['pending', 'approved', 'rejected', 'paid'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];

    return {
      id: `EXP-${i + 1}`,
      expenseNumber: `EXP-2025-${String(i + 1).padStart(4, '0')}`,
      category,
      description: `${category} expense for company operations`,
      amount: Math.floor(Math.random() * 5000) + 100,
      submittedBy: `Employee ${Math.floor(Math.random() * 10) + 1}`,
      submittedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      status,
      approvedBy: ['approved', 'paid'].includes(status) ? 'Finance Manager' : undefined,
      approvedDate: ['approved', 'paid'].includes(status) ? new Date() : undefined,
      paidDate: status === 'paid' ? new Date() : undefined,
      projectId: Math.random() > 0.5 ? `PROJ-${Math.floor(Math.random() * 10) + 1}` : undefined,
      projectName: Math.random() > 0.5 ? `Project ${Math.floor(Math.random() * 10) + 1}` : undefined,
      receiptUrl: Math.random() > 0.3 ? '/receipts/receipt.pdf' : undefined,
      paymentMethod: status === 'paid' ? 'Bank Transfer' : undefined,
    };
  });

  const getFilteredExpenses = () => {
    let filtered = expenses;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(e => e.status === filterStatus);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(e => e.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(e =>
        e.expenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredExpenses = getFilteredExpenses();
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === 'pending').length;
  const approvedAmount = expenses.filter(e => ['approved', 'paid'].includes(e.status)).reduce((sum, e) => sum + e.amount, 0);
  const paidAmount = expenses.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      paid: 'bg-green-100 text-green-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-1">Track and approve company expenses</p>
        </div>
        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
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
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingExpenses}</div>
            <p className="text-sm text-gray-500 mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">${approvedAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Ready for payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${paidAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by expense number, description, or employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <Button variant={filterStatus === 'all' ? 'default' : 'outline'} onClick={() => setFilterStatus('all')}>
                All
              </Button>
              <Button variant={filterStatus === 'pending' ? 'default' : 'outline'} onClick={() => setFilterStatus('pending')}>
                Pending
              </Button>
              <Button variant={filterStatus === 'approved' ? 'default' : 'outline'} onClick={() => setFilterStatus('approved')}>
                Approved
              </Button>
              <Button variant={filterStatus === 'paid' ? 'default' : 'outline'} onClick={() => setFilterStatus('paid')}>
                Paid
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense List ({filteredExpenses.length} expenses)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Expense #</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted By</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{expense.expenseNumber}</p>
                        {expense.receiptUrl && (
                          <p className="text-xs text-blue-600">📎 Receipt attached</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{expense.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-gray-900">{expense.description}</p>
                        {expense.projectName && (
                          <p className="text-xs text-gray-500">Project: {expense.projectName}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{expense.submittedBy}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{expense.submittedDate.toLocaleDateString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-gray-900">${expense.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={getStatusBadge(expense.status)}>
                        {expense.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        {expense.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              Reject
                            </Button>
                          </>
                        )}
                        {expense.status === 'approved' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Mark Paid
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium">No expenses found</p>
              <p className="text-sm">Try adjusting your filters or search term</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
