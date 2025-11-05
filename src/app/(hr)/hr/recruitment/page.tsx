'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Clock, CheckCircle, XCircle, Briefcase, Plus, Eye, Edit } from 'lucide-react';

export default function HRRecruitmentPage() {
  const recruitmentStats = [
    {
      title: 'Open Positions',
      value: '8',
      change: '+2',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Candidates',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Interviews Scheduled',
      value: '23',
      change: '+5%',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Offers Extended',
      value: '5',
      change: '+3',
      icon: UserPlus,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const openPositions = [
    {
      id: 1,
      title: 'Senior Software Developer',
      department: 'Engineering',
      applicants: 24,
      status: 'active',
      postedDate: '2024-11-15',
      priority: 'high',
      salary: '$85,000 - $110,000',
    },
    {
      id: 2,
      title: 'Sales Representative',
      department: 'Sales',
      applicants: 18,
      status: 'active',
      postedDate: '2024-11-20',
      priority: 'medium',
      salary: '$45,000 - $60,000',
    },
    {
      id: 3,
      title: 'Marketing Specialist',
      department: 'Marketing',
      applicants: 12,
      status: 'active',
      postedDate: '2024-11-25',
      priority: 'medium',
      salary: '$50,000 - $65,000',
    },
    {
      id: 4,
      title: 'HR Coordinator',
      department: 'HR',
      applicants: 8,
      status: 'active',
      postedDate: '2024-12-01',
      priority: 'high',
      salary: '$55,000 - $70,000',
    },
  ];

  const recentCandidates = [
    {
      id: 1,
      name: 'Alice Johnson',
      position: 'Senior Software Developer',
      stage: 'Technical Interview',
      status: 'in-progress',
      appliedDate: '2024-11-28',
      experience: '5 years',
    },
    {
      id: 2,
      name: 'Bob Smith',
      position: 'Sales Representative',
      stage: 'Offer Extended',
      status: 'offered',
      appliedDate: '2024-11-25',
      experience: '3 years',
    },
    {
      id: 3,
      name: 'Carol Davis',
      position: 'Marketing Specialist',
      stage: 'Final Interview',
      status: 'in-progress',
      appliedDate: '2024-11-30',
      experience: '4 years',
    },
    {
      id: 4,
      name: 'David Wilson',
      position: 'HR Coordinator',
      stage: 'Rejected',
      status: 'rejected',
      appliedDate: '2024-11-20',
      experience: '2 years',
    },
  ];

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'offered':
        return <Badge className="bg-green-100 text-green-800">Offer Extended</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'hired':
        return <Badge className="bg-purple-100 text-purple-800">Hired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Recruitment Management</h1>
        <p className="text-indigo-100 mt-1 text-lg">Manage job postings, candidates, and hiring processes</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recruitmentStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200">
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
        {/* Open Positions */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl text-gray-900">Open Positions</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Current job openings and requirements
                </CardDescription>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {openPositions.map((position) => (
                <div key={position.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Briefcase className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {position.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {position.department} • {position.applicants} applicants • {position.salary}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getPriorityBadge(position.priority)}
                    <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Candidates */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Recent Candidates</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Latest candidate activities and progress
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {candidate.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {candidate.position} • {candidate.experience} experience
                        </p>
                        <p className="text-xs text-gray-400">
                          Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-600">{candidate.stage}</p>
                      {getStatusBadge(candidate.status)}
                    </div>
                    <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-300 hover:bg-indigo-50">
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

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Recruitment Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common recruitment management tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="p-5 border-2 border-indigo-200 rounded-xl hover:bg-linear-to-br hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Briefcase className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Post New Job</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Create and publish job openings
              </p>
            </Button>
            <Button className="p-5 border-2 border-green-200 rounded-xl hover:bg-linear-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Review Candidates</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Evaluate and shortlist applicants
              </p>
            </Button>
            <Button className="p-5 border-2 border-blue-200 rounded-xl hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Schedule Interviews</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Arrange candidate interviews
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}