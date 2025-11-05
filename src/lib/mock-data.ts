import { faker } from '@faker-js/faker';
import { 
  Customer, Lead, Product, Project, Quotation, Invoice, 
  Vendor, PurchaseOrder, InventoryTransaction, Activity,
  CustomerType, LeadStatus, ProductCategory, ProjectStatus,
  QuotationStatus, InvoiceStatus, PurchaseOrderStatus,
  UserRole, CompanySettings, Expense, Attendance, Employee,
  AttendanceStatus, LeaveRequest, LeaveType, LeaveStatus,
  Department, Payroll, PerformanceReview,
  JobPosting, Candidate, JobApplication, JobStatus, JobPriority, CandidateStatus
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
function generateQuotations(): Quotation[] {
  const quotations: Quotation[] = [];
  const quotationStatuses: QuotationStatus[] = ['draft', 'sent', 'under_review', 'approved', 'rejected', 'expired'];

  for (let i = 0; i < 100; i++) {
    const status = faker.helpers.arrayElement(quotationStatuses);
    const customerId = `customer-${faker.number.int({ min: 1, max: 200 })}`;
    const items = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      productId: `prod-${faker.number.int({ min: 1, max: 500 })}`,
      quantity: faker.number.int({ min: 1, max: 50 }),
      unitPrice: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
      discount: faker.number.float({ min: 0, max: 0.1, fractionDigits: 2 }),
      totalPrice: 0 // Will be calculated
    }));

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * (1 - item.discount)), 0);
    const discountAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * item.discount), 0);
    const taxAmount = subtotal * 0.08; // 8% tax
    const totalAmount = subtotal + taxAmount;

    // Update totalPrice for each item
    items.forEach(item => {
      item.totalPrice = item.quantity * item.unitPrice * (1 - item.discount);
    });

    quotations.push({
      id: `quotation-${i + 1}`,
      quotationNumber: `QTN-${faker.date.recent().getFullYear()}-${String(i + 1).padStart(4, '0')}`,
      customerId,
      status,
      items,
      subtotal,
      discountAmount,
      taxAmount,
      totalAmount,
      validUntil: faker.date.future({ years: 1 }),
      paymentTerms: faker.helpers.arrayElement(['Net 30', 'Net 45', 'Net 60', '2/10 Net 30']),
      deliveryTerms: faker.lorem.sentence(),
      createdBy: `user-${faker.number.int({ min: 2, max: 3 })}`,
      approvedBy: status === 'approved' ? `user-${faker.number.int({ min: 4, max: 5 })}` : undefined,
      convertedToProject: status === 'approved' && faker.datatype.boolean() ? `project-${faker.number.int({ min: 1, max: 50 })}` : undefined,
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent({ days: 30 })
    });
  }

  return quotations;
}

// Generate Invoices (80+ items)
function generateInvoices(): Invoice[] {
  const invoices: Invoice[] = [];
  const invoiceStatuses: InvoiceStatus[] = ['draft', 'sent', 'paid', 'partially_paid', 'overdue', 'cancelled'];

  for (let i = 0; i < 80; i++) {
    const status = faker.helpers.arrayElement(invoiceStatuses);
    const customerId = `customer-${faker.number.int({ min: 1, max: 200 })}`;
    const projectId = faker.datatype.boolean() ? `project-${faker.number.int({ min: 1, max: 50 })}` : undefined;
    
    const items = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      description: faker.commerce.productDescription(),
      quantity: faker.number.int({ min: 1, max: 20 }),
      unitPrice: faker.number.float({ min: 500, max: 10000, fractionDigits: 2 }),
      totalPrice: 0 // Will be calculated
    }));

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxAmount = subtotal * 0.08; // 8% tax
    const totalAmount = subtotal + taxAmount;
    const paidAmount = status === 'paid' ? totalAmount : 
                      status === 'partially_paid' ? faker.number.float({ min: totalAmount * 0.3, max: totalAmount * 0.8, fractionDigits: 2 }) : 0;
    const remainingAmount = totalAmount - paidAmount;

    // Update totalPrice for each item
    items.forEach(item => {
      item.totalPrice = item.quantity * item.unitPrice;
    });

    const issueDate = faker.date.past({ years: 1 });
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 30); // 30 days payment term

    invoices.push({
      id: `invoice-${i + 1}`,
      invoiceNumber: `INV-${faker.date.recent().getFullYear()}-${String(i + 1).padStart(4, '0')}`,
      customerId,
      projectId,
      status,
      items,
      subtotal,
      taxAmount,
      totalAmount,
      paidAmount,
      remainingAmount,
      issueDate,
      dueDate,
      paidDate: status === 'paid' ? faker.date.between({ from: issueDate, to: new Date() }) : undefined,
      createdBy: `user-${faker.number.int({ min: 2, max: 3 })}`,
      createdAt: issueDate,
      updatedAt: faker.date.recent({ days: 7 })
    });
  }

  return invoices;
}

