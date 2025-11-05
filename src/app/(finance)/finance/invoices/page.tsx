'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import mockData from '@/lib/mock-data';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  projectId?: string;
  projectName?: string;
  issueDate: Date;
  dueDate: Date;
  amount: number;
  tax: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paidDate?: Date;
  paidAmount?: number;
  paymentMethod?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
}

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'>('all');

  // Generate mock invoices
  const invoices: Invoice[] = mockData.projects.map((project, idx) => {
    const customer = mockData.getCustomerById(project.customerId);
    const statuses: ('draft' | 'sent' | 'paid' | 'overdue' | 'cancelled')[] = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = project.budgetAmount * 0.8;
    const tax = amount * 0.1;
    const totalAmount = amount + tax;

    return {
      id: `INV-${idx + 1}`,
      invoiceNumber: `INV-2025-${String(idx + 1).padStart(4, '0')}`,
      customerId: project.customerId,
      customerName: customer?.companyName || 'Unknown',
      projectId: project.id,
      projectName: project.name,
      issueDate: new Date(project.startDate),
      dueDate: new Date(new Date(project.startDate).getTime() + 30 * 24 * 60 * 60 * 1000),
      amount,
      tax,
      totalAmount,
      status,
      paidDate: status === 'paid' ? new Date() : undefined,
      paidAmount: status === 'paid' ? totalAmount : undefined,
      paymentMethod: status === 'paid' ? 'Bank Transfer' : undefined,
      items: [
        {
          description: `Project ${project.name} - Phase 1`,
          quantity: 1,
          unitPrice: amount * 0.5,
          amount: amount * 0.5,
        },
        {
          description: `Project ${project.name} - Phase 2`,
          quantity: 1,
          unitPrice: amount * 0.5,
          amount: amount * 0.5,
        },
      ],
    };
  });

  const getFilteredInvoices = () => {
    let filtered = invoices;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(i => i.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(i =>
        i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredInvoices = getFilteredInvoices();
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.totalAmount, 0);
  const pendingAmount = invoices.filter(i => ['sent', 'overdue'].includes(i.status)).reduce((sum, i) => sum + i.totalAmount, 0);
  const overdueCount = invoices.filter(i => i.status === 'overdue').length;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-orange-100 text-orange-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">Manage customer invoices and payments</p>
        </div>
        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{invoices.length}</div>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Paid invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{overdueCount}</div>
            <p className="text-sm text-gray-500 mt-1">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by invoice number, customer, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filterStatus === 'all' ? 'default' : 'outline'} onClick={() => setFilterStatus('all')}>
                All
              </Button>
              <Button variant={filterStatus === 'draft' ? 'default' : 'outline'} onClick={() => setFilterStatus('draft')}>
                Draft
              </Button>
              <Button variant={filterStatus === 'sent' ? 'default' : 'outline'} onClick={() => setFilterStatus('sent')}>
                Sent
              </Button>
              <Button variant={filterStatus === 'paid' ? 'default' : 'outline'} onClick={() => setFilterStatus('paid')}>
                Paid
              </Button>
              <Button variant={filterStatus === 'overdue' ? 'default' : 'outline'} onClick={() => setFilterStatus('overdue')}>
                Overdue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice List ({filteredInvoices.length} invoices)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice #</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Project</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Issue Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{invoice.invoiceNumber}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{invoice.customerName}</p>
                        <p className="text-sm text-gray-500">ID: {invoice.customerId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{invoice.projectName || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{invoice.issueDate.toLocaleDateString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{invoice.dueDate.toLocaleDateString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div>
                        <p className="font-semibold text-gray-900">${invoice.totalAmount.toLocaleString()}</p>
                        {invoice.status === 'paid' && invoice.paidAmount && (
                          <p className="text-xs text-green-600">Paid: ${invoice.paidAmount.toLocaleString()}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={getStatusBadge(invoice.status)}>
                        {invoice.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        {invoice.status === 'draft' && (
                          <Button size="sm" variant="outline">Send</Button>
                        )}
                        {invoice.status === 'sent' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
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

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium">No invoices found</p>
              <p className="text-sm">Try adjusting your filters or search term</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
