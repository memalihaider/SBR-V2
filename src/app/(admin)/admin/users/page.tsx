'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Shield, Mail, Phone, Calendar, Search } from 'lucide-react';

export default function AdminUsersPage() {
  const userStats = [
    { title: 'Total Users', value: '248', change: '+12', icon: Users, color: 'blue' },
    { title: 'Active Today', value: '156', change: '+8', icon: Users, color: 'green' },
    { title: 'Admin Users', value: '8', change: '0', icon: Shield, color: 'red' },
    { title: 'New This Month', value: '24', change: '+4', icon: UserPlus, color: 'purple' },
  ];

  const allUsers = [
    { name: 'John Admin', email: 'admin@largify.com', phone: '+1 (555) 001-0001', role: 'super_admin', status: 'active', lastLogin: '2 hours ago', department: 'Administration', joinDate: '2020-01-15' },
    { name: 'Sarah Sales', email: 'sarah.sales@largify.com', phone: '+1 (555) 001-0002', role: 'sales_manager', status: 'active', lastLogin: '5 mins ago', department: 'Sales', joinDate: '2021-03-20' },
    { name: 'Mike Rep', email: 'sales.rep@largify.com', phone: '+1 (555) 001-0003', role: 'sales_rep', status: 'active', lastLogin: '1 hour ago', department: 'Sales', joinDate: '2021-06-10' },
    { name: 'Lisa Inventory', email: 'inventory@largify.com', phone: '+1 (555) 001-0004', role: 'inventory_manager', status: 'active', lastLogin: '30 mins ago', department: 'Inventory', joinDate: '2020-08-05' },
    { name: 'David Project', email: 'project@largify.com', phone: '+1 (555) 001-0005', role: 'project_manager', status: 'active', lastLogin: '15 mins ago', department: 'Projects', joinDate: '2021-01-12' },
    { name: 'Emma Finance', email: 'finance@largify.com', phone: '+1 (555) 001-0006', role: 'finance_manager', status: 'active', lastLogin: '3 hours ago', department: 'Finance', joinDate: '2020-05-18' },
    { name: 'Robert Client', email: 'client@largify.com', phone: '+1 (555) 001-0007', role: 'client', status: 'active', lastLogin: '1 day ago', department: 'External', joinDate: '2022-02-28' },
    { name: 'Maria Vendor', email: 'vendor@largify.com', phone: '+1 (555) 001-0008', role: 'vendor', status: 'active', lastLogin: '6 hours ago', department: 'External', joinDate: '2021-11-08' },
    { name: 'James Wilson', email: 'j.wilson@company.com', phone: '+1 (555) 123-4567', role: 'sales_rep', status: 'active', lastLogin: '2 days ago', department: 'Sales', joinDate: '2022-07-14' },
    { name: 'Anna Martinez', email: 'a.martinez@company.com', phone: '+1 (555) 234-5678', role: 'project_manager', status: 'inactive', lastLogin: '1 week ago', department: 'Projects', joinDate: '2023-01-22' },
  ];

  const getRoleBadge = (role: string) => {
    const roleMap: Record<string, { label: string; variant: 'default' | 'destructive' | 'secondary' | 'outline' }> = {
      super_admin: { label: 'Super Admin', variant: 'destructive' },
      sales_manager: { label: 'Sales Manager', variant: 'default' },
      sales_rep: { label: 'Sales Rep', variant: 'secondary' },
      inventory_manager: { label: 'Inventory Manager', variant: 'default' },
      project_manager: { label: 'Project Manager', variant: 'default' },
      finance_manager: { label: 'Finance Manager', variant: 'default' },
      client: { label: 'Client', variant: 'outline' },
      vendor: { label: 'Vendor', variant: 'outline' },
    };
    return roleMap[role] || { label: role, variant: 'outline' };
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-red-100 mt-1 text-lg">Manage all system users and permissions</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <UserPlus className="h-5 w-5 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => {
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
                  <span className="text-green-600 font-semibold">{stat.change}</span>
                  <span className="text-gray-500"> from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or department..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
              />
            </div>
            <Button variant="outline" className="px-6">Filter</Button>
            <Button variant="outline" className="px-6">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">All Users</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Complete list of system users with detailed information
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {allUsers.map((user, index) => {
              const roleBadge = getRoleBadge(user.role);
              return (
                <div
                  key={index}
                  className="p-5 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-md bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{user.name}</h4>
                          <Badge variant={roleBadge.variant}>{roleBadge.label}</Badge>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{user.phone}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-200">
                          <div>
                            <p className="text-xs text-gray-500">Department</p>
                            <p className="text-sm font-semibold text-gray-700">{user.department}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Last Login</p>
                            <p className="text-sm font-semibold text-gray-700">{user.lastLogin}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Join Date</p>
                            <p className="text-sm font-semibold text-gray-700">{user.joinDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Shield className="h-4 w-4 mr-1" />
                        Permissions
                      </Button>
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
