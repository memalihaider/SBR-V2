'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import mockData from '@/lib/mock-data';

// Mock quotations data
const quotations = Array.from({ length: 80 }, (_, i) => ({
  id: `quot-${i + 1}`,
  quotationNumber: `QT-2025-${String(i + 1).padStart(4, '0')}`,
  customerId: `customer-${Math.floor(Math.random() * 200) + 1}`,
  issueDate: new Date(2025, Math.floor(Math.random() * 10), Math.floor(Math.random() * 28) + 1),
  validUntil: new Date(2025, Math.floor(Math.random() * 10) + 2, Math.floor(Math.random() * 28) + 1),
  status: ['draft', 'sent', 'approved', 'rejected', 'expired'][Math.floor(Math.random() * 5)],
  items: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, j) => ({ id: j })),
  totalAmount: Math.random() * 500000 + 10000,
  createdBy: `user-${Math.floor(Math.random() * 3) + 2}`,
}));

export default function AdminSalesQuotationsPage() {
  const quotationStats = [
    { title: 'Total Quotations', value: quotations.length.toString(), change: '+24', icon: FileText, color: 'blue' },
    { title: 'Pending Approval', value: quotations.filter(q => q.status === 'sent').length.toString(), change: '+8', icon: Clock, color: 'yellow' },
    { title: 'Approved', value: quotations.filter(q => q.status === 'approved').length.toString(), change: '+12', icon: CheckCircle, color: 'green' },
    { title: 'Total Value', value: '$' + (quotations.reduce((sum, q) => sum + q.totalAmount, 0) / 1000000).toFixed(1) + 'M', change: '+18%', icon: DollarSign, color: 'purple' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'destructive' | 'secondary' | 'outline', label: string }> = {
      draft: { variant: 'secondary', label: 'DRAFT' },
      sent: { variant: 'default', label: 'SENT' },
      approved: { variant: 'default', label: 'APPROVED' },
      rejected: { variant: 'destructive', label: 'REJECTED' },
      expired: { variant: 'outline', label: 'EXPIRED' },
    };
    return statusMap[status] || statusMap.draft;
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Quotations</h1>
            <p className="text-red-100 mt-1 text-lg">Manage all sales quotations and proposals</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <FileText className="h-5 w-5 mr-2" />
            New Quotation
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quotationStats.map((stat, index) => {
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
                  <span className="text-gray-500"> this quarter</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quotations List */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">All Quotations</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            {quotations.length} quotations across all sales representatives
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {quotations.slice(0, 20).map((quotation) => {
              const statusBadge = getStatusBadge(quotation.status);
              return (
                <div
                  key={quotation.id}
                  className="p-5 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-md bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{quotation.quotationNumber}</h4>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Customer: {quotation.customerId}</p>
                      <div className="grid grid-cols-4 gap-4 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500">Issue Date</p>
                          <p className="text-sm font-semibold text-gray-700">{new Date(quotation.issueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Valid Until</p>
                          <p className="text-sm font-semibold text-gray-700">{new Date(quotation.validUntil).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Items</p>
                          <p className="text-sm font-semibold text-gray-700">{quotation.items.length} products</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Created By</p>
                          <p className="text-sm font-semibold text-gray-700">{quotation.createdBy}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-2xl font-bold text-green-600">${(quotation.totalAmount / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-gray-500 mt-1">Total Amount</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">Edit</Button>
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
