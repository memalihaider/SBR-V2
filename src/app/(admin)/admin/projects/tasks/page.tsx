'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import mockData from '@/lib/mock-data';

// Task interface
interface Task {
  id: string;
  title: string;
  description?: string;
  projectName: string;
  projectId: string;
  status: 'pending' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: Date;
  completedPercentage: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

// Mock task data based on project milestones
const generateMockTasks = (): Task[] => {
  const tasks: Task[] = [];

  mockData.projects.forEach(project => {
    project.milestones.forEach((milestone, index) => {
      tasks.push({
        id: `${project.id}-m${index}`,
        title: milestone.name,
        description: milestone.description,
        projectName: project.name,
        projectId: project.id,
        status: milestone.isCompleted ? 'completed' : index % 2 === 0 ? 'in progress' : 'pending',
        priority: index % 3 === 0 ? 'high' : index % 3 === 1 ? 'medium' : 'low',
        assignee: project.projectManager,
        dueDate: milestone.dueDate,
        completedPercentage: milestone.isCompleted ? 100 : Math.floor(Math.random() * 80),
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        tags: ['milestone', project.type],
        estimatedHours: Math.floor(Math.random() * 40) + 8,
        actualHours: milestone.isCompleted ? Math.floor(Math.random() * 40) + 8 : undefined
      });
    });
  });

  return tasks;
};

export default function ProjectTasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Form states for create/edit task
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    projectId: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: '',
    dueDate: '',
    estimatedHours: '',
    tags: [] as string[]
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    status: 'pending' as 'pending' | 'in progress' | 'completed',
    completedPercentage: 0,
    actualHours: '',
    notes: ''
  });

  const getAllTasks = () => generateMockTasks();

  const getFilteredTasks = () => {
    let filtered = getAllTasks();

    if (filterStatus !== 'all') {
      filtered = filtered.filter(t => t.status.toLowerCase().replace(' ', '-') === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.assignee?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const tasks = getFilteredTasks();
  const allTasks = getAllTasks();
  const pendingTasks = allTasks.filter(t => t.status.toLowerCase() === 'pending').length;
  const inProgressTasks = allTasks.filter(t => t.status.toLowerCase() === 'in progress').length;
  const completedTasks = allTasks.filter(t => t.status.toLowerCase() === 'completed').length;

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed') return 'bg-red-100 text-red-800';
    if (statusLower === 'in progress') return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-800';
    if (priority === 'medium') return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleCreateTask = () => {
    // In a real app, this would create a new task
    console.log('Creating new task:', taskForm);
    setIsCreateDialogOpen(false);
    setTaskForm({
      title: '',
      description: '',
      projectId: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      estimatedHours: '',
      tags: []
    });
  };

  const handleEditTask = (task: Task) => {
    console.log('Editing task:', task.title, editForm);
    setIsEditDialogOpen(false);
    setEditForm({
      status: 'pending',
      completedPercentage: 0,
      actualHours: '',
      notes: ''
    });
  };

  const openEditDialog = (task: Task) => {
    setSelectedTask(task);
    setEditForm({
      status: task.status,
      completedPercentage: task.completedPercentage,
      actualHours: task.actualHours?.toString() || '',
      notes: ''
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
          <p className="text-gray-600 mt-1">Manage tasks across all projects</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsCreateDialogOpen(true)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-title">Task Title *</Label>
                  <Input
                    id="task-title"
                    placeholder="Enter task title"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    className="bg-white border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="task-priority">Priority</Label>
                  <Select value={taskForm.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setTaskForm({...taskForm, priority: value})}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Enter task description"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                  className="bg-white border-gray-300"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-project">Project *</Label>
                  <Select value={taskForm.projectId} onValueChange={(value) => setTaskForm({...taskForm, projectId: value})}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      {mockData.projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="task-assignee">Assignee</Label>
                  <Input
                    id="task-assignee"
                    placeholder="Enter assignee name"
                    value={taskForm.assignee}
                    onChange={(e) => setTaskForm({...taskForm, assignee: e.target.value})}
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-due-date">Due Date</Label>
                  <Input
                    id="task-due-date"
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                    className="bg-white border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="task-estimated-hours">Estimated Hours</Label>
                  <Input
                    id="task-estimated-hours"
                    type="number"
                    placeholder="Enter hours"
                    value={taskForm.estimatedHours}
                    onChange={(e) => setTaskForm({...taskForm, estimatedHours: e.target.value})}
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="bg-white border-gray-300 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button onClick={handleCreateTask} className="bg-red-600 hover:bg-red-700 text-white">
                  Create Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{allTasks.length}</div>
            <p className="text-sm text-gray-500 mt-1">All projects</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingTasks}</div>
            <p className="text-sm text-gray-500 mt-1">Not started</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{inProgressTasks}</div>
            <p className="text-sm text-gray-500 mt-1">Active tasks</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{completedTasks}</div>
            <p className="text-sm text-gray-500 mt-1">Finished</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tasks by title, project, or assignee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-gray-300"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white border-gray-300 hover:bg-gray-50'}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
                className={filterStatus === 'pending' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white border-gray-300 hover:bg-gray-50'}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'in-progress' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('in-progress')}
                className={filterStatus === 'in-progress' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white border-gray-300 hover:bg-gray-50'}
              >
                In Progress
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('completed')}
                className={filterStatus === 'completed' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white border-gray-300 hover:bg-gray-50'}
              >
                Completed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Tasks ({tasks.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <Badge className={getPriorityBadge(task.priority)}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusBadge(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {task.projectName}
                      </div>
                      {task.assignee && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {task.assignee}
                        </div>
                      )}
                      {task.dueDate && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                      {task.estimatedHours && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {task.estimatedHours}h estimated
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <Progress value={task.completedPercentage} className="flex-1 h-2" />
                        <span className="text-sm font-medium text-gray-700">{task.completedPercentage}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Dialog open={isViewDialogOpen && selectedTask?.id === task.id} onOpenChange={(open) => {
                      setIsViewDialogOpen(open);
                      if (!open) setSelectedTask(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTask(task);
                            setIsViewDialogOpen(true);
                          }}
                          className="bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-semibold text-gray-900">Task Details - {task.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="progress">Progress</TabsTrigger>
                              <TabsTrigger value="details">Details</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Task Title</Label>
                                  <p className="text-sm text-gray-900">{task.title}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Project</Label>
                                  <p className="text-sm text-gray-900">{task.projectName}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Status</Label>
                                  <Badge className={getStatusBadge(task.status)}>{task.status}</Badge>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Priority</Label>
                                  <Badge className={getPriorityBadge(task.priority)}>{task.priority}</Badge>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Assignee</Label>
                                  <p className="text-sm text-gray-900">{task.assignee}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Due Date</Label>
                                  <p className="text-sm text-gray-900">{new Date(task.dueDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                              {task.description && (
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Description</Label>
                                  <p className="text-sm text-gray-900">{task.description}</p>
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="progress" className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Completion Progress</Label>
                                <div className="mt-2">
                                  <Progress value={task.completedPercentage} className="h-3" />
                                  <p className="text-sm text-gray-600 mt-1">{task.completedPercentage}% Complete</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Estimated Hours</Label>
                                  <p className="text-sm text-gray-900">{task.estimatedHours || 'Not set'} hours</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Actual Hours</Label>
                                  <p className="text-sm text-gray-900">{task.actualHours || 'Not completed'} hours</p>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="details" className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Tags</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {task.tags?.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                                      {tag}
                                    </Badge>
                                  )) || <p className="text-sm text-gray-500">No tags</p>}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Created</Label>
                                  <p className="text-sm text-gray-900">{new Date(task.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700">Last Updated</Label>
                                  <p className="text-sm text-gray-900">{new Date(task.updatedAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isEditDialogOpen && selectedTask?.id === task.id} onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setSelectedTask(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(task)}
                          className="bg-white border-gray-300 hover:bg-red-50 hover:border-red-300"
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-semibold text-gray-900">Edit Task - {task.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-status">Status</Label>
                            <Select value={editForm.status} onValueChange={(value: 'pending' | 'in progress' | 'completed') => setEditForm({...editForm, status: value})}>
                              <SelectTrigger className="bg-white border-gray-300">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-200">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="edit-progress">Progress (%)</Label>
                            <Input
                              id="edit-progress"
                              type="number"
                              min="0"
                              max="100"
                              value={editForm.completedPercentage}
                              onChange={(e) => setEditForm({...editForm, completedPercentage: parseInt(e.target.value) || 0})}
                              className="bg-white border-gray-300"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-hours">Actual Hours</Label>
                            <Input
                              id="edit-hours"
                              type="number"
                              placeholder="Enter actual hours worked"
                              value={editForm.actualHours}
                              onChange={(e) => setEditForm({...editForm, actualHours: e.target.value})}
                              className="bg-white border-gray-300"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-notes">Update Notes</Label>
                            <Textarea
                              id="edit-notes"
                              placeholder="Add notes about this update..."
                              value={editForm.notes}
                              onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                              className="bg-white border-gray-300"
                              rows={2}
                            />
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button
                              variant="outline"
                              onClick={() => setIsEditDialogOpen(false)}
                              className="bg-white border-gray-300 hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleEditTask(task)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Update Task
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-lg font-medium">No tasks found</p>
                <p className="text-sm">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
