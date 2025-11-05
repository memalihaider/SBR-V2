'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserCheck, Clock, CheckCircle, AlertCircle, Users, Calendar, FileText, Plus, Eye, Edit } from 'lucide-react';

export default function HROnboardingPage() {
  const onboardingStats = [
    {
      title: 'Active Onboardings',
      value: '12',
      change: '+3',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Completed This Month',
      value: '28',
      change: '+15%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pending Tasks',
      value: '45',
      change: '-8%',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Average Completion Time',
      value: '14 days',
      change: '-2 days',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const activeOnboardings = [
    {
      id: 1,
      employeeName: 'Alice Johnson',
      position: 'Senior Software Developer',
      startDate: '2024-12-01',
      progress: 75,
      status: 'in-progress',
      tasksCompleted: 12,
      totalTasks: 16,
      mentor: 'John Smith',
      department: 'Engineering',
    },
    {
      id: 2,
      employeeName: 'Bob Smith',
      position: 'Sales Representative',
      startDate: '2024-11-28',
      progress: 60,
      status: 'in-progress',
      tasksCompleted: 9,
      totalTasks: 15,
      mentor: 'Sarah Davis',
      department: 'Sales',
    },
    {
      id: 3,
      employeeName: 'Carol Davis',
      position: 'Marketing Specialist',
      startDate: '2024-11-25',
      progress: 90,
      status: 'almost-complete',
      tasksCompleted: 18,
      totalTasks: 20,
      mentor: 'Mike Wilson',
      department: 'Marketing',
    },
    {
      id: 4,
      employeeName: 'David Wilson',
      position: 'HR Coordinator',
      startDate: '2024-12-05',
      progress: 25,
      status: 'just-started',
      tasksCompleted: 3,
      totalTasks: 12,
      mentor: 'Lisa Brown',
      department: 'HR',
    },
  ];

  const onboardingTemplates = [
    {
      id: 1,
      name: 'Software Developer Onboarding',
      department: 'Engineering',
      tasks: 16,
      duration: '2 weeks',
      lastUsed: '2024-11-20',
      status: 'active',
    },
    {
      id: 2,
      name: 'Sales Team Onboarding',
      department: 'Sales',
      tasks: 15,
      duration: '1.5 weeks',
      lastUsed: '2024-11-18',
      status: 'active',
    },
    {
      id: 3,
      name: 'Marketing Onboarding',
      department: 'Marketing',
      tasks: 20,
      duration: '3 weeks',
      lastUsed: '2024-11-15',
      status: 'active',
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      employee: 'Alice Johnson',
      task: 'Complete Security Training',
      dueDate: '2024-12-03',
      priority: 'high',
      status: 'pending',
    },
    {
      id: 2,
      employee: 'Bob Smith',
      task: 'Setup Workstation',
      dueDate: '2024-12-02',
      priority: 'high',
      status: 'pending',
    },
    {
      id: 3,
      employee: 'Carol Davis',
      task: 'Team Introduction Meeting',
      dueDate: '2024-12-04',
      priority: 'medium',
      status: 'pending',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'almost-complete':
        return <Badge className="bg-green-100 text-green-800">Almost Complete</Badge>;
      case 'just-started':
        return <Badge className="bg-yellow-100 text-yellow-800">Just Started</Badge>;
      case 'completed':
        return <Badge className="bg-purple-100 text-purple-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Employee Onboarding</h1>
        <p className="text-emerald-100 mt-1 text-lg">Manage new hire onboarding processes and checklists</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {onboardingStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200">
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
        {/* Active Onboardings */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl text-gray-900">Active Onboardings</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Current new hire onboarding progress
                </CardDescription>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Start New Onboarding
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {activeOnboardings.map((onboarding) => (
                <div key={onboarding.id} className="p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {onboarding.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {onboarding.employeeName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {onboarding.position} • {onboarding.department}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(onboarding.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">
                        {onboarding.tasksCompleted}/{onboarding.totalTasks} tasks
                      </span>
                    </div>
                    <Progress value={onboarding.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mentor: {onboarding.mentor}</span>
                      <span>Started: {new Date(onboarding.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3 space-x-2">
                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Update Progress
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Templates */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Onboarding Templates</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Standardized onboarding processes by department
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {onboardingTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <FileText className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {template.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {template.tasks} tasks • {template.duration} • {template.department}
                        </p>
                        <p className="text-xs text-gray-400">
                          Last used: {new Date(template.lastUsed).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                      {template.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-amber-50 to-orange-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Upcoming Tasks</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Critical onboarding tasks requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {task.task}
                      </p>
                      <p className="text-xs text-gray-500">
                        {task.employee} • Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getPriorityBadge(task.priority)}
                  <Badge variant="outline" className="text-amber-600 border-amber-300">
                    {task.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Complete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Onboarding Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common onboarding management tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="p-5 border-2 border-emerald-200 rounded-xl hover:bg-linear-to-br hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <UserCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Start New Onboarding</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Initiate onboarding for new hires
              </p>
            </Button>
            <Button className="p-5 border-2 border-blue-200 rounded-xl hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Manage Templates</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Create and edit onboarding templates
              </p>
            </Button>
            <Button className="p-5 border-2 border-purple-200 rounded-xl hover:bg-linear-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Assign Mentors</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Assign mentors to new employees
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}