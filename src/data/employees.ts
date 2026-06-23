export type EmployeeStatus = "Active" | "Inactive"

export interface AttendanceRecord {
  date: string
  checkIn: string
  checkOut: string
  hours: string
  location: string
}

export interface Employee {
  id: string
  name: string
  avatar?: string
  mobile: string
  email: string
  designation: string
  team: string
  status: EmployeeStatus
  score: number
  rank: number
  tasksClosed: number
  joiningDate: string
  address: string
  incentiveEarned: number
  assignedTasks: number
  completedTasks: number
  pendingTasks: number
  attendance: AttendanceRecord[]
}

const attendance: AttendanceRecord[] = [
  { date: "12 Jun 2026", checkIn: "09:02 AM", checkOut: "06:14 PM", hours: "9h 12m", location: "Mumbai HQ" },
  { date: "11 Jun 2026", checkIn: "09:10 AM", checkOut: "06:05 PM", hours: "8h 55m", location: "Mumbai HQ" },
  { date: "10 Jun 2026", checkIn: "08:58 AM", checkOut: "06:30 PM", hours: "9h 32m", location: "Remote" },
  { date: "09 Jun 2026", checkIn: "09:21 AM", checkOut: "05:58 PM", hours: "8h 37m", location: "Mumbai HQ" },
  { date: "08 Jun 2026", checkIn: "09:05 AM", checkOut: "06:18 PM", hours: "9h 13m", location: "Pune Branch" },
]

export const employees: Employee[] = [
  {
    id: "EMP-1042",
    name: "Sarah Jenkins",
    mobile: "+91 98200 11234",
    email: "sarah.jenkins@complianceos.com",
    designation: "Senior GST Consultant",
    team: "GST Compliance",
    status: "Active",
    score: 98,
    rank: 1,
    tasksClosed: 142,
    joiningDate: "14 Mar 2021",
    address: "B-204, Hiranandani Gardens, Powai, Mumbai 400076",
    incentiveEarned: 84500,
    assignedTasks: 156,
    completedTasks: 142,
    pendingTasks: 14,
    attendance,
  },
  {
    id: "EMP-1088",
    name: "David Kumar",
    mobile: "+91 98201 55678",
    email: "david.kumar@complianceos.com",
    designation: "MCA Filings Lead",
    team: "MCA Filings",
    status: "Active",
    score: 96,
    rank: 2,
    tasksClosed: 128,
    joiningDate: "02 Aug 2020",
    address: "12, Koregaon Park, Pune 411001",
    incentiveEarned: 78200,
    assignedTasks: 140,
    completedTasks: 128,
    pendingTasks: 12,
    attendance,
  },
  {
    id: "EMP-1103",
    name: "Anita Mishra",
    mobile: "+91 99300 22119",
    email: "anita.mishra@complianceos.com",
    designation: "GST Compliance Analyst",
    team: "GST Compliance",
    status: "Active",
    score: 94,
    rank: 3,
    tasksClosed: 121,
    joiningDate: "19 Jan 2022",
    address: "501, Andheri West, Mumbai 400058",
    incentiveEarned: 71400,
    assignedTasks: 133,
    completedTasks: 121,
    pendingTasks: 12,
    attendance,
  },
  {
    id: "EMP-1127",
    name: "Rajesh Khanna",
    mobile: "+91 98330 76654",
    email: "rajesh.khanna@complianceos.com",
    designation: "MCA Filings Specialist",
    team: "MCA Filings",
    status: "Active",
    score: 92,
    rank: 4,
    tasksClosed: 118,
    joiningDate: "28 Nov 2021",
    address: "A-9, Vasant Vihar, New Delhi 110057",
    incentiveEarned: 68900,
    assignedTasks: 130,
    completedTasks: 118,
    pendingTasks: 12,
    attendance,
  },
  {
    id: "EMP-1156",
    name: "Vikram Patel",
    mobile: "+91 90040 33215",
    email: "vikram.patel@complianceos.com",
    designation: "GST Senior Associate",
    team: "GST Compliance",
    status: "Active",
    score: 91,
    rank: 5,
    tasksClosed: 112,
    joiningDate: "05 May 2022",
    address: "78, Satellite, Ahmedabad 380015",
    incentiveEarned: 64300,
    assignedTasks: 124,
    completedTasks: 112,
    pendingTasks: 12,
    attendance,
  },
  {
    id: "EMP-1170",
    name: "Sonia Lamba",
    mobile: "+91 98712 99008",
    email: "sonia.lamba@complianceos.com",
    designation: "MCA Compliance Analyst",
    team: "MCA Filings",
    status: "Active",
    score: 90,
    rank: 6,
    tasksClosed: 109,
    joiningDate: "11 Sep 2022",
    address: "22, Salt Lake Sector V, Kolkata 700091",
    incentiveEarned: 61200,
    assignedTasks: 120,
    completedTasks: 109,
    pendingTasks: 11,
    attendance,
  },
  {
    id: "EMP-1201",
    name: "Mohit Verma",
    mobile: "+91 99100 44521",
    email: "mohit.verma@complianceos.com",
    designation: "Audit Associate",
    team: "Audit",
    status: "Active",
    score: 86,
    rank: 7,
    tasksClosed: 94,
    joiningDate: "17 Feb 2023",
    address: "45, Indiranagar, Bengaluru 560038",
    incentiveEarned: 48700,
    assignedTasks: 110,
    completedTasks: 94,
    pendingTasks: 16,
    attendance,
  },
  {
    id: "EMP-1233",
    name: "Priya Nair",
    mobile: "+91 90870 11233",
    email: "priya.nair@complianceos.com",
    designation: "GST Associate",
    team: "GST Compliance",
    status: "Active",
    score: 83,
    rank: 8,
    tasksClosed: 88,
    joiningDate: "30 Jun 2023",
    address: "9, Marine Drive, Kochi 682031",
    incentiveEarned: 42100,
    assignedTasks: 104,
    completedTasks: 88,
    pendingTasks: 16,
    attendance,
  },
  {
    id: "EMP-1259",
    name: "Karan Mehta",
    mobile: "+91 98191 65540",
    email: "karan.mehta@complianceos.com",
    designation: "Junior Analyst",
    team: "MCA Filings",
    status: "Inactive",
    score: 71,
    rank: 9,
    tasksClosed: 52,
    joiningDate: "12 Dec 2023",
    address: "33, Banjara Hills, Hyderabad 500034",
    incentiveEarned: 18400,
    assignedTasks: 70,
    completedTasks: 52,
    pendingTasks: 18,
    attendance,
  },
]

export function getEmployee(id: string) {
  return employees.find((e) => e.id === id)
}
