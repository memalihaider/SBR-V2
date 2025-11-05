'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock quotation data
const mockQuotations = [
  {
    id: 'QUO-2025-001',
    customerName: 'Tech Solutions Inc.',
    contactPerson: 'John Smith',
    items: [
      { description: 'Enterprise License - 100 users', quantity: 1, unitPrice: 25000, total: 25000 },
      { description: 'Premium Support - Annual', quantity: 1, unitPrice: 5000, total: 5000 },
    ],
    subtotal: 30000,
    tax: 2700,
    total: 32700,
    status: 'pending',
    validUntil: new Date('2025-11-15'),
    createdAt: new Date('2025-10-20'),
    createdBy: 'Sarah Johnson',
  },
  {
    id: 'QUO-2025-002',
    customerName: 'Global Electronics',
    contactPerson: 'Mike Davis',
    items: [
      { description: 'Industrial Automation System', quantity: 2, unitPrice: 45000, total: 90000 },
      { description: 'Installation & Setup', quantity: 1, unitPrice: 8000, total: 8000 },
      { description: 'Training Package', quantity: 1, unitPrice: 3000, total: 3000 },
    ],
    subtotal: 101000,
    tax: 9090,
    total: 110090,
    status: 'approved',
    validUntil: new Date('2025-11-20'),
    createdAt: new Date('2025-10-18'),
    createdBy: 'Tom Wilson',
  },
  {
    id: 'QUO-2025-003',
    customerName: 'Smart Manufacturing Ltd',
    contactPerson: 'Lisa Chen',
    items: [
      { description: 'IoT Sensors Pack - 50 units', quantity: 1, unitPrice: 15000, total: 15000 },
      { description: 'Cloud Platform - 1 Year', quantity: 1, unitPrice: 12000, total: 12000 },
    ],
    subtotal: 27000,
    tax: 2430,
    total: 29430,
    status: 'sent',
    validUntil: new Date('2025-11-10'),
    createdAt: new Date('2025-10-15'),
    createdBy: 'Sarah Johnson',
  },
  {
    id: 'QUO-2025-004',
    customerName: 'Precision Tools Inc',
    contactPerson: 'Robert Brown',
    items: [
      { description: 'CNC Monitoring System', quantity: 3, unitPrice: 22000, total: 66000 },
      { description: 'Maintenance Contract - 2 Years', quantity: 1, unitPrice: 10000, total: 10000 },
    ],
    subtotal: 76000,
    tax: 6840,
    total: 82840,
    status: 'rejected',
    validUntil: new Date('2025-11-05'),
    createdAt: new Date('2025-10-12'),
    createdBy: 'Tom Wilson',
  },
  {
    id: 'QUO-2025-005',
    customerName: 'Advanced Robotics Co',
    contactPerson: 'Emma Wilson',
    items: [
      { description: 'Robotics Control Software', quantity: 5, unitPrice: 18000, total: 90000 },
      { description: 'Integration Services', quantity: 1, unitPrice: 15000, total: 15000 },
      { description: 'Extended Warranty - 3 Years', quantity: 1, unitPrice: 7500, total: 7500 },
    ],
    subtotal: 112500,
    tax: 10125,
    total: 122625,
    status: 'converted',
    validUntil: new Date('2025-11-25'),
    createdAt: new Date('2025-10-10'),
    createdBy: 'Sarah Johnson',
  },
];

export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'sent' | 'approved' | 'rejected' | 'converted'>('all');

  const getFilteredQuotations = () => {
    let filtered = mockQuotations;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(q => q.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const quotations = getFilteredQuotations();
  const totalValue = mockQuotations.reduce((sum, q) => sum + q.total, 0);
  const pendingValue = mockQuotations.filter(q => q.status === 'pending' || q.status === 'sent').reduce((sum, q) => sum + q.total, 0);
  const convertedValue = mockQuotations.filter(q => q.status === 'converted').reduce((sum, q) => sum + q.total, 0);
  const conversionRate = ((mockQuotations.filter(q => q.status === 'converted').length / mockQuotations.length) * 100).toFixed(1);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      converted: 'bg-purple-100 text-purple-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotations</h1>
          <p className="text-gray-600 mt-1">Create and manage sales quotations</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Quotation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${totalValue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">All quotations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">${pendingValue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Converted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${convertedValue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Won deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{conversionRate}%</div>
            <p className="text-sm text-gray-500 mt-1">Quote to deal</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by quotation ID, customer, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'sent' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('sent')}
              >
                Sent
              </Button>
              <Button
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('approved')}
              >
                Approved
              </Button>
              <Button
                variant={filterStatus === 'converted' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('converted')}
              >
                Converted
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

      {/* Quotations List */}
      <div className="space-y-4">
        {quotations.map((quotation) => (
          <Card key={quotation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{quotation.id}</CardTitle>
                    <Badge className={getStatusBadge(quotation.status)}>
                      {quotation.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{quotation.customerName}</p>
                    <p>Contact: {quotation.contactPerson}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${quotation.total.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Created: {quotation.createdAt.toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Valid until: {quotation.validUntil.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-t pt-3">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Items</h4>
                  <div className="space-y-2">
                    {quotation.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.description} (x{item.quantity})
                        </span>
                        <span className="font-medium">${item.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${quotation.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (9%)</span>
                    <span className="font-medium">${quotation.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-green-600">${quotation.total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="border-t pt-3 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Created by: {quotation.createdBy}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View PDF</Button>
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Send</Button>
                    {quotation.status === 'approved' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Convert to Deal
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {quotations.length === 0 && (
        <Card>
          <CardContent className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium">No quotations found</p>
            <p className="text-sm">Try adjusting your filters or search term</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
