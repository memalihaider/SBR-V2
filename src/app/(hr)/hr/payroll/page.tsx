'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Users, Clock, CheckCircle, AlertTriangle, Calculator, Plus, Eye, Edit, Download } from 'lucide-react';

export default function HRPayrollPage() {
  const payrollStats = [
    {
      title: 'Total Payroll This Month',
      value: '$284,750',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Employees Paid',
      value: '142',
      change: '+2',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Approvals',
      value: '8',
      change: '-3',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Payroll Errors',
      value: '0',
      change: '-100%',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const recentPayrolls = [
    {
      id: 1,
      period: 'November 2024',
      status: 'completed',
      totalAmount: '$284,750',
      employees: 142,
      processedDate: '2024-12-01',
      paymentMethod: 'Direct Deposit',
    },
    {
      id: 2,
      period: 'October 2024',
      status: 'completed',
      totalAmount: '$263,420',
      employees: 140,
      processedDate: '2024-11-01',
      paymentMethod: 'Direct Deposit',
    },
    {
      id: 3,
      period: 'December 2024',
      status: 'processing',
      totalAmount: '$291,850',
      employees: 142,
      processedDate: '2024-12-15',
      paymentMethod: 'Direct Deposit',
    },
  ];

  const pendingApprovals = [
    {
      id: 1,
      employee: 'Alice Johnson',
      type: 'Overtime Request',
      amount: '$450.00',
      date: '2024-12-10',
      status: 'pending',
      description: 'Weekend project work',
    },
    {
      id: 2,
      employee: 'Bob Smith',
      type: 'Bonus Payment',
      amount: '$2,500.00',
      date: '2024-12-08',
      status: 'pending',
      description: 'Q4 performance bonus',
    },
    {
      id: 3,
      employee: 'Carol Davis',
      type: 'Salary Adjustment',
      amount: '$1,200.00',
      date: '2024-12-05',
      status: 'pending',
      description: 'Annual salary increase',
    },
  ];

  const salaryStructure = [
    {
      level: 'Entry Level',
      employees: 45,
      avgSalary: '$55,000',
      range: '$45,000 - $65,000',
    },
    {
      level: 'Mid Level',
      employees: 67,
      avgSalary: '$75,000',
      range: '$65,000 - $85,000',
    },
    {
      level: 'Senior Level',
      employees: 23,
      avgSalary: '$105,000',
      range: '$90,000 - $120,000',
    },
    {
      level: 'Executive',
      employees: 7,
      avgSalary: '$150,000',
      range: '$130,000 - $180,000',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getApprovalBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Payroll Management</h1>
        <p className="text-green-100 mt-1 text-lg">Process salaries, bonuses, and employee compensation</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {payrollStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
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
        {/* Recent Payrolls */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl text-gray-900">Recent Payrolls</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Payroll processing history and status
                </CardDescription>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Process New Payroll
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentPayrolls.map((payroll) => (
                <div key={payroll.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {payroll.period}
                        </p>
                        <p className="text-xs text-gray-500">
                          {payroll.employees} employees • {payroll.paymentMethod}
                        </p>
                        <p className="text-xs text-gray-400">
                          Processed: {new Date(payroll.processedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{payroll.totalAmount}</p>
                      {getStatusBadge(payroll.status)}
                    </div>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Pending Approvals</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Compensation changes requiring approval
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {approval.employee}
                        </p>
                        <p className="text-xs text-gray-500">
                          {approval.type} • {approval.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          Requested: {new Date(approval.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{approval.amount}</p>
                      {getApprovalBadge(approval.status)}
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                        ✓
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                        ✗
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Structure */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl text-gray-900">Salary Structure</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Compensation levels and employee distribution
              </CardDescription>
            </div>
            <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salaryStructure.map((level, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">{level.level}</h3>
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    {level.employees} emp
                  </Badge>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1">{level.avgSalary}</p>
                <p className="text-xs text-gray-500">{level.range}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Payroll Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common payroll management tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="p-5 border-2 border-green-200 rounded-xl hover:bg-linear-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Calculator className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Process Payroll</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Run monthly payroll processing
              </p>
            </Button>
            <Button className="p-5 border-2 border-blue-200 rounded-xl hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Manage Bonuses</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Handle bonus payments and adjustments
              </p>
            </Button>
            <Button className="p-5 border-2 border-purple-200 rounded-xl hover:bg-linear-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Employee Compensation</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Review and adjust employee salaries
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}