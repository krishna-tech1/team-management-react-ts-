import { Routes, Route, Navigate } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { adminNav, leadNav } from "@/config/nav"
import Login from "@/pages/Login"
import Dashboard from "@/pages/admin/Dashboard"
import AdminClients from "@/pages/admin/Clients"
import AdminClientDetail from "@/pages/admin/ClientDetail"
import AdminOnboardClient from "@/pages/admin/OnboardClient"
import AdminEmployees from "@/pages/admin/Employees"
import AdminTasks from "@/pages/admin/Tasks"
import AdminEmployeeDetail from "@/pages/admin/EmployeeDetail"
import AdminTaskDetail from "@/pages/admin/TaskDetail"
import AdminIncentives from "@/pages/admin/Incentives"
import AdminAnalytics from "@/pages/admin/Analytics"
import AdminAuditLog from "@/pages/admin/AuditLog"
import AdminClientAllocation from "@/pages/admin/ClientAllocation"
import ManageAllocation from "@/pages/admin/ManageAllocation"
import AdminEmployeeOnboard from "@/pages/admin/EmployeeOnboarding"
import React, { Suspense, lazy } from 'react'
const AdminEmployeeEdit = lazy(() => import('@/pages/admin/EditEmployeePage'))
import AdminCreateTask from "@/pages/admin/CreateTask"
import CreateAccount from "@/pages/CreateAccount"

function AdminLayout() {
  return <AppLayout navItems={adminNav} userName="Super Admin" userRole="Global Access" />
}

function LeadLayout() {
  return (
    <AppLayout
      navItems={leadNav}
      userName="Vikram Sharma"
      userRole="Team Lead"
      searchPlaceholder="Search your team, clients, or tasks..."
    />
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateAccount />} />

      
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/incentives" element={<AdminLayout />}>
        <Route index element={<AdminIncentives />} />
      </Route>

      <Route path="/employees" element={<AdminLayout />}>
        <Route index element={<AdminEmployees />} />
        <Route path="add" element={<AdminEmployeeOnboard />} />
        <Route path=":id" element={<AdminEmployeeDetail />} />
        <Route path=":id/edit" element={<Suspense fallback={<div />}><AdminEmployeeEdit /></Suspense>} />
      </Route>

      <Route path="/clients" element={<AdminLayout />}>
        <Route index element={<AdminClients />} />
        <Route path="add" element={<AdminOnboardClient />} />
        <Route path=":id" element={<AdminClientDetail />} />
      </Route>

      <Route path="/client-allocation" element={<AdminLayout />}>
        <Route index element={<AdminClientAllocation />} />
      </Route>

      <Route path="/clients/:id/manage-allocation" element={<AdminLayout />}>
        <Route index element={<ManageAllocation />} />
      </Route>

      <Route path="/tasks" element={<AdminLayout />}>
        <Route index element={<AdminTasks />} />
        <Route path="create" element={<AdminCreateTask />} />
        <Route path=":id" element={<AdminTaskDetail />} />
      </Route>

      <Route path="/admin/tasks/create" element={<AdminLayout />}>
        <Route index element={<AdminCreateTask />} />
      </Route>

      

      <Route path="/audit-log" element={<AdminLayout />}>
        <Route index element={<AdminAuditLog />} />
      </Route>

      

      <Route path="/analytics" element={<AdminLayout />}>
        <Route index element={<AdminAnalytics />} />
      </Route>

      <Route path="/admin/analytics" element={<AdminLayout />}>
        <Route index element={<AdminAnalytics />} />
      </Route>

      <Route path="/lead" element={<LeadLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
