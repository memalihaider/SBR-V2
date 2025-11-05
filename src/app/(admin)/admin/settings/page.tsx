'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, Bell, Lock, Database, Mail, Globe, Palette, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const settingsGroups = [
    {
      title: 'System Configuration',
      icon: Settings,
      color: 'blue',
      settings: [
        { name: 'Company Name', value: 'Largify 360ERP', type: 'text' },
        { name: 'System Timezone', value: 'UTC-05:00 (EST)', type: 'select' },
        { name: 'Date Format', value: 'MM/DD/YYYY', type: 'select' },
        { name: 'Currency', value: 'USD ($)', type: 'select' },
      ],
    },
    {
      title: 'Security Settings',
      icon: Lock,
      color: 'red',
      settings: [
        { name: 'Two-Factor Authentication', value: 'Enabled', type: 'toggle', enabled: true },
        { name: 'Password Expiry', value: '90 days', type: 'number' },
        { name: 'Session Timeout', value: '30 minutes', type: 'number' },
        { name: 'IP Whitelisting', value: 'Disabled', type: 'toggle', enabled: false },
      ],
    },
    {
      title: 'Email Configuration',
      icon: Mail,
      color: 'green',
      settings: [
        { name: 'SMTP Server', value: 'smtp.largify.com', type: 'text' },
        { name: 'SMTP Port', value: '587', type: 'number' },
        { name: 'From Email', value: 'noreply@largify.com', type: 'email' },
        { name: 'Email Notifications', value: 'Enabled', type: 'toggle', enabled: true },
      ],
    },
    {
      title: 'Database & Backup',
      icon: Database,
      color: 'purple',
      settings: [
        { name: 'Auto Backup', value: 'Daily at 2:00 AM', type: 'text' },
        { name: 'Backup Retention', value: '30 days', type: 'number' },
        { name: 'Database Size', value: '2.4 GB', type: 'readonly' },
        { name: 'Last Backup', value: '2 hours ago', type: 'readonly' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: 'yellow',
      settings: [
        { name: 'Email Alerts', value: 'Enabled', type: 'toggle', enabled: true },
        { name: 'SMS Alerts', value: 'Disabled', type: 'toggle', enabled: false },
        { name: 'Push Notifications', value: 'Enabled', type: 'toggle', enabled: true },
        { name: 'Alert Threshold', value: 'High Priority Only', type: 'select' },
      ],
    },
    {
      title: 'Integration Settings',
      icon: Globe,
      color: 'indigo',
      settings: [
        { name: 'API Access', value: 'Enabled', type: 'toggle', enabled: true },
        { name: 'API Rate Limit', value: '1000 requests/hour', type: 'number' },
        { name: 'Webhook URL', value: 'https://api.largify.com/webhook', type: 'text' },
        { name: 'Third-party Apps', value: '5 connected', type: 'readonly' },
      ],
    },
  ];

  const modulesConfig = [
    { name: 'Sales Module', enabled: true, users: 72, color: 'green' },
    { name: 'Inventory Module', enabled: true, users: 45, color: 'blue' },
    { name: 'Project Module', enabled: true, users: 38, color: 'purple' },
    { name: 'Finance Module', enabled: true, users: 28, color: 'yellow' },
    { name: 'HR Module', enabled: false, users: 0, color: 'gray' },
    { name: 'CRM Module', enabled: true, users: 56, color: 'indigo' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">System Settings</h1>
            <p className="text-red-100 mt-1 text-lg">Configure and manage system-wide settings</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
              <Shield className="h-4 w-4 mr-2 inline" />
              All changes are logged
            </Badge>
          </div>
        </div>
      </div>

      {/* Module Configuration */}
      <Card className="shadow-lg">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Module Management</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Enable or disable system modules
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modulesConfig.map((module, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${module.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900">{module.name}</h4>
                  <Badge variant={module.enabled ? 'default' : 'secondary'}>
                    {module.enabled ? 'ACTIVE' : 'DISABLED'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{module.users} active users</p>
                <Button
                  size="sm"
                  variant={module.enabled ? 'outline' : 'default'}
                  className="w-full"
                >
                  {module.enabled ? 'Disable' : 'Enable'} Module
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsGroups.map((group, groupIndex) => {
          const IconComponent = group.icon;
          return (
            <Card key={groupIndex} className="shadow-lg">
              <CardHeader className={`bg-${group.color}-50 rounded-t-lg`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-${group.color}-100 rounded-lg`}>
                    <IconComponent className={`h-5 w-5 text-${group.color}-600`} />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{group.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {group.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{setting.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{setting.type}</p>
                      </div>
                      {setting.type === 'toggle' ? (
                        <div className="flex items-center space-x-2">
                          <Badge variant={setting.enabled ? 'default' : 'secondary'}>
                            {setting.value}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Toggle
                          </Button>
                        </div>
                      ) : setting.type === 'readonly' ? (
                        <Badge variant="outline">{setting.value}</Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                  Save {group.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Advanced Settings */}
      <Card className="shadow-lg border-2 border-red-200">
        <CardHeader className="bg-linear-to-r from-red-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Advanced Settings</CardTitle>
          <CardDescription className="text-red-600 font-semibold">
            ⚠️ Caution: Changes here can affect system stability
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-between">
              <span>Clear System Cache</span>
              <Badge variant="secondary">2.1 GB</Badge>
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Rebuild Database Indexes</span>
              <Badge variant="secondary">Last: 5 days ago</Badge>
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Export System Logs</span>
              <Badge variant="secondary">128 MB</Badge>
            </Button>
            <Button variant="destructive" className="w-full">
              Reset to Factory Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