// Generate Expenses (100+ items)
function generateExpenses(): Expense[] {
  const expenses: Expense[] = [];
  const categories = ['Office Supplies', 'Travel', 'Software', 'Marketing', 'Utilities', 'Equipment', 'Professional Services', 'Training', 'Entertainment', 'Miscellaneous'];
  const vendors = ['Office Depot', 'Delta Airlines', 'Adobe Inc.', 'Google LLC', 'Verizon', 'Apple Store', 'IKEA Business', 'Marriott Hotels', 'Amazon Business', 'Microsoft', 'Deloitte', 'LinkedIn Learning'];
  const paymentMethods = ['Company Card', 'Corporate Account', 'Bank Transfer', 'Purchase Order', 'Auto-Pay', 'Check'];
  const statuses = ['approved', 'pending', 'rejected'];

  for (let i = 0; i < 100; i++) {
    const category = faker.helpers.arrayElement(categories);
    const vendor = faker.helpers.arrayElement(vendors);
    const amount = faker.number.float({ min: 25, max: 5000, fractionDigits: 2 });
    const expenseDate = faker.date.recent({ days: 90 });
    const status = faker.helpers.arrayElement(statuses);
    
    expenses.push({
      id: `expense-${i + 1}`,
      category,
      description: faker.commerce.productDescription(),
      amount,
      expenseDate,
      projectId: faker.datatype.boolean({ probability: 0.3 }) ? `project-${faker.number.int({ min: 1, max: 50 })}` : undefined,
      vendorId: faker.datatype.boolean({ probability: 0.7 }) ? `vendor-${faker.number.int({ min: 1, max: 30 })}` : undefined,
      approvedBy: status === 'approved' ? `user-${faker.number.int({ min: 4, max: 5 })}` : undefined,
      approvedAt: status === 'approved' ? faker.date.between({ from: expenseDate, to: new Date() }) : undefined,
      receiptUrl: faker.datatype.boolean({ probability: 0.8 }) ? faker.internet.url() : undefined,
      createdBy: `user-${faker.number.int({ min: 1, max: 8 })}`,
      createdAt: expenseDate,
    });
  }

  return expenses;
}

// Generate Employees (50+ items)
function generateEmployees(): Employee[] {
  const employees: Employee[] = [];
  const departments = ['Engineering', 'Sales', 'HR', 'Finance', 'Operations', 'Marketing', 'IT', 'Support'];
  const positions = ['Manager', 'Senior Developer', 'Developer', 'Analyst', 'Coordinator', 'Specialist', 'Assistant'];

  for (let i = 0; i < 50; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const department = faker.helpers.arrayElement(departments);
    const position = faker.helpers.arrayElement(positions);
    
    employees.push({
      id: `employee-${i + 1}`,
      employeeId: `EMP${String(i + 1).padStart(4, '0')}`,
      userId: `user-${i + 1}`,
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      department,
      position,
      managerId: i > 5 ? `user-${faker.number.int({ min: 1, max: 5 })}` : undefined,
      hireDate: faker.date.past({ years: 5 }),
      salary: faker.number.float({ min: 30000, max: 150000, fractionDigits: 2 }),
      isActive: faker.datatype.boolean({ probability: 0.9 }),
      avatar: faker.image.avatar(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode()
      },
      emergencyContact: {
        name: faker.person.fullName(),
        relationship: faker.helpers.arrayElement(['Spouse', 'Parent', 'Sibling', 'Friend']),
        phone: faker.phone.number()
      },
      createdAt: faker.date.past({ years: 5 }),
      updatedAt: faker.date.recent({ days: 30 })
    });
  }

  return employees;
}

// Generate Attendance Records (1000+ items for last 30 days)
function generateAttendance(): Attendance[] {
  const attendance: Attendance[] = [];
  const statuses: AttendanceStatus[] = ['present', 'absent', 'late', 'half_day', 'on_leave', 'holiday', 'weekend'];
  const employees = generateEmployees(); // Get employees for reference

  // Generate attendance for last 30 days
  const today = new Date();
  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() - dayOffset);
    
    // Skip weekends for most records, but include some weekend work
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    employees.forEach(employee => {
      if (!employee.isActive) return; // Skip inactive employees
      
      let status: AttendanceStatus;
      let checkInTime: Date | undefined;
      let checkOutTime: Date | undefined;
      let hoursWorked = 0;
      
      if (isWeekend) {
        status = faker.helpers.weightedArrayElement([
          { weight: 8, value: 'weekend' as AttendanceStatus },
          { weight: 2, value: 'present' as AttendanceStatus }
        ]);
      } else {
        status = faker.helpers.weightedArrayElement([
          { weight: 75, value: 'present' as AttendanceStatus },
          { weight: 10, value: 'late' as AttendanceStatus },
          { weight: 8, value: 'absent' as AttendanceStatus },
          { weight: 5, value: 'half_day' as AttendanceStatus },
          { weight: 2, value: 'on_leave' as AttendanceStatus }
        ]);
      }
      
      if (status === 'present' || status === 'late' || status === 'half_day') {
        // Generate check-in time
        const baseHour = status === 'late' ? 9.5 : 8.5; // 9:30 AM for late, 8:30 AM for on-time
        const checkInHour = baseHour + faker.number.float({ min: -0.5, max: 0.5, fractionDigits: 2 });
        checkInTime = new Date(date);
        checkInTime.setHours(Math.floor(checkInHour), (checkInHour % 1) * 60);
        
        // Generate check-out time (typically 8-9 hours later)
        const workHours = status === 'half_day' ? 4 : faker.number.float({ min: 7.5, max: 9.5, fractionDigits: 2 });
        checkOutTime = new Date(checkInTime.getTime() + workHours * 60 * 60 * 1000);
        hoursWorked = workHours;
      }
      
      attendance.push({
        id: `attendance-${employee.id}-${date.toISOString().split('T')[0]}`,
        employeeId: employee.id,
        date,
        checkInTime,
        checkOutTime,
        status,
        hoursWorked,
        breakDuration: status === 'present' || status === 'late' ? faker.number.int({ min: 30, max: 90 }) : 0,
        location: faker.datatype.boolean() ? 'Office' : 'Remote',
        ipAddress: faker.internet.ip(),
        notes: faker.datatype.boolean({ probability: 0.1 }) ? faker.lorem.sentence() : undefined,
        approvedBy: faker.datatype.boolean({ probability: 0.8 }) ? `user-${faker.number.int({ min: 4, max: 5 })}` : undefined,
        createdAt: date,
        updatedAt: faker.date.between({ from: date, to: new Date() })
      });
    });
  }

  return attendance;
}

// Generate Departments (8 items)
function generateDepartments(): Department[] {
  const departments: Department[] = [];
  const deptData = [
    { name: 'Engineering', code: 'ENG', managerId: 'user-1' },
    { name: 'Sales', code: 'SAL', managerId: 'user-2' },
    { name: 'Human Resources', code: 'HR', managerId: 'user-3' },
    { name: 'Finance', code: 'FIN', managerId: 'user-4' },
    { name: 'Operations', code: 'OPS', managerId: 'user-5' },
    { name: 'Marketing', code: 'MKT', managerId: 'user-6' },
    { name: 'IT Support', code: 'ITS', managerId: 'user-7' },
    { name: 'Customer Support', code: 'SUP', managerId: 'user-8' }
  ];

  deptData.forEach((dept, index) => {
    departments.push({
      id: `department-${index + 1}`,
      name: dept.name,
      code: dept.code,
      description: `${dept.name} department responsible for ${dept.name.toLowerCase()} operations`,
      managerId: dept.managerId,
      budget: faker.number.float({ min: 50000, max: 500000, fractionDigits: 2 }),
      employeeCount: faker.number.int({ min: 5, max: 15 }),
      isActive: true,
      createdAt: faker.date.past({ years: 3 }),
      updatedAt: faker.date.recent({ days: 30 })
    });
  });

  return departments;
}

// Generate Payroll Records (100+ items)
function generatePayrolls(): Payroll[] {
  const payrolls: Payroll[] = [];
  const employees = generateEmployees(); // Get employees for reference

  // Generate payroll for last 6 months
  const today = new Date();
  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const periodStart = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1);
    const periodEnd = new Date(today.getFullYear(), today.getMonth() - monthOffset + 1, 0);

    employees.filter(e => e.isActive).forEach(employee => {
      const baseSalary = employee.salary;
      const monthlySalary = baseSalary / 12;

      // Generate allowances (housing, transport, etc.)
      const allowances = [
        { type: 'Housing Allowance', amount: monthlySalary * 0.15 },
        { type: 'Transport Allowance', amount: monthlySalary * 0.1 },
        { type: 'Medical Allowance', amount: monthlySalary * 0.05 },
      ];

      // Generate deductions (tax, insurance, etc.)
      const deductions = [
        { type: 'Income Tax', amount: monthlySalary * 0.12 },
        { type: 'Social Security', amount: monthlySalary * 0.08 },
        { type: 'Health Insurance', amount: monthlySalary * 0.03 },
      ];

      const totalAllowances = allowances.reduce((sum, a) => sum + a.amount, 0);
      const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
      const grossPay = monthlySalary + totalAllowances;
      const netPay = grossPay - totalDeductions;

      payrolls.push({
        id: `payroll-${employee.id}-${periodStart.toISOString().slice(0, 7)}`,
        employeeId: employee.id,
        period: {
          startDate: periodStart,
          endDate: periodEnd,
        },
        basicSalary: monthlySalary,
        allowances,
        deductions,
        grossPay,
        netPay,
        taxAmount: deductions.find(d => d.type === 'Income Tax')?.amount || 0,
        paymentDate: monthOffset === 0 ? undefined : new Date(periodStart.getFullYear(), periodStart.getMonth() + 1, 15),
        paymentMethod: faker.helpers.arrayElement(['Bank Transfer', 'Check', 'Direct Deposit']),
        status: monthOffset === 0 ? 'pending' : monthOffset === 1 ? 'processed' : 'paid',
        createdBy: `user-${faker.number.int({ min: 4, max: 5 })}`,
        createdAt: periodStart,
        updatedAt: faker.date.between({ from: periodStart, to: new Date() })
      });
    });
  }

  return payrolls;
}

// Generate Job Postings (20+ items)
function generateJobPostings(): JobPosting[] {
  const jobPostings: JobPosting[] = [];
  const departments = ['Engineering', 'Sales', 'HR', 'Finance', 'Operations', 'Marketing', 'IT Support', 'Customer Support'];
  const employmentTypes: JobPosting['employmentType'][] = ['full_time', 'part_time', 'contract', 'internship'];
  const experienceLevels: JobPosting['experienceLevel'][] = ['entry', 'mid', 'senior', 'executive'];
  const statuses: JobStatus[] = ['active', 'paused', 'closed', 'filled'];
  const priorities: JobPriority[] = ['low', 'medium', 'high', 'urgent'];

  const jobTitles = [
    'Software Developer', 'Senior Software Developer', 'Sales Representative', 'Marketing Specialist',
    'HR Coordinator', 'Financial Analyst', 'Operations Manager', 'IT Support Specialist',
    'Customer Service Representative', 'Project Manager', 'Data Analyst', 'UX Designer',
    'DevOps Engineer', 'Business Analyst', 'Account Manager', 'Content Writer'
  ];

  for (let i = 0; i < 20; i++) {
    const department = faker.helpers.arrayElement(departments);
    const title = faker.helpers.arrayElement(jobTitles);
    const postedDate = faker.date.recent({ days: 60 });
    const deadline = faker.date.future({ years: 1 });

    jobPostings.push({
      id: `job-${i + 1}`,
      title: `${faker.helpers.arrayElement(['Senior', 'Junior', '', 'Lead'])} ${title}`.trim(),
      department,
      location: faker.helpers.arrayElement(['Remote', 'On-site', 'Hybrid']),
      employmentType: faker.helpers.arrayElement(employmentTypes),
      experienceLevel: faker.helpers.arrayElement(experienceLevels),
      salaryRange: {
        min: faker.number.int({ min: 30000, max: 80000 }),
        max: faker.number.int({ min: 80000, max: 200000 }),
        currency: 'USD'
      },
      description: faker.lorem.paragraphs(2),
      requirements: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => faker.lorem.sentence()),
      responsibilities: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => faker.lorem.sentence()),
      benefits: ['Health Insurance', '401(k)', 'Paid Time Off', 'Professional Development', 'Flexible Hours'],
      skills: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => faker.lorem.words(2)),
      status: faker.helpers.arrayElement(statuses),
      priority: faker.helpers.arrayElement(priorities),
      postedBy: `user-${faker.number.int({ min: 1, max: 8 })}`,
      postedDate,
      applicationDeadline: faker.datatype.boolean() ? deadline : undefined,
      applicationsCount: faker.number.int({ min: 0, max: 50 }),
      viewsCount: faker.number.int({ min: 10, max: 200 }),
      createdAt: postedDate,
      updatedAt: faker.date.between({ from: postedDate, to: new Date() })
    });
  }

  return jobPostings;
}

// Generate Candidates (100+ items)
function generateCandidates(): Candidate[] {
  const candidates: Candidate[] = [];
  const statuses: CandidateStatus[] = ['new', 'screening', 'interview_scheduled', 'interviewed', 'technical_review', 'final_interview', 'offer_extended', 'hired', 'rejected'];
  const sources = ['website', 'referral', 'linkedin', 'indeed', 'other'];

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const appliedDate = faker.date.recent({ days: 90 });

    candidates.push({
      id: `candidate-${i + 1}`,
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      resumeUrl: faker.datatype.boolean({ probability: 0.8 }) ? faker.internet.url() : undefined,
      coverLetter: faker.datatype.boolean({ probability: 0.6 }) ? faker.lorem.paragraphs(2) : undefined,
      portfolioUrl: faker.datatype.boolean({ probability: 0.4 }) ? faker.internet.url() : undefined,
      linkedinUrl: faker.datatype.boolean({ probability: 0.7 }) ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : undefined,
      currentPosition: faker.person.jobTitle(),
      currentCompany: faker.company.name(),
      experienceYears: faker.number.int({ min: 0, max: 15 }),
      education: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
        degree: faker.helpers.arrayElement(['Bachelor of Science', 'Master of Science', 'Bachelor of Arts', 'MBA', 'PhD']),
        institution: faker.company.name() + ' University',
        graduationYear: faker.number.int({ min: 2000, max: 2024 }),
        gpa: faker.datatype.boolean() ? faker.number.float({ min: 2.0, max: 4.0, fractionDigits: 2 }) : undefined
      })),
      skills: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => faker.lorem.words(2)),
      expectedSalary: faker.datatype.boolean({ probability: 0.6 }) ? {
        min: faker.number.int({ min: 40000, max: 100000 }),
        max: faker.number.int({ min: 100000, max: 250000 }),
        currency: 'USD'
      } : undefined,
      availabilityDate: faker.datatype.boolean() ? faker.date.future({ years: 1 }) : undefined,
      status: faker.helpers.arrayElement(statuses),
      appliedDate,
      lastActivityDate: faker.date.between({ from: appliedDate, to: new Date() }),
      notes: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => faker.lorem.sentence()),
      rating: faker.number.int({ min: 1, max: 5 }),
      source: faker.helpers.arrayElement(sources) as Candidate['source'],
      referredBy: faker.datatype.boolean({ probability: 0.2 }) ? `user-${faker.number.int({ min: 1, max: 8 })}` : undefined,
      createdAt: appliedDate,
      updatedAt: faker.date.between({ from: appliedDate, to: new Date() })
    });
  }

  return candidates;
}

// Generate Job Applications (150+ items)
function generateJobApplications(): JobApplication[] {
  const applications: JobApplication[] = [];
  const candidates = generateCandidates();
  const jobs = generateJobPostings();
  const statuses: CandidateStatus[] = ['new', 'screening', 'interview_scheduled', 'interviewed', 'technical_review', 'final_interview', 'offer_extended', 'hired', 'rejected'];

  for (let i = 0; i < 150; i++) {
    const candidate = faker.helpers.arrayElement(candidates);
    const job = faker.helpers.arrayElement(jobs);
    const appliedDate = faker.date.between({ from: job.postedDate, to: new Date() });
    const status = faker.helpers.arrayElement(statuses);

    applications.push({
      id: `application-${i + 1}`,
      jobId: job.id,
      candidateId: candidate.id,
      status,
      appliedDate,
      lastUpdated: faker.date.between({ from: appliedDate, to: new Date() }),
      currentStage: faker.helpers.arrayElement(['Application Review', 'Phone Screening', 'Technical Interview', 'Final Interview', 'Offer', 'Hired']),
      interviewRounds: [], // Will be populated separately
      offerDetails: status === 'offer_extended' ? {
        salary: faker.number.int({ min: 50000, max: 150000 }),
        startDate: faker.date.future({ years: 1 }),
        benefits: ['Health Insurance', '401(k)', 'Paid Time Off']
      } : undefined,
      rejectionReason: status === 'rejected' ? faker.lorem.sentence() : undefined,
      notes: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.lorem.sentence()),
      rating: faker.number.int({ min: 1, max: 5 }),
      createdAt: appliedDate,
      updatedAt: faker.date.between({ from: appliedDate, to: new Date() })
    });
  }

  return applications;
}

// Export all mock data
const generatedProducts = generateProducts();
const generatedCustomers = generateCustomers();
const generatedLeads = generateLeads();
const generatedProjects = generateProjects();
const generatedQuotations = generateQuotations();
const generatedInvoices = generateInvoices();
const generatedExpenses = generateExpenses();
const generatedEmployees = generateEmployees();
const generatedAttendance = generateAttendance();
const generatedDepartments = generateDepartments();
const generatedPayrolls = generatePayrolls();
const generatedJobPostings = generateJobPostings();
const generatedCandidates = generateCandidates();
const generatedJobApplications = generateJobApplications();

