'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Clock, CheckCircle, XCircle, Briefcase, Eye, Star } from 'lucide-react';
import { mockData } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function RecruitmentPage() {
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isReviewCandidatesOpen, setIsReviewCandidatesOpen] = useState(false);
  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Use mock data
  const jobPostings = mockData.jobPostings;
  const candidates = mockData.candidates;
  const applications = mockData.jobApplications;

  const recruitmentStats = [
    {
      title: 'Open Positions',
      value: jobPostings.filter(job => job.status === 'active').length.toString(),
      change: '+2',
      icon: Briefcase,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Active Candidates',
      value: candidates.filter(c => ['new', 'screening', 'interview_scheduled', 'interviewed'].includes(c.status)).length.toString(),
      change: '+12%',
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Interviews Scheduled',
      value: applications.filter(app => app.status === 'interview_scheduled').length.toString(),
      change: '+5%',
      icon: Clock,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Offers Extended',
      value: applications.filter(app => app.status === 'offer_extended').length.toString(),
      change: '+3',
      icon: UserPlus,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const openPositions = jobPostings.filter(job => job.status === 'active').slice(0, 4);

  const recentCandidates = candidates
    .sort((a, b) => new Date(b.lastActivityDate).getTime() - new Date(a.lastActivityDate).getTime())
    .slice(0, 4)
    .map(candidate => {
      const application = applications.find(app => app.candidateId === candidate.id);
      const fullName = `${candidate.firstName} ${candidate.lastName}`;
      return {
        ...candidate,
        name: fullName,
        position: application ? jobPostings.find(job => job.id === application.jobId)?.title || 'Unknown Position' : 'Unknown Position',
        stage: application?.currentStage || 'Application Review',
        status: candidate.status,
        appliedDate: candidate.appliedDate.toISOString().split('T')[0],
      };
    });

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
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Recruitment Management</h1>
        <p className="text-red-100 mt-1 text-lg">Manage job postings and candidate pipeline</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recruitmentStats.map((stat, index) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Positions */}
        <Card className="shadow-lg">
          <CardHeader className="bg-linear-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl text-gray-900">Open Positions</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Current job openings
                </CardDescription>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white shadow-md">
                <UserPlus className="h-4 w-4 mr-2" />
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
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Briefcase className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {position.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {position.department} • {position.applicationsCount} applicants
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getPriorityBadge(position.priority)}
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => {
                      setSelectedJob(position);
                      toast.info(`Viewing details for ${position.title}`);
                    }}>
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
              Latest candidate activities
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {candidate.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {candidate.position}
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
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => {
                      setSelectedCandidate(candidate);
                      toast.info(`Reviewing candidate ${candidate.name}`);
                    }}>
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
        <CardHeader className="bg-linear-to-r from-red-50 to-red-100 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900">Recruitment Actions</CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            Common recruitment management tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="p-5 border-2 border-red-200 rounded-xl hover:bg-linear-to-br hover:from-red-50 hover:to-red-100 hover:border-red-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl" onClick={() => setIsPostJobOpen(true)}>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <Briefcase className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Post New Job</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Create and publish job openings
              </p>
            </Button>
            <Button className="p-5 border-2 border-red-200 rounded-xl hover:bg-linear-to-br hover:from-red-50 hover:to-red-100 hover:border-red-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl" onClick={() => setIsReviewCandidatesOpen(true)}>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Review Candidates</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Evaluate and shortlist applicants
              </p>
            </Button>
            <Button className="p-5 border-2 border-red-200 rounded-xl hover:bg-linear-to-br hover:from-red-50 hover:to-red-100 hover:border-red-300 text-left transition-all duration-200 group shadow-md hover:shadow-xl" onClick={() => setIsScheduleInterviewOpen(true)}>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <CheckCircle className="h-5 w-5 text-red-600" />
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

      {/* Dialog Components */}
      <PostNewJobDialog isOpen={isPostJobOpen} onClose={() => setIsPostJobOpen(false)} />
      <ReviewCandidatesDialog isOpen={isReviewCandidatesOpen} onClose={() => setIsReviewCandidatesOpen(false)} />
      <ScheduleInterviewsDialog isOpen={isScheduleInterviewOpen} onClose={() => setIsScheduleInterviewOpen(false)} />
    </div>
  );
}

