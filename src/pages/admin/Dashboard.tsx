import { useNavigate } from "react-router-dom"
import { UserPlus, UserRoundPlus, ListPlus } from "lucide-react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/Button"
import { KpiCard } from "@/components/ui/KpiCard"
import { DashboardGrid } from '@/components/ui/ResponsiveGrid'
import { Card, CardHeader } from "@/components/ui/Card"
import { Avatar } from "@/components/ui/Avatar"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { ProgressBar } from "@/components/ui/ProgressBar"
import { DonutChart } from "@/components/ui/DonutChart"
import { employees } from "@/data/employees"
import { clients } from "@/data/clients"
import { tasks } from "@/data/tasks"

export default function Dashboard() {
  const navigate = useNavigate()
  const ranking = employees.filter((e) => e.score >= 90).sort((a, b) => a.rank - b.rank)
  const totalClients = clients.length
  const activeStaff = employees.filter((e) => e.status === 'Active').length
  const openTasks = tasks.filter((t) => t.status !== 'Completed').length

  return (
    <div>
      <PageHeader
        title="System Performance"
        actions={
          <>
            <Button variant="outline" icon={<UserPlus className="h-4 w-4" />} onClick={() => navigate("/clients/add")}>
              Add Client
            </Button>
            <Button variant="outline" icon={<UserRoundPlus className="h-4 w-4" />} onClick={() => navigate("/employees/add")}>
              Add Employee
            </Button>
            <Button variant="primary" icon={<ListPlus className="h-4 w-4" />} onClick={() => navigate("/tasks/create")}>
              Assign Task
            </Button>
          </>
        }
      />

      <DashboardGrid>
        <KpiCard label="Total Clients" value={String(totalClients)} meta="↗ 12%" metaTone="success" sub="Active across 14 jurisdictions" accent="gold" />
        <KpiCard label="Active Staff" value={String(activeStaff)} meta="Stable" metaTone="neutral" sub="12 new hires this quarter" accent="info" />
        <KpiCard label="Open Tasks" value={String(openTasks)} meta="High Load" metaTone="danger" sub="84% meeting SLA deadlines" accent="warning" />
      </DashboardGrid>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Employee Ranking (Efficiency)"
            action={
              <button onClick={() => navigate("/employees")} className="text-sm font-semibold text-gold-dark hover:underline">
                View Full Table
              </button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-line bg-surface-muted text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Team</th>
                  <th className="px-6 py-3">Tasks Closed</th>
                  <th className="px-6 py-3">Efficiency</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => navigate(`/admin/employees/${emp.id}`)}
                    className="cursor-pointer border-b border-line-soft transition-colors last:border-0 hover:bg-surface-muted"
                  >
                    <td className="px-6 py-3.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-soft text-xs font-bold text-gold-dark">
                        {emp.rank}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={emp.name} src={emp.avatar} size={34} />
                        <span className="text-sm font-bold text-ink">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-ink-soft">{emp.team}</td>
                    <td className="px-6 py-3.5 text-sm font-bold text-ink">{emp.tasksClosed}</td>
                    <td className="px-6 py-3.5">
                      <div className="w-28">
                        <ProgressBar value={emp.score} />
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status="ELITE" tone="success" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Task Completion" />
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-amber-tint p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">Avg In Progress</p>
                <p className="mt-1 text-2xl font-extrabold text-ink">
                  42 <span className="text-xs font-medium text-ink-muted">/ day</span>
                </p>
              </div>
              <div className="rounded-lg bg-amber-tint p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">Avg Pending</p>
                <p className="mt-1 text-2xl font-extrabold text-ink">
                  18 <span className="text-xs font-medium text-ink-muted">/ day</span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <DonutChart percent={65} label="Closed" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Completed
                </span>
                <span className="text-sm font-bold text-ink">621</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="h-2.5 w-2.5 rounded-full bg-line" /> In Progress
                </span>
                <span className="text-sm font-bold text-ink">335</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
