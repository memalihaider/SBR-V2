'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const metrics = [
    {
      title: 'Total Users',
      value: '247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Active Projects',
      value: '89',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Building2,
    },
    {
      title: 'System Performance',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-2',
      changeType: 'negative' as const,
      icon: AlertTriangle,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'John Smith',
      action: 'Created new project',
      project: 'Electronics Installation - Tech Corp',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'Approved quotation',
      project: 'Q-2024-0156 - $125,000',
      timestamp: '4 hours ago',
    },
    {
      id: 3,
      user: 'Mike Davis',
      action: 'Updated inventory',
      project: 'Added 50 units of SKU-12345',
      timestamp: '6 hours ago',
    },
    {
      id: 4,
      user: 'Lisa Chen',
      action: 'Generated report',
      project: 'Monthly Inventory Analysis',
      timestamp: '8 hours ago',
    },
  ];

  const systemHealth = [
    { service: 'API Gateway', status: 'healthy', uptime: '99.9%' },
    { service: 'Database', status: 'healthy', uptime: '99.8%' },
    { service: 'File Storage', status: 'healthy', uptime: '100%' },
    { service: 'Email Service', status: 'warning', uptime: '98.5%' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">System Overview</h1>
        <p className="text-red-100 mt-1 text-lg">Monitor and manage your 360° ERP system</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {metric.title}
                </CardTitle>
                <div className="p-2 bg-red-100 rounded-lg">
                  <IconComponent className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-sm mt-1">
                  <span
                    className={
                      metric.changeType === 'positive'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {metric.change}
                  </span>{' '}
                  <span className="text-gray-500">from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Recent Activities</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Latest system activities across all portals
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-2 shadow-md"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {activity.action} - <span className="font-medium">{activity.project}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">System Health</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Monitor core system services status
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3.5 h-3.5 rounded-full shadow-md ${
                        service.status === 'healthy'
                          ? 'bg-green-500'
                          : service.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="text-sm font-semibold text-gray-900">{service.service}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        service.status === 'healthy'
                          ? 'default'
                          : service.status === 'warning'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="font-semibold"
                    >
                      {service.status}
                    </Badge>
                    <span className="text-sm text-gray-600 font-medium">
                      {service.uptime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Add New User</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Create user accounts and assign roles
              </p>
            </button>
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Building2 className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">System Backup</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Initiate full system backup
              </p>
            </button>
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Generate Report</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Create comprehensive system reports
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}