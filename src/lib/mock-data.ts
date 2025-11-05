import { faker } from '@faker-js/faker';
import { 
  Customer, Lead, Product, Project, Quotation, Invoice, 
  Vendor, PurchaseOrder, InventoryTransaction, Activity,
  CustomerType, LeadStatus, ProductCategory, ProjectStatus,
  QuotationStatus, InvoiceStatus, PurchaseOrderStatus,
  UserRole 
} from '@/types';

// Set seed for consistent data
faker.seed(12345);

// Generate Products (500+ items)
function generateProducts(): Product[] {
  const products: Product[] = [];
  const categories: ProductCategory[] = ['semiconductors', 'test_equipment', 'components', 'cables', 'tools', 'accessories'];
  const manufacturers = ['Intel', 'AMD', 'NVIDIA', 'Texas Instruments', 'Analog Devices', 'Keysight', 'Rohde & Schwarz', 'Fluke'];

  for (let i = 0; i < 500; i++) {
    const category = faker.helpers.arrayElement(categories);
    const manufacturer = faker.helpers.arrayElement(manufacturers);
    const costPrice = faker.number.float({ min: 10, max: 5000, fractionDigits: 2 });
    const margin = faker.number.float({ min: 0.2, max: 0.6, fractionDigits: 2 });
    const sellingPrice = costPrice * (1 + margin);
    
    products.push({
      id: `prod-${i + 1}`,
      sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
      name: `${manufacturer} ${faker.commerce.productName()}`,
      description: faker.commerce.productDescription(),
      category,
      manufacturer,
      modelNumber: faker.string.alphanumeric(10).toUpperCase(),
      costPrice,
      sellingPrice,
      margin,
      currentStock: faker.number.int({ min: 0, max: 1000 }),
      minStockLevel: faker.number.int({ min: 10, max: 50 }),
      maxStockLevel: faker.number.int({ min: 500, max: 1500 }),
      reorderPoint: faker.number.int({ min: 20, max: 100 }),
      specifications: {
        'Operating Voltage': `${faker.number.int({ min: 3, max: 24 })}V`,
        'Temperature Range': `-${faker.number.int({ min: 20, max: 40 })}°C to +${faker.number.int({ min: 60, max: 85 })}°C`,
        'Package': faker.helpers.arrayElement(['DIP', 'SMD', 'BGA', 'QFN']),
        'Datasheet': `${faker.internet.url()}/datasheet.pdf`
      },
      images: [faker.image.url()],
      datasheet: `${faker.internet.url()}/datasheet.pdf`,
      status: faker.helpers.arrayElement(['active', 'discontinued', 'out_of_stock', 'low_stock']),
      isSerialTracked: faker.datatype.boolean(),
      isBatchTracked: faker.datatype.boolean(),
      preferredVendor: `vendor-${faker.number.int({ min: 1, max: 30 })}`,
      alternateVendors: [`vendor-${faker.number.int({ min: 1, max: 30 })}`, `vendor-${faker.number.int({ min: 1, max: 30 })}`],
      createdAt: faker.date.past({ years: 2 }),
      updatedAt: faker.date.recent({ days: 30 })
    });
  }

  return products;
}

// Generate Customers (200+ items)
function generateCustomers(): Customer[] {
  const customers: Customer[] = [];
  const customerTypes: CustomerType[] = ['enterprise', 'sme', 'government', 'individual'];
  const industries = ['Manufacturing', 'Healthcare', 'Automotive', 'Aerospace', 'Telecommunications', 'Energy', 'Education'];

  for (let i = 0; i < 200; i++) {
    const customerType = faker.helpers.arrayElement(customerTypes);
    const industry = faker.helpers.arrayElement(industries);
    
    customers.push({
      id: `customer-${i + 1}`,
      companyName: faker.company.name(),
      customerType,
      industry,
      website: faker.internet.url(),
      taxId: faker.string.alphanumeric(10).toUpperCase(),
      primaryContact: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        designation: faker.person.jobTitle()
      },
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode()
      },
      creditLimit: faker.number.float({ min: 10000, max: 500000, fractionDigits: 2 }),
      paymentTerms: faker.helpers.arrayElement(['Net 30', 'Net 45', 'Net 60', '2/10 Net 30']),
      isActive: faker.datatype.boolean({ probability: 0.9 }),
      assignedSalesRep: `user-${faker.number.int({ min: 2, max: 3 })}`, // Sales reps
      projects: [],
      totalRevenue: faker.number.float({ min: 5000, max: 1000000, fractionDigits: 2 }),
      createdAt: faker.date.past({ years: 3 }),
      updatedAt: faker.date.recent({ days: 60 })
    });
  }

  return customers;
}

