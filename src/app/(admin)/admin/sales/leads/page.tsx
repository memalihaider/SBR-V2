'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, Phone, Mail, DollarSign, Filter, Download, Calendar, MapPin, Building, FileText, MessageSquare, Clock, Paperclip, Send, Eye } from 'lucide-react';
import mockData from '@/lib/mock-data';
import { useCurrency } from '@/lib/currency';

// Customer Profile Dialog Component
function CustomerProfileDialog({ lead, isOpen, onClose }: { lead: any; isOpen: boolean; onClose: () => void }) {
  const { formatAmount } = useCurrency();

  // Find customer by company name (since leads don't have customerId)
  const customer = mockData.customers.find((c: any) => c.companyName === lead.companyName);
  
  // Mock data for customer profile - filter by customer ID if customer exists, otherwise show sample data
  const customerProjects = customer ? mockData.getProjectsByCustomer(customer.id) : mockData.projects.slice(0, 2);
  const customerQuotations = customer ? mockData.getQuotationsByCustomer(customer.id) : mockData.quotations.slice(0, 3);
  const customerInvoices = customer ? mockData.getInvoicesByCustomer(customer.id) : mockData.invoices.slice(0, 2);
  const customerDocuments = [
    { id: 1, name: 'Contract_Signed.pdf', type: 'Contract', size: '2.4 MB', date: '2024-10-15', status: 'signed' },
    { id: 2, name: 'Requirements_Doc.docx', type: 'Requirements', size: '1.8 MB', date: '2024-09-20', status: 'final' },
    { id: 3, name: 'Technical_Specs.pdf', type: 'Technical', size: '3.2 MB', date: '2024-08-10', status: 'approved' },
  ];
  const customerMessages = [
    { id: 1, from: 'Sales Team', subject: 'Project Kickoff Meeting', date: '2024-11-01', type: 'email', status: 'read' },
    { id: 2, from: 'Project Manager', subject: 'Timeline Update', date: '2024-10-28', type: 'message', status: 'unread' },
    { id: 3, from: 'Finance', subject: 'Invoice #INV-2024-045', date: '2024-10-25', type: 'email', status: 'read' },
  ];
  const customerReminders = [
    { id: 1, title: 'Contract Renewal', date: '2024-12-15', type: 'contract', priority: 'high' },
    { id: 2, title: 'Quarterly Review', date: '2024-12-01', type: 'review', priority: 'medium' },
    { id: 3, title: 'Payment Due', date: '2024-11-30', type: 'payment', priority: 'high' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'destructive' | 'secondary' | 'outline', label: string }> = {
      new: { variant: 'destructive', label: 'NEW' },
      contacted: { variant: 'secondary', label: 'CONTACTED' },
      qualified: { variant: 'default', label: 'QUALIFIED' },
      proposal: { variant: 'default', label: 'PROPOSAL' },
      negotiation: { variant: 'default', label: 'NEGOTIATION' },
      won: { variant: 'default', label: 'WON' },
      lost: { variant: 'outline', label: 'LOST' },
    };
    return statusMap[status] || statusMap.new;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-white border-2 border-gray-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center">
              <span className="text-lg font-semibold text-white">
                {lead.contactPerson.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{lead.contactPerson}</h1>
              <p className="text-gray-600">{lead.companyName}</p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete 360° customer profile with all interactions, projects, and documents
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects ({customerProjects.length})</TabsTrigger>
            <TabsTrigger value="documents">Documents ({customerDocuments.length})</TabsTrigger>
            <TabsTrigger value="communications">Communications ({customerMessages.length})</TabsTrigger>
            <TabsTrigger value="financial">Financial ({customerQuotations.length + customerInvoices.length})</TabsTrigger>
            <TabsTrigger value="reminders">Reminders ({customerReminders.length})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Customer Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{lead.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="font-medium">{lead.companyName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{lead.location || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Lead Status</span>
                      <Badge variant={getStatusBadge(lead.status).variant}>
                        {getStatusBadge(lead.status).label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">Estimated Value</span>
                      <span className="font-bold text-green-600">{formatAmount(lead.estimatedValue)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Quick Stats</span>
                    {!customer && <Badge variant="outline" className="text-xs">Sample Data</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{customerProjects.length}</div>
                      <div className="text-sm text-gray-600">Active Projects</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{customerQuotations.length}</div>
                      <div className="text-sm text-gray-600">Quotations</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{customerInvoices.length}</div>
                      <div className="text-sm text-gray-600">Invoices</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{customerMessages.filter(m => m.status === 'unread').length}</div>
                      <div className="text-sm text-gray-600">Unread Messages</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Projects</h3>
              {!customer && <Badge variant="outline" className="text-xs">Sample Data</Badge>}
            </div>
            {customerProjects.length > 0 ? (
              customerProjects.map((project: any) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
                        <p className="text-gray-600 mt-1">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Started: {new Date(project.startDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500">
                            Due: {new Date(project.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{formatAmount(project.budgetAmount)}</p>
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

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            {customerDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-500">{doc.type} • {doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {doc.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Communications Tab */}
          <TabsContent value="communications" className="space-y-4">
            {customerMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {message.type === 'email' ? (
                        <Mail className="h-5 w-5 text-blue-500" />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{message.subject}</h4>
                        <p className="text-sm text-gray-500">From: {message.from} • {message.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={message.status === 'unread' ? 'destructive' : 'secondary'} className="text-xs">
                        {message.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            {/* Quotations */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <span>Quotations</span>
                {!customer && <Badge variant="outline" className="text-xs">Sample Data</Badge>}
              </h3>
              {customerQuotations.length > 0 ? (
                <div className="space-y-3">
                  {customerQuotations.map((quote: any) => (
                    <Card key={quote.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{quote.quotationNumber}</h4>
                            <p className="text-sm text-gray-500">Status: {quote.status} • Valid until: {new Date(quote.validUntil).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-400 mt-1">Created: {new Date(quote.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">{formatAmount(quote.totalAmount)}</p>
                            <Badge variant={quote.status === 'approved' ? 'default' : 'secondary'} className="mt-1">
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

            {/* Invoices */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <span>Invoices</span>
                {!customer && <Badge variant="outline" className="text-xs">Sample Data</Badge>}
              </h3>
              {customerInvoices.length > 0 ? (
                <div className="space-y-3">
                  {customerInvoices.map((invoice: any) => (
                    <Card key={invoice.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{invoice.invoiceNumber}</h4>
                            <p className="text-sm text-gray-500">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-400 mt-1">Issued: {new Date(invoice.issueDate).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-600">{formatAmount(invoice.totalAmount)}</p>
                            <Badge variant={invoice.status === 'paid' ? 'default' : invoice.status === 'overdue' ? 'destructive' : 'secondary'} className="mt-1">
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

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="space-y-4">
            {customerReminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className={`h-5 w-5 ${reminder.priority === 'high' ? 'text-red-500' : reminder.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{reminder.title}</h4>
                        <p className="text-sm text-gray-500">{reminder.date} • {reminder.type}</p>
                      </div>
                    </div>
                    <Badge variant={reminder.priority === 'high' ? 'destructive' : reminder.priority === 'medium' ? 'secondary' : 'outline'}>
                      {reminder.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminSalesLeadsPage() {
  const { formatAmount } = useCurrency();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const leads = mockData.leads;

  const leadStats = [
    { title: 'Total Leads', value: leads.length.toString(), change: '+' + Math.floor(leads.length * 0.08), icon: Users, color: 'blue' },
    { title: 'Hot Leads', value: leads.filter((l: any) => l.status === 'new' || l.status === 'qualified').length.toString(), change: '+12', icon: TrendingUp, color: 'red' },
    { title: 'Conversion Rate', value: '32%', change: '+5%', icon: DollarSign, color: 'green' },
    { title: 'Avg Deal Size', value: formatAmount(Math.floor(leads.reduce((sum: number, l: any) => sum + l.estimatedValue, 0) / leads.length)), change: '+8%', icon: DollarSign, color: 'purple' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'destructive' | 'secondary' | 'outline', label: string }> = {
      new: { variant: 'destructive', label: 'NEW' },
      contacted: { variant: 'secondary', label: 'CONTACTED' },
      qualified: { variant: 'default', label: 'QUALIFIED' },
      proposal: { variant: 'default', label: 'PROPOSAL' },
      negotiation: { variant: 'default', label: 'NEGOTIATION' },
      won: { variant: 'default', label: 'WON' },
      lost: { variant: 'outline', label: 'LOST' },
    };
    return statusMap[status] || statusMap.new;
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Sales Leads</h1>
            <p className="text-red-100 mt-1 text-lg">Complete overview of all leads across sales team</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </Button>
            <Button className="bg-white text-red-600 hover:bg-red-50">
              <Download className="h-5 w-5 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {leadStats.map((stat, index) => {
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

      {/* Leads List */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">All Leads ({leads.length})</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Complete list of leads from all sales representatives
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {leads.slice(0, 20).map((lead: any) => {
              const statusBadge = getStatusBadge(lead.status);
              return (
                <div
                  key={lead.id}
                  className="p-5 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-md bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{lead.contactPerson}</h4>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">{lead.companyName}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{lead.phone}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500">Source</p>
                          <p className="text-sm font-semibold text-gray-700">{lead.source}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Assigned To</p>
                          <p className="text-sm font-semibold text-gray-700">{lead.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Expected Close</p>
                          <p className="text-sm font-semibold text-gray-700">{new Date(lead.expectedCloseDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-2xl font-bold text-green-600">{formatAmount(lead.estimatedValue)}</p>
                      <p className="text-xs text-gray-500 mt-1">Est. Value</p>
                      <Button 
                        size="sm" 
                        className="mt-3 bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          setSelectedLead(lead);
                          setIsProfileOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Customer Profile Dialog */}
      {selectedLead && (
        <CustomerProfileDialog
          lead={selectedLead}
          isOpen={isProfileOpen}
          onClose={() => {
            setIsProfileOpen(false);
            setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
}
