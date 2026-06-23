import type { TaskStatus } from "./tasks"

export interface AnalyticsRow {
  client: string
  taskName: string
  shortNote: string
  employee: string
  progress: number
  status: TaskStatus
}

export const analyticsRows: AnalyticsRow[] = [
  {
    client: "Acme Global Solutions Pvt Ltd",
    taskName: "GSTR-3B Filing — May 2026",
    shortNote: "Monthly summary return for outward supplies",
    employee: "Sarah Jenkins",
    progress: 70,
    status: "In Progress",
  },
  {
    client: "Blue Sky Logistics Group",
    taskName: "Annual ROC Filing (AOC-4)",
    shortNote: "Financial statements filing with MCA",
    employee: "David Kumar",
    progress: 45,
    status: "Overdue",
  },
  {
    client: "NexGen Tech Innovations",
    taskName: "Statutory Audit — FY 2025-26",
    shortNote: "Year-end statutory audit engagement",
    employee: "Mohit Verma",
    progress: 30,
    status: "Waiting For Client",
  },
  {
    client: "Everest Retail Chain Ltd",
    taskName: "GSTR-1 Reconciliation",
    shortNote: "Outward supplies invoice matching",
    employee: "Vikram Patel",
    progress: 100,
    status: "Completed",
  },
  {
    client: "Sunrise Pharma Industries",
    taskName: "Board Meeting Minutes Drafting",
    shortNote: "Q1 board meeting documentation",
    employee: "Anita Mishra",
    progress: 55,
    status: "In Progress",
  },
  {
    client: "Blue Sky Logistics Group",
    taskName: "DIR-3 KYC Compliance",
    shortNote: "Director KYC annual compliance",
    employee: "Rajesh Khanna",
    progress: 85,
    status: "In Progress",
  },
  {
    client: "Acme Global Solutions Pvt Ltd",
    taskName: "TDS Return (Form 26Q)",
    shortNote: "Quarterly TDS return on non-salary payments",
    employee: "Sonia Lamba",
    progress: 0,
    status: "Not Started",
  },
  {
    client: "Sunrise Pharma Industries",
    taskName: "GST Annual Return (GSTR-9)",
    shortNote: "Annual consolidated GST return",
    employee: "Priya Nair",
    progress: 100,
    status: "Completed",
  },
]
