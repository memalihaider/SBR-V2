// =======================
// CORE SYSTEM TYPES
// =======================

export type UserRole = 
  | 'super_admin'
  | 'sales_manager'
  | 'sales_rep'
  | 'inventory_manager'
  | 'project_manager'
  | 'finance_manager'
  | 'client'
  | 'vendor';

export type Permission = 
  | 'read'
  | 'write'
  | 'approve'
  | 'admin'
  | 'delete';

export type Module = 
  | 'dashboard'
  | 'users'
  | 'crm'
  | 'inventory'
  | 'projects'
  | 'finance'
  | 'quotations'
  | 'reports'
  | 'settings';

export interface RolePermissions {
  role: UserRole;
  modules: Record<Module, Permission[]>;
  dataScope: 'global' | 'department' | 'assigned' | 'own';
}

// =======================
// USER & AUTHENTICATION
// =======================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  permissions: RolePermissions;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// =======================
// CRM & SALES TYPES
// =======================

export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal_sent'
  | 'negotiating'
  | 'closed_won'
  | 'closed_lost';

export type CustomerType = 
  | 'enterprise'
  | 'sme'
  | 'government'
  | 'individual';

export interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  estimatedValue: number;
  probability: number;
  expectedCloseDate: Date;
  assignedTo: string; // User ID
  notes: string[];
  activities: Activity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  companyName: string;
  customerType: CustomerType;
  industry: string;
  website?: string;
  taxId?: string;
  
  // Primary Contact
  primaryContact: {
    name: string;
    email: string;
    phone: string;
    designation: string;
  };
  
  // Address
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  
  // Business Info
  creditLimit: number;
  paymentTerms: string;
  isActive: boolean;
  
  // Relationships
  assignedSalesRep: string; // User ID
  projects: string[]; // Project IDs
  totalRevenue: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  subject: string;
  description: string;
  relatedTo: {
    type: 'lead' | 'customer' | 'project';
    id: string;
  };
  createdBy: string; // User ID
  scheduledAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

// =======================
// INVENTORY & PRODUCTS
// =======================

export type ProductCategory = 
  | 'semiconductors'
  | 'test_equipment'
  | 'components'
  | 'cables'
  | 'tools'
  | 'accessories';

export type ProductStatus = 
  | 'active'
  | 'discontinued'
  | 'out_of_stock'
  | 'low_stock';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  manufacturer: string;
  modelNumber?: string;
  
  // Pricing
  costPrice: number;
  sellingPrice: number;
  margin: number;
  
  // Inventory
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderPoint: number;
  
  // Specifications
  specifications: Record<string, string>;
  images: string[];
  datasheet?: string;
  
  // Status
  status: ProductStatus;
  isSerialTracked: boolean;
  isBatchTracked: boolean;
  
  // Vendor Info
  preferredVendor: string; // Vendor ID
  alternateVendors: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryTransaction {
  id: string;
  type: 'purchase' | 'sale' | 'adjustment' | 'transfer';
  productId: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  
  // References
  referenceType?: 'purchase_order' | 'sales_order' | 'project';
  referenceId?: string;
  
  // Location
  fromWarehouse?: string;
  toWarehouse?: string;
  
  // Tracking
  serialNumbers?: string[];
  batchNumber?: string;
  
  createdBy: string; // User ID
  createdAt: Date;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  manager: string; // User ID
  capacity: number;
  isActive: boolean;
  createdAt: Date;
}

// =======================
// VENDOR & PROCUREMENT
// =======================

export type VendorStatus = 'active' | 'inactive' | 'blacklisted';

export interface Vendor {
  id: string;
  companyName: string;
  vendorCode: string;
  
  // Contact Information
  primaryContact: {
    name: string;
    email: string;
    phone: string;
    designation: string;
  };
  
  // Address
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  
  // Business Details
  taxId: string;
  paymentTerms: string;
  creditDays: number;
  
  // Performance Metrics
  rating: number; // 1-5
  onTimeDeliveryRate: number;
  qualityRating: number;
  
  // Categories
  productCategories: ProductCategory[];
  
  status: VendorStatus;
  isActive: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

export type PurchaseOrderStatus = 
  | 'draft'
  | 'sent'
  | 'acknowledged'
  | 'partially_received'
  | 'completed'
  | 'cancelled';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  status: PurchaseOrderStatus;
  
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    deliveryDate: Date;
  }>;
  
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  
  deliveryAddress: string;
  expectedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  
  createdBy: string; // User ID
  approvedBy?: string; // User ID
  
  createdAt: Date;
  updatedAt: Date;
}

