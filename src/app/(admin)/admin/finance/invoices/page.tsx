'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, DollarSign, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export default function AdminFinanceInvoicesPage() {
  // Mock invoice data
  const invoices = Array.from({ length: 50 }, (_, i) => ({
    id: `inv-${i + 1}`,
    invoiceNumber: `INV-2025-${String(i + 1).padStart(4, '0')}`,
    customer: `customer-${Math.floor(Math.random() * 200) + 1}`,
    amount: Math.random() * 100000 + 5000,
    issueDate: new Date(2025, Math.floor(Math.random() * 10), Math.floor(Math.random() * 28) + 1),
    dueDate: new Date(2025, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 28) + 1),
    status: ['draft', 'sent', 'paid', 'overdue', 'cancelled'][Math.floor(Math.random() * 5)],
  }));

  const invoiceStats = [
    { title: 'Total Invoices', value: invoices.length.toString(), change: '+24', icon: FileText, color: 'blue' },
    { title: 'Paid', value: invoices.filter(i => i.status === 'paid').length.toString(), change: '+18', icon: CheckCircle, color: 'green' },
    { title: 'Pending', value: invoices.filter(i => i.status === 'sent').length.toString(), change: '+6', icon: Clock, color: 'yellow' },
    { title: 'Total Revenue', value: '$' + (invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0) / 1000000).toFixed(1) + 'M', change: '+22%', icon: DollarSign, color: 'purple' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'destructive' | 'secondary' | 'outline', label: string }> = {
      draft: { variant: 'secondary', label: 'DRAFT' },
      sent: { variant: 'default', label: 'SENT' },
      paid: { variant: 'default', label: 'PAID' },
      overdue: { variant: 'destructive', label: 'OVERDUE' },
      cancelled: { variant: 'outline', label: 'CANCELLED' },
    };
    return statusMap[status] || statusMap.draft;
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Invoices</h1>
            <p className="text-red-100 mt-1 text-lg">Complete invoice management and tracking</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <FileText className="h-5 w-5 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {invoiceStats.map((stat, index) => {
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
                  <span className="text-gray-500"> this month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Invoices List */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Invoice List</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            {invoices.length} invoices across all customers
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {invoices.slice(0, 20).map((invoice) => {
              const statusBadge = getStatusBadge(invoice.status);
              const isOverdue = invoice.status === 'overdue';
              return (
                <div
                  key={invoice.id}
                  className={`p-5 rounded-lg border-2 ${isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'} hover:border-red-300 transition-all duration-200 hover:shadow-md`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{invoice.invoiceNumber}</h4>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        {invoice.status === 'paid' && (
                          <Badge variant="default" className="bg-green-600">PAID</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Customer: {invoice.customer}</p>
                      <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500">Issue Date</p>
                          <p className="text-sm font-semibold text-gray-700">{invoice.issueDate.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Due Date</p>
                          <p className="text-sm font-semibold text-gray-700">{invoice.dueDate.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Days {isOverdue ? 'Overdue' : 'Remaining'}</p>
                          <p className={`text-sm font-semibold ${isOverdue ? 'text-red-600' : 'text-gray-700'}`}>
                            {Math.abs(Math.floor((invoice.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} days
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-2xl font-bold text-green-600">${(invoice.amount / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-gray-500 mt-1">Amount</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          {invoice.status === 'draft' ? 'Send' : 'Edit'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
