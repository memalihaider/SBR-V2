'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vendor } from '@/types';

// Mock supplier data - converted to match Vendor interface
const mockSuppliers: Vendor[] = [
  {
    id: '1',
    companyName: 'Global Tech Supplies',
    vendorCode: 'V001',
    primaryContact: {
      name: 'John Smith',
      email: 'john@globaltech.com',
      phone: '+1 (555) 123-4567',
      designation: 'Sales Manager'
    },
    address: {
      street: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    },
    taxId: '12-3456789',
    paymentTerms: 'Net 30',
    creditDays: 30,
    rating: 4.8,
    onTimeDeliveryRate: 95,
    qualityRating: 4.7,
    productCategories: ['semiconductors', 'test_equipment'],
    status: 'active',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-01')
  },
  {
    id: '2',
    companyName: 'Premium Electronics Ltd',
    vendorCode: 'V002',
    primaryContact: {
      name: 'Sarah Johnson',
      email: 'sarah@premiumelec.com',
      phone: '+1 (555) 234-5678',
      designation: 'Account Manager'
    },
    address: {
      street: '456 Commerce St',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zipCode: '90001'
    },
    taxId: '98-7654321',
    paymentTerms: 'Net 15',
    creditDays: 15,
    rating: 4.6,
    onTimeDeliveryRate: 92,
    qualityRating: 4.5,
    productCategories: ['components', 'cables'],
    status: 'active',
    isActive: true,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-10-28')
  },
  {
    id: '3',
    companyName: 'Industrial Parts Co',
    vendorCode: 'V003',
    primaryContact: {
      name: 'Mike Brown',
      email: 'mike@indparts.com',
      phone: '+1 (555) 345-6789',
      designation: 'Operations Director'
    },
    address: {
      street: '789 Industry Blvd',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zipCode: '60601'
    },
    taxId: '45-6789012',
    paymentTerms: 'Net 45',
    creditDays: 45,
    rating: 4.9,
    onTimeDeliveryRate: 98,
    qualityRating: 4.8,
    productCategories: ['tools', 'accessories'],
    status: 'active',
    isActive: true,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-11-05')
  },
  {
    id: '4',
    companyName: 'Eco Materials Supply',
    vendorCode: 'V004',
    primaryContact: {
      name: 'Emily Davis',
      email: 'emily@ecomaterials.com',
      phone: '+1 (555) 456-7890',
      designation: 'Supply Chain Manager'
    },
    address: {
      street: '321 Green Way',
      city: 'Portland',
      state: 'OR',
      country: 'USA',
      zipCode: '97201'
    },
    taxId: '78-9012345',
    paymentTerms: 'Net 30',
    creditDays: 30,
    rating: 4.3,
    onTimeDeliveryRate: 85,
    qualityRating: 4.2,
    productCategories: ['semiconductors', 'components'],
    status: 'inactive',
    isActive: false,
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-09-15')
  },
  {
    id: '5',
    companyName: 'Quick Ship Distributors',
    vendorCode: 'V005',
    primaryContact: {
      name: 'Robert Wilson',
      email: 'robert@quickship.com',
      phone: '+1 (555) 567-8901',
      designation: 'Logistics Manager'
    },
    address: {
      street: '654 Logistics Dr',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33101'
    },
    taxId: '23-4567890',
    paymentTerms: 'Net 20',
    creditDays: 20,
    rating: 4.7,
    onTimeDeliveryRate: 94,
    qualityRating: 4.6,
    productCategories: ['test_equipment', 'tools'],
    status: 'active',
    isActive: true,
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date('2024-11-03')
  }
];

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedSupplier, setSelectedSupplier] = useState<Vendor | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  // Form states for add supplier
  const [newSupplier, setNewSupplier] = useState({
    companyName: '',
    vendorCode: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    designation: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    taxId: '',
    paymentTerms: '',
    creditDays: 30
  });

  // Contact form states
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    contactMethod: 'email' as 'email' | 'phone'
  });

  const getFilteredSuppliers = () => {
    let filtered = mockSuppliers;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.primaryContact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.primaryContact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const suppliers = getFilteredSuppliers();
  const activeSuppliers = mockSuppliers.filter(s => s.status === 'active').length;
  const totalProducts = mockSuppliers.reduce((sum, s) => sum + s.productCategories.length, 0);
  const averageRating = (mockSuppliers.reduce((sum, s) => sum + s.rating, 0) / mockSuppliers.length).toFixed(1);

  const handleAddSupplier = () => {
    // In a real app, this would create a new supplier
    console.log('Adding new supplier:', newSupplier);
    setIsAddDialogOpen(false);
    setNewSupplier({
      companyName: '',
      vendorCode: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      designation: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      taxId: '',
      paymentTerms: '',
      creditDays: 30
    });
  };

  const handleContactSupplier = (supplier: Vendor) => {
    console.log('Contacting supplier:', supplier.companyName, contactForm);
    setIsContactDialogOpen(false);
    setContactForm({ subject: '', message: '', contactMethod: 'email' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'blacklisted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-1">Manage your supplier relationships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsAddDialogOpen(true)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">Add New Supplier</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="contact">Contact Details</TabsTrigger>
                  <TabsTrigger value="business">Business Info</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Enter company name"
                        value={newSupplier.companyName}
                        onChange={(e) => setNewSupplier({...newSupplier, companyName: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vendorCode">Vendor Code *</Label>
                      <Input
                        id="vendorCode"
                        placeholder="Enter vendor code"
                        value={newSupplier.vendorCode}
                        onChange={(e) => setNewSupplier({...newSupplier, vendorCode: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      placeholder="Enter tax ID"
                      value={newSupplier.taxId}
                      onChange={(e) => setNewSupplier({...newSupplier, taxId: e.target.value})}
                      className="bg-white border-gray-300"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        placeholder="Enter contact name"
                        value={newSupplier.contactName}
                        onChange={(e) => setNewSupplier({...newSupplier, contactName: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        placeholder="Enter designation"
                        value={newSupplier.designation}
                        onChange={(e) => setNewSupplier({...newSupplier, designation: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="Enter email address"
                        value={newSupplier.contactEmail}
                        onChange={(e) => setNewSupplier({...newSupplier, contactEmail: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Phone *</Label>
                      <Input
                        id="contactPhone"
                        placeholder="Enter phone number"
                        value={newSupplier.contactPhone}
                        onChange={(e) => setNewSupplier({...newSupplier, contactPhone: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        placeholder="Enter street address"
                        value={newSupplier.street}
                        onChange={(e) => setNewSupplier({...newSupplier, street: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={newSupplier.city}
                        onChange={(e) => setNewSupplier({...newSupplier, city: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="Enter state"
                        value={newSupplier.state}
                        onChange={(e) => setNewSupplier({...newSupplier, state: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="Enter ZIP code"
                        value={newSupplier.zipCode}
                        onChange={(e) => setNewSupplier({...newSupplier, zipCode: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Enter country"
                        value={newSupplier.country}
                        onChange={(e) => setNewSupplier({...newSupplier, country: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <Select value={newSupplier.paymentTerms} onValueChange={(value) => setNewSupplier({...newSupplier, paymentTerms: value})}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200">
                          <SelectItem value="Net 15">Net 15</SelectItem>
                          <SelectItem value="Net 30">Net 30</SelectItem>
                          <SelectItem value="Net 45">Net 45</SelectItem>
                          <SelectItem value="Net 60">Net 60</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="creditDays">Credit Days</Label>
                      <Input
                        id="creditDays"
                        type="number"
                        placeholder="Enter credit days"
                        value={newSupplier.creditDays}
                        onChange={(e) => setNewSupplier({...newSupplier, creditDays: parseInt(e.target.value) || 30})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="bg-white border-gray-300 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button onClick={handleAddSupplier} className="bg-red-600 hover:bg-red-700 text-white">
                  Add Supplier
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockSuppliers.length}</div>
            <p className="text-sm text-gray-500 mt-1">Registered vendors</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{activeSuppliers}</div>
            <p className="text-sm text-gray-500 mt-1">Currently supplying</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalProducts}</div>
            <p className="text-sm text-gray-500 mt-1">Categories supplied</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
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
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search suppliers by name, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-gray-300"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white border-gray-300 hover:bg-gray-50'}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
                className={filterStatus === 'active' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white border-gray-300 hover:bg-gray-50'}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'inactive' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('inactive')}
                className={filterStatus === 'inactive' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white border-gray-300 hover:bg-gray-50'}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{supplier.companyName}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{supplier.primaryContact.name}</p>
                  <p className="text-xs text-gray-500">{supplier.vendorCode}</p>
                </div>
                <Badge className={getStatusBadge(supplier.status)}>
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
                  {supplier.primaryContact.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {supplier.primaryContact.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {supplier.address.city}, {supplier.address.state}
                </div>

                <div className="pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{supplier.productCategories.length}</div>
                    <div className="text-xs text-gray-500">Categories</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{supplier.onTimeDeliveryRate}%</div>
                    <div className="text-xs text-gray-500">On-Time</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-600">{supplier.rating} ★</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                <div className="pt-3 flex gap-2">
                  <Dialog open={isViewDialogOpen && selectedSupplier?.id === supplier.id} onOpenChange={(open) => {
                    setIsViewDialogOpen(open);
                    if (!open) setSelectedSupplier(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setIsViewDialogOpen(true);
                        }}
                        className="flex-1 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-900">Supplier Details - {supplier.companyName}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                            <TabsTrigger value="performance">Performance</TabsTrigger>
                            <TabsTrigger value="products">Products</TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Company Name</Label>
                                <p className="text-sm text-gray-900">{supplier.companyName}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Vendor Code</Label>
                                <p className="text-sm text-gray-900">{supplier.vendorCode}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Status</Label>
                                <Badge className={getStatusBadge(supplier.status)}>{supplier.status}</Badge>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Payment Terms</Label>
                                <p className="text-sm text-gray-900">{supplier.paymentTerms}</p>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="contact" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Contact Person</Label>
                                <p className="text-sm text-gray-900">{supplier.primaryContact.name}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Designation</Label>
                                <p className="text-sm text-gray-900">{supplier.primaryContact.designation}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Email</Label>
                                <p className="text-sm text-gray-900">{supplier.primaryContact.email}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Phone</Label>
                                <p className="text-sm text-gray-900">{supplier.primaryContact.phone}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700">Address</Label>
                              <p className="text-sm text-gray-900">
                                {supplier.address.street}, {supplier.address.city}, {supplier.address.state} {supplier.address.zipCode}, {supplier.address.country}
                              </p>
                            </div>
                          </TabsContent>

                          <TabsContent value="performance" className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <Card className="bg-white border border-gray-200">
                                <CardContent className="pt-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-600">{supplier.rating}</div>
                                    <div className="text-sm text-gray-500">Overall Rating</div>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="bg-white border border-gray-200">
                                <CardContent className="pt-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{supplier.onTimeDeliveryRate}%</div>
                                    <div className="text-sm text-gray-500">On-Time Delivery</div>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="bg-white border border-gray-200">
                                <CardContent className="pt-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{supplier.qualityRating}</div>
                                    <div className="text-sm text-gray-500">Quality Rating</div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>

                          <TabsContent value="products" className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700">Product Categories</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {supplier.productCategories.map((category) => (
                                  <Badge key={category} className="bg-blue-100 text-blue-800">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isContactDialogOpen && selectedSupplier?.id === supplier.id} onOpenChange={(open) => {
                    setIsContactDialogOpen(open);
                    if (!open) setSelectedSupplier(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setIsContactDialogOpen(true);
                        }}
                        className="flex-1 bg-white border-gray-300 hover:bg-red-50 hover:border-red-300"
                      >
                        Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-gray-900">Contact {supplier.companyName}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="contact-method">Contact Method</Label>
                          <Select value={contactForm.contactMethod} onValueChange={(value: 'email' | 'phone') => setContactForm({...contactForm, contactMethod: value})}>
                            <SelectTrigger className="bg-white border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200">
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {contactForm.contactMethod === 'email' && (
                          <>
                            <div>
                              <Label htmlFor="subject">Subject</Label>
                              <Input
                                id="subject"
                                placeholder="Enter subject"
                                value={contactForm.subject}
                                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                                className="bg-white border-gray-300"
                              />
                            </div>
                            <div>
                              <Label htmlFor="message">Message</Label>
                              <Textarea
                                id="message"
                                placeholder="Enter your message..."
                                value={contactForm.message}
                                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                className="bg-white border-gray-300"
                                rows={4}
                              />
                            </div>
                          </>
                        )}

                        {contactForm.contactMethod === 'phone' && (
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm text-blue-800">
                              <strong>Phone:</strong> {supplier.primaryContact.phone}
                            </p>
                            <p className="text-sm text-blue-800 mt-2">
                              <strong>Contact:</strong> {supplier.primaryContact.name}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsContactDialogOpen(false)}
                            className="bg-white border-gray-300 hover:bg-gray-50"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleContactSupplier(supplier)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            {contactForm.contactMethod === 'email' ? 'Send Email' : 'Call Now'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