// =======================
// PROJECTS & QUOTATIONS
// =======================

export type ProjectStatus = 
  | 'planning'
  | 'active'
  | 'on_hold'
  | 'completed'
  | 'cancelled';

export type ProjectType = 
  | 'installation'
  | 'maintenance'
  | 'consulting'
  | 'supply_only'
  | 'turnkey';

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  
  // Client Information
  customerId: string;
  
  // Timeline
  startDate: Date;
  endDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  
  // Financial
  budgetAmount: number;
  actualCost: number;
  profitMargin: number;
  
  // Team
  projectManager: string; // User ID
  teamMembers: string[]; // User IDs
  
  // Progress
  completionPercentage: number;
  milestones: Milestone[];
  
  // Documents
  documents: ProjectDocument[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  completedDate?: Date;
  isCompleted: boolean;
  deliverables: string[];
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'contract' | 'specification' | 'drawing' | 'report' | 'other';
  url: string;
  uploadedBy: string; // User ID
  uploadedAt: Date;
}

export type QuotationStatus = 
  | 'draft'
  | 'sent'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'expired';

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerId: string;
  status: QuotationStatus;
  
  // Items
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    totalPrice: number;
  }>;
  
  // Pricing
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  
  // Terms
  validUntil: Date;
  paymentTerms: string;
  deliveryTerms: string;
  
  // Workflow
  createdBy: string; // User ID
  approvedBy?: string; // User ID
  
  // Conversion
  convertedToProject?: string; // Project ID
  
  createdAt: Date;
  updatedAt: Date;
}

// =======================
// FINANCE & ACCOUNTING
// =======================

export type InvoiceStatus = 
  | 'draft'
  | 'sent'
  | 'paid'
  | 'partially_paid'
  | 'overdue'
  | 'cancelled';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  projectId?: string;
  status: InvoiceStatus;
  
  // Items
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  
  // Amounts
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  
  // Dates
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod: 'cash' | 'check' | 'bank_transfer' | 'credit_card';
  referenceNumber?: string;
  paymentDate: Date;
  
  createdBy: string; // User ID
  createdAt: Date;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  expenseDate: Date;
  
  // References
  projectId?: string;
  vendorId?: string;
  
  // Approval
  approvedBy?: string; // User ID
  approvedAt?: Date;
  
  // Receipt
  receiptUrl?: string;
  
  createdBy: string; // User ID
  createdAt: Date;
}

// =======================
// ANALYTICS & REPORTING
// =======================

export interface DashboardMetrics {
  // Sales Metrics
  totalRevenue: number;
  monthlyRevenue: number;
  salesGrowth: number;
  activePipeline: number;
  
  // Project Metrics
  activeProjects: number;
  completedProjects: number;
  projectsOnTime: number;
  averageProjectValue: number;
  
  // Inventory Metrics
  totalInventoryValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  inventoryTurnover: number;
  
  // Financial Metrics
  outstandingInvoices: number;
  overdueInvoices: number;
  totalReceivables: number;
  profitMargin: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    fill?: boolean;
  }>;
}

// =======================
// NOTIFICATIONS & SYSTEM
// =======================

export type NotificationType = 
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  userId: string;
  isRead: boolean;
  
  // Action
  actionUrl?: string;
  actionText?: string;
  
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  action: string;
  module: Module;
  recordId?: string;
  userId: string;
  userRole: UserRole;
  
  // Changes
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  
  ipAddress?: string;
  userAgent?: string;
  
  createdAt: Date;
}

// =======================
// API & PAGINATION
// =======================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface FilterOptions {
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  assignedTo?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// =======================
// FORM SCHEMAS
// =======================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  validation?: any; // Zod schema
}

export interface DynamicForm {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitUrl: string;
  method: 'POST' | 'PUT' | 'PATCH';
}

// =======================
// UI & COMPONENT PROPS
// =======================

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string;
}

export interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  badge?: string | number;
}

// =======================
// PORTAL SPECIFIC TYPES
// =======================

export interface PortalConfig {
  name: string;
  path: string;
  allowedRoles: UserRole[];
  defaultRoute: string;
  navigation: NavigationItem[];
  theme?: {
    primaryColor: string;
    logoUrl: string;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  requiredPermissions?: Permission[];
  badge?: string | number;
}

// Export all as default for easier importing
export default {
  // Types are already exported above
};
