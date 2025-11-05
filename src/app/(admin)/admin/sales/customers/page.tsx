'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Building2, DollarSign, TrendingUp, Mail, Phone, MapPin, Plus, Eye, Edit, Save, X, User, Building, Globe, CreditCard, Calendar } from 'lucide-react';
import mockData from '@/lib/mock-data';
import { useCurrency } from '@/lib/currency';
import { Customer, CustomerType } from '@/types';

const customers = mockData.customers;

// Customer Form Dialog Component
function CustomerFormDialog({
  customer,
  isOpen,
  onClose,
  onSave,
  mode
}: {
  customer?: Customer;
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: Partial<Customer>) => void;
  mode: 'add' | 'edit';
}) {
  const [formData, setFormData] = useState<Partial<Customer>>(customer || {
    companyName: '',
    customerType: 'sme' as CustomerType,
    industry: '',
    website: '',
    taxId: '',
    primaryContact: {
      name: '',
      email: '',
      phone: '',
      designation: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    creditLimit: 0,
    paymentTerms: 'Net 30',
    isActive: true,
    assignedSalesRep: 'user-2', // Default sales rep
    projects: [],
    totalRevenue: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const updateFormData = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Customer] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-2xl z-100">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {mode === 'add' ? <Plus className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
            <span>{mode === 'add' ? 'Add New Customer' : 'Edit Customer'}</span>
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Create a new customer record with complete business information.' : 'Update customer information and business details.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact & Address</TabsTrigger>
              <TabsTrigger value="business">Business Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName || ''}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerType">Customer Type *</Label>
                  <Select value={formData.customerType} onValueChange={(value) => updateFormData('customerType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="sme">SME</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry || ''}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    placeholder="e.g., Manufacturing, Healthcare"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => updateFormData('website', e.target.value)}
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={formData.taxId || ''}
                  onChange={(e) => updateFormData('taxId', e.target.value)}
                  placeholder="Tax identification number"
                />
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Primary Contact</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      value={formData.primaryContact?.name || ''}
                      onChange={(e) => updateFormData('primaryContact.name', e.target.value)}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.primaryContact?.designation || ''}
                      onChange={(e) => updateFormData('primaryContact.designation', e.target.value)}
                      placeholder="Job title"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.primaryContact?.email || ''}
                      onChange={(e) => updateFormData('primaryContact.email', e.target.value)}
                      placeholder="email@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.primaryContact?.phone || ''}
                      onChange={(e) => updateFormData('primaryContact.phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Address</span>
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={formData.address?.street || ''}
                    onChange={(e) => updateFormData('address.street', e.target.value)}
                    placeholder="123 Business St"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.address?.city || ''}
                      onChange={(e) => updateFormData('address.city', e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      value={formData.address?.state || ''}
                      onChange={(e) => updateFormData('address.state', e.target.value)}
                      placeholder="State"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.address?.country || ''}
                      onChange={(e) => updateFormData('address.country', e.target.value)}
                      placeholder="Country"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.address?.zipCode || ''}
                      onChange={(e) => updateFormData('address.zipCode', e.target.value)}
                      placeholder="12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isActive">Status</Label>
                    <Select value={formData.isActive ? 'active' : 'inactive'} onValueChange={(value) => updateFormData('isActive', value === 'active')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="creditLimit">Credit Limit</Label>
                  <Input
                    id="creditLimit"
                    type="number"
                    value={formData.creditLimit || 0}
                    onChange={(e) => updateFormData('creditLimit', parseFloat(e.target.value) || 0)}
                    placeholder="10000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select value={formData.paymentTerms} onValueChange={(value) => updateFormData('paymentTerms', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 45">Net 45</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                      <SelectItem value="2/10 Net 30">2/10 Net 30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedSalesRep">Assigned Sales Representative</Label>
                <Select value={formData.assignedSalesRep} onValueChange={(value) => updateFormData('assignedSalesRep', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user-2">John Smith (Sales Rep)</SelectItem>
                    <SelectItem value="user-3">Sarah Johnson (Sales Rep)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Save className="h-4 w-4 mr-2" />
              {mode === 'add' ? 'Create Customer' : 'Update Customer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Customer View Dialog Component
function CustomerViewDialog({
  customer,
  isOpen,
  onClose,
  onEdit
}: {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}) {
  const { formatAmount } = useCurrency();

  const customerProjects = mockData.getProjectsByCustomer(customer.id);
  const customerQuotations = mockData.getQuotationsByCustomer(customer.id);
  const customerInvoices = mockData.getInvoicesByCustomer(customer.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-2xl z-100">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xl">
              {customer.companyName.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{customer.companyName}</h2>
              <p className="text-gray-600">{customer.industry}</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete customer profile and business information
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contact">Contact Details</TabsTrigger>
            <TabsTrigger value="projects">Projects ({customerProjects.length})</TabsTrigger>
            <TabsTrigger value="financial">Financial ({customerQuotations.length + customerInvoices.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Business Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Type:</span>
                    <Badge variant="outline">{customer.customerType.toUpperCase()}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant={customer.isActive ? 'default' : 'secondary'}>
                      {customer.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credit Limit:</span>
                    <span className="font-semibold">{formatAmount(customer.creditLimit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Terms:</span>
                    <span className="font-semibold">{customer.paymentTerms}</span>
                  </div>
                  {customer.website && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Website:</span>
                      <a href={customer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {customer.website}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Financial Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenue:</span>
                    <span className="font-bold text-green-600">{formatAmount(customer.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Projects:</span>
                    <span className="font-semibold">{customerProjects.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open Quotations:</span>
                    <span className="font-semibold">{customerQuotations.filter(q => q.status !== 'approved' && q.status !== 'rejected').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Outstanding Invoices:</span>
                    <span className="font-semibold">{customerInvoices.filter(i => i.status !== 'paid').length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Primary Contact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">{customer.primaryContact.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Designation:</span>
                    <span className="font-semibold">{customer.primaryContact.designation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <a href={`mailto:${customer.primaryContact.email}`} className="text-blue-600 hover:underline">
                      {customer.primaryContact.email}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <a href={`tel:${customer.primaryContact.phone}`} className="text-blue-600 hover:underline">
                      {customer.primaryContact.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold">{customer.address.street}</p>
                  <p>{customer.address.city}, {customer.address.state} {customer.address.zipCode}</p>
                  <p>{customer.address.country}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {customerProjects.length > 0 ? (
              customerProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.projectNumber} • {project.type}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{formatAmount(project.budgetAmount)}</p>
                        <p className="text-xs text-gray-500">Budget</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No projects found for this customer
              </div>
            )}
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Quotations</h3>
              {customerQuotations.length > 0 ? (
                <div className="space-y-3">
                  {customerQuotations.slice(0, 5).map((quote) => (
                    <Card key={quote.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{quote.quotationNumber}</h4>
                            <p className="text-sm text-gray-500">Valid until: {new Date(quote.validUntil).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">{formatAmount(quote.totalAmount)}</p>
                            <Badge variant={quote.status === 'approved' ? 'default' : 'secondary'}>
                              {quote.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No quotations found</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
              {customerInvoices.length > 0 ? (
                <div className="space-y-3">
                  {customerInvoices.slice(0, 5).map((invoice) => (
                    <Card key={invoice.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{invoice.invoiceNumber}</h4>
                            <p className="text-sm text-gray-500">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{formatAmount(invoice.totalAmount)}</p>
                            <Badge variant={invoice.status === 'paid' ? 'default' : invoice.status === 'overdue' ? 'destructive' : 'secondary'}>
                              {invoice.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No invoices found</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit} className="bg-red-600 hover:bg-red-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminSalesCustomersPage() {
  const { formatAmount } = useCurrency();
  const [customers, setCustomers] = useState(mockData.customers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (customerData: Partial<Customer>) => {
    const newCustomer: Customer = {
      id: `customer-${Date.now()}`,
      ...customerData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Customer;
    setCustomers(prev => [...prev, newCustomer]);
  };

  const handleEditCustomer = (customerData: Partial<Customer>) => {
    if (!editingCustomer) return;
    const updatedCustomer = { ...editingCustomer, ...customerData, updatedAt: new Date() };
    setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? updatedCustomer : c));
    setEditingCustomer(null);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const handleEditFromView = () => {
    if (selectedCustomer) {
      setEditingCustomer(selectedCustomer);
      setIsViewDialogOpen(false);
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  };

  const customerStats = [
    { title: 'Total Customers', value: customers.length.toString(), change: '+18', icon: Users, color: 'blue' },
    { title: 'Active Customers', value: customers.filter(c => c.isActive).length.toString(), change: '+12', icon: Building2, color: 'green' },
    { title: 'Total Revenue', value: formatAmount(customers.reduce((sum, c) => sum + c.totalRevenue, 0)), change: '+22%', icon: DollarSign, color: 'yellow' },
    { title: 'Avg Order Value', value: formatAmount(Math.floor(customers.reduce((sum, c) => sum + c.totalRevenue, 0) / customers.length)), change: '+8%', icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Customers</h1>
            <p className="text-red-100 mt-1 text-lg">Complete customer database and relationship management</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50" onClick={() => setIsAddDialogOpen(true)}>
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
                          <p className="text-sm font-semibold text-gray-700">{formatAmount(customer.creditLimit)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <p className="text-2xl font-bold text-green-600">{formatAmount(customer.totalRevenue)}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Revenue</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleViewCustomer(customer)}>View</Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => { setEditingCustomer(customer); setIsEditDialogOpen(true); }}>Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CustomerFormDialog
        customer={editingCustomer || undefined}
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddCustomer}
        mode="add"
      />

      <CustomerFormDialog
        customer={editingCustomer || undefined}
        isOpen={isEditDialogOpen}
        onClose={() => { setIsEditDialogOpen(false); setEditingCustomer(null); }}
        onSave={handleEditCustomer}
        mode="edit"
      />

      {selectedCustomer && (
        <CustomerViewDialog
          customer={selectedCustomer}
          isOpen={isViewDialogOpen}
          onClose={() => { setIsViewDialogOpen(false); setSelectedCustomer(null); }}
          onEdit={handleEditFromView}
        />
      )}
    </div>
  );
}
