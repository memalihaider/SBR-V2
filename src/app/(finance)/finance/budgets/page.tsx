'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Budget {
  id: string;
  category: string;
  department: string;
  period: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  utilizationRate: number;
  status: 'healthy' | 'warning' | 'critical' | 'exceeded';
  lastUpdated: Date;
}

export default function BudgetsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'];
  const categories = [
    'Salaries & Benefits',
    'Office Operations',
    'Marketing & Advertising',
    'Technology & Software',
    'Travel & Entertainment',
    'Training & Development',
    'Equipment & Supplies',
    'Professional Services',
  ];

  // Generate mock budgets
  const budgets: Budget[] = departments.flatMap((dept) =>
    categories.map((category, idx) => {
      const allocated = Math.floor(Math.random() * 500000) + 100000;
      const spent = Math.floor(Math.random() * allocated * 1.2);
      const remaining = allocated - spent;
      const utilizationRate = (spent / allocated) * 100;
      
      let status: 'healthy' | 'warning' | 'critical' | 'exceeded';
      if (utilizationRate > 100) status = 'exceeded';
      else if (utilizationRate > 90) status = 'critical';
      else if (utilizationRate > 75) status = 'warning';
      else status = 'healthy';

      return {
        id: `BUD-${dept}-${idx}`,
        category,
        department: dept,
        period: selectedPeriod === 'monthly' ? 'Oct 2025' : selectedPeriod === 'quarterly' ? 'Q4 2025' : '2025',
        allocatedAmount: allocated,
        spentAmount: spent,
        remainingAmount: remaining,
        utilizationRate: Math.round(utilizationRate),
        status,
        lastUpdated: new Date(),
      };
    })
  );

  const getFilteredBudgets = () => {
    let filtered = budgets;

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(b => b.department === selectedDepartment);
    }

    return filtered;
  };

  const filteredBudgets = getFilteredBudgets();
  const totalAllocated = filteredBudgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
  const totalSpent = filteredBudgets.reduce((sum, b) => sum + b.spentAmount, 0);
  const totalRemaining = totalAllocated - totalSpent;
  const overBudgetCount = filteredBudgets.filter(b => b.status === 'exceeded').length;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      healthy: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-orange-100 text-orange-800',
      exceeded: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getUtilizationColor = (rate: number) => {
    if (rate > 100) return 'text-red-600';
    if (rate > 90) return 'text-orange-600';
    if (rate > 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Summary by department
  const departmentSummary = departments.map(dept => {
    const deptBudgets = budgets.filter(b => b.department === dept);
    const allocated = deptBudgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
    const spent = deptBudgets.reduce((sum, b) => sum + b.spentAmount, 0);
    const utilization = (spent / allocated) * 100;

    return {
      department: dept,
      allocated,
      spent,
      remaining: allocated - spent,
      utilization: Math.round(utilization),
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600 mt-1">Plan and track departmental budgets</p>
        </div>
        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Budget
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Allocated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${totalAllocated.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Budget allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">${totalSpent.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((totalSpent / totalAllocated) * 100)}% utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(totalRemaining).toLocaleString()}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {totalRemaining >= 0 ? 'Available' : 'Over budget'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Over Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{overBudgetCount}</div>
            <p className="text-sm text-gray-500 mt-1">Categories exceeded</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              <Button variant={selectedPeriod === 'monthly' ? 'default' : 'outline'} onClick={() => setSelectedPeriod('monthly')}>
                Monthly
              </Button>
              <Button variant={selectedPeriod === 'quarterly' ? 'default' : 'outline'} onClick={() => setSelectedPeriod('quarterly')}>
                Quarterly
              </Button>
              <Button variant={selectedPeriod === 'yearly' ? 'default' : 'outline'} onClick={() => setSelectedPeriod('yearly')}>
                Yearly
              </Button>
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Department Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Summary by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentSummary.map((dept) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{dept.department}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          Allocated: ${dept.allocated.toLocaleString()}
                        </span>
                        <span className="text-blue-600">
                          Spent: ${dept.spent.toLocaleString()}
                        </span>
                        <span className={dept.remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                          Remaining: ${Math.abs(dept.remaining).toLocaleString()}
                        </span>
                        <span className={`font-semibold ${getUtilizationColor(dept.utilization)}`}>
                          {dept.utilization}%
                        </span>
                      </div>
                    </div>
                    <Progress value={Math.min(dept.utilization, 100)} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Details */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Details ({filteredBudgets.length} categories)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Period</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Allocated</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Spent</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Remaining</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Utilization</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBudgets.map((budget) => (
                  <tr key={budget.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{budget.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{budget.department}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{budget.period}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-gray-700">${budget.allocatedAmount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={budget.status === 'exceeded' ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                        ${budget.spentAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={budget.remainingAmount < 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        ${Math.abs(budget.remainingAmount).toLocaleString()}
                        {budget.remainingAmount < 0 && ' (over)'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`font-semibold ${getUtilizationColor(budget.utilizationRate)}`}>
                          {budget.utilizationRate}%
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full ${
                              budget.utilizationRate > 100 ? 'bg-red-500' :
                              budget.utilizationRate > 90 ? 'bg-orange-500' :
                              budget.utilizationRate > 75 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(budget.utilizationRate, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={getStatusBadge(budget.status)}>
                        {budget.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
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
