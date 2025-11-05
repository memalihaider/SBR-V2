'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Briefcase, Users, Clock, CheckCircle, AlertCircle, DollarSign, Calendar, Target, FileText } from 'lucide-react';
import mockData from '@/lib/mock-data';
import { Project, ProjectStatus, ProjectType } from '@/types';

const projects = mockData.projects;

export default function AdminProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);

  // Form states for add project
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'installation' as ProjectType,
    customerId: '',
    startDate: '',
    endDate: '',
    budgetAmount: '',
    projectManager: '',
    teamMembers: [] as string[]
  });

  // Manage project states
  const [manageAction, setManageAction] = useState<'update_status' | 'add_milestone' | 'update_progress' | 'add_member'>('update_status');
  const [statusUpdate, setStatusUpdate] = useState<ProjectStatus>('planning');
  const [progressUpdate, setProgressUpdate] = useState('');
  const [milestoneData, setMilestoneData] = useState({
    name: '',
    description: '',
    dueDate: '',
    deliverables: ''
  });
  const [newTeamMember, setNewTeamMember] = useState('');

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

  const handleAddProject = () => {
    // In a real app, this would create a new project
    console.log('Adding new project:', newProject);
    setIsAddDialogOpen(false);
    setNewProject({
      name: '',
      description: '',
      type: 'installation',
      customerId: '',
      startDate: '',
      endDate: '',
      budgetAmount: '',
      projectManager: '',
      teamMembers: []
    });
  };

  const handleManageProject = (project: Project) => {
    console.log('Managing project:', project.name, manageAction);

    switch (manageAction) {
      case 'update_status':
        console.log('Updating status to:', statusUpdate);
        break;
      case 'update_progress':
        console.log('Updating progress to:', progressUpdate);
        break;
      case 'add_milestone':
        console.log('Adding milestone:', milestoneData);
        break;
      case 'add_member':
        console.log('Adding team member:', newTeamMember);
        break;
    }

    setIsManageDialogOpen(false);
    setManageAction('update_status');
    setStatusUpdate('planning');
    setProgressUpdate('');
    setMilestoneData({ name: '', description: '', dueDate: '', deliverables: '' });
    setNewTeamMember('');
  };

  const getProjectTypeLabel = (type: ProjectType) => {
    const typeMap: Record<ProjectType, string> = {
      installation: 'Installation',
      maintenance: 'Maintenance',
      consulting: 'Consulting',
      supply_only: 'Supply Only',
      turnkey: 'Turnkey'
    };
    return typeMap[type];
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Projects</h1>
            <p className="text-red-100 mt-1 text-lg">Complete project portfolio management</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-red-600 hover:bg-red-50" onClick={() => setIsAddDialogOpen(true)}>
                <Briefcase className="h-5 w-5 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900">Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline & Budget</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectName">Project Name *</Label>
                        <Input
                          id="projectName"
                          placeholder="Enter project name"
                          value={newProject.name}
                          onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select value={newProject.type} onValueChange={(value: ProjectType) => setNewProject({...newProject, type: value})}>
                          <SelectTrigger className="bg-white border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200">
                            <SelectItem value="installation">Installation</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="supply_only">Supply Only</SelectItem>
                            <SelectItem value="turnkey">Turnkey</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="customerId">Customer ID *</Label>
                      <Input
                        id="customerId"
                        placeholder="Enter customer ID"
                        value={newProject.customerId}
                        onChange={(e) => setNewProject({...newProject, customerId: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter project description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="bg-white border-gray-300"
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newProject.startDate}
                          onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                          className="bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date *</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newProject.endDate}
                          onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                          className="bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="budgetAmount">Budget Amount *</Label>
                      <Input
                        id="budgetAmount"
                        type="number"
                        placeholder="Enter budget amount"
                        value={newProject.budgetAmount}
                        onChange={(e) => setNewProject({...newProject, budgetAmount: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="team" className="space-y-4">
                    <div>
                      <Label htmlFor="projectManager">Project Manager *</Label>
                      <Input
                        id="projectManager"
                        placeholder="Enter project manager ID"
                        value={newProject.projectManager}
                        onChange={(e) => setNewProject({...newProject, projectManager: e.target.value})}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label>Team Members</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add team member ID"
                          value={newTeamMember}
                          onChange={(e) => setNewTeamMember(e.target.value)}
                          className="bg-white border-gray-300"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (newTeamMember.trim()) {
                              setNewProject({
                                ...newProject,
                                teamMembers: [...newProject.teamMembers, newTeamMember.trim()]
                              });
                              setNewTeamMember('');
                            }
                          }}
                          className="bg-white border-gray-300 hover:bg-gray-50"
                        >
                          Add
                        </Button>
                      </div>
                      {newProject.teamMembers.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {newProject.teamMembers.map((member, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {member}
                              <button
                                onClick={() => setNewProject({
                                  ...newProject,
                                  teamMembers: newProject.teamMembers.filter((_, i) => i !== index)
                                })}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="bg-white border-gray-300 hover:bg-gray-50">
                    Cancel
                  </Button>
                  <Button onClick={handleAddProject} className="bg-red-600 hover:bg-red-700 text-white">
                    Create Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                          <Badge variant="default" className="bg-red-600">On Track</Badge>
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
                        <Progress value={project.completionPercentage} className="h-2" />
                      </div>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-2xl font-bold text-red-600">${(project.budgetAmount / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-gray-500 mt-1">Budget</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <Dialog open={isViewDialogOpen && selectedProject?.id === project.id} onOpenChange={(open) => {
                          setIsViewDialogOpen(open);
                          if (!open) setSelectedProject(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedProject(project);
                                setIsViewDialogOpen(true);
                              }}
                              className="bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-semibold text-gray-900">Project Details - {project.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                  <TabsTrigger value="team">Team</TabsTrigger>
                                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Project Name</Label>
                                      <p className="text-sm text-gray-900">{project.name}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Project Type</Label>
                                      <p className="text-sm text-gray-900">{getProjectTypeLabel(project.type)}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Status</Label>
                                      <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Customer ID</Label>
                                      <p className="text-sm text-gray-900">{project.customerId}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                                    <p className="text-sm text-gray-900">{project.description}</p>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <Card className="bg-white border border-gray-200">
                                      <CardContent className="pt-4">
                                        <div className="text-center">
                                          <div className="text-2xl font-bold text-red-600">${(project.budgetAmount / 1000).toFixed(0)}K</div>
                                          <div className="text-sm text-gray-500">Budget</div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card className="bg-white border border-gray-200">
                                      <CardContent className="pt-4">
                                        <div className="text-center">
                                          <div className="text-2xl font-bold text-blue-600">${(project.actualCost / 1000).toFixed(0)}K</div>
                                          <div className="text-sm text-gray-500">Actual Cost</div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card className="bg-white border border-gray-200">
                                      <CardContent className="pt-4">
                                        <div className="text-center">
                                          <div className="text-2xl font-bold text-purple-600">{project.profitMargin}%</div>
                                          <div className="text-sm text-gray-500">Profit Margin</div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </TabsContent>

                                <TabsContent value="timeline" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                                      <p className="text-sm text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">End Date</Label>
                                      <p className="text-sm text-gray-900">{new Date(project.endDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Actual Start</Label>
                                      <p className="text-sm text-gray-900">
                                        {project.actualStartDate ? new Date(project.actualStartDate).toLocaleDateString() : 'Not started'}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Actual End</Label>
                                      <p className="text-sm text-gray-900">
                                        {project.actualEndDate ? new Date(project.actualEndDate).toLocaleDateString() : 'Not completed'}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700">Progress</Label>
                                    <div className="mt-2">
                                      <Progress value={project.completionPercentage} className="h-3" />
                                      <p className="text-sm text-gray-600 mt-1">{project.completionPercentage}% Complete</p>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="team" className="space-y-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700">Project Manager</Label>
                                    <p className="text-sm text-gray-900">{project.projectManager}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700">Team Members</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {project.teamMembers.map((member, index) => (
                                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                                          {member}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="milestones" className="space-y-4">
                                  <div className="space-y-3">
                                    {project.milestones.map((milestone, index) => (
                                      <Card key={index} className="bg-white border border-gray-200">
                                        <CardContent className="pt-4">
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <h4 className="font-semibold text-gray-900">{milestone.name}</h4>
                                              <p className="text-sm text-gray-600">{milestone.description}</p>
                                              <p className="text-xs text-gray-500 mt-1">
                                                Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                              </p>
                                            </div>
                                            <Badge variant={milestone.isCompleted ? "default" : "secondary"}>
                                              {milestone.isCompleted ? "Completed" : "Pending"}
                                            </Badge>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={isManageDialogOpen && selectedProject?.id === project.id} onOpenChange={(open) => {
                          setIsManageDialogOpen(open);
                          if (!open) setSelectedProject(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => {
                                setSelectedProject(project);
                                setIsManageDialogOpen(true);
                              }}
                            >
                              Manage
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold text-gray-900">Manage Project - {project.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Tabs value={manageAction} onValueChange={(value) => setManageAction(value as any)} className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                  <TabsTrigger value="update_status">Status</TabsTrigger>
                                  <TabsTrigger value="update_progress">Progress</TabsTrigger>
                                  <TabsTrigger value="add_milestone">Milestone</TabsTrigger>
                                  <TabsTrigger value="add_member">Team</TabsTrigger>
                                </TabsList>

                                <TabsContent value="update_status" className="space-y-4">
                                  <div>
                                    <Label htmlFor="status-select">Update Project Status</Label>
                                    <Select value={statusUpdate} onValueChange={(value: ProjectStatus) => setStatusUpdate(value)}>
                                      <SelectTrigger className="bg-white border-gray-300">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white border border-gray-200">
                                        <SelectItem value="planning">Planning</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="on_hold">On Hold</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </TabsContent>

                                <TabsContent value="update_progress" className="space-y-4">
                                  <div>
                                    <Label htmlFor="progress-input">Update Progress (%)</Label>
                                    <Input
                                      id="progress-input"
                                      type="number"
                                      min="0"
                                      max="100"
                                      placeholder="Enter progress percentage"
                                      value={progressUpdate}
                                      onChange={(e) => setProgressUpdate(e.target.value)}
                                      className="bg-white border-gray-300"
                                    />
                                  </div>
                                </TabsContent>

                                <TabsContent value="add_milestone" className="space-y-4">
                                  <div>
                                    <Label htmlFor="milestone-name">Milestone Name</Label>
                                    <Input
                                      id="milestone-name"
                                      placeholder="Enter milestone name"
                                      value={milestoneData.name}
                                      onChange={(e) => setMilestoneData({...milestoneData, name: e.target.value})}
                                      className="bg-white border-gray-300"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="milestone-desc">Description</Label>
                                    <Textarea
                                      id="milestone-desc"
                                      placeholder="Enter milestone description"
                                      value={milestoneData.description}
                                      onChange={(e) => setMilestoneData({...milestoneData, description: e.target.value})}
                                      className="bg-white border-gray-300"
                                      rows={2}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="milestone-due">Due Date</Label>
                                    <Input
                                      id="milestone-due"
                                      type="date"
                                      value={milestoneData.dueDate}
                                      onChange={(e) => setMilestoneData({...milestoneData, dueDate: e.target.value})}
                                      className="bg-white border-gray-300"
                                    />
                                  </div>
                                </TabsContent>

                                <TabsContent value="add_member" className="space-y-4">
                                  <div>
                                    <Label htmlFor="team-member">Add Team Member</Label>
                                    <Input
                                      id="team-member"
                                      placeholder="Enter team member ID"
                                      value={newTeamMember}
                                      onChange={(e) => setNewTeamMember(e.target.value)}
                                      className="bg-white border-gray-300"
                                    />
                                  </div>
                                </TabsContent>
                              </Tabs>

                              <div className="flex justify-end gap-3">
                                <Button
                                  variant="outline"
                                  onClick={() => setIsManageDialogOpen(false)}
                                  className="bg-white border-gray-300 hover:bg-gray-50"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleManageProject(project)}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Apply Changes
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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
