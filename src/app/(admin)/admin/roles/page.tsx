'use client';

import { Fragment } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, Lock, Check, X } from 'lucide-react';

export default function AdminRolesPage() {
  const roles = [
    {
      name: 'Super Admin',
      key: 'super_admin',
      users: 8,
      color: 'red',
      description: 'Full system access and control',
      permissions: {
        users: { view: true, create: true, edit: true, delete: true },
        sales: { view: true, create: true, edit: true, delete: true },
        inventory: { view: true, create: true, edit: true, delete: true },
        projects: { view: true, create: true, edit: true, delete: true },
        finance: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true },
      },
    },
    {
      name: 'Sales Manager',
      key: 'sales_manager',
      users: 24,
      color: 'green',
      description: 'Manage sales team and operations',
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        sales: { view: true, create: true, edit: true, delete: true },
        inventory: { view: true, create: false, edit: false, delete: false },
        projects: { view: true, create: false, edit: false, delete: false },
        finance: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      name: 'Sales Representative',
      key: 'sales_rep',
      users: 48,
      color: 'blue',
      description: 'Handle leads and customer relationships',
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        sales: { view: true, create: true, edit: true, delete: false },
        inventory: { view: true, create: false, edit: false, delete: false },
        projects: { view: true, create: false, edit: false, delete: false },
        finance: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      name: 'Inventory Manager',
      key: 'inventory_manager',
      users: 12,
      color: 'purple',
      description: 'Manage products and stock',
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        sales: { view: true, create: false, edit: false, delete: false },
        inventory: { view: true, create: true, edit: true, delete: true },
        projects: { view: true, create: false, edit: false, delete: false },
        finance: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      name: 'Project Manager',
      key: 'project_manager',
      users: 18,
      color: 'indigo',
      description: 'Oversee project execution',
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        sales: { view: true, create: false, edit: false, delete: false },
        inventory: { view: true, create: false, edit: false, delete: false },
        projects: { view: true, create: true, edit: true, delete: true },
        finance: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      name: 'Finance Manager',
      key: 'finance_manager',
      users: 8,
      color: 'yellow',
      description: 'Financial operations and reporting',
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        sales: { view: true, create: false, edit: false, delete: false },
        inventory: { view: true, create: false, edit: false, delete: false },
        projects: { view: true, create: false, edit: false, delete: false },
        finance: { view: true, create: true, edit: true, delete: true },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
  ];

  const PermissionIcon = ({ allowed }: { allowed: boolean }) => (
    allowed ? (
      <Check className="h-4 w-4 text-green-600" />
    ) : (
      <X className="h-4 w-4 text-red-600" />
    )
  );

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Roles & Permissions</h1>
            <p className="text-red-100 mt-1 text-lg">Configure access control for all system roles</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <Shield className="h-5 w-5 mr-2" />
            Create New Role
          </Button>
        </div>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
            <CardHeader className={`bg-${role.color}-50 rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-${role.color}-100 rounded-lg`}>
                    <Shield className={`h-5 w-5 text-${role.color}-600`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">{role.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-600">{role.users} users</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">User Management</span>
                  <PermissionIcon allowed={role.permissions.users.view} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Sales Access</span>
                  <PermissionIcon allowed={role.permissions.sales.view} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Inventory Access</span>
                  <PermissionIcon allowed={role.permissions.inventory.view} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Project Access</span>
                  <PermissionIcon allowed={role.permissions.projects.view} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Finance Access</span>
                  <PermissionIcon allowed={role.permissions.finance.view} />
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Lock className="h-4 w-4 mr-2" />
                Edit Permissions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Permissions Matrix */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Permissions Matrix</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Detailed view of all role permissions across modules
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Module</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Permission</th>
                  {roles.slice(0, 4).map((role) => (
                    <th key={role.key} className="text-center py-3 px-4 font-bold text-gray-900">
                      {role.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(roles[0].permissions).map(([module, perms]) => (
                  <Fragment key={module}>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td rowSpan={4} className="py-3 px-4 font-semibold text-gray-900 capitalize align-top">
                        {module}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">View</td>
                      {roles.slice(0, 4).map((role) => (
                        <td key={role.key} className="py-2 px-4 text-center">
                          <PermissionIcon allowed={role.permissions[module as keyof typeof role.permissions].view} />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-4 text-sm text-gray-600">Create</td>
                      {roles.slice(0, 4).map((role) => (
                        <td key={role.key} className="py-2 px-4 text-center">
                          <PermissionIcon allowed={role.permissions[module as keyof typeof role.permissions].create} />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-4 text-sm text-gray-600">Edit</td>
                      {roles.slice(0, 4).map((role) => (
                        <td key={role.key} className="py-2 px-4 text-center">
                          <PermissionIcon allowed={role.permissions[module as keyof typeof role.permissions].edit} />
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-4 text-sm text-gray-600">Delete</td>
                      {roles.slice(0, 4).map((role) => (
                        <td key={role.key} className="py-2 px-4 text-center">
                          <PermissionIcon allowed={role.permissions[module as keyof typeof role.permissions].delete} />
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
