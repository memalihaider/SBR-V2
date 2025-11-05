'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import mockData from '@/lib/mock-data';

interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  orderDate: Date;
  expectedDelivery: Date;
  status: 'draft' | 'sent' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: PurchaseOrderItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
}

export default function PurchaseOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'sent' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'>('all');

  // Mock purchase orders
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: 'PO-001',
      poNumber: 'PO-2024-0001',
      supplierId: 'SUP-001',
      supplierName: 'TechSupply Co.',
      orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      expectedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: 'confirmed',
      items: [
        { productId: mockData.products[0].id, productName: mockData.products[0].name, quantity: 50, unitPrice: 100, totalPrice: 5000 },
        { productId: mockData.products[1].id, productName: mockData.products[1].name, quantity: 30, unitPrice: 150, totalPrice: 4500 },
      ],
      subtotal: 9500,
      taxRate: 10,
      taxAmount: 950,
      totalAmount: 10450,
      notes: 'Rush order - please expedite delivery',
    },
    {
      id: 'PO-002',
      poNumber: 'PO-2024-0002',
      supplierId: 'SUP-002',
      supplierName: 'Global Parts Ltd.',
      orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      expectedDelivery: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: 'sent',
      items: [
        { productId: mockData.products[2].id, productName: mockData.products[2].name, quantity: 100, unitPrice: 75, totalPrice: 7500 },
      ],
      subtotal: 7500,
      taxRate: 10,
      taxAmount: 750,
      totalAmount: 8250,
    },
    {
      id: 'PO-003',
      poNumber: 'PO-2024-0003',
      supplierId: 'SUP-003',
      supplierName: 'Premium Supplies Inc.',
      orderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      expectedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'delivered',
      items: [
        { productId: mockData.products[3].id, productName: mockData.products[3].name, quantity: 25, unitPrice: 200, totalPrice: 5000 },
        { productId: mockData.products[4].id, productName: mockData.products[4].name, quantity: 40, unitPrice: 120, totalPrice: 4800 },
      ],
      subtotal: 9800,
      taxRate: 10,
      taxAmount: 980,
      totalAmount: 10780,
    },
    {
      id: 'PO-004',
      poNumber: 'PO-2024-0004',
      supplierId: 'SUP-001',
      supplierName: 'TechSupply Co.',
      orderDate: new Date(),
      expectedDelivery: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      status: 'draft',
      items: [
        { productId: mockData.products[5].id, productName: mockData.products[5].name, quantity: 60, unitPrice: 90, totalPrice: 5400 },
      ],
      subtotal: 5400,
      taxRate: 10,
      taxAmount: 540,
      totalAmount: 5940,
    },
  ];

  const getFilteredOrders = () => {
    if (filterStatus === 'all') return purchaseOrders;
    return purchaseOrders.filter(po => po.status === filterStatus);
  };

  const orders = getFilteredOrders();
  const totalOrders = purchaseOrders.length;
  const pendingOrders = purchaseOrders.filter(po => ['sent', 'confirmed', 'shipped'].includes(po.status)).length;
  const totalValue = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0);
  const deliveredOrders = purchaseOrders.filter(po => po.status === 'delivered').length;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-cyan-100 text-cyan-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-gray-600 mt-1">Manage supplier orders and deliveries</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create PO
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalOrders}</div>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{pendingOrders}</div>
            <p className="text-sm text-gray-500 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{deliveredOrders}</div>
            <p className="text-sm text-gray-500 mt-1">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">${totalValue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">All orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2 flex-wrap">
            <Button variant={filterStatus === 'all' ? 'default' : 'outline'} onClick={() => setFilterStatus('all')}>
              All ({purchaseOrders.length})
            </Button>
            <Button variant={filterStatus === 'draft' ? 'default' : 'outline'} onClick={() => setFilterStatus('draft')}>
              Draft ({purchaseOrders.filter(po => po.status === 'draft').length})
            </Button>
            <Button variant={filterStatus === 'sent' ? 'default' : 'outline'} onClick={() => setFilterStatus('sent')}>
              Sent ({purchaseOrders.filter(po => po.status === 'sent').length})
            </Button>
            <Button variant={filterStatus === 'confirmed' ? 'default' : 'outline'} onClick={() => setFilterStatus('confirmed')}>
              Confirmed ({purchaseOrders.filter(po => po.status === 'confirmed').length})
            </Button>
            <Button variant={filterStatus === 'shipped' ? 'default' : 'outline'} onClick={() => setFilterStatus('shipped')}>
              Shipped ({purchaseOrders.filter(po => po.status === 'shipped').length})
            </Button>
            <Button variant={filterStatus === 'delivered' ? 'default' : 'outline'} onClick={() => setFilterStatus('delivered')}>
              Delivered ({purchaseOrders.filter(po => po.status === 'delivered').length})
            </Button>
            <Button variant={filterStatus === 'cancelled' ? 'default' : 'outline'} onClick={() => setFilterStatus('cancelled')}>
              Cancelled ({purchaseOrders.filter(po => po.status === 'cancelled').length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders List */}
      <div className="space-y-4">
        {orders.map((po) => (
          <Card key={po.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{po.poNumber}</h3>
                    <Badge className={getStatusBadge(po.status)}>{po.status.toUpperCase()}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Supplier</p>
                      <p className="font-medium text-gray-900">{po.supplierName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium text-gray-900">{po.orderDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expected Delivery</p>
                      <p className="font-medium text-gray-900">{po.expectedDelivery.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-bold text-green-600 text-lg">${po.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-3">Items ({po.items.length})</h4>
                    <div className="space-y-2">
                      {po.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{item.productName}</span>
                            <span className="text-gray-500 ml-2">(Qty: {item.quantity} × ${item.unitPrice.toLocaleString()})</span>
                          </div>
                          <span className="font-bold text-gray-900">${item.totalPrice.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t mt-3 pt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">${po.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax ({po.taxRate}%):</span>
                        <span className="font-medium">${po.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-green-600">${po.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {po.notes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Notes: </span>
                        {po.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="ml-4 flex flex-col gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  {po.status === 'draft' && (
                    <>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">Send</Button>
                    </>
                  )}
                  {po.status === 'sent' && <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">Confirm</Button>}
                  {po.status === 'confirmed' && <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">Mark Shipped</Button>}
                  {po.status === 'shipped' && <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">Receive</Button>}
                  <Button variant="outline" size="sm">Print</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-medium">No purchase orders found</p>
            <p className="text-sm">Try adjusting your filters or create a new PO</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
