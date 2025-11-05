'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import mockData from '@/lib/mock-data';

interface ReportData {
  revenueByMonth: { month: string; revenue: number; expenses: number }[];
  expensesByCategory: { category: string; amount: number; percentage: number }[];
  profitMargin: number;
  cashFlow: number;
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedYear, setSelectedYear] = useState(2025);

  // Generate mock financial data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const reportData: ReportData = {
    revenueByMonth: months.map((month, idx) => ({
      month,
      revenue: Math.floor(Math.random() * 500000) + 200000,
      expenses: Math.floor(Math.random() * 300000) + 100000,
    })),
    expensesByCategory: [
      { category: 'Salaries', amount: 850000, percentage: 45 },
      { category: 'Operations', amount: 380000, percentage: 20 },
      { category: 'Marketing', amount: 285000, percentage: 15 },
      { category: 'Technology', amount: 190000, percentage: 10 },
      { category: 'Travel', amount: 95000, percentage: 5 },
      { category: 'Other', amount: 95000, percentage: 5 },
    ],
    profitMargin: 23.5,
    cashFlow: 1250000,
  };

  const totalRevenue = reportData.revenueByMonth.reduce((sum, m) => sum + m.revenue, 0);
  const totalExpenses = reportData.revenueByMonth.reduce((sum, m) => sum + m.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  // Project financial data
  const projectFinancials = mockData.projects.map(project => ({
    id: project.id,
    name: project.name,
    budget: project.budgetAmount,
    spent: project.actualCost,
    remaining: project.budgetAmount - project.actualCost,
    variance: ((project.actualCost / project.budgetAmount) * 100).toFixed(1),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive financial analysis and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Year to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Year to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">${netProfit.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">{profitMargin}% margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">${reportData.cashFlow.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Positive</p>
          </CardContent>
        </Card>
      </div>

      {/* Period Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Button variant={selectedPeriod === 'month' ? 'default' : 'outline'} onClick={() => setSelectedPeriod('month')}>
              Monthly
            </Button>
            <Button variant={selectedPeriod === 'quarter' ? 'default' : 'outline'} onClick={() => setSelectedPeriod('quarter')}>
              Quarterly
            </Button>
            <Button variant={selectedPeriod === 'year' ? 'default' : 'outline'} onClick={() => setSelectedPeriod('year')}>
              Yearly
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Revenue vs Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses - {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.revenueByMonth.map((data, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{data.month} {selectedYear}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600">Revenue: ${data.revenue.toLocaleString()}</span>
                    <span className="text-red-600">Expenses: ${data.expenses.toLocaleString()}</span>
                    <span className="text-blue-600 font-semibold">
                      Net: ${(data.revenue - data.expenses).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-green-500 h-full rounded-full"
                      style={{ width: `${(data.revenue / 600000) * 100}%` }}
                    />
                    <div
                      className="bg-red-500 h-full rounded-full absolute top-0"
                      style={{ width: `${(data.expenses / 600000) * 100}%`, opacity: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expenses by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.expensesByCategory.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{category.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">${category.amount.toLocaleString()}</span>
                    <span className="text-gray-500">{category.percentage}%</span>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Financial Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Project Financial Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Project</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Budget</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Spent</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Remaining</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Variance</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {projectFinancials.map((project) => {
                  const isOverBudget = project.spent > project.budget;
                  const utilizationRate = Number(project.variance);
                  
                  return (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{project.name}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-gray-700">${project.budget.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={isOverBudget ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                          ${project.spent.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={project.remaining < 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                          ${Math.abs(project.remaining).toLocaleString()}
                          {project.remaining < 0 && ' (over)'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={utilizationRate > 100 ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                          {project.variance}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            utilizationRate > 100 ? 'bg-red-500' : 
                            utilizationRate > 90 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`} />
                          <span className="text-sm text-gray-700">
                            {utilizationRate > 100 ? 'Over Budget' : 
                             utilizationRate > 90 ? 'At Risk' : 
                             'On Track'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
