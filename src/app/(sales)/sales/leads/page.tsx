'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Phone, Mail, Calendar, DollarSign, TrendingUp } from 'lucide-react';

export default function SalesLeadsPage() {
  const leadStats = [
    {
      title: 'My Active Leads',
      value: '34',
      change: '+8',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Contacted Today',
      value: '12',
      change: '+5',
      changeType: 'positive' as const,
      icon: Phone,
    },
    {
      title: 'Follow-ups Due',
      value: '7',
      change: '+2',
      changeType: 'negative' as const,
      icon: Calendar,
    },
    {
      title: 'Potential Value',
      value: '$285K',
      change: '+15%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
  ];

  const myLeads = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Solutions',
      email: 'sarah.j@techstart.com',
      phone: '+1 (555) 123-4567',
      status: 'hot',
      value: '$45,000',
      source: 'Website',
      lastContact: '2 hours ago',
      nextAction: 'Demo scheduled for tomorrow',
      priority: 'high',
    },
    {
      name: 'Michael Chen',
      company: 'Global Logistics Inc',
      email: 'm.chen@globallog.com',
      phone: '+1 (555) 234-5678',
      status: 'warm',
      value: '$32,000',
      source: 'Referral',
      lastContact: '1 day ago',
      nextAction: 'Send proposal',
      priority: 'high',
    },
    {
      name: 'Emily Rodriguez',
      company: 'Retail Plus',
      email: 'emily.r@retailplus.com',
      phone: '+1 (555) 345-6789',
      status: 'warm',
      value: '$28,500',
      source: 'Cold Call',
      lastContact: '3 days ago',
      nextAction: 'Follow-up call needed',
      priority: 'medium',
    },
    {
      name: 'David Martinez',
      company: 'SmartBuild Construction',
      email: 'david.m@smartbuild.com',
      phone: '+1 (555) 456-7890',
      status: 'cold',
      value: '$52,000',
      source: 'Trade Show',
      lastContact: '1 week ago',
      nextAction: 'Initial contact',
      priority: 'low',
    },
    {
      name: 'Lisa Anderson',
      company: 'HealthCare Partners',
      email: 'l.anderson@hcpartners.com',
      phone: '+1 (555) 567-8901',
      status: 'hot',
      value: '$67,000',
      source: 'LinkedIn',
      lastContact: 'Today',
      nextAction: 'Contract negotiation',
      priority: 'high',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      hot: { bg: 'bg-red-100', text: 'text-red-700', badge: 'destructive' as const },
      warm: { bg: 'bg-yellow-100', text: 'text-yellow-700', badge: 'secondary' as const },
      cold: { bg: 'bg-blue-100', text: 'text-blue-700', badge: 'outline' as const },
    };
    return colors[status as keyof typeof colors] || colors.cold;
  };

  const todayTasks = [
    { time: '09:00 AM', task: 'Call Sarah Johnson - Demo prep', lead: 'TechStart Solutions', priority: 'high' },
    { time: '11:30 AM', task: 'Send proposal to Michael Chen', lead: 'Global Logistics', priority: 'high' },
    { time: '02:00 PM', task: 'Follow-up with Emily Rodriguez', lead: 'Retail Plus', priority: 'medium' },
    { time: '04:00 PM', task: 'Team meeting - Pipeline review', lead: 'Internal', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">My Lead Pipeline</h1>
        <p className="text-green-100 mt-1 text-lg">Manage and convert your leads to customers</p>
      </div>

      {/* Lead Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {leadStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-green-100 rounded-lg">
                  <IconComponent className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm mt-1">
                  <span
                    className={
                      stat.changeType === 'positive'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {stat.change}
                  </span>{' '}
                  <span className="text-gray-500">from last week</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Leads - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">My Leads</CardTitle>
                  <CardDescription className="text-gray-600 font-medium">
                    Active leads in your pipeline
                  </CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Users className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {myLeads.map((lead, index) => {
                  const statusColor = getStatusColor(lead.status);
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-200 hover:shadow-md ${statusColor.bg} bg-opacity-5`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-bold text-gray-900 text-lg">{lead.name}</h4>
                            <Badge variant={statusColor.badge} className="font-semibold">
                              {lead.status.toUpperCase()}
                            </Badge>
                            {lead.priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">
                                HIGH PRIORITY
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">{lead.company}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{lead.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{lead.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold text-green-600">{lead.value}</p>
                          <p className="text-xs text-gray-500 mt-1">Potential Value</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500">Source</p>
                          <p className="text-sm font-semibold text-gray-700">{lead.source}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Contact</p>
                          <p className="text-sm font-semibold text-gray-700">{lead.lastContact}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Next Action</p>
                          <p className="text-sm font-semibold text-gray-700">{lead.nextAction}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="text-xl text-gray-900">Today's Tasks</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Your schedule for today
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {todayTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-16">
                        <p className="text-xs font-bold text-blue-600">{task.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{task.task}</p>
                        <p className="text-xs text-gray-600">{task.lead}</p>
                        {task.priority === 'high' && (
                          <Badge variant="destructive" className="mt-2 text-xs">
                            HIGH
                          </Badge>
                        )}
                        {task.priority === 'medium' && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            MEDIUM
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="shadow-lg mt-6">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
              <CardTitle className="text-xl text-gray-900">This Week</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Your performance summary
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Calls Made</p>
                    <p className="text-2xl font-bold text-gray-900">48</p>
                  </div>
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Emails Sent</p>
                    <p className="text-2xl font-bold text-gray-900">32</p>
                  </div>
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Meetings</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Conversions</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
