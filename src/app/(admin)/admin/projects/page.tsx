'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Clock, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import mockData from '@/lib/mock-data';

const projects = mockData.projects;

export default function AdminProjectsPage() {
  const projectStats = [
    { title: 'Total Projects', value: projects.length.toString(), change: '+8', icon: Briefcase, color: 'blue' },
    { title: 'Active Projects', value: projects.filter(p => p.status === 'active').length.toString(), change: '+5', icon: Clock, color: 'green' },
    { title: 'Completed', value: projects.filter(p => p.status === 'completed').length.toString(), change: '+12', icon: CheckCircle, color: 'purple' },
    { title: 'At Risk', value: projects.filter(p => p.status === 'on_hold').length.toString(), change: '-3', icon: AlertCircle, color: 'red' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'destructive' | 'secondary' | 'outline', label: string }> = {
      planning: { variant: 'secondary', label: 'PLANNING' },
      active: { variant: 'default', label: 'ACTIVE' },
      on_hold: { variant: 'destructive', label: 'ON HOLD' },
      completed: { variant: 'default', label: 'COMPLETED' },
      cancelled: { variant: 'outline', label: 'CANCELLED' },
    };
    return statusMap[status] || statusMap.planning;
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Projects</h1>
            <p className="text-red-100 mt-1 text-lg">Complete project portfolio management</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <Briefcase className="h-5 w-5 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-700">{stat.title}</CardTitle>
                <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                  <IconComponent className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{stat.change}</span>
                  <span className="text-gray-500"> this quarter</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Projects List */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Project Portfolio</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            {projects.length} projects across all departments
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {projects.slice(0, 15).map((project) => {
              const statusBadge = getStatusBadge(project.status);
              return (
                <div
                  key={project.id}
                  className="p-5 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-md bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{project.name}</h4>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        {project.completionPercentage >= 75 && (
                          <Badge variant="default" className="bg-green-600">On Track</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="grid grid-cols-4 gap-4 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500">Customer</p>
                          <p className="text-sm font-semibold text-gray-700">{project.customerId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Project Manager</p>
                          <p className="text-sm font-semibold text-gray-700">{project.projectManager}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Start Date</p>
                          <p className="text-sm font-semibold text-gray-700">{new Date(project.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">End Date</p>
                          <p className="text-sm font-semibold text-gray-700">{new Date(project.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700">Progress</span>
                          <span className="text-sm font-bold text-gray-900">{project.completionPercentage}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${project.completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-2xl font-bold text-green-600">${(project.budgetAmount / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-gray-500 mt-1">Budget</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">Manage</Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
