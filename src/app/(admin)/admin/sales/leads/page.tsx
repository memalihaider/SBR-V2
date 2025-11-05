'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Phone, Mail, DollarSign, Filter, Download } from 'lucide-react';
import mockData from '@/lib/mock-data';

const leads = mockData.leads;

export default function AdminSalesLeadsPage() {
  const leadStats = [
    { title: 'Total Leads', value: leads.length.toString(), change: '+' + Math.floor(leads.length * 0.08), icon: Users, color: 'blue' },
    { title: 'Hot Leads', value: leads.filter(l => l.status === 'new' || l.status === 'qualified').length.toString(), change: '+12', icon: TrendingUp, color: 'red' },
    { title: 'Conversion Rate', value: '32%', change: '+5%', icon: DollarSign, color: 'green' },
    { title: 'Avg Deal Size', value: '$' + Math.floor(leads.reduce((sum, l) => sum + l.estimatedValue, 0) / leads.length / 1000) + 'K', change: '+8%', icon: DollarSign, color: 'purple' },
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
            {leads.slice(0, 20).map((lead) => {
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
                      <p className="text-2xl font-bold text-green-600">${(lead.estimatedValue / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-gray-500 mt-1">Est. Value</p>
                      <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
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
    </div>
  );
}
