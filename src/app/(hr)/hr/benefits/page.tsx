'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Users, Clock, CheckCircle, AlertCircle, Plus, Eye, Edit, Settings } from 'lucide-react';

export default function HRBenefitsPage() {
  const benefitsStats = [
    {
      title: 'Active Enrollments',
      value: '138',
      change: '+4',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Health Insurance',
      value: '142',
      change: '+2',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Open Enrollment',
      value: '12 days',
      change: 'Active',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Claims Processed',
      value: '89',
      change: '+15%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  const benefitPlans = [
    {
      id: 1,
      name: 'Premium Health Insurance',
      type: 'Health',
      provider: 'BlueCross BlueShield',
      enrolled: 89,
      totalEligible: 142,
      monthlyCost: '$450',
      coverage: 'Individual + Family',
      status: 'active',
    },
    {
      id: 2,
      name: 'Dental Care Plus',
      type: 'Dental',
      provider: 'Delta Dental',
      enrolled: 76,
      totalEligible: 142,
      monthlyCost: '$35',
      coverage: 'Individual + Family',
      status: 'active',
    },
    {
      id: 3,
      name: 'Vision Essentials',
      type: 'Vision',
      provider: 'VSP',
      enrolled: 65,
      totalEligible: 142,
      monthlyCost: '$25',
      coverage: 'Individual + Family',
      status: 'active',
    },
    {
      id: 4,
      name: '401(k) Retirement Plan',
      type: 'Retirement',
      provider: 'Fidelity',
      enrolled: 95,
      totalEligible: 142,
      monthlyCost: 'Employee Contribution',
      coverage: 'Employee Only',
      status: 'active',
    },
  ];

  const pendingClaims = [
    {
      id: 1,
      employee: 'Alice Johnson',
      type: 'Medical',
      amount: '$250.00',
      date: '2024-12-08',
      status: 'under-review',
      description: 'Doctor visit - annual checkup',
    },
    {
      id: 2,
      employee: 'Bob Smith',
      type: 'Dental',
      amount: '$180.00',
      date: '2024-12-06',
      status: 'approved',
      description: 'Cleaning and exam',
    },
    {
      id: 3,
      employee: 'Carol Davis',
      type: 'Vision',
      amount: '$95.00',
      date: '2024-12-04',
      status: 'pending',
      description: 'New glasses prescription',
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      event: 'Open Enrollment Ends',
      date: '2024-12-20',
      daysLeft: 12,
      type: 'enrollment',
      description: 'Annual benefits enrollment period closes',
    },
    {
      id: 2,
      event: 'COBRA Deadline',
      date: '2024-12-15',
      daysLeft: 7,
      type: 'compliance',
      description: 'COBRA election period for recent termination',
    },
    {
      id: 3,
      event: 'ACA Reporting',
      date: '2024-12-31',
      daysLeft: 23,
      type: 'reporting',
      description: 'Affordable Care Act reporting deadline',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'denied':
        return <Badge className="bg-red-100 text-red-800">Denied</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <Badge className="bg-blue-100 text-blue-800">Enrollment</Badge>;
      case 'compliance':
        return <Badge className="bg-red-100 text-red-800">Compliance</Badge>;
      case 'reporting':
        return <Badge className="bg-purple-100 text-purple-800">Reporting</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-rose-600 to-rose-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Benefits Administration</h1>
        <p className="text-rose-100 mt-1 text-lg">Manage employee benefits, insurance, and wellness programs</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefitsStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-rose-200">
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
        {/* Benefit Plans */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl text-gray-900">Benefit Plans</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Active benefits programs and enrollment status
                </CardDescription>
              </div>
              <Button className="bg-rose-600 hover:bg-rose-700 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Add New Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {benefitPlans.map((plan) => (
                <div key={plan.id} className="p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-rose-100 rounded-lg">
                        <Shield className="h-5 w-5 text-rose-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {plan.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {plan.provider} • {plan.type}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(plan.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Enrollment</p>
                      <p className="font-semibold text-gray-900">
                        {plan.enrolled}/{plan.totalEligible} employees
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Monthly Cost</p>
                      <p className="font-semibold text-gray-900">{plan.monthlyCost}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Coverage: {plan.coverage}</p>
                  <div className="flex justify-end mt-3 space-x-2">
                    <Button variant="outline" size="sm" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                      <Settings className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Claims */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Pending Claims</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Benefits claims requiring review and processing
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {pendingClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {claim.employee}
                        </p>
                        <p className="text-xs text-gray-500">
                          {claim.type} • {claim.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          Submitted: {new Date(claim.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{claim.amount}</p>
                      {getStatusBadge(claim.status)}
                    </div>
                    <Button variant="outline" size="sm" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-amber-50 to-orange-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Upcoming Deadlines</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Important benefits-related dates and compliance requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {deadline.event}
                      </p>
                      <p className="text-xs text-gray-500">
                        {deadline.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        Due: {new Date(deadline.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">{deadline.daysLeft} days</p>
                    <p className="text-xs text-gray-500">remaining</p>
                  </div>
                  {getTypeBadge(deadline.type)}
                  <Button variant="outline" size="sm" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-rose-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Benefits Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common benefits administration tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="p-5 border-2 border-rose-200 rounded-xl hover:bg-linear-to-br hover:from-rose-50 hover:to-pink-50 hover:border-rose-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                  <Shield className="h-5 w-5 text-rose-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Manage Plans</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Configure and update benefit plans
              </p>
            </Button>
            <Button className="p-5 border-2 border-blue-200 rounded-xl hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Process Claims</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Review and approve benefit claims
              </p>
            </Button>
            <Button className="p-5 border-2 border-green-200 rounded-xl hover:bg-linear-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Open Enrollment</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Manage annual benefits enrollment
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}