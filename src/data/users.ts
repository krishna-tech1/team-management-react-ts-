export type UserRole = "Super Admin" | "Team Lead"
export type UserStatus = "Active" | "Inactive"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastLogin: string
}

export const adminUsers: AdminUser[] = [
  {
    id: "USR-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@complianceos.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "13 Jun 2026, 09:14 AM",
  },
  {
    id: "USR-002",
    name: "Vikram Sharma",
    email: "vikram.sharma@complianceos.com",
    role: "Team Lead",
    status: "Active",
    lastLogin: "13 Jun 2026, 08:42 AM",
  },
  {
    id: "USR-003",
    name: "Priyanka Lal",
    email: "priyanka.lal@complianceos.com",
    role: "Team Lead",
    status: "Active",
    lastLogin: "12 Jun 2026, 06:30 PM",
  },
  {
    id: "USR-004",
    name: "Arjun Kapoor",
    email: "arjun.kapoor@complianceos.com",
    role: "Team Lead",
    status: "Inactive",
    lastLogin: "28 May 2026, 11:02 AM",
  },
  {
    id: "USR-005",
    name: "Neha Gupta",
    email: "neha.gupta@complianceos.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "13 Jun 2026, 07:55 AM",
  },
]
