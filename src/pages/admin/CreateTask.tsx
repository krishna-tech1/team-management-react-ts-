import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { clients } from '@/data/clients'
import { employees } from '@/data/employees'
import { toast } from '@/components/ui/Toast'

export default function CreateTask() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'Low'|'Medium'|'High'|'Critical'>('Low')
  const [dueDate, setDueDate] = useState('')
  const [client, setClient] = useState('')
  const [assigned, setAssigned] = useState<string[]>([])

  const [errors, setErrors] = useState<Record<string,string>>({})

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!dirty) return
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  function validate() {
    const err: Record<string,string> = {}
    if (!name.trim()) err.name = 'Task title is required'
    if (!client) err.client = 'Select a client'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  function handleCreate() {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDirty(false)
      toast({ type: 'success', message: 'Task created' })
      navigate('/tasks')
    }, 900)
  }

  function handleSaveDraft() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDirty(false)
      toast({ type: 'success', message: 'Draft saved' })
    }, 700)
  }

  function handleCancel() {
    if (dirty && !confirm('You have unsaved changes. Discard and leave?')) return
    navigate('/tasks')
  }

  function toggleAssign(name: string) {
    setAssigned((prev) => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name])
    setDirty(true)
  }

  return (
    <div>
      <PageHeader title="Create New Compliance Task" subtitle="Initiate a systematic filing workflow for GST or MCA requirements." />
      <div className="mt-6 grid grid-cols-12 gap-6 px-6">
        <div className="col-span-8">
          <Card>
            <CardHeader title="Task Details" />
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-ink-muted">Task Title</label>
                  <input value={name} onChange={(e) => { setName(e.target.value); setDirty(true) }} placeholder="e.g., Q3 GST Filing for Zenith Tech" className="mt-1 h-12 w-full rounded-lg border border-line px-3 bg-white text-sm" />
                  {errors.name && <div className="text-rose-600 text-sm mt-1">{errors.name}</div>}
                </div>

                <div className="grid grid-cols-3 gap-3 items-end">
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-ink-muted">Task Type</label>
                    <select className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm" defaultValue="GST GSTR-1" onChange={() => setDirty(true)}>
                      <option>GST GSTR-1</option>
                      <option>GST GSTR-3B</option>
                      <option>ROC Filing</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink-muted">Priority</label>
                    <div className="mt-1 flex gap-2">
                      {(['Low','Medium','High','Critical'] as const).map(p => (
                        <button key={p} onClick={() => { setPriority(p); setDirty(true) }} className={`px-3 py-2 rounded-lg text-sm ${priority===p? 'bg-amber-500 text-white' : 'bg-surface'}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted">Description</label>
                  <textarea value={description} onChange={(e) => { setDescription(e.target.value); setDirty(true) }} className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-3 text-sm" rows={4} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="mt-6">
            <CardHeader title="Client & Compliance" />
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink-muted">Select Client</label>
                  <select value={client} onChange={(e) => { setClient(e.target.value); setDirty(true) }} className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm">
                    <option value="">Select a client...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
                  </select>
                  {errors.client && <div className="text-rose-600 text-sm mt-1">{errors.client}</div>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted">Filing Month / Period</label>
                  <input className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm" placeholder="mm/yyyy" onChange={() => setDirty(true)} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="mt-6">
            <CardHeader title="Initial Reference Documents" />
            <div className="px-6 pb-6">
              <div className="border border-dashed border-line rounded-lg p-6 text-center text-ink-muted">Drag and drop files here, or <button className="text-amber-600 underline" onClick={() => alert('Mock upload')}>browse</button><div className="text-xs text-ink-muted mt-2">PDF, XLSX, or ZIP (Max 25MB)</div></div>
            </div>
          </Card>
        </div>

        <div className="col-span-4 space-y-6">
          <Card>
            <CardHeader title="Assignment" />
            <div className="px-6 pb-6">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Team Lead</div>
                    <div className="text-xs text-ink-muted">Arjun Mehta — Senior Associate</div>
                  </div>
                  <Avatar name="Arjun Mehta" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted">Assign Employee</label>
                <div className="mt-2 space-y-2 max-h-40 overflow-auto">
                  {employees.map(emp => (
                    <label key={emp.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={assigned.includes(emp.name)} onChange={() => toggleAssign(emp.name)} />
                      <span>{emp.name} — <span className="text-ink-muted text-xs">{emp.designation}</span></span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Scheduling" />
            <div className="px-6 pb-6 space-y-3">
              <div>
                <label className="text-xs font-semibold text-ink-muted">Task Due Date</label>
                <input type="date" value={dueDate} onChange={(e) => { setDueDate(e.target.value); setDirty(true) }} className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-muted">Follow-up Reminder</label>
                <input type="date" onChange={() => setDirty(true)} className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" onChange={() => setDirty(true)} /> Notify via Email & SMS</label>
            </div>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
            <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
            <Button variant="primary" loading={loading} onClick={handleCreate}>Create Task</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

