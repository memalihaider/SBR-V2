'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Target, Award, Clock, CheckCircle, Plus, Eye, Edit, BarChart3 } from 'lucide-react';

export default function HRPerformancePage() {
  const performanceStats = [
    {
      title: 'Average Performance Score',
      value: '8.4/10',
      change: '+0.3',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Reviews Completed',
      value: '89',
      change: '+12',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-5',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Top Performers',
      value: '15',
      change: '+3',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const recentReviews = [
    {
      id: 1,
      employee: 'Alice Johnson',
      reviewer: 'John Smith',
      period: 'Q4 2024',
      score: 9.2,
      status: 'completed',
      reviewDate: '2024-12-01',
      type: 'annual',
    },
    {
      id: 2,
      employee: 'Bob Smith',
      reviewer: 'Sarah Davis',
      period: 'Q4 2024',
      score: 8.7,
      status: 'completed',
      reviewDate: '2024-11-28',
      type: 'annual',
    },
    {
      id: 3,
      employee: 'Carol Davis',
      reviewer: 'Mike Wilson',
      period: 'Q4 2024',
      score: 7.8,
      status: 'in-progress',
      reviewDate: '2024-12-10',
      type: 'annual',
    },
  ];

  const performanceGoals = [
    {
      id: 1,
      employee: 'Alice Johnson',
      goal: 'Increase sales by 25%',
      progress: 85,
      target: 'Q4 2024',
      status: 'on-track',
      category: 'Sales',
    },
    {
      id: 2,
      employee: 'Bob Smith',
      goal: 'Complete project milestone',
      progress: 60,
      target: 'Dec 2024',
      status: 'on-track',
      category: 'Project',
    },
    {
      id: 3,
      employee: 'Carol Davis',
      goal: 'Improve customer satisfaction',
      progress: 45,
      target: 'Q4 2024',
      status: 'behind',
      category: 'Customer Service',
    },
  ];

  const departmentPerformance = [
    {
      department: 'Sales',
      avgScore: 8.6,
      employees: 25,
      topPerformer: 'Alice Johnson',
      improvement: '+0.4',
    },
    {
      department: 'Engineering',
      avgScore: 8.9,
      employees: 35,
      topPerformer: 'Bob Smith',
      improvement: '+0.2',
    },
    {
      department: 'Marketing',
      avgScore: 8.2,
      employees: 15,
      topPerformer: 'Carol Davis',
      improvement: '+0.6',
    },
    {
      department: 'HR',
      avgScore: 8.7,
      employees: 8,
      topPerformer: 'David Wilson',
      improvement: '+0.3',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'on-track':
        return <Badge className="bg-green-100 text-green-800">On Track</Badge>;
      case 'behind':
        return <Badge className="bg-red-100 text-red-800">Behind</Badge>;
      case 'at-risk':
        return <Badge className="bg-orange-100 text-orange-800">At Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 8) return 'text-blue-600';
    if (score >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Performance Management</h1>
        <p className="text-purple-100 mt-1 text-lg">Track employee performance, reviews, and development goals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
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
        {/* Recent Reviews */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl text-gray-900">Recent Reviews</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Latest performance reviews and evaluations
                </CardDescription>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {review.employee.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {review.employee}
                        </p>
                        <p className="text-xs text-gray-500">
                          {review.period} • {review.type} review • Reviewer: {review.reviewer}
                        </p>
                        <p className="text-xs text-gray-400">
                          Completed: {new Date(review.reviewDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getScoreColor(review.score)}`}>
                        {review.score}/10
                      </p>
                      {getStatusBadge(review.status)}
                    </div>
                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-300 hover:bg-purple-50">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Goals */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Performance Goals</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Employee goals and progress tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {performanceGoals.map((goal) => (
                <div key={goal.id} className="p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {goal.employee}
                        </p>
                        <p className="text-xs text-gray-500">
                          {goal.category} • Target: {goal.target}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(goal.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{goal.goal}</span>
                      <span className="font-semibold text-gray-900">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex justify-end mt-3 space-x-2">
                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-300 hover:bg-purple-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Update
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl text-gray-900">Department Performance</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Performance metrics by department
              </CardDescription>
            </div>
            <Button variant="outline" className="text-purple-600 border-purple-300 hover:bg-purple-50">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Detailed Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">{dept.department}</h3>
                  <Badge variant="outline" className="text-purple-600 border-purple-300">
                    {dept.employees} emp
                  </Badge>
                </div>
                <p className={`text-2xl font-bold mb-1 ${getScoreColor(dept.avgScore)}`}>
                  {dept.avgScore}/10
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Top: {dept.topPerformer}
                </p>
                <p className="text-xs text-green-600 font-semibold">
                  ↑ {dept.improvement} this quarter
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-purple-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Performance Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common performance management tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="p-5 border-2 border-purple-200 rounded-xl hover:bg-linear-to-br hover:from-purple-50 hover:to-indigo-50 hover:border-purple-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Conduct Reviews</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Schedule and complete performance reviews
              </p>
            </Button>
            <Button className="p-5 border-2 border-blue-200 rounded-xl hover:bg-linear-to-br hover:from-blue-50 hover:to-cyan-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Set Goals</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Define and track employee objectives
              </p>
            </Button>
            <Button className="p-5 border-2 border-green-200 rounded-xl hover:bg-linear-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Recognition</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Reward and recognize top performers
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}