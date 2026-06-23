import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardHeader } from "@/components/ui/Card"
import { Avatar } from "@/components/ui/Avatar"
import { getEmployee, employees, type Employee } from "@/data/employees"
import EditEmployeeModal from "@/components/ui/EditEmployeeModal"
import { tasks } from "@/data/tasks"

export default function AdminEmployeeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const initial = id ? getEmployee(id) : undefined
  const [emp, setEmp] = useState<Employee | undefined>(initial)
  const [editing, setEditing] = useState(false)

  if (!emp) {
    return (
      <div className="text-center text-ink-soft">
        <p>Employee not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/employees')}>Back to Employees</Button>
      </div>
    )
  }


  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-wide text-ink-muted">employee details</div>

      <div className="mb-6 rounded-md border border-line bg-gradient-to-r from-amber-50 to-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={emp.name} src={emp.avatar} size={72} />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-ink">{emp.name}</h1>
                <span className="rounded-md bg-line-soft px-2 py-1 text-xs font-semibold text-ink-soft">EMP-ID: {emp.id}</span>
              </div>
              <p className="text-sm text-ink-muted mt-1">{emp.designation}</p>
              <div className="mt-3">
                <Button variant="primary" onClick={() => navigate(`/employees/${emp.id}/edit`)} style={{ backgroundColor: 'var(--color-amber)', borderColor: 'var(--color-amber)' }}>Edit Details</Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-ink-muted mr-2">Status Toggle</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={emp.status === 'Active'} readOnly className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-emerald-400 peer-focus:ring-2 peer-focus:ring-amber-300"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Overview - render the screenshot-style cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3">
          <CardHeader title="Personal Information" />
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Full Legal Name</p>
                <p className="text-sm text-ink mt-1">{emp.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Email Address</p>
                <p className="text-sm text-ink mt-1">{emp.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Phone Number</p>
                <p className="text-sm text-ink mt-1">{emp.mobile}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Date of Birth</p>
                <p className="text-sm text-ink mt-1">—</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Permanent Address</p>
                <p className="text-sm text-ink mt-1">{emp.address}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Professional Details" />
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Current Designation</p>
                <p className="text-sm text-ink mt-1">{emp.designation}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Date of Joining</p>
                <p className="text-sm text-ink mt-1">{emp.joiningDate}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Annual CTC</p>
                <p className="text-sm text-ink mt-1">—</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Reporting Manager</p>
                <p className="text-sm text-ink mt-1">—</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Assigned Department</p>
                <div className="mt-1">
                  <span className="rounded-md bg-line-soft px-2 py-1 text-xs font-semibold text-ink-soft">{emp.team}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <div className="px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">TASK COMPLETION</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                {(() => {
                  const pct = emp.assignedTasks ? Math.round((emp.completedTasks / emp.assignedTasks) * 1000) / 10 : 0
                  return <div className="text-4xl font-extrabold text-ink">{pct}%</div>
                })()}
                <div className="text-xs text-success mt-1">▲ 2.1%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader title="Recent Task Assignments" extra={<div className="text-sm text-amber-900">View All Tasks</div>} />
        <div className="px-6 pb-6">
          {/* Mobile cards for recent tasks */}
          <div className="space-y-3 sm:hidden">
            {tasks.filter(t => t.employee === emp.name).slice(0,5).map((t) => (
              <div key={t.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-ink-muted">Client: {t.client}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{t.dueDate}</div>
                    <div className="text-xs text-ink-muted">{t.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
            <thead>
              <tr className="border-y border-line bg-surface-muted text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <th className="px-6 py-3">Task ID</th>
                <th className="px-6 py-3">Client / Entity</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.filter(t => t.employee === emp.name).slice(0,5).map((t) => (
                <tr key={t.id} className="border-b border-line-soft transition-colors last:border-0 hover:bg-surface-muted">
                  <td className="px-6 py-4 text-sm font-semibold text-ink">{t.id}</td>
                  <td className="px-6 py-4 text-sm text-ink-soft">{t.client}</td>
                  <td className="px-6 py-4 text-sm text-ink-soft">{t.name}</td>
                  <td className="px-6 py-4 text-sm text-ink-soft">{t.dueDate}</td>
                  <td className="px-6 py-4 text-sm"><span className="rounded-md px-2 py-1 text-xs font-semibold" style={{ backgroundColor: t.status === 'Completed' ? 'rgba(16,185,129,0.12)' : t.status === 'In Progress' ? 'rgba(250,204,21,0.12)' : 'rgba(99,102,241,0.06)', color: t.status === 'Completed' ? 'var(--color-success)' : t.status === 'In Progress' ? 'var(--color-warning)' : 'var(--color-ink)'}}>{t.status}</span></td>
                  <td className="px-6 py-4 text-right"><button className="flex h-8 w-8 items-center justify-center rounded-md text-ink-soft hover:bg-line-soft">👁️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>

      {editing && emp && (
        <EditEmployeeModal
          employee={emp}
          open={editing}
          onClose={() => setEditing(false)}
          onSave={(updated) => {
            const idx = employees.findIndex((e) => e.id === updated.id)
            if (idx !== -1) employees[idx] = { ...employees[idx], ...updated }
            setEmp(updated)
            setEditing(false)
          }}
        />
      )}
    </div>
  )
}
