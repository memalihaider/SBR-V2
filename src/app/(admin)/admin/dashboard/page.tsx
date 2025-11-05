'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Users, Building2, TrendingUp, AlertTriangle, UserCheck, Calendar, DollarSign, Briefcase, Plus, Download, RefreshCw } from 'lucide-react';
import { useCurrency } from '@/lib/currency';
import { CurrencySelector } from '@/components/currency-selector';
import { mockData } from '@/lib/mock-data';
import { toast } from 'sonner';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const { formatAmount, currency } = useCurrency();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isProcessPayrollOpen, setIsProcessPayrollOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Calculate dynamic metrics from mock data
  const totalRevenue = mockData.getTotalRevenue();
  const activeProjects = mockData.getActiveProjects();
  const lowStockItems = mockData.getLowStockProducts();
  const totalUsers = mockData.employees.length + mockData.customers.length;
  const activeEmployees = mockData.employees.filter(e => e.isActive).length;

  // Calculate payroll (sum of all employee salaries / 12 for monthly)
  const monthlyPayroll = mockData.employees
    .filter(e => e.isActive)
    .reduce((sum, emp) => sum + (emp.salary / 12), 0);

  // Chart data
  const revenueData = [
    { month: 'Jan', revenue: 450000, target: 400000 },
    { month: 'Feb', revenue: 520000, target: 450000 },
    { month: 'Mar', revenue: 480000, target: 500000 },
    { month: 'Apr', revenue: 610000, target: 550000 },
    { month: 'May', revenue: 550000, target: 600000 },
    { month: 'Jun', revenue: 670000, target: 650000 },
    { month: 'Jul', revenue: 720000, target: 700000 },
    { month: 'Aug', revenue: 690000, target: 750000 },
    { month: 'Sep', revenue: 780000, target: 800000 },
    { month: 'Oct', revenue: 820000, target: 850000 },
    { month: 'Nov', revenue: 890000, target: 900000 },
    { month: 'Dec', revenue: totalRevenue / 12, target: 950000 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 120, employees: 45, customers: 75 },
    { month: 'Feb', users: 135, employees: 48, customers: 87 },
    { month: 'Mar', users: 148, employees: 52, customers: 96 },
    { month: 'Apr', users: 162, employees: 55, customers: 107 },
    { month: 'May', users: 178, employees: 58, customers: 120 },
    { month: 'Jun', users: 195, employees: 62, customers: 133 },
    { month: 'Jul', users: 215, employees: 65, customers: 150 },
    { month: 'Aug', users: 238, employees: 68, customers: 170 },
    { month: 'Sep', users: 265, employees: 72, customers: 193 },
    { month: 'Oct', users: 295, employees: 75, customers: 220 },
    { month: 'Nov', users: 328, employees: 78, customers: 250 },
    { month: 'Dec', users: totalUsers, employees: activeEmployees, customers: totalUsers - activeEmployees },
  ];

  const systemPerformanceData = [
    { service: 'API Gateway', uptime: 99.9, responseTime: 120 },
    { service: 'Database', uptime: 99.8, responseTime: 85 },
    { service: 'File Storage', uptime: 100, responseTime: 95 },
    { service: 'Email Service', uptime: 98.5, responseTime: 150 },
    { service: 'Auth Service', uptime: 99.7, responseTime: 110 },
    { service: 'Cache', uptime: 99.9, responseTime: 25 },
  ];

  const projectStatusData = [
    { name: 'Completed', value: mockData.projects.filter(p => p.status === 'completed').length, color: '#10B981' },
    { name: 'Active', value: mockData.projects.filter(p => p.status === 'active').length, color: '#3B82F6' },
    { name: 'On Hold', value: mockData.projects.filter(p => p.status === 'on_hold').length, color: '#F59E0B' },
    { name: 'Planning', value: mockData.projects.filter(p => p.status === 'planning').length, color: '#8B5CF6' },
  ];

  const metrics = [
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Active system users'
    },
    {
      title: 'Active Employees',
      value: activeEmployees.toString(),
      change: '+5%',
      changeType: 'positive' as const,
      icon: UserCheck,
      description: 'Currently employed staff'
    },
    {
      title: 'Active Projects',
      value: activeProjects.toString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: Building2,
      description: 'Ongoing project engagements'
    },
    {
      title: 'Monthly Payroll',
      value: formatAmount(monthlyPayroll),
      change: '+3%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'Monthly salary expenses'
    },
    {
      title: 'Total Revenue',
      value: formatAmount(totalRevenue),
      change: '+15%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Annual revenue generated'
    },
    {
      title: 'Low Stock Items',
      value: lowStockItems.toString(),
      change: lowStockItems > 5 ? '+2' : '-3',
      changeType: lowStockItems > 5 ? 'negative' as const : 'positive' as const,
      icon: AlertTriangle,
      description: 'Items needing restock'
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
      project: `Q-2024-0156 - ${formatAmount(125000)}`,
      timestamp: '4 hours ago',
    },
    {
      id: 3,
      user: 'HR Manager',
      action: 'Hired new employee',
      project: 'Jane Doe - Software Developer',
      timestamp: '6 hours ago',
    },
    {
      id: 4,
      user: 'Mike Davis',
      action: 'Updated inventory',
      project: 'Added 50 units of SKU-12345',
      timestamp: '8 hours ago',
    },
    {
      id: 5,
      user: 'Lisa Chen',
      action: 'Generated report',
      project: 'Monthly Inventory Analysis',
      timestamp: '10 hours ago',
    },
    {
      id: 6,
      user: 'Finance Team',
      action: 'Processed payroll',
      project: 'Monthly payroll for 189 employees',
      timestamp: '12 hours ago',
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
      {/* Header with Currency Selector */}
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-4 lg:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 lg:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-white truncate">System Overview</h1>
            <p className="text-red-100 mt-1 text-base lg:text-lg">Monitor and manage your 360° ERP system</p>
          </div>
          <div className="flex items-center space-x-3 lg:space-x-4 shrink-0">
            <CurrencySelector />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setLastRefresh(new Date());
                toast.success('Dashboard refreshed successfully');
              }}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 whitespace-nowrap"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        <div className="mt-3 lg:mt-4 text-xs lg:text-sm text-red-200">
          Last updated: {lastRefresh.toLocaleString()} • Currency: {currency}
        </div>
      </div>

      {/* Metrics Grid - Enhanced Responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200 group min-h-[140px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700 group-hover:text-red-700 transition-colors leading-tight">
                  {metric.title}
                </CardTitle>
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors shrink-0">
                  <IconComponent className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1 break-all">
                  {metric.value}
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-tight">{metric.description}</p>
                <p className="text-sm leading-tight">
                  <span
                    className={
                      metric.changeType === 'positive'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {metric.change}
                  </span>{' '}
                  <span className="text-gray-500 text-xs">from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Revenue Trend Chart */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-red-50 to-red-100 rounded-t-lg p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl text-gray-900">Revenue Trend</CardTitle>
            <CardDescription className="text-gray-600 font-medium text-sm">
              Monthly revenue vs targets ({currency})
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 lg:pt-6 px-4 lg:px-6">
            <ResponsiveContainer width="100%" height={280} className="min-h-[280px]">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis tickFormatter={(value) => `${currency === 'USD' ? '$' : 'د.إ'}${(value / 1000).toFixed(0)}k`} fontSize={12} />
                <Tooltip
                  formatter={(value: number) => [formatAmount(value), 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#DC2626"
                  fill="#FEE2E2"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stackId="2"
                  stroke="#6B7280"
                  fill="#F3F4F6"
                  name="Target"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-red-50 to-red-100 rounded-t-lg p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl text-gray-900">User Growth</CardTitle>
            <CardDescription className="text-gray-600 font-medium text-sm">
              Monthly user acquisition trends
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 lg:pt-6 px-4 lg:px-6">
            <ResponsiveContainer width="100%" height={280} className="min-h-[280px]">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#DC2626"
                  strokeWidth={3}
                  name="Total Users"
                />
                <Line
                  type="monotone"
                  dataKey="employees"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Employees"
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* System Performance Chart */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-red-50 to-red-100 rounded-t-lg p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl text-gray-900">System Performance</CardTitle>
            <CardDescription className="text-gray-600 font-medium text-sm">
              Service uptime and response times
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 lg:pt-6 px-4 lg:px-6">
            <ResponsiveContainer width="100%" height={280} className="min-h-[280px]">
              <BarChart data={systemPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" fontSize={12} />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'Uptime %', angle: -90, position: 'insideLeft' }} fontSize={12} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Response Time (ms)', angle: 90, position: 'insideRight' }} fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="uptime" fill="#10B981" name="Uptime %" />
                <Bar yAxisId="right" dataKey="responseTime" fill="#F59E0B" name="Response Time (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-red-50 to-red-100 rounded-t-lg p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl text-gray-900">Project Status</CardTitle>
            <CardDescription className="text-gray-600 font-medium text-sm">
              Distribution of project statuses
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 lg:pt-6 px-4 lg:px-6">
            <ResponsiveContainer width="100%" height={280} className="min-h-[280px]">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activities */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-red-50 to-red-100 rounded-t-lg p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl text-gray-900">Recent Activities</CardTitle>
            <CardDescription className="text-gray-600 font-medium text-sm">
              Latest system activities across all portals
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 lg:pt-6 px-4 lg:px-6">
            <div className="space-y-3 max-h-80 lg:max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border-l-4 border-red-200 hover:border-red-400">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5 leading-tight">
                      {activity.action} - <span className="font-medium text-red-700 break-all">{activity.project}</span>
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
          <CardHeader className="bg-linear-to-r from-red-50 to-red-100 rounded-t-lg p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl text-gray-900">System Health</CardTitle>
            <CardDescription className="text-gray-600 font-medium text-sm">
              Monitor core system services status
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 lg:pt-6 px-4 lg:px-6">
            <div className="space-y-3">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-red-200">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div
                      className={`w-3 h-3 rounded-full shadow-md shrink-0 ${
                        service.status === 'healthy'
                          ? 'bg-green-500'
                          : service.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-semibold text-gray-900 block truncate">{service.service}</span>
                      <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      service.status === 'healthy'
                        ? 'default'
                        : service.status === 'warning'
                        ? 'secondary'
                        : 'destructive'
                    }
                    className="font-semibold text-xs shrink-0 ml-2"
                  >
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-red-100 rounded-t-lg p-4 lg:p-6">
          <CardTitle className="text-lg lg:text-xl text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium text-sm">
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 lg:pt-6 px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button className="p-4 lg:p-5 border-2 border-red-200 rounded-xl hover:bg-linear-to-br hover:from-red-50 hover:to-red-100 hover:border-red-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl h-auto">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors shrink-0">
                      <Users className="h-4 w-4 lg:h-5 lg:w-5 text-red-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base lg:text-lg leading-tight">Add New User</h3>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 font-medium leading-tight">
                    Create user accounts and assign roles
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-red-200">
                <DialogHeader>
                  <DialogTitle className="text-xl lg:text-2xl font-bold text-gray-900">Add New User</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Create a new user account with appropriate role and permissions.
                  </DialogDescription>
                </DialogHeader>
                <AddUserForm onClose={() => setIsAddUserOpen(false)} />
              </DialogContent>
            </Dialog>

            <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
              <DialogTrigger asChild>
                <Button className="p-4 lg:p-5 border-2 border-red-200 rounded-xl hover:bg-linear-to-br hover:from-red-50 hover:to-red-100 hover:border-red-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl h-auto">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors shrink-0">
                      <UserCheck className="h-4 w-4 lg:h-5 lg:w-5 text-red-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base lg:text-lg leading-tight">Add Employee</h3>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 font-medium leading-tight">
                    Hire new employees and set up profiles
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-red-200">
                <DialogHeader>
                  <DialogTitle className="text-xl lg:text-2xl font-bold text-gray-900">Add New Employee</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Create a new employee profile and assign to department.
                  </DialogDescription>
                </DialogHeader>
                <AddEmployeeForm onClose={() => setIsAddEmployeeOpen(false)} />
              </DialogContent>
            </Dialog>

            <Dialog open={isProcessPayrollOpen} onOpenChange={setIsProcessPayrollOpen}>
              <DialogTrigger asChild>
                <Button className="p-4 lg:p-5 border-2 border-red-200 rounded-xl hover:bg-linear-to-br hover:from-red-50 hover:to-red-100 hover:border-red-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl h-auto">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors shrink-0">
                      <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-red-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base lg:text-lg leading-tight">Process Payroll</h3>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 font-medium leading-tight">
                    Run monthly payroll and generate payslips
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-red-200">
                <DialogHeader>
                  <DialogTitle className="text-xl lg:text-2xl font-bold text-gray-900">Process Payroll</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Run payroll processing for the current month.
                  </DialogDescription>
                </DialogHeader>
                <ProcessPayrollForm onClose={() => setIsProcessPayrollOpen(false)} />
              </DialogContent>
            </Dialog>

            <Dialog open={isBackupOpen} onOpenChange={setIsBackupOpen}>
              <DialogTrigger asChild>
                <Button className="p-4 lg:p-5 border-2 border-red-200 rounded-xl hover:bg-linear-to-br hover:from-red-50 hover:to-red-100 hover:border-red-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl h-auto">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors shrink-0">
                      <Briefcase className="h-4 w-4 lg:h-5 lg:w-5 text-red-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base lg:text-lg leading-tight">System Backup</h3>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 font-medium leading-tight">
                    Initiate full system backup
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-red-200">
                <DialogHeader>
                  <DialogTitle className="text-xl lg:text-2xl font-bold text-gray-900">System Backup</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Create a full system backup of all data and configurations.
                  </DialogDescription>
                </DialogHeader>
                <SystemBackupForm onClose={() => setIsBackupOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Form Components for Dialogs
function AddUserForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('User created successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="border-gray-300 focus:border-red-500 focus:ring-red-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-semibold text-gray-700">Role *</Label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="super_admin">Super Admin</SelectItem>
              <SelectItem value="sales_manager">Sales Manager</SelectItem>
              <SelectItem value="project_manager">Project Manager</SelectItem>
              <SelectItem value="hr_manager">HR Manager</SelectItem>
              <SelectItem value="finance_manager">Finance Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="department" className="text-sm font-semibold text-gray-700">Department</Label>
          <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="IT Support">IT Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50">
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
          Create User
        </Button>
      </div>
    </form>
  );
}

function AddEmployeeForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    hireDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Employee added successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="empFirstName" className="text-sm font-semibold text-gray-700">First Name *</Label>
          <Input
            id="empFirstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empLastName" className="text-sm font-semibold text-gray-700">Last Name *</Label>
          <Input
            id="empLastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="empEmail" className="text-sm font-semibold text-gray-700">Email *</Label>
          <Input
            id="empEmail"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empPhone" className="text-sm font-semibold text-gray-700">Phone</Label>
          <Input
            id="empPhone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="empDepartment" className="text-sm font-semibold text-gray-700">Department *</Label>
          <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="IT Support">IT Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="empPosition" className="text-sm font-semibold text-gray-700">Position *</Label>
          <Input
            id="empPosition"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            placeholder="e.g. Software Developer"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="empSalary" className="text-sm font-semibold text-gray-700">Annual Salary *</Label>
          <Input
            id="empSalary"
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            placeholder="50000"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empHireDate" className="text-sm font-semibold text-gray-700">Hire Date *</Label>
          <Input
            id="empHireDate"
            type="date"
            value={formData.hireDate}
            onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50">
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
          Add Employee
        </Button>
      </div>
    </form>
  );
}

function ProcessPayrollForm({ onClose }: { onClose: () => void }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Payroll processed for ${selectedMonth}!`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="payrollMonth" className="text-sm font-semibold text-gray-700">Payroll Period *</Label>
        <Input
          id="payrollMonth"
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          required
          className="border-gray-300 focus:border-red-500 focus:ring-red-500"
        />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-red-800 mb-2">Payroll Summary</h4>
        <div className="space-y-2 text-sm text-red-700">
          <p>Active Employees: {mockData.employees.filter(e => e.isActive).length}</p>
          <p>Estimated Total Payroll: {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(mockData.employees.filter(e => e.isActive).reduce((sum, emp) => sum + (emp.salary / 12), 0))}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50">
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
          Process Payroll
        </Button>
      </div>
    </form>
  );
}

function SystemBackupForm({ onClose }: { onClose: () => void }) {
  const [backupType, setBackupType] = useState('full');
  const [includeFiles, setIncludeFiles] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${backupType === 'full' ? 'Full' : 'Incremental'} backup initiated successfully!`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="backupType" className="text-sm font-semibold text-gray-700">Backup Type *</Label>
        <Select value={backupType} onValueChange={setBackupType}>
          <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Backup</SelectItem>
            <SelectItem value="incremental">Incremental Backup</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="includeFiles"
            checked={includeFiles}
            onChange={(e) => setIncludeFiles(e.target.checked)}
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <Label htmlFor="includeFiles" className="text-sm text-gray-700">
            Include uploaded files and documents
          </Label>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">Backup Information</h4>
        <div className="space-y-1 text-sm text-blue-700">
          <p>Estimated backup size: ~2.5 GB</p>
          <p>Estimated time: 15-20 minutes</p>
          <p>Last backup: 2 days ago</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50">
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
          Start Backup
        </Button>
      </div>
    </form>
  );
}