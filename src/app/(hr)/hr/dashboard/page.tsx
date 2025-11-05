'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, TrendingUp, AlertTriangle, Calendar, Award } from 'lucide-react';

export default function HRDashboard() {
  const metrics = [
    {
      title: 'Total Employees',
      value: '156',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Open Positions',
      value: '12',
      change: '+3',
      changeType: 'positive' as const,
      icon: UserPlus,
    },
    {
      title: 'Employee Satisfaction',
      value: '94%',
      change: '+2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-5',
      changeType: 'negative' as const,
      icon: AlertTriangle,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'Completed onboarding',
      project: 'New Marketing Manager - John Davis',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'Submitted performance review',
      project: 'Q4 Review - Engineering Team',
      timestamp: '4 hours ago',
    },
    {
      id: 3,
      user: 'Lisa Wong',
      action: 'Approved leave request',
      project: 'Annual Leave - 2 weeks',
      timestamp: '6 hours ago',
    },
    {
      id: 4,
      user: 'David Kim',
      action: 'Created job posting',
      project: 'Senior Developer Position',
      timestamp: '8 hours ago',
    },
  ];

  const upcomingEvents = [
    { event: 'Performance Reviews Due', date: 'Dec 15, 2024', type: 'deadline' },
    { event: 'Holiday Party', date: 'Dec 20, 2024', type: 'event' },
    { event: 'New Employee Orientation', date: 'Dec 22, 2024', type: 'training' },
    { event: 'Year-end Reviews', date: 'Jan 5, 2025', type: 'deadline' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">HR Management Dashboard</h1>
        <p className="text-purple-100 mt-1 text-lg">Manage employees, recruitment, and organizational development</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {metric.title}
                </CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <IconComponent className="h-5 w-5 text-purple-600" />
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
          <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Recent HR Activities</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Latest employee and recruitment activities
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2.5 h-2.5 bg-purple-600 rounded-full mt-2 shadow-md"></div>
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

        {/* Upcoming Events */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Upcoming Events</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Important HR dates and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{event.event}</span>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      event.type === 'deadline'
                        ? 'destructive'
                        : event.type === 'event'
                        ? 'default'
                        : 'secondary'
                    }
                    className="font-semibold"
                  >
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common HR management tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">New Hire</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Start employee onboarding process
              </p>
            </button>
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-linear-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Performance Review</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Schedule employee performance reviews
              </p>
            </button>
            <button className="p-5 border-2 border-gray-200 rounded-xl hover:bg-linear-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Job Posting</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Create and publish job openings
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}