'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Users, TrendingUp, Target } from 'lucide-react';

export default function SalesDashboard() {
  const metrics = [
    {
      title: 'Monthly Revenue',
      value: '$245,678',
      change: '+18%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Active Leads',
      value: '156',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Conversion Rate',
      value: '24.5%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Quota Achievement',
      value: '87%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Target,
    },
  ];

  const pipelineData = [
    { stage: 'New Leads', count: 45, value: '$125,000', color: 'bg-blue-500' },
    { stage: 'Qualified', count: 32, value: '$245,000', color: 'bg-yellow-500' },
    { stage: 'Proposal', count: 18, value: '$430,000', color: 'bg-orange-500' },
    { stage: 'Negotiation', count: 12, value: '$315,000', color: 'bg-purple-500' },
    { stage: 'Closed Won', count: 8, value: '$185,000', color: 'bg-green-500' },
  ];

  const recentLeads = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      contact: 'John Smith',
      value: '$45,000',
      stage: 'Proposal',
      probability: 75,
      lastActivity: '2 hours ago',
    },
    {
      id: 2,
      company: 'Global Electronics',
      contact: 'Sarah Johnson',
      value: '$125,000',
      stage: 'Negotiation',
      probability: 85,
      lastActivity: '4 hours ago',
    },
    {
      id: 3,
      company: 'Industrial Systems',
      contact: 'Mike Davis',
      value: '$67,500',
      stage: 'Qualified',
      probability: 45,
      lastActivity: '1 day ago',
    },
    {
      id: 4,
      company: 'Smart Automation',
      contact: 'Lisa Chen',
      value: '$89,000',
      stage: 'Proposal',
      probability: 60,
      lastActivity: '2 days ago',
    },
  ];

  const teamPerformance = [
    { name: 'Mike Davis', leads: 32, deals: 8, revenue: '$185,000', target: 85 },
    { name: 'Sarah Johnson', leads: 28, deals: 6, revenue: '$156,000', target: 92 },
    { name: 'Tom Wilson', leads: 24, deals: 5, revenue: '$134,000', target: 78 },
    { name: 'Emma Brown', leads: 18, deals: 4, revenue: '$98,000', target: 65 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
        <p className="text-gray-600">Track your sales performance and pipeline</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      metric.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {metric.change}
                  </span>{' '}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>
              Current pipeline by stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineData.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <span className="text-sm font-medium">{stage.stage}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{stage.count} leads</div>
                    <div className="text-xs text-gray-500">{stage.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>
              Latest lead activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-start space-x-4 p-3 border border-gray-100 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {lead.company}
                    </p>
                    <p className="text-sm text-gray-500">
                      Contact: {lead.contact}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="outline">{lead.stage}</Badge>
                      <span className="text-sm font-medium text-green-600">
                        {lead.value}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Probability</span>
                        <span>{lead.probability}%</span>
                      </div>
                      <Progress value={lead.probability} className="h-1" />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{lead.lastActivity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>
            Sales team metrics and targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Sales Rep</th>
                  <th className="text-left p-2 font-medium">Active Leads</th>
                  <th className="text-left p-2 font-medium">Closed Deals</th>
                  <th className="text-left p-2 font-medium">Revenue</th>
                  <th className="text-left p-2 font-medium">Target Achievement</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((rep, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{rep.name}</td>
                    <td className="p-2">{rep.leads}</td>
                    <td className="p-2">{rep.deals}</td>
                    <td className="p-2 font-medium text-green-600">{rep.revenue}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <Progress value={rep.target} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{rep.target}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}