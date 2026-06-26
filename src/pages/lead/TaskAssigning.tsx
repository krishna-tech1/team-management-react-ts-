import { useState } from 'react'
import { downloadCsv } from '@/lib/utils'
import { toast } from '@/components/ui/Toast'

interface UnassignedTask {
  id: number
  title: string
  client: string
  created: string
  priority: string
  priorityClass: string
  est: string
  icon: React.ReactNode
}

const initialUnassignedTasks: UnassignedTask[] = [
  {
    id: 1,
    title: 'Client Audit & Risk Assessment',
    client: 'Reliance Industries Ltd',
    created: '2h ago',
    priority: 'HIGH PRIORITY',
    priorityClass: 'priority-high',
    est: '8 Hours',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d2233" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Quarterly Tax Compliance Filing',
    client: 'TATA Group',
    created: '4h ago',
    priority: 'STANDARD',
    priorityClass: 'priority-standard',
    est: '4 Hours',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d2233" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Document Verification - New Onboarding',
    client: 'Adani Enterprises',
    created: '6h ago',
    priority: 'LOW PRIORITY',
    priorityClass: 'priority-low',
    est: '2 Hours',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d2233" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
]

const initialAvailability = [
  { name: 'Rahul Verma', avatar: 'RV', load: 85, color: '#e2566b' },
  { name: 'Sana K.', avatar: 'SK', load: 20, color: '#2bb673' },
  { name: 'David Chen', avatar: 'DC', load: 45, color: '#e0941a' },
  { name: 'Vikram Patel', avatar: 'VP', load: 60, color: '#e0941a' },
  { name: 'Sarah Jenkins', avatar: 'SJ', load: 10, color: '#2bb673' },
  { name: 'Anita Mishra', avatar: 'AM', load: 95, color: '#e2566b' },
]

const initialActivity = [
  { id: 1, text: 'Rahul Verma completed Audit Phase 1', time: 'Just now' },
  { id: 2, text: 'Sana K. started Quarterly Filing', time: '15 mins ago' },
]

export default function TaskAssigning() {
  const [tasksList, setTasksList] = useState<UnassignedTask[]>(initialUnassignedTasks)
  const [availList, setAvailList] = useState(initialAvailability)
  const [activityLogs, setActivityLogs] = useState(initialActivity)
  const [showAllAssignees, setShowAllAssignees] = useState(false)
  const [assigningTask, setAssigningTask] = useState<UnassignedTask | null>(null)

  const handleExportProgress = () => {
    const rows = tasksList.map((t) => ({
      ID: t.id,
      Title: t.title,
      Client: t.client,
      Priority: t.priority,
      'Estimated Time': t.est,
    }))
    downloadCsv(rows, 'task_progress_report.csv')
  }

  const getPriorityWeight = (priority: string) => {
    const p = priority.toUpperCase()
    if (p.includes('CRITICAL')) return 4
    if (p.includes('HIGH')) return 3
    if (p.includes('STANDARD')) return 2
    if (p.includes('LOW')) return 1
    return 0
  }

  const handlePrioritySort = () => {
    setTasksList((prev) => {
      const sorted = [...prev]
      sorted.sort((a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority))
      return sorted
    })
    toast({ message: 'Sorted by priority (Critical > High > Standard > Low)', type: 'success' })
  }

  const handleAssignClick = (task: UnassignedTask) => {
    setAssigningTask(task)
  }

  const selectEmployeeForTask = (empName: string) => {
    if (!assigningTask) return

    // Update employee load
    setAvailList((prev) =>
      prev.map((emp) => {
        if (emp.name === empName) {
          const nextLoad = Math.min(100, emp.load + 15)
          let color = '#2bb673'
          if (nextLoad > 80) color = '#e2566b'
          else if (nextLoad > 40) color = '#e0941a'
          return { ...emp, load: nextLoad, color }
        }
        return emp
      })
    )

    // Log Activity
    setActivityLogs((prev) => [
      {
        id: Date.now(),
        text: `Assigned task "${assigningTask.title}" to ${empName}`,
        time: 'Just now',
      },
      ...prev,
    ])

    // Remove task from queue
    setTasksList((prev) => prev.filter((t) => t.id !== assigningTask.id))

    toast({ message: `Successfully assigned "${assigningTask.title}" to ${empName}!`, type: 'success' })
    setAssigningTask(null)
  }

  const displayedAvailability = showAllAssignees ? availList : availList.slice(0, 3)

  return (
    <div className="task-page">
      <div className="task-header-row">
        <div>
          <h2 className="task-page-title">Task Management</h2>
          <p className="task-page-subtitle">Assign workflows and monitor delivery efficiency across teams.</p>
        </div>
        <div className="task-header-actions">
          <button className="task-btn-outline" onClick={handleExportProgress}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Export Progress
          </button>
          <button className="task-btn-gold" onClick={() => {
            const newTitle = prompt("Enter task title:")
            if (!newTitle) return
            const newClient = prompt("Enter client name:")
            if (!newClient) return
            const priorityInput = prompt("Enter priority (Critical, High, Standard, Low):", "Standard")
            if (!priorityInput) return

            const normPriority = priorityInput.toUpperCase()
            const priorityClass = normPriority.includes("CRIT")
              ? "priority-high"
              : normPriority.includes("HIGH")
              ? "priority-high"
              : normPriority.includes("LOW")
              ? "priority-low"
              : "priority-standard"

            const newTask: UnassignedTask = {
              id: Date.now(),
              title: newTitle,
              client: newClient,
              created: 'Just now',
              priority: priorityInput.toUpperCase() + ' PRIORITY',
              priorityClass,
              est: '4 Hours',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d2233" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              ),
            }

            setTasksList(prev => [...prev, newTask])
            toast({ message: `Created new unassigned task: ${newTitle}`, type: 'success' })
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create New Task
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="task-stats-row">
        {[
          { label: 'UNASSIGNED TASKS', value: String(tasksList.length), iconBg: '#fdf3e1', iconColor: '#b89047', badge: <span className="task-trend-up">Live</span> },
          { label: 'IN PROGRESS', value: '142', iconBg: '#e8f0fe', iconColor: '#3d7cf0', badge: <span className="task-stat-desc">Current Load</span> },
          { label: 'COMPLETED TODAY', value: '56', iconBg: '#e7f7ed', iconColor: '#2bb673', badge: <span className="task-stat-target-met">✓ Target Met</span> },
          { label: 'DELAYED DELIVERIES', value: '04', iconBg: '#fcebec', iconColor: '#e2566b', badge: <span className="task-stat-critical">Critical</span> },
        ].map((card) => (
          <div className="task-stat-card" key={card.label}>
            <div className="task-stat-header">
              <div className="task-stat-icon-box" style={{ background: card.iconBg, color: card.iconColor }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
              </div>
              {card.badge}
            </div>
            <div className="task-stat-label">{card.label}</div>
            <div className="task-stat-value">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="task-main-grid">
        <div className="task-queue-card">
          <div className="task-card-header-row">
            <h3 className="task-card-title">Unassigned Queue</h3>
            <button className="task-link-btn" onClick={handlePrioritySort}>Priority Sort</button>
          </div>
          <div className="task-queue-list">
            {tasksList.length === 0 ? (
              <div style={{ padding: '30px 10px', textAlign: 'center', color: '#8a8fa3', fontSize: '13.5px' }}>
                All tasks assigned! The queue is empty.
              </div>
            ) : (
              tasksList.map((t) => (
                <div className="task-queue-item" key={t.id}>
                  <div className="task-queue-icon">{t.icon}</div>
                  <div className="task-queue-content">
                    <div className="task-queue-title">{t.title}</div>
                    <div className="task-queue-meta">{t.client} • Created {t.created}</div>
                  </div>
                  <div className="task-queue-details">
                    <span className={`task-badge ${t.priorityClass}`}>{t.priority}</span>
                    <span className="task-est">Est. {t.est}</span>
                    <button className="task-assign-btn" onClick={() => handleAssignClick(t)}>Assign</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="task-side-col">
          <div className="task-side-card">
            <div className="task-card-header-row">
              <h3 className="task-card-title">Employee Availability</h3>
            </div>
            <div className="task-availability-list">
              {displayedAvailability.map((emp) => (
                <div className="task-avail-item" key={emp.name}>
                  <div className="task-avail-avatar">
                    <img src={`https://ui-avatars.com/api/?name=${emp.name}&background=f0f2f8&color=1d2233`} alt={emp.name} />
                  </div>
                  <div className="task-avail-info">
                    <span className="task-avail-name">{emp.name}</span>
                    <div className="task-avail-bar-wrap">
                      <div className="task-avail-bar-bg">
                        <div className="task-avail-bar-fill" style={{ width: `${emp.load}%`, background: emp.color }} />
                      </div>
                      <span className="task-avail-load">{emp.load}% Load</span>
                    </div>
                  </div>
                  <div className="task-avail-dot" style={{ background: emp.color }} />
                </div>
              ))}
            </div>
            <button className="task-view-all-btn" onClick={() => setShowAllAssignees(!showAllAssignees)}>
              {showAllAssignees ? 'View Less' : 'View All Assignees'}
            </button>
          </div>

          <div className="task-side-card">
            <div className="task-card-header-row">
              <h3 className="task-card-title">Live Activity</h3>
            </div>
            <div className="task-activity-list">
              {activityLogs.map((act) => (
                <div className="task-activity-item" key={act.id}>
                  <div className="task-activity-line" />
                  <div className="task-activity-dot" />
                  <div className="task-activity-content">
                    <div className="task-activity-text">{act.text}</div>
                    <div className="task-activity-time">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {assigningTask && (
        <div className="overview-modal-overlay" onClick={() => setAssigningTask(null)}>
          <div className="overview-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Assignee</h3>
            <p style={{ fontSize: 13, color: '#8a8fa3', margin: '-8px 0 10px 0' }}>
              Assigning: <strong>{assigningTask.title}</strong>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 300, overflowY: 'auto' }}>
              {availList.map((emp) => (
                <div
                  key={emp.name}
                  onClick={() => selectEmployeeForTask(emp.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'between',
                    padding: '10px 14px',
                    border: '1px solid #e7e9f1',
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: '#fff',
                    transition: 'all 0.2s',
                  }}
                  className="hover:border-amber hover:bg-amber-soft"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f4f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                      {emp.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1d2233' }}>{emp.name}</div>
                      <div style={{ fontSize: 11, color: '#8a8fa3' }}>Current Load: {emp.load}%</div>
                    </div>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: emp.color }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button className="overview-btn-outline" onClick={() => setAssigningTask(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
