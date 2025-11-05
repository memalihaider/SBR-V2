'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Plus, Search, Filter, UserCheck, UserX, Clock, Download, Edit, Eye, Trash2, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useCurrency } from '@/lib/currency';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on-leave' | 'terminated';
  joinDate: string;
  salary: number;
  address: string;
  manager: string;
  skills: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState<{
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    salary: number;
    address: string;
    manager: string;
    skills: string[];
  }>({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: 0,
    address: '',
    manager: '',
    skills: [],
  });

  const { formatAmount } = useCurrency();

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@techtronics.com',
      phone: '+1 (555) 123-4567',
      department: 'R&D',
      position: 'Senior Hardware Engineer',
      status: 'active',
      joinDate: '2023-01-15',
      salary: 95000,
      address: '123 Silicon Valley Drive, San Jose, CA 95112',
      manager: 'Sarah Johnson',
      skills: ['Circuit Design', 'PCB Layout', 'Altium Designer', 'Signal Integrity'],
      emergencyContact: {
        name: 'Jane Smith',
        relationship: 'Spouse',
        phone: '+1 (555) 987-6543'
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techtronics.com',
      phone: '+1 (555) 234-5678',
      department: 'Sales',
      position: 'Electronics Sales Director',
      status: 'active',
      joinDate: '2022-08-20',
      salary: 85000,
      address: '456 Tech Park Ave, Austin, TX 78759',
      manager: 'CEO',
      skills: ['B2B Sales', 'Electronics Market', 'Customer Relations', 'Technical Presentations'],
      emergencyContact: {
        name: 'Mark Johnson',
        relationship: 'Spouse',
        phone: '+1 (555) 876-5432'
      }
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@techtronics.com',
      phone: '+1 (555) 345-6789',
      department: 'Manufacturing',
      position: 'Production Manager',
      status: 'active',
      joinDate: '2023-03-10',
      salary: 78000,
      address: '789 Industrial Park, Phoenix, AZ 85001',
      manager: 'Sarah Johnson',
      skills: ['SMT Assembly', 'Quality Control', 'Lean Manufacturing', 'ISO Standards'],
      emergencyContact: {
        name: 'Lisa Davis',
        relationship: 'Spouse',
        phone: '+1 (555) 765-4321'
      }
    },
    {
      id: 4,
      name: 'Lisa Chen',
      email: 'lisa.chen@techtronics.com',
      phone: '+1 (555) 456-7890',
      department: 'Quality Control',
      position: 'QA Engineer',
      status: 'active',
      joinDate: '2022-11-05',
      salary: 72000,
      address: '321 Electronics Blvd, Raleigh, NC 27601',
      manager: 'CEO',
      skills: ['Quality Assurance', 'Testing Protocols', 'Failure Analysis', 'Compliance Standards'],
      emergencyContact: {
        name: 'Tom Chen',
        relationship: 'Spouse',
        phone: '+1 (555) 654-3210'
      }
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@techtronics.com',
      phone: '+1 (555) 567-8901',
      department: 'Supply Chain',
      position: 'Procurement Specialist',
      status: 'inactive',
      joinDate: '2021-06-12',
      salary: 68000,
      address: '654 Component Drive, Denver, CO 80202',
      manager: 'Sarah Johnson',
      skills: ['Supplier Management', 'Component Sourcing', 'Inventory Control', 'Cost Analysis'],
      emergencyContact: {
        name: 'Mary Wilson',
        relationship: 'Spouse',
        phone: '+1 (555) 543-2109'
      }
    }
  ]);

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchTerm === '' ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === 'all' || employee.department.toLowerCase() === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle Add Employee
  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.department) {
      const employee: Employee = {
        id: employees.length + 1,
        ...newEmployee,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        }
      };
      setEmployees([...employees, employee]);
      setNewEmployee({
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        salary: 0,
        address: '',
        manager: '',
        skills: [],
      });
      setIsAddEmployeeOpen(false);
    }
  };

  // Handle View Employee
  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewEmployeeOpen(true);
  };

  // Handle Edit Employee
  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
      address: employee.address,
      manager: employee.manager,
      skills: employee.skills,
    });
    setIsEditEmployeeOpen(true);
  };

  // Handle Update Employee
  const handleUpdateEmployee = () => {
    if (selectedEmployee && newEmployee.name && newEmployee.email && newEmployee.department) {
      setEmployees(employees.map(emp =>
        emp.id === selectedEmployee.id
          ? { ...emp, ...newEmployee }
          : emp
      ));
      setIsEditEmployeeOpen(false);
      setSelectedEmployee(null);
      setNewEmployee({
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        salary: 0,
        address: '',
        manager: '',
        skills: [],
      });
    }
  };

  // Handle Delete Employee
  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const stats = [
    {
      title: 'Total Team Members',
      value: '47',
      change: '+8%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Engineers',
      value: '32',
      change: '+12%',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'On Projects',
      value: '8',
      change: '+15%',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Quality Control',
      value: '7',
      change: '+5%',
      icon: UserX,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Electronics Team Management</h1>
        <p className="text-red-100 mt-1 text-lg">Manage your electronics manufacturing team and personnel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Filters and Search */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl text-gray-900">Electronics Team Directory</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                View and manage all electronics manufacturing team members
              </CardDescription>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white shadow-md" onClick={() => setIsAddEmployeeOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search team members..."
                  className="pl-10 border-2 focus:border-red-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48 border-2">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="r&d">R&D</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="quality control">Quality Control</SelectItem>
                <SelectItem value="supply chain">Supply Chain</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 border-2">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Team Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={employee.status === 'active' ? 'default' : 'secondary'}
                        className={employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {employee.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {formatAmount(employee.salary)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          onClick={() => handleViewEmployee(employee)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-gray-600 border-gray-300 hover:bg-gray-50"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Employee Dialog */}
      <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
        <DialogContent className="max-w-2xl bg-white border-2 border-gray-200 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Add New Team Member</DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter the details for the new electronics team member.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="r&d">R&D</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="quality control">Quality Control</SelectItem>
                  <SelectItem value="supply chain">Supply Chain</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                placeholder="Enter position"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee({...newEmployee, salary: parseFloat(e.target.value) || 0})}
                placeholder="Enter salary"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newEmployee.address}
                onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                value={newEmployee.manager}
                onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                placeholder="Enter manager name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEmployee} className="bg-red-600 hover:bg-red-700">
              Add Team Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Employee Dialog */}
      <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
        <DialogContent className="max-w-2xl bg-white border-2 border-gray-200 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Team Member Details</DialogTitle>
            <DialogDescription className="text-gray-600">
              View detailed information about the electronics team member.
            </DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center">
                  <span className="text-xl font-semibold text-white">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                  <Badge
                    variant={selectedEmployee.status === 'active' ? 'default' : 'secondary'}
                    className={selectedEmployee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {selectedEmployee.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-medium">{selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span className="text-sm font-medium">{selectedEmployee.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Address:</span>
                    <span className="text-sm font-medium">{selectedEmployee.address || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Join Date:</span>
                    <span className="text-sm font-medium">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Salary:</span>
                    <span className="text-sm font-medium">{formatAmount(selectedEmployee.salary)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Department:</span>
                    <span className="text-sm font-medium">{selectedEmployee.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserCheck className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Manager:</span>
                    <span className="text-sm font-medium">{selectedEmployee.manager || 'Not assigned'}</span>
                  </div>
                </div>
              </div>

              {selectedEmployee.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedEmployee.emergencyContact.name && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Emergency Contact</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium">{selectedEmployee.emergencyContact.name}</p>
                    <p className="text-sm text-gray-600">{selectedEmployee.emergencyContact.relationship}</p>
                    <p className="text-sm text-gray-600">{selectedEmployee.emergencyContact.phone}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewEmployeeOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
        <DialogContent className="max-w-2xl bg-white border-2 border-gray-200 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Edit Team Member</DialogTitle>
            <DialogDescription className="text-gray-600">
              Update the electronics team member information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name *</Label>
              <Input
                id="edit-name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-department">Department *</Label>
              <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="r&d">R&D</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="quality control">Quality Control</SelectItem>
                  <SelectItem value="supply chain">Supply Chain</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-position">Position</Label>
              <Input
                id="edit-position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                placeholder="Enter position"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-salary">Salary</Label>
              <Input
                id="edit-salary"
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee({...newEmployee, salary: parseFloat(e.target.value) || 0})}
                placeholder="Enter salary"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={newEmployee.address}
                onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-manager">Manager</Label>
              <Input
                id="edit-manager"
                value={newEmployee.manager}
                onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                placeholder="Enter manager name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditEmployeeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEmployee} className="bg-red-600 hover:bg-red-700">
              Update Team Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}