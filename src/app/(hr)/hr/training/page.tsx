'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Clock, CheckCircle, Award, Calendar, Plus, Eye, Edit, Play } from 'lucide-react';

export default function HRTrainingPage() {
  const trainingStats = [
    {
      title: 'Active Courses',
      value: '24',
      change: '+3',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Enrolled Learners',
      value: '387',
      change: '+15%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Completion Rate',
      value: '78%',
      change: '+5%',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Upcoming Sessions',
      value: '12',
      change: '+2',
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const activeCourses = [
    {
      id: 1,
      title: 'Leadership Development Program',
      instructor: 'Sarah Johnson',
      enrolled: 45,
      completed: 28,
      duration: '8 weeks',
      category: 'Leadership',
      status: 'active',
      nextSession: '2024-12-15',
    },
    {
      id: 2,
      title: 'Advanced Sales Techniques',
      instructor: 'Mike Chen',
      enrolled: 32,
      completed: 18,
      duration: '4 weeks',
      category: 'Sales',
      status: 'active',
      nextSession: '2024-12-10',
    },
    {
      id: 3,
      title: 'Project Management Fundamentals',
      instructor: 'Lisa Rodriguez',
      enrolled: 28,
      completed: 15,
      duration: '6 weeks',
      category: 'Project Management',
      status: 'active',
      nextSession: '2024-12-12',
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      course: 'Cybersecurity Awareness',
      instructor: 'David Kim',
      date: '2024-12-08',
      time: '10:00 AM',
      duration: '2 hours',
      enrolled: 25,
      capacity: 30,
      location: 'Conference Room A',
    },
    {
      id: 2,
      course: 'Diversity & Inclusion Workshop',
      instructor: 'Maria Garcia',
      date: '2024-12-10',
      time: '2:00 PM',
      duration: '3 hours',
      enrolled: 20,
      capacity: 25,
      location: 'Training Room B',
    },
    {
      id: 3,
      course: 'Agile Methodology Training',
      instructor: 'Tom Wilson',
      date: '2024-12-12',
      time: '9:00 AM',
      duration: '4 hours',
      enrolled: 18,
      capacity: 20,
      location: 'Virtual',
    },
  ];

  const employeeProgress = [
    {
      id: 1,
      employee: 'Alice Johnson',
      course: 'Leadership Development',
      progress: 85,
      status: 'in-progress',
      lastActivity: '2024-12-05',
      timeSpent: '24 hours',
    },
    {
      id: 2,
      employee: 'Bob Smith',
      course: 'Sales Techniques',
      progress: 60,
      status: 'in-progress',
      lastActivity: '2024-12-04',
      timeSpent: '12 hours',
    },
    {
      id: 3,
      employee: 'Carol Davis',
      course: 'Project Management',
      progress: 100,
      status: 'completed',
      lastActivity: '2024-12-03',
      timeSpent: '32 hours',
    },
  ];

  const certifications = [
    {
      name: 'PMP Certification',
      holders: 8,
      pursuing: 5,
      avgScore: '92%',
      validity: '3 years',
    },
    {
      name: 'AWS Solutions Architect',
      holders: 12,
      pursuing: 7,
      avgScore: '88%',
      validity: '3 years',
    },
    {
      name: 'Six Sigma Green Belt',
      holders: 15,
      pursuing: 3,
      avgScore: '85%',
      validity: 'Lifetime',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'upcoming':
        return <Badge className="bg-purple-100 text-purple-800">Upcoming</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-cyan-600 to-cyan-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Training & Development</h1>
        <p className="text-cyan-100 mt-1 text-lg">Manage employee training programs, courses, and certifications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainingStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-cyan-200">
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
        {/* Active Courses */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl text-gray-900">Active Courses</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Current training programs and enrollment status
                </CardDescription>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {activeCourses.map((course) => (
                <div key={course.id} className="p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-100 rounded-lg">
                        <BookOpen className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {course.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Instructor: {course.instructor} • {course.category}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(course.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Enrollment</p>
                      <p className="font-semibold text-gray-900">
                        {course.completed}/{course.enrolled} completed
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{course.duration}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Next session: {new Date(course.nextSession).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" className="text-cyan-600 border-cyan-300 hover:bg-cyan-50">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="text-cyan-600 border-cyan-300 hover:bg-cyan-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-gray-900">Upcoming Sessions</CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Scheduled training sessions and workshops
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {session.course}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.instructor} • {session.date} at {session.time}
                        </p>
                        <p className="text-xs text-gray-400">
                          {session.location} • {session.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {session.enrolled}/{session.capacity}
                      </p>
                      <p className="text-xs text-gray-500">enrolled</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-cyan-600 border-cyan-300 hover:bg-cyan-50">
                      <Play className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Progress */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Employee Progress</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Individual training progress and completion status
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {employeeProgress.map((progress) => (
              <div key={progress.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {progress.employee.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {progress.employee}
                      </p>
                      <p className="text-xs text-gray-500">
                        {progress.course} • {progress.timeSpent} spent
                      </p>
                      <p className="text-xs text-gray-400">
                        Last activity: {new Date(progress.lastActivity).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">{progress.progress}%</span>
                    </div>
                    <Progress value={progress.progress} className="h-2" />
                  </div>
                  {getStatusBadge(progress.status)}
                  <Button variant="outline" size="sm" className="text-cyan-600 border-cyan-300 hover:bg-cyan-50">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl text-gray-900">Certifications</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Professional certifications and employee credentials
              </CardDescription>
            </div>
            <Button variant="outline" className="text-cyan-600 border-cyan-300 hover:bg-cyan-50">
              <Award className="h-4 w-4 mr-2" />
              Manage Certifications
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">{cert.name}</h3>
                  <Badge variant="outline" className="text-cyan-600 border-cyan-300">
                    {cert.holders} holders
                  </Badge>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1">{cert.avgScore}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {cert.pursuing} pursuing • Valid: {cert.validity}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-cyan-50 to-blue-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Training Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common training and development tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="p-5 border-2 border-cyan-200 rounded-xl hover:bg-linear-to-br hover:from-cyan-50 hover:to-blue-50 hover:border-cyan-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-cyan-100 rounded-lg group-hover:bg-cyan-200 transition-colors">
                  <BookOpen className="h-5 w-5 text-cyan-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Create Course</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Develop new training programs
              </p>
            </Button>
            <Button className="p-5 border-2 border-blue-200 rounded-xl hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Schedule Sessions</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Plan and organize training sessions
              </p>
            </Button>
            <Button className="p-5 border-2 border-green-200 rounded-xl hover:bg-linear-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Track Progress</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Monitor employee learning progress
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}