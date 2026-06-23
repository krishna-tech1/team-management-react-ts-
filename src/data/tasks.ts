export type TaskStatus =
  | "Not Started"
  | "In Progress"
  | "Waiting For Client"
  | "Review"
  | "Completed"
  | "Overdue"

export type TaskPriority = "Low" | "Medium" | "High" | "Critical"

export interface WorkLog {
  date: string
  employee: string
  note: string
  hours: string
}

export interface TimelineEvent {
  label: string
  date: string
  done: boolean
}

export interface Task {
  id: string
  name: string
  shortNote: string
  client: string
  employee: string | null
  priority: TaskPriority
  progress: number
  status: TaskStatus
  dueDate: string
  attachments: string[]
  timeline: TimelineEvent[]
  workLogs: WorkLog[]
  statusHistory: { status: TaskStatus; date: string }[]
}

const timeline: TimelineEvent[] = [
  { label: "Task created", date: "01 Jun 2026", done: true },
  { label: "Documents collected", date: "03 Jun 2026", done: true },
  { label: "Draft prepared", date: "06 Jun 2026", done: true },
  { label: "Client review", date: "Pending", done: false },
  { label: "Filed & closed", date: "Pending", done: false },
]

const workLogs: WorkLog[] = [
  { date: "06 Jun 2026", employee: "Sarah Jenkins", note: "Reconciled input tax credit ledgers", hours: "3h 20m" },
  { date: "04 Jun 2026", employee: "Sarah Jenkins", note: "Collected invoices from client portal", hours: "2h 10m" },
  { date: "03 Jun 2026", employee: "Anita Mishra", note: "Initial data validation", hours: "1h 45m" },
]

const statusHistory: { status: TaskStatus; date: string }[] = [
  { status: "Not Started", date: "01 Jun 2026" },
  { status: "In Progress", date: "03 Jun 2026" },
  { status: "Waiting For Client", date: "06 Jun 2026" },
]

export const tasks: Task[] = [
  {
    id: "TSK-5001",
    name: "GSTR-3B Filing — May 2026",
    shortNote: "Monthly summary return for outward supplies",
    client: "Acme Global Solutions Pvt Ltd",
    employee: "Sarah Jenkins",
    priority: "High",
    progress: 70,
    status: "In Progress",
    dueDate: "20 Jun 2026",
    attachments: ["GSTR3B-draft.pdf", "ITC-reco.xlsx"],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5002",
    name: "Annual ROC Filing (AOC-4)",
    shortNote: "Financial statements filing with MCA",
    client: "Blue Sky Logistics Group",
    employee: "David Kumar",
    priority: "Critical",
    progress: 45,
    status: "Overdue",
    dueDate: "08 Jun 2026",
    attachments: ["Balance-sheet.pdf"],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5003",
    name: "Statutory Audit — FY 2025-26",
    shortNote: "Year-end statutory audit engagement",
    client: "NexGen Tech Innovations",
    employee: "Mohit Verma",
    priority: "Medium",
    progress: 30,
    status: "Waiting For Client",
    dueDate: "30 Jun 2026",
    attachments: ["Audit-plan.docx"],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5004",
    name: "GSTR-1 Reconciliation",
    shortNote: "Outward supplies invoice matching",
    client: "Everest Retail Chain Ltd",
    employee: "Vikram Patel",
    priority: "Medium",
    progress: 100,
    status: "Completed",
    dueDate: "11 Jun 2026",
    attachments: ["GSTR1-final.pdf"],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5005",
    name: "Board Meeting Minutes Drafting",
    shortNote: "Q1 board meeting documentation",
    client: "Sunrise Pharma Industries",
    employee: null,
    priority: "Low",
    progress: 0,
    status: "Not Started",
    dueDate: "25 Jun 2026",
    attachments: [],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5008",
    name: "TDS Return Filing (Form 26Q)",
    shortNote: "Quarterly TDS return filing for non-salary payments",
    client: "Acme Global Solutions Pvt Ltd",
    employee: "Anita Mishra",
    priority: "Medium",
    progress: 0,
    status: "Not Started",
    dueDate: "30 Jun 2026",
    attachments: [],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5009",
    name: "Income Tax Assessment Reply",
    shortNote: "Response to notice under Section 143(2)",
    client: "Everest Retail Chain Ltd",
    employee: null,
    priority: "High",
    progress: 0,
    status: "Not Started",
    dueDate: "05 Jul 2026",
    attachments: [],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5010",
    name: "PF & ESI Monthly Contribution",
    shortNote: "Monthly filing and payment of PF and ESI contributions",
    client: "NexGen Tech Innovations",
    employee: "David Kumar",
    priority: "Low",
    progress: 0,
    status: "Not Started",
    dueDate: "15 Jul 2026",
    attachments: [],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5011",
    name: "GST Annual Return (GSTR-9)",
    shortNote: "Filing of GST annual return for FY 2025-26",
    client: "Blue Sky Logistics Group",
    employee: "Sarah Jenkins",
    priority: "Critical",
    progress: 0,
    status: "Not Started",
    dueDate: "31 Dec 2026",
    attachments: [],
    timeline,
    workLogs,
    statusHistory,
  },
  {
    id: "TSK-5007",
    name: "DIR-3 KYC Compliance",
    shortNote: "Director KYC annual compliance",
    client: "Blue Sky Logistics Group",
    employee: "Rajesh Khanna",
    priority: "Medium",
    progress: 85,
    status: "In Progress",
    dueDate: "22 Jun 2026",
    attachments: ["DIR3-form.pdf"],
    timeline,
    workLogs,
    statusHistory,
  },
]

export function getTask(id: string) {
  return tasks.find((t) => t.id === id)
}
