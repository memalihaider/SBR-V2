'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Users, Plus, TrendingUp, Eye, Edit2, User, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface Department {
  id: number;
  name: string;
  head: string;
  employees: number;
  budget: string;
  growth: string;
  description: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: 'Engineering',
      head: 'John Smith',
      employees: 45,
      budget: '$2.1M',
      growth: '+12%',
      description: 'Software development and technical operations',
    },
    {
      id: 2,
      name: 'Sales',
      head: 'Sarah Johnson',
      employees: 32,
      budget: '$1.8M',
      growth: '+8%',
      description: 'Customer acquisition and relationship management',
    },
    {
      id: 3,
      name: 'HR',
      head: 'Lisa Chen',
      employees: 12,
      budget: '$650K',
      growth: '+5%',
      description: 'Human resources and employee management',
    },
    {
      id: 4,
      name: 'Finance',
      head: 'Mike Davis',
      employees: 18,
      budget: '$950K',
      growth: '+3%',
      description: 'Financial planning and accounting',
    },
    {
      id: 5,
      name: 'Operations',
      head: 'David Wilson',
      employees: 28,
      budget: '$1.2M',
      growth: '+15%',
      description: 'Business operations and logistics',
    },
    {
      id: 6,
      name: 'Marketing',
      head: 'Emma Rodriguez',
      employees: 15,
      budget: '$780K',
      growth: '+10%',
      description: 'Brand management and marketing campaigns',
    },
  ]);

  // Modal states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // Form states
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    head: '',
    employees: '',
    budget: '',
    description: '',
  });

  const [editDepartment, setEditDepartment] = useState({
    name: '',
    head: '',
    employees: '',
    budget: '',
    description: '',
  });

  // Handlers
  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.head || !newDepartment.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const department: Department = {
      id: Math.max(...departments.map(d => d.id)) + 1,
      name: newDepartment.name,
      head: newDepartment.head,
      employees: parseInt(newDepartment.employees) || 0,
      budget: newDepartment.budget || '$0',
      growth: '+0%',
      description: newDepartment.description,
    };

    setDepartments(prev => [...prev, department]);
    setNewDepartment({ name: '', head: '', employees: '', budget: '', description: '' });
    setAddDialogOpen(false);
    toast.success('Department added successfully');
  };

  const handleViewDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setViewDialogOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setEditDepartment({
      name: department.name,
      head: department.head,
      employees: department.employees.toString(),
      budget: department.budget,
      description: department.description,
    });
    setEditDialogOpen(true);
  };

  const handleUpdateDepartment = () => {
    if (!selectedDepartment) return;

    if (!editDepartment.name || !editDepartment.head || !editDepartment.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setDepartments(prev => prev.map(dept =>
      dept.id === selectedDepartment.id
        ? {
            ...dept,
            name: editDepartment.name,
            head: editDepartment.head,
            employees: parseInt(editDepartment.employees) || 0,
            budget: editDepartment.budget,
            description: editDepartment.description,
          }
        : dept
    ));

    setEditDialogOpen(false);
    setSelectedDepartment(null);
    toast.success('Department updated successfully');
  };

  const stats = [
    {
      title: 'Total Departments',
      value: '6',
      change: '+1',
      icon: Building2,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Total Employees',
      value: '189',
      change: '+5%',
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Avg Department Size',
      value: '31.5',
      change: '+2%',
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Department Management</h1>
        <p className="text-red-100 mt-1 text-lg">Organize and manage company departments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
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

      {/* Departments Grid */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl text-gray-900">Departments</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Overview of all company departments
              </CardDescription>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white shadow-md" onClick={() => setAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Card key={dept.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-900">{dept.name}</CardTitle>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                      {dept.growth}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    {dept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Department Head:</span>
                    <span className="text-sm font-semibold text-gray-900">{dept.head}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Employees:</span>
                    <span className="text-sm font-semibold text-gray-900">{dept.employees}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Budget:</span>
                    <span className="text-sm font-semibold text-gray-900">{dept.budget}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => handleViewDepartment(dept)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-50" onClick={() => handleEditDepartment(dept)}>
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Department Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-white border-2 border-gray-200 max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
            <DialogDescription>
              Create a new department in your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dept-name">Department Name *</Label>
              <Input
                id="dept-name"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter department name"
                className="bg-white border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-head">Department Head *</Label>
              <Input
                id="dept-head"
                value={newDepartment.head}
                onChange={(e) => setNewDepartment(prev => ({ ...prev, head: e.target.value }))}
                placeholder="Enter department head name"
                className="bg-white border-gray-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dept-employees">Number of Employees</Label>
                <Input
                  id="dept-employees"
                  type="number"
                  value={newDepartment.employees}
                  onChange={(e) => setNewDepartment(prev => ({ ...prev, employees: e.target.value }))}
                  placeholder="0"
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-budget">Budget</Label>
                <Input
                  id="dept-budget"
                  value={newDepartment.budget}
                  onChange={(e) => setNewDepartment(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="$0"
                  className="bg-white border-gray-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-description">Description *</Label>
              <Textarea
                id="dept-description"
                value={newDepartment.description}
                onChange={(e) => setNewDepartment(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter department description"
                rows={3}
                className="bg-white border-gray-300"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setAddDialogOpen(false)} className="bg-white border-gray-300">
              Cancel
            </Button>
            <Button onClick={handleAddDepartment} className="bg-red-600 hover:bg-red-700">
              Add Department
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Department Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="bg-white border-2 border-gray-200 max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-red-600" />
              {selectedDepartment?.name}
            </DialogTitle>
            <DialogDescription>
              Department details and information
            </DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Head:</span>
                  <span className="font-semibold">{selectedDepartment.head}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Employees:</span>
                  <span className="font-semibold">{selectedDepartment.employees}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Budget:</span>
                  <span className="font-semibold">{selectedDepartment.budget}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Growth:</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                    {selectedDepartment.growth}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                  {selectedDepartment.description}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button onClick={() => setViewDialogOpen(false)} className="bg-red-600 hover:bg-red-700">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Department Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-white border-2 border-gray-200 max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update department information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-dept-name">Department Name *</Label>
              <Input
                id="edit-dept-name"
                value={editDepartment.name}
                onChange={(e) => setEditDepartment(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dept-head">Department Head *</Label>
              <Input
                id="edit-dept-head"
                value={editDepartment.head}
                onChange={(e) => setEditDepartment(prev => ({ ...prev, head: e.target.value }))}
                className="bg-white border-gray-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-dept-employees">Number of Employees</Label>
                <Input
                  id="edit-dept-employees"
                  type="number"
                  value={editDepartment.employees}
                  onChange={(e) => setEditDepartment(prev => ({ ...prev, employees: e.target.value }))}
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-dept-budget">Budget</Label>
                <Input
                  id="edit-dept-budget"
                  value={editDepartment.budget}
                  onChange={(e) => setEditDepartment(prev => ({ ...prev, budget: e.target.value }))}
                  className="bg-white border-gray-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dept-description">Description *</Label>
              <Textarea
                id="edit-dept-description"
                value={editDepartment.description}
                onChange={(e) => setEditDepartment(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="bg-white border-gray-300"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="bg-white border-gray-300">
              Cancel
            </Button>
            <Button onClick={handleUpdateDepartment} className="bg-red-600 hover:bg-red-700">
              Update Department
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}