// Post New Job Dialog Component
function PostNewJobDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: '',
    experienceLevel: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    skills: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    toast.success('Job posting created successfully!');
    onClose();
    // Reset form
    setFormData({
      title: '',
      department: '',
      location: '',
      employmentType: '',
      experienceLevel: '',
      salaryMin: '',
      salaryMax: '',
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: '',
      skills: '',
      priority: 'medium'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-red-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Post New Job</DialogTitle>
          <DialogDescription className="text-gray-600">
            Create a new job posting to attract qualified candidates.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Software Developer"
                required
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-semibold text-gray-700">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="IT Support">IT Support</SelectItem>
                  <SelectItem value="Customer Support">Customer Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold text-gray-700">Location *</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentType" className="text-sm font-semibold text-gray-700">Employment Type *</Label>
              <Select value={formData.employmentType} onValueChange={(value) => setFormData({ ...formData, employmentType: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full Time</SelectItem>
                  <SelectItem value="part_time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceLevel" className="text-sm font-semibold text-gray-700">Experience Level *</Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="executive">Executive Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-semibold text-gray-700">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryMin" className="text-sm font-semibold text-gray-700">Minimum Salary</Label>
              <Input
                id="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                placeholder="50000"
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryMax" className="text-sm font-semibold text-gray-700">Maximum Salary</Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                placeholder="80000"
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
              rows={4}
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-sm font-semibold text-gray-700">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="List the required qualifications, skills, and experience..."
              rows={3}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities" className="text-sm font-semibold text-gray-700">Key Responsibilities</Label>
            <Textarea
              id="responsibilities"
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              placeholder="List the main responsibilities and duties..."
              rows={3}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits" className="text-sm font-semibold text-gray-700">Benefits</Label>
            <Textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              placeholder="List the benefits offered (health insurance, 401k, etc.)..."
              rows={2}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills" className="text-sm font-semibold text-gray-700">Required Skills</Label>
            <Textarea
              id="skills"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="List the required technical and soft skills..."
              rows={2}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
              Post Job
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Review Candidates Dialog Component
function ReviewCandidatesDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const candidates = mockData.candidates.slice(0, 10); // Show first 10 candidates

  const handleStatusChange = (candidateId: string, newStatus: string) => {
    // Here you would typically update the candidate status via API
    toast.success(`Candidate status updated to ${newStatus}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'screening':
        return <Badge className="bg-yellow-100 text-yellow-800">Screening</Badge>;
      case 'interview_scheduled':
        return <Badge className="bg-purple-100 text-purple-800">Interview Scheduled</Badge>;
      case 'interviewed':
        return <Badge className="bg-indigo-100 text-indigo-800">Interviewed</Badge>;
      case 'offer_extended':
        return <Badge className="bg-green-100 text-green-800">Offer Extended</Badge>;
      case 'hired':
        return <Badge className="bg-emerald-100 text-emerald-800">Hired</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-2 border-red-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Review Candidates</DialogTitle>
          <DialogDescription className="text-gray-600">
            Evaluate and manage candidate applications.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {candidates.map((candidate) => {
            const application = mockData.jobApplications.find(app => app.candidateId === candidate.id);
            const job = application ? mockData.jobPostings.find(job => job.id === application.jobId) : null;

            return (
              <Card key={candidate.id} className="p-4 border border-gray-200 hover:border-red-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-white">
                        {candidate.firstName[0]}{candidate.lastName[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {candidate.firstName} {candidate.lastName}
                        </h3>
                        {getStatusBadge(candidate.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Applied for: <span className="font-medium">{job?.title || 'Unknown Position'}</span>
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📧 {candidate.email}</span>
                        <span>📱 {candidate.phone}</span>
                        <span>⭐ {candidate.rating}/5</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-sm text-gray-500">Skills:</span>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Select
                      value={candidate.status}
                      onValueChange={(value) => handleStatusChange(candidate.id, value)}
                    >
                      <SelectTrigger className="w-40 border-gray-300 focus:border-red-500 focus:ring-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                        <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="offer_extended">Offer Extended</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Schedule Interviews Dialog Component
function ScheduleInterviewsDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    candidateId: '',
    jobId: '',
    interviewType: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: '60',
    location: '',
    interviewers: '',
    notes: ''
  });

  const candidates = mockData.candidates.filter(c => ['screening', 'interview_scheduled'].includes(c.status));
  const jobs = mockData.jobPostings.filter(job => job.status === 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically schedule the interview via API
    toast.success('Interview scheduled successfully!');
    onClose();
    // Reset form
    setFormData({
      candidateId: '',
      jobId: '',
      interviewType: '',
      scheduledDate: '',
      scheduledTime: '',
      duration: '60',
      location: '',
      interviewers: '',
      notes: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-red-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Schedule Interview</DialogTitle>
          <DialogDescription className="text-gray-600">
            Arrange an interview for a candidate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="candidateId" className="text-sm font-semibold text-gray-700">Candidate *</Label>
              <Select value={formData.candidateId} onValueChange={(value) => setFormData({ ...formData, candidateId: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select candidate" />
                </SelectTrigger>
                <SelectContent>
                  {candidates.map((candidate) => (
                    <SelectItem key={candidate.id} value={candidate.id}>
                      {candidate.firstName} {candidate.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobId" className="text-sm font-semibold text-gray-700">Job Position *</Label>
              <Select value={formData.jobId} onValueChange={(value) => setFormData({ ...formData, jobId: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select job position" />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interviewType" className="text-sm font-semibold text-gray-700">Interview Type *</Label>
              <Select value={formData.interviewType} onValueChange={(value) => setFormData({ ...formData, interviewType: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone_screening">Phone Screening</SelectItem>
                  <SelectItem value="technical_interview">Technical Interview</SelectItem>
                  <SelectItem value="behavioral_interview">Behavioral Interview</SelectItem>
                  <SelectItem value="final_interview">Final Interview</SelectItem>
                  <SelectItem value="panel_interview">Panel Interview</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-semibold text-gray-700">Duration (minutes)</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledDate" className="text-sm font-semibold text-gray-700">Date *</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                required
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledTime" className="text-sm font-semibold text-gray-700">Time *</Label>
              <Input
                id="scheduledTime"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                required
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-semibold text-gray-700">Location *</Label>
            <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
              <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conference Room A">Conference Room A</SelectItem>
                <SelectItem value="Conference Room B">Conference Room B</SelectItem>
                <SelectItem value="Zoom Meeting">Zoom Meeting</SelectItem>
                <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                <SelectItem value="Phone Call">Phone Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewers" className="text-sm font-semibold text-gray-700">Interviewers *</Label>
            <Input
              id="interviewers"
              value={formData.interviewers}
              onChange={(e) => setFormData({ ...formData, interviewers: e.target.value })}
              placeholder="e.g. John Doe, Jane Smith"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes or instructions..."
              rows={3}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
              Schedule Interview
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}