export const mockData = {
  products: generatedProducts,
  customers: generatedCustomers,
  leads: generatedLeads,
  projects: generatedProjects,
  quotations: generatedQuotations,
  invoices: generatedInvoices,
  expenses: generatedExpenses,
  employees: generatedEmployees,
  attendance: generatedAttendance,
  departments: generatedDepartments,
  payrolls: generatedPayrolls,
  jobPostings: generatedJobPostings,
  candidates: generatedCandidates,
  jobApplications: generatedJobApplications,
  companySettings: {
    companyName: 'Largify 360ERP',
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop&crop=center',
    tagline: 'Complete Business Management Solution',
    address: {
      street: '123 Business Avenue',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      zipCode: '10001'
    },
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@largify.com',
      website: 'https://largify.com'
    },
    taxInfo: {
      taxId: 'TAX123456789',
      registrationNumber: 'REG987654321'
    },
    invoiceSettings: {
      termsAndConditions: `1. Payment is due within 30 days of invoice date.
2. Late payments may incur a 1.5% monthly interest charge.
3. All goods remain property of Largify 360ERP until fully paid.
4. Any disputes must be raised within 7 days of invoice receipt.
5. This invoice is subject to our standard terms and conditions available at www.largify.com/terms.`,
      paymentTerms: 'Net 30 days from invoice date. Late payments subject to 1.5% monthly interest.',
      lateFeePolicy: 'Late payments will incur a 1.5% monthly interest charge.',
      defaultDueDays: 30,
      footerText: 'Thank you for your business!'
    },
    banking: {
      bankName: 'First National Bank',
      accountNumber: '****-****-****-1234',
      routingNumber: '123456789',
      swiftCode: 'FNBUS33'
    }
  },
  
  // Helper functions to get related data
  getCustomerById: (id: string) => generatedCustomers.find(c => c.id === id),
  getLeadById: (id: string) => generatedLeads.find(l => l.id === id),
  getProductById: (id: string) => generatedProducts.find(p => p.id === id),
  getProjectById: (id: string) => generatedProjects.find(p => p.id === id),
  getQuotationById: (id: string) => generatedQuotations.find(q => q.id === id),
  getExpenseById: (id: string) => generatedExpenses.find(e => e.id === id),
  getEmployeeById: (id: string) => generatedEmployees.find(e => e.id === id),
  getAttendanceByEmployee: (employeeId: string) => generatedAttendance.filter(a => a.employeeId === employeeId),
  getPayrollsByEmployee: (employeeId: string) => generatedPayrolls.filter(p => p.employeeId === employeeId),
  getPayrollsByPeriod: (startDate: Date, endDate: Date) => generatedPayrolls.filter(p => 
    p.period.startDate >= startDate && p.period.endDate <= endDate
  ),
  getDepartmentsByManager: (managerId: string) => generatedDepartments.filter(d => d.managerId === managerId),
  getExpensesByProject: (projectId: string) => generatedExpenses.filter(e => e.projectId === projectId),
  getExpensesByVendor: (vendorId: string) => generatedExpenses.filter(e => e.vendorId === vendorId),
  
  // Filter functions
  getLeadsByAssignee: (userId: string) => generatedLeads.filter(l => l.assignedTo === userId),
  getCustomersByAssignee: (userId: string) => generatedCustomers.filter(c => c.assignedSalesRep === userId),
  getProjectsByManager: (userId: string) => generatedProjects.filter(p => p.projectManager === userId),
  getQuotationsByCustomer: (customerId: string) => generatedQuotations.filter(q => q.customerId === customerId),
  getInvoicesByCustomer: (customerId: string) => generatedInvoices.filter(i => i.customerId === customerId),
  getProjectsByCustomer: (customerId: string) => generatedProjects.filter(p => p.customerId === customerId),
  
  // Statistics
  getTotalRevenue: () => generatedCustomers.reduce((sum, customer) => sum + customer.totalRevenue, 0),
  getActiveProjects: () => generatedProjects.filter(p => p.status === 'active').length,
  getLowStockProducts: () => generatedProducts.filter(p => p.currentStock <= p.minStockLevel).length,
};

export default mockData;
