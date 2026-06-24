import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardHeader } from "@/components/ui/Card"
import { getTask } from "@/data/tasks"

export default function AdminTaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const t = id ? getTask(id) : undefined

  if (!t) {
    return (
      <div className="text-center text-ink-soft">
        <p>Task not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/tasks')}>Back to Tasks</Button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => navigate('/tasks')} className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to Tasks
      </button>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">{t.name}</h1>
          <p className="mt-1 text-sm text-ink-muted">{t.shortNote}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" disabled>Edit</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Task Details" />
          <div className="px-6 pb-6">
            <p className="text-sm text-ink-muted">Client: <span className="font-semibold text-ink">{t.client}</span></p>
            <p className="mt-2 text-sm text-ink-muted">Assigned to: <span className="font-semibold text-ink">{t.employee ?? 'Unassigned'}</span></p>
            <p className="mt-2 text-sm text-ink-muted">Priority: <span className="font-semibold text-ink">{t.priority}</span></p>
            <p className="mt-2 text-sm text-ink-muted">Due Date: <span className="font-semibold text-ink">{t.dueDate}</span></p>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Attachments</p>
              <div className="mt-2 space-y-2">
                {t.attachments.map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gold-dark" />
                    <span className="text-sm text-ink">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Progress" />
          <div className="px-6 pb-6">
            <div className="text-2xl font-extrabold text-ink">{t.progress}%</div>
            <div className="mt-3 h-3 w-full rounded-full bg-line-soft">
              <div className="h-3 rounded-full bg-amber" style={{ width: `${t.progress}%` }} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