// Generate Leads (150+ items)
function generateLeads(): Lead[] {
  const leads: Lead[] = [];
  const leadStatuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'closed_won', 'closed_lost'];
  const sources = ['Website', 'Referral', 'Cold Call', 'Email Campaign', 'Trade Show', 'LinkedIn', 'Partner'];

  for (let i = 0; i < 150; i++) {
    const status = faker.helpers.arrayElement(leadStatuses);
    const source = faker.helpers.arrayElement(sources);
    const estimatedValue = faker.number.float({ min: 5000, max: 500000, fractionDigits: 2 });
    
    leads.push({
      id: `lead-${i + 1}`,
      companyName: faker.company.name(),
      contactPerson: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      status,
      source,
      estimatedValue,
      probability: faker.number.int({ min: 10, max: 95 }),
      expectedCloseDate: faker.date.future({ years: 1 }),
      assignedTo: `user-${faker.number.int({ min: 2, max: 3 })}`, // Sales reps
      notes: [
        faker.lorem.paragraph(),
        faker.lorem.paragraph()
      ],
      activities: [],
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent({ days: 7 })
    });
  }

  return leads;
}

// Generate Projects (50+ items)
function generateProjects(): Project[] {
  const projects: Project[] = [];
  const projectTypes: Project['type'][] = ['installation', 'maintenance', 'consulting', 'supply_only', 'turnkey'];
  const projectStatuses: ProjectStatus[] = ['planning', 'active', 'on_hold', 'completed', 'cancelled'];

  for (let i = 0; i < 50; i++) {
    const type = faker.helpers.arrayElement(projectTypes);
    const status = faker.helpers.arrayElement(projectStatuses);
    const startDate = faker.date.past({ years: 1 });
    const endDate = faker.date.future({ years: 1 });
    const budgetAmount = faker.number.float({ min: 25000, max: 2000000, fractionDigits: 2 });
    
    projects.push({
      id: `project-${i + 1}`,
      projectNumber: `PRJ-${faker.date.recent().getFullYear()}-${String(i + 1).padStart(4, '0')}`,
      name: `${faker.company.buzzPhrase()} ${faker.commerce.product()}`,
      description: faker.lorem.paragraphs(2),
      type,
      status,
      customerId: `customer-${faker.number.int({ min: 1, max: 200 })}`,
      startDate,
      endDate,
      actualStartDate: status !== 'planning' ? faker.date.between({ from: startDate, to: new Date() }) : undefined,
      actualEndDate: status === 'completed' ? faker.date.between({ from: startDate, to: endDate }) : undefined,
      budgetAmount,
      actualCost: faker.number.float({ min: budgetAmount * 0.7, max: budgetAmount * 1.2, fractionDigits: 2 }),
      profitMargin: faker.number.float({ min: 0.15, max: 0.35, fractionDigits: 2 }),
      projectManager: `user-${faker.number.int({ min: 5, max: 5 })}`, // Project manager
      teamMembers: [`user-${faker.number.int({ min: 2, max: 6 })}`],
      completionPercentage: faker.number.int({ min: 0, max: 100 }),
      milestones: [
        {
          id: `milestone-${i + 1}-1`,
          name: 'Project Kickoff',
          description: 'Initial project setup and team alignment',
          dueDate: faker.date.between({ from: startDate, to: endDate }),
          completedDate: status !== 'planning' ? faker.date.recent() : undefined,
          isCompleted: status !== 'planning',
          deliverables: ['Project Charter', 'Resource Plan']
        }
      ],
      documents: [
        {
          id: `doc-${i + 1}-1`,
          name: 'Project Contract',
          type: 'contract',
          url: faker.internet.url(),
          uploadedBy: `user-${faker.number.int({ min: 1, max: 8 })}`,
          uploadedAt: faker.date.recent()
        }
      ],
      createdAt: faker.date.past({ years: 2 }),
      updatedAt: faker.date.recent({ days: 14 })
    });
  }

  return projects;
}

// Export all mock data
export const mockData = {
  products: generateProducts(),
  customers: generateCustomers(),
  leads: generateLeads(),
  projects: generateProjects(),
  
  // Helper functions to get related data
  getCustomerById: (id: string) => mockData.customers.find(c => c.id === id),
  getLeadById: (id: string) => mockData.leads.find(l => l.id === id),
  getProductById: (id: string) => mockData.products.find(p => p.id === id),
  getProjectById: (id: string) => mockData.projects.find(p => p.id === id),
  
  // Filter functions
  getLeadsByAssignee: (userId: string) => mockData.leads.filter(l => l.assignedTo === userId),
  getCustomersByAssignee: (userId: string) => mockData.customers.filter(c => c.assignedSalesRep === userId),
  getProjectsByManager: (userId: string) => mockData.projects.filter(p => p.projectManager === userId),
  
  // Statistics
  getTotalRevenue: () => mockData.customers.reduce((sum, customer) => sum + customer.totalRevenue, 0),
  getActiveProjects: () => mockData.projects.filter(p => p.status === 'active').length,
  getLowStockProducts: () => mockData.products.filter(p => p.currentStock <= p.minStockLevel).length,
};

export default mockData;
