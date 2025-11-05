'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import mockData from '@/lib/mock-data';

export default function PipelinePage() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  // Group leads by status
  const leadsByStatus = {
    new: mockData.leads.filter(l => l.status === 'new'),
    contacted: mockData.leads.filter(l => l.status === 'contacted'),
    qualified: mockData.leads.filter(l => l.status === 'qualified'),
    proposal_sent: mockData.leads.filter(l => l.status === 'proposal_sent'),
    negotiating: mockData.leads.filter(l => l.status === 'negotiating'),
    closed_won: mockData.leads.filter(l => l.status === 'closed_won'),
    closed_lost: mockData.leads.filter(l => l.status === 'closed_lost'),
  };

  const stages = [
    { 
      id: 'new', 
      name: 'New Leads', 
      color: 'bg-gray-500',
      borderColor: 'border-gray-500',
      leads: leadsByStatus.new,
      value: leadsByStatus.new.reduce((sum, l) => sum + l.estimatedValue, 0)
    },
    { 
      id: 'contacted', 
      name: 'Contacted', 
      color: 'bg-blue-500',
      borderColor: 'border-blue-500',
      leads: leadsByStatus.contacted,
      value: leadsByStatus.contacted.reduce((sum, l) => sum + l.estimatedValue, 0)
    },
    { 
      id: 'qualified', 
      name: 'Qualified', 
      color: 'bg-cyan-500',
      borderColor: 'border-cyan-500',
      leads: leadsByStatus.qualified,
      value: leadsByStatus.qualified.reduce((sum, l) => sum + l.estimatedValue, 0)
    },
    { 
      id: 'proposal_sent', 
      name: 'Proposal Sent', 
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-500',
      leads: leadsByStatus.proposal_sent,
      value: leadsByStatus.proposal_sent.reduce((sum, l) => sum + l.estimatedValue, 0)
    },
    { 
      id: 'negotiating', 
      name: 'Negotiating', 
      color: 'bg-orange-500',
      borderColor: 'border-orange-500',
      leads: leadsByStatus.negotiating,
      value: leadsByStatus.negotiating.reduce((sum, l) => sum + l.estimatedValue, 0)
    },
    { 
      id: 'closed_won', 
      name: 'Closed Won', 
      color: 'bg-green-500',
      borderColor: 'border-green-500',
      leads: leadsByStatus.closed_won,
      value: leadsByStatus.closed_won.reduce((sum, l) => sum + l.estimatedValue, 0)
    },
    { 
      id: 'closed_lost', 
      name: 'Closed Lost', 
      color: 'bg-red-500',
      borderColor: 'border-red-500',
      leads: leadsByStatus.closed_lost,
      value: leadsByStatus.closed_lost.reduce((sum, l) => sum + l.estimatedValue, 0)
    },
  ];

  const totalPipelineValue = stages.reduce((sum, stage) => sum + stage.value, 0);
  const totalLeads = mockData.leads.length;
  const wonLeads = leadsByStatus.closed_won.length;
  const wonValue = stages.find(s => s.id === 'closed_won')?.value || 0;
  const winRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-600 mt-1">Visual pipeline and deal tracking</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${totalPipelineValue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">{totalLeads} opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Closed Won</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${wonValue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">{wonLeads} deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{winRate}%</div>
            <p className="text-sm text-gray-500 mt-1">Conversion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              ${totalLeads > 0 ? Math.round(totalPipelineValue / totalLeads).toLocaleString() : '0'}
            </div>
            <p className="text-sm text-gray-500 mt-1">Per opportunity</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {stages.map((stage) => (
          <Card 
            key={stage.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${selectedStage === stage.id ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
          >
            <CardHeader className="pb-3">
              <div className={`w-full h-2 rounded-full ${stage.color} mb-2`}></div>
              <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">{stage.leads.length}</div>
                <div className="text-sm font-semibold text-green-600">${stage.value.toLocaleString()}</div>
                <div className="text-xs text-gray-500">
                  {((stage.leads.length / totalLeads) * 100).toFixed(1)}% of pipeline
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View */}
      {selectedStage && (
        <Card>
          <CardHeader>
            <CardTitle>
              {stages.find(s => s.id === selectedStage)?.name} - Detailed View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stages.find(s => s.id === selectedStage)?.leads.map((lead) => (
                <div key={lead.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{lead.companyName}</h3>
                        <Badge variant="outline">{lead.source}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Contact:</span>
                          <p className="font-medium">{lead.contactPerson}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <p className="font-medium">{lead.email}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Estimated Value:</span>
                          <p className="font-bold text-green-600">${lead.estimatedValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Probability:</span>
                          <p className="font-medium">{lead.probability}%</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all"
                              style={{ width: `${lead.probability}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{lead.probability}%</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Expected Close: {new Date(lead.expectedCloseDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Move Stage
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {stages.find(s => s.id === selectedStage)?.leads.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No leads in this stage</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedStage && (
        <Card>
          <CardContent className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <p className="text-lg font-medium">Click on a pipeline stage above</p>
            <p className="text-sm">View and manage leads in each stage of your sales pipeline</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
