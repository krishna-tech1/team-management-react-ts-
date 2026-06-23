import { useEffect, useState } from 'react'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Employee } from '@/data/employees'
import { Task } from '@/data/tasks'
import { employees } from '@/data/employees'
import { toast } from '@/components/ui/Toast'

export function TaskModal({ task, open, onClose, onSave, onDelete }: {
  task: Task | null
  open: boolean
  onClose: () => void
  onSave: (t: Task) => void
  onDelete: (id: string) => void
}) {
  const [form, setForm] = useState<Task | null>(task)
  const [loading, setLoading] = useState(false)

  useEffect(() => setForm(task), [task])
  if (!open || !form) return null

  function update<K extends keyof Task>(k: K, v: Task[K]) {
    setForm((f) => f ? ({ ...f, [k]: v }) : f)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <Card className="z-10 w-full max-w-3xl">
        <CardHeader title={`${form.id} — ${form.name}`} />
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-ink-muted">Name</label>
              <input className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink" value={form.name} onChange={(e) => update('name', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-muted">Client</label>
              <input className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink" value={form.client} onChange={(e) => update('client', e.target.value)} />
            </div>

            <div>
              <label className="text-xs font-semibold text-ink-muted">Status</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink" value={form.status} onChange={(e) => update('status', e.target.value as any)}>
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Waiting For Client</option>
                <option>Completed</option>
                <option>Overdue</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink-muted">Assigned To</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink" value={form.employee ?? ''} onChange={(e) => update('employee', e.target.value || null)}>
                <option value="">Unassigned</option>
                {employees.map((em: Employee) => <option key={em.id} value={em.name}>{em.name} — {em.designation}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink-muted">Priority</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink" value={form.priority} onChange={(e) => update('priority', e.target.value as any)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink-muted">Due Date</label>
              <input type="date" value={form.dueDate ? new Date(form.dueDate).toISOString().slice(0,10) : ''} onChange={(e) => update('dueDate', e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink" />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-ink-muted">Notes</label>
              <textarea
                value={form.shortNote}
                onChange={(e) => update('shortNote', e.target.value)}
                placeholder="Add notes, task context, or updates here..."
                className="mt-1 w-full min-h-[250px] max-h-[400px] resize-none overflow-y-auto rounded-lg border border-line bg-surface px-3 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/30 leading-relaxed"
                style={{ scrollBehavior: 'smooth' }}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Close</Button>
            <Button variant="outline" onClick={() => { if (form) { setLoading(true); setTimeout(()=>{ onDelete(form.id); setLoading(false); onClose(); toast({type:'success', message:'Task deleted'}) }, 600) } }} loading={loading}>Delete</Button>
            <Button variant="primary" loading={loading} onClick={() => { if (form) { setLoading(true); setTimeout(()=>{ onSave(form); setLoading(false); toast({type:'success', message:'Task saved'}) }, 600) } }}>Save</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TaskModal
