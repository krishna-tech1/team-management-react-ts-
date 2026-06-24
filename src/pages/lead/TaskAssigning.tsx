import { downloadCsv } from '@/lib/utils'

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

const unassignedTasks: UnassignedTask[] = [
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

const availability = [
  { name: 'Rahul Verma', avatar: 'RV', load: 85, color: '#e2566b' },
  { name: 'Sana K.', avatar: 'SK', load: 20, color: '#2bb673' },
  { name: 'David Chen', avatar: 'DC', load: 45, color: '#e0941a' },
]

const activity = [
  { id: 1, text: 'Rahul Verma completed Audit Phase 1', time: 'Just now' },
  { id: 2, text: 'Sana K. started Quarterly Filing', time: '15 mins ago' },
]

export default function TaskAssigning() {
  const handleExportProgress = () => {
    const rows = unassignedTasks.map((t) => ({
      ID: t.id,
      Title: t.title,
      Client: t.client,
      Priority: t.priority,
      'Estimated Time': t.est,
    }))
    downloadCsv(rows, 'task_progress_report.csv')
  }

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
          <button className="task-btn-gold">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create New Task
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="task-stats-row">
        {[
          { label: 'UNASSIGNED TASKS', value: '28', iconBg: '#fdf3e1', iconColor: '#b89047', badge: <span className="task-trend-up">↗ 12%</span> },
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
            <button className="task-link-btn">Priority Sort</button>
          </div>
          <div className="task-queue-list">
            {unassignedTasks.map((t) => (
              <div className="task-queue-item" key={t.id}>
                <div className="task-queue-icon">{t.icon}</div>
                <div className="task-queue-content">
                  <div className="task-queue-title">{t.title}</div>
                  <div className="task-queue-meta">{t.client} • Created {t.created}</div>
                </div>
                <div className="task-queue-details">
                  <span className={`task-badge ${t.priorityClass}`}>{t.priority}</span>
                  <span className="task-est">Est. {t.est}</span>
                  <button className="task-assign-btn">Assign</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="task-side-col">
          <div className="task-side-card">
            <div className="task-card-header-row">
              <h3 className="task-card-title">Employee Availability</h3>
            </div>
            <div className="task-availability-list">
              {availability.map((emp) => (
                <div className="task-avail-item" key={emp.name}>
                  <div className="task-avail-avatar">
                    <img src={`https://ui-avatars.com/api/?name=${emp.name}&background=f0f2f8&color=1d2233`} alt={emp.name} />
                  </div>
                  <div className="task-avail-info">
                    <span className="task-avail-name">{emp.name}</span>
                    <div className="task-avail-bar-wrap">
                      <div className="task-avail-bar-bg">
                        <div className="task-avail-bar-fill" style={{ width: `${emp.load}%`, background: '#b89047' }} />
                      </div>
                      <span className="task-avail-load">{emp.load}% Load</span>
                    </div>
                  </div>
                  <div className="task-avail-dot" style={{ background: emp.color }} />
                </div>
              ))}
            </div>
            <button className="task-view-all-btn">View All Assignees</button>
          </div>

          <div className="task-side-card">
            <div className="task-card-header-row">
              <h3 className="task-card-title">Live Activity</h3>
            </div>
            <div className="task-activity-list">
              {activity.map((act) => (
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
    </div>
  )
}
