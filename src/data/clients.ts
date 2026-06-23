export type ClientStatus = "Active" | "On Hold" | "Overdue"
export type ServiceType = "GST + MCA" | "Audit" | "MCA Only" | "GST"

export interface ClientDocument {
  name: string
  type: string
  version: string
  updated: string
  size: string
}

export interface Client {
  id: string
  company: string
  serviceType: ServiceType
  contactPerson: string
  contactMobile: string
  contactEmail: string
  gstin: string
  pan: string
  assignedTL: string
  assignedTLInitials: string
  status: ClientStatus
  address: string
  employees: string[]
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  overdueTasks: number
  documents: ClientDocument[]
}

const documents: ClientDocument[] = [
  { name: "GSTR-3B Return — May 2026", type: "GST Return", version: "v3", updated: "10 Jun 2026", size: "1.2 MB" },
  { name: "Board Resolution FY25", type: "MCA", version: "v1", updated: "28 May 2026", size: "640 KB" },
  { name: "PAN & Incorporation Certificate", type: "KYC", version: "v2", updated: "14 Apr 2026", size: "3.1 MB" },
  { name: "Statutory Audit Report", type: "Audit", version: "v1", updated: "02 Apr 2026", size: "2.8 MB" },
]

export const clients: Client[] = [
  {
    id: "CL-2001",
    company: "Acme Global Solutions Pvt Ltd",
    serviceType: "GST + MCA",
    contactPerson: "Rajesh Kumar",
    contactMobile: "+91 98765 43210",
    contactEmail: "rajesh@acmeglobal.in",
    gstin: "27AAACG1234A1Z5",
    pan: "AAACG1234A",
    assignedTL: "Vikram Sharma",
    assignedTLInitials: "VS",
    status: "Active",
    address: "Plot 14, MIDC Industrial Area, Andheri East, Mumbai 400093",
    employees: ["Sarah Jenkins", "Anita Mishra", "Vikram Patel"],
    totalTasks: 48,
    completedTasks: 39,
    pendingTasks: 7,
    overdueTasks: 2,
    documents,
  },
  {
    id: "CL-2002",
    company: "NexGen Tech Innovations",
    serviceType: "Audit",
    contactPerson: "Anita Desai",
    contactMobile: "+91 91234 56789",
    contactEmail: "anita@nexgentech.com",
    gstin: "07AABCN9876B1Z2",
    pan: "AABCN9876B",
    assignedTL: "Priyanka L.",
    assignedTLInitials: "PL",
    status: "On Hold",
    address: "5th Floor, Cyber Towers, HITEC City, Hyderabad 500081",
    employees: ["Mohit Verma", "Priya Nair"],
    totalTasks: 22,
    completedTasks: 14,
    pendingTasks: 6,
    overdueTasks: 2,
    documents,
  },
  {
    id: "CL-2003",
    company: "Blue Sky Logistics Group",
    serviceType: "MCA Only",
    contactPerson: "Suresh Mehta",
    contactMobile: "+91 99887 76655",
    contactEmail: "suresh@blueskylog.in",
    gstin: "27BBBCD5432C1Z9",
    pan: "BBBCD5432C",
    assignedTL: "Arjun Kapoor",
    assignedTLInitials: "AK",
    status: "Overdue",
    address: "Warehouse 7, Bhiwandi Logistics Park, Thane 421302",
    employees: ["David Kumar", "Rajesh Khanna"],
    totalTasks: 31,
    completedTasks: 18,
    pendingTasks: 8,
    overdueTasks: 5,
    documents,
  },
  {
    id: "CL-2004",
    company: "Everest Retail Chain Ltd",
    serviceType: "GST",
    contactPerson: "Meera Shah",
    contactMobile: "+91 94444 33333",
    contactEmail: "meera@everestretail.com",
    gstin: "27CCCDD1111D1Z3",
    pan: "CCCDD1111D",
    assignedTL: "Vikram Sharma",
    assignedTLInitials: "VS",
    status: "Active",
    address: "Retail House, FC Road, Shivaji Nagar, Pune 411005",
    employees: ["Sarah Jenkins", "Vikram Patel"],
    totalTasks: 40,
    completedTasks: 35,
    pendingTasks: 4,
    overdueTasks: 1,
    documents,
  },
  {
    id: "CL-2005",
    company: "Sunrise Pharma Industries",
    serviceType: "GST + MCA",
    contactPerson: "Deepak Joshi",
    contactMobile: "+91 90123 45678",
    contactEmail: "deepak@sunrisepharma.in",
    gstin: "27DDDDE2222E1Z7",
    pan: "DDDDE2222E",
    assignedTL: "Priyanka L.",
    assignedTLInitials: "PL",
    status: "Active",
    address: "Industrial Estate, Baddi, Solan 173205",
    employees: ["Anita Mishra", "Sonia Lamba"],
    totalTasks: 36,
    completedTasks: 28,
    pendingTasks: 6,
    overdueTasks: 2,
    documents,
  },
]

export const clientStats = {
  total: "1,284",
  complianceRate: "98.4%",
  pendingFilings: 42,
  auditPipeline: "₹ 4.2M",
}

export function getClient(id: string) {
  return clients.find((c) => c.id === id)
}
