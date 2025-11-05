'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, Clock, FileText, Download, Calendar, Filter, Plus, Eye } from 'lucide-react';

export default function HRReportsPage() {
  const reportStats = [
    {
      title: 'Reports Generated',
      value: '47',
      change: '+12',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Data Points',
      value: '15.2K',
      change: '+8%',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Scheduled Reports',
      value: '8',
      change: '+2',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Avg. Generation Time',
      value: '2.3s',
      change: '-0.5s',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const popularReports = [
    {
      id: 1,
      name: 'Employee Headcount Report',
      category: 'Workforce',
      generated: 156,
      lastGenerated: '2024-12-01',
      frequency: 'Monthly',
      downloads: 89,
      status: 'active',
    },
    {
      id: 2,
      name: 'Turnover Analysis',
      category: 'Retention',
      generated: 89,
      lastGenerated: '2024-11-28',
      frequency: 'Quarterly',
      downloads: 67,
      status: 'active',
    },
    {
      id: 3,
      name: 'Performance Review Summary',
      category: 'Performance',
      generated: 67,
      lastGenerated: '2024-11-30',
      frequency: 'Quarterly',
      downloads: 45,
      status: 'active',
    },
    {
      id: 4,
      name: 'Compensation Analysis',
      category: 'Compensation',
      generated: 45,
      lastGenerated: '2024-11-25',
      frequency: 'Monthly',
      downloads: 34,
      status: 'active',
    },
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Monthly HR Dashboard',
      schedule: '1st of every month',
      recipients: 12,
      format: 'PDF',
      nextRun: '2024-12-01',
      status: 'active',
    },
    {
      id: 2,
      name: 'Quarterly Diversity Report',
      schedule: 'Last day of quarter',
      recipients: 8,
      format: 'Excel',
      nextRun: '2024-12-31',
      status: 'active',
    },
    {
      id: 3,
      name: 'Weekly Headcount Summary',
      schedule: 'Every Monday',
      recipients: 5,
      format: 'PDF',
      nextRun: '2024-12-09',
      status: 'active',
    },
  ];

  const reportCategories = [
    {
      name: 'Workforce Analytics',
      reports: 12,
      lastUpdate: '2024-12-01',
      trending: '+15%',
      color: 'bg-blue-500',
    },
    {
      name: 'Compensation Reports',
      reports: 8,
      lastUpdate: '2024-11-28',
      trending: '+8%',
      color: 'bg-green-500',
    },
    {
      name: 'Performance Metrics',
      reports: 10,
      lastUpdate: '2024-11-30',
      trending: '+12%',
      color: 'bg-purple-500',
    },
    {
      name: 'Compliance Reports',
      reports: 6,
      lastUpdate: '2024-11-25',
      trending: '+5%',
      color: 'bg-yellow-500',
    },
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Q4 2024 Employee Survey Results',
      generatedBy: 'Sarah Johnson',
      generatedAt: '2024-12-01 14:30',
      size: '2.4 MB',
      format: 'PDF',
      downloads: 23,
    },
    {
      id: 2,
      name: 'November Payroll Summary',
      generatedBy: 'Mike Chen',
      generatedAt: '2024-11-30 16:45',
      size: '1.8 MB',
      format: 'Excel',
      downloads: 18,
    },
    {
      id: 3,
      name: 'Training Completion Report',
      generatedBy: 'Lisa Rodriguez',
      generatedAt: '2024-11-29 11:20',
      size: '956 KB',
      format: 'PDF',
      downloads: 31,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'PDF':
        return <Badge className="bg-red-100 text-red-800">PDF</Badge>;
      case 'Excel':
        return <Badge className="bg-green-100 text-green-800">Excel</Badge>;
      case 'CSV':
        return <Badge className="bg-blue-100 text-blue-800">CSV</Badge>;
      default:
        return <Badge variant="secondary">{format}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-teal-600 to-teal-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">HR Reports & Analytics</h1>
        <p className="text-teal-100 mt-1 text-lg">Generate comprehensive HR reports and business intelligence</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm mt-1">
                  <span
                    className={
                      stat.change.startsWith('+') && !stat.change.includes('-')
                        ? 'text-green-600 font-semibold'
                        : stat.change.startsWith('-')
                        ? 'text-red-600 font-semibold'
                        : 'text-gray-600 font-semibold'
                    }
                  >
                    {stat.change}
                  </span>{' '}
                  <span className="text-gray-500">from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Reports */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl text-gray-900">Popular Reports</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Most frequently generated HR reports
                </CardDescription>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Create Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {popularReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {report.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {report.category} • {report.frequency} • {report.generated} generations
                        </p>
                        <p className="text-xs text-gray-400">
                          Last: {new Date(report.lastGenerated).toLocaleDateString()} • {report.downloads} downloads
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(report.status)}
                    <Button variant="outline" size="sm" className="text-teal-600 border-teal-300 hover:bg-teal-50">
                      <Download className="h-4 w-4 mr-1" />
                      Generate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Reports */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Scheduled Reports</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Automated report generation and distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {scheduledReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {report.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {report.schedule} • {report.recipients} recipients
                        </p>
                        <p className="text-xs text-gray-400">
                          Next run: {new Date(report.nextRun).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getFormatBadge(report.format)}
                    {getStatusBadge(report.status)}
                    <Button variant="outline" size="sm" className="text-teal-600 border-teal-300 hover:bg-teal-50">
                      <Eye className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Report Categories</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            HR analytics organized by business function
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportCategories.map((category, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">{category.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1">{category.reports} reports</p>
                <p className="text-xs text-gray-500 mb-2">
                  Updated: {new Date(category.lastUpdate).toLocaleDateString()}
                </p>
                <p className="text-xs text-green-600 font-semibold">
                  {category.trending} this month
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Recent Reports</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Latest generated reports and downloads
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {report.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Generated by {report.generatedBy} • {report.size}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(report.generatedAt).toLocaleString()} • {report.downloads} downloads
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getFormatBadge(report.format)}
                  <Button variant="outline" size="sm" className="text-teal-600 border-teal-300 hover:bg-teal-50">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-teal-50 to-cyan-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Report Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common reporting and analytics tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="p-5 border-2 border-teal-200 rounded-xl hover:bg-linear-to-br hover:from-teal-50 hover:to-cyan-50 hover:border-teal-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                  <BarChart3 className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Generate Report</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Create custom HR reports
              </p>
            </Button>
            <Button className="p-5 border-2 border-blue-200 rounded-xl hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Schedule Reports</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Set up automated report generation
              </p>
            </Button>
            <Button className="p-5 border-2 border-purple-200 rounded-xl hover:bg-linear-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Analytics Dashboard</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                View HR metrics and trends
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}