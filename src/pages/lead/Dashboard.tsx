import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { downloadCsv } from '@/lib/utils'
import { employees } from '@/data/employees'
import { clients } from '@/data/clients'
import { toast } from '@/components/ui/Toast'

interface AttentionRow {
  id: number
  employee: string
  role: string
  initials: string
  status: string
  statusType: 'danger' | 'info'
  lastAction: string
  performance: number
  actionLabel: string
}

const attentionRequiredData: AttentionRow[] = [
  { id: 1, employee: 'John Doe', role: 'Field Agent + Level 2', initials: 'JD', status: 'No Task Assigned', statusType: 'danger', lastAction: '14 mins ago', performance: 85, actionLabel: 'Assign Now' },
  { id: 2, employee: 'Sarah Miller', role: 'Lead Consultant', initials: 'SM', status: 'Task Completed', statusType: 'info', lastAction: 'Just now', performance: 98, actionLabel: 'Review Work' },
  { id: 3, employee: 'Robert Wilson', role: 'Analyst - Junior', initials: 'RW', status: 'No Task Assigned', statusType: 'danger', lastAction: '2 hours ago', performance: 72, actionLabel: 'Assign Now' },
  { id: 4, employee: 'Anita Kumar', role: 'System Admin', initials: 'AK', status: 'Task Completed', statusType: 'info', lastAction: '15 mins ago', performance: 91, actionLabel: 'Review Work' },
]

const leaderboardData = [
  { rank: 1, name: 'Emily Blunt', amount: '+$450.00', progress: 100 },
  { rank: 2, name: 'Michael Scott', amount: '+$320.00', progress: 71 },
  { rank: 3, name: 'Pam Beesly', amount: '+$290.00', progress: 64 },
]

const operationalActivityData = [
  { id: 1, time: '14:15 PM', desc: 'Sarah Miller completed task "Client Audit - Reliance Ind."', statusIcon: 'review', statusText: 'Review pending', statusClass: 'status-review' },
  { id: 2, time: '13:58 PM', desc: 'System flagged Robert Wilson for idle time exceeding 30m.', statusIcon: 'alert', statusText: 'Alert sent', statusClass: 'status-alert' },
  { id: 3, time: '13:30 PM', desc: 'Alex Thompson assigned 4 tasks to Night Shift A.', statusIcon: 'processing', statusText: 'Processing...', statusClass: 'status-processing' },
  { id: 4, time: '13:10 PM', desc: 'Incentive Pool updated for Q4 2023.', statusIcon: 'policy', statusText: 'Policy viewable', statusClass: 'status-policy' },
]

export default function LeadDashboard() {
  const navigate = useNavigate()
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedEmp, setSelectedEmp] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskPriority, setTaskPriority] = useState('Standard')

  const handleExport = () => {
    const rows = attentionRequiredData.map((row) => ({
      Employee: row.employee,
      Role: row.role,
      Status: row.status,
      'Last Action': row.lastAction,
      Performance: `${row.performance}%`,
    }))
    downloadCsv(rows, 'dashboard_overview_report.csv')
  }

  const handleAction = (actionLabel: string, employee: string) => {
    if (actionLabel === 'Assign Now') {
      setShowAssignModal(true)
    } else {
      alert(`Reviewing work for ${employee}...`)
    }
  }

  return (
    <div className="overview-page">
      <div className="overview-header-row">
        <div>
          <h2 className="overview-page-title">Team Overview</h2>
          <p className="overview-page-subtitle">Real-time performance and operational status of your direct reports.</p>
        </div>
        <div className="overview-header-actions">
          <button className="overview-btn-outline" onClick={handleExport}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export Report
          </button>
          <button className="overview-btn-gold" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setShowAssignModal(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Assign Task
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="overview-stats-row">
        <div className="overview-stat-card cursor-pointer hover:border-amber transition-colors" onClick={() => navigate('/lead/incentives')}>
          <div className="overview-stat-header">
            <div className="overview-stat-icon-box" style={{ background: '#fdf3e1', color: '#b89047' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <span className="overview-stat-trend-up">↗ +12%</span>
          </div>
          <div className="overview-stat-label">TEAM INCENTIVE POOL</div>
          <div className="overview-stat-value">$14,250.00</div>
          <div className="overview-stat-desc">Current month forecast</div>
        </div>

        <div className="overview-stat-card cursor-pointer hover:border-amber transition-colors" onClick={() => navigate('/lead/analytics')}>
          <div className="overview-stat-header">
            <div className="overview-stat-icon-box" style={{ background: '#e8f0fe', color: '#3d7cf0' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <span className="overview-stat-trend-down">↘ -2%</span>
          </div>
          <div className="overview-stat-label">COMPLETION RATE</div>
          <div className="overview-stat-value">94.2%</div>
          <div className="overview-progress-track">
            <div className="overview-progress-fill" style={{ width: '94.2%' }} />
          </div>
        </div>

        <div className="overview-stat-card cursor-pointer hover:border-amber transition-colors" onClick={() => navigate('/lead/employees')}>
          <div className="overview-stat-header">
            <div className="overview-stat-icon-box" style={{ background: '#f4f5f9', color: '#8a8fa3' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <div className="overview-stat-label">ACTIVE STAFF</div>
          <div className="overview-stat-value">38/42</div>
          <div className="overview-stat-desc">4 On-leave, 2 Unassigned</div>
        </div>

        <div className="overview-stat-card overview-stat-dark cursor-pointer hover:border-amber/50 transition-colors" onClick={() => navigate('/lead/analytics')}>
          <div className="overview-stat-header">
            <div className="overview-stat-icon-box" style={{ background: '#3b3b3b', color: '#b89047' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
          <div className="overview-stat-label">AVG HANDLING TIME</div>
          <div className="overview-stat-value">42m 15s</div>
          <div className="overview-stat-desc">Optimized by 4m since last week</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="overview-main-grid">
        <div className="overview-left-col">
          <div className="overview-card attention-card">
            <div className="overview-card-header">
              <h3 className="overview-card-title">
                <span className="attention-icon">!</span> Attention Required
              </h3>
              <span className="attention-badge">12 Action Items</span>
            </div>
            <div className="overview-table-scroll">
              <table className="overview-table">
                <thead>
                  <tr>
                    <th>EMPLOYEE</th><th>CURRENT STATUS</th>
                    <th>LAST ACTION</th><th>PERFORMANCE</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {attentionRequiredData.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="overview-employee-cell">
                          <div className="overview-avatar">{row.initials}</div>
                          <div className="overview-employee-info">
                            <span className="overview-employee-name">{row.employee}</span>
                            <span className="overview-employee-role">{row.role}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`overview-status-badge badge-${row.statusType}`}>
                          {row.statusType === 'danger' && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                          )}
                          {row.statusType === 'info' && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                          )}
                          {row.status}
                        </span>
                      </td>
                      <td className="overview-action-time">{row.lastAction}</td>
                      <td>
                        <div className="overview-performance-wrap">
                          <div className="overview-performance-track">
                            <div className="overview-performance-fill" style={{ width: `${row.performance}%` }} />
                          </div>
                          <span className="overview-performance-text">{row.performance}%</span>
                        </div>
                      </td>
                      <td className="overview-action-td">
                        <button className="overview-action-btn" onClick={() => handleAction(row.actionLabel, row.employee)}>
                          {row.actionLabel}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="overview-footer-btn" onClick={() => navigate('/lead/employees')}>View All Team Members (42)</button>
          </div>
        </div>

        <div className="overview-right-col">
          {/* Map Widget */}
          <div className="overview-map-card" onClick={() => navigate('/lead/tracking')}>
            <div className="overview-map-header">
              <div>
                <h3 className="overview-map-title">Regional Spread</h3>
                <p className="overview-map-subtitle">Live tracking of on-field agents</p>
              </div>
              <span className="overview-live-badge"><span className="live-dot" /> LIVE</span>
            </div>
            <div className="overview-map-area">
              <div className="map-pin" style={{ top: '20%', left: '30%' }} />
              <div className="map-pin" style={{ top: '40%', left: '70%' }} />
              <div className="map-pin" style={{ top: '60%', left: '40%' }} />
              <div className="map-pin" style={{ top: '35%', left: '50%' }} />
              <div className="map-pin" style={{ top: '70%', left: '60%' }} />
              <div className="overview-map-agents-overlay">
                <div className="agents-overlay-header">
                  <span>Active Agents</span>
                  <span className="agents-online-count">14 Online</span>
                </div>
                <div className="agents-avatars-group">
                  <div className="agent-avatar"><img src="https://i.pravatar.cc/150?u=1" alt="agent" /></div>
                  <div className="agent-avatar"><img src="https://i.pravatar.cc/150?u=2" alt="agent" /></div>
                  <div className="agent-avatar"><img src="https://i.pravatar.cc/150?u=3" alt="agent" /></div>
                  <div className="agent-avatar-more">+11</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="overview-card leaderboard-card">
            <div className="leaderboard-header">
              <h3 className="overview-card-title">Leaderboard</h3>
              <p className="leaderboard-subtitle">Incentive projections this week</p>
            </div>
            <div className="leaderboard-list">
              {leaderboardData.map((item) => (
                <div className="leaderboard-item" key={item.rank}>
                  <div className="leaderboard-row">
                    <span className="leaderboard-rank">{item.rank}</span>
                    <span className="leaderboard-name">{item.name}</span>
                    <span className="leaderboard-amount">{item.amount}</span>
                  </div>
                  <div className="leaderboard-track">
                    <div className="leaderboard-fill" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="overview-footer-btn" onClick={() => navigate('/lead/incentives')}>Full Incentive Dashboard</button>
          </div>
        </div>
      </div>

      {/* Operational Activity */}
      <div className="overview-activity-section">
        <div className="overview-activity-header">
          <h3 className="overview-card-title">Operational Activity</h3>
          <span className="overview-last-updated"><span className="live-dot-grey" /> Last updated: 14:22:15</span>
        </div>
        <div className="overview-activity-list">
          {operationalActivityData.map((activity) => (
            <div className="overview-activity-card" key={activity.id}>
              <div className="activity-time">{activity.time}</div>
              <p className="activity-desc">{activity.desc}</p>
              <div className={`activity-status ${activity.statusClass}`}>
                {activity.statusIcon === 'review' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
                {activity.statusIcon === 'alert' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                {activity.statusIcon === 'processing' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.28l5.67-5.67"/></svg>}
                {activity.statusIcon === 'policy' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
                {activity.statusText}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAssignModal && (
        <div className="overview-modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="overview-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Assign New Task</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#8a8fa3', textTransform: 'uppercase' }}>Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task name..."
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #e7e9f1', borderRadius: 6, fontSize: 13, outline: 'none' }}
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#8a8fa3', textTransform: 'uppercase' }}>Select Employee</label>
                <select
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #e7e9f1', borderRadius: 6, fontSize: 13, background: '#fff', outline: 'none' }}
                  value={selectedEmp}
                  onChange={(e) => setSelectedEmp(e.target.value)}
                >
                  <option value="">Choose an employee...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name} ({emp.designation})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#8a8fa3', textTransform: 'uppercase' }}>Select Client</label>
                <select
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #e7e9f1', borderRadius: 6, fontSize: 13, background: '#fff', outline: 'none' }}
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  <option value="">Choose a client...</option>
                  {clients.map(cli => (
                    <option key={cli.id} value={cli.company}>{cli.company}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#8a8fa3', textTransform: 'uppercase' }}>Priority</label>
                <select
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #e7e9f1', borderRadius: 6, fontSize: 13, background: '#fff', outline: 'none' }}
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Standard">Standard</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button
                className="overview-btn-outline"
                onClick={() => {
                  setShowAssignModal(false)
                  setTaskName('')
                  setSelectedEmp('')
                  setSelectedClient('')
                  setTaskPriority('Standard')
                }}
              >
                Cancel
              </button>
              <button
                className="overview-btn-gold"
                onClick={() => {
                  if (!taskName.trim()) {
                    toast({ message: 'Task name is required', type: 'error' })
                    return
                  }
                  if (!selectedEmp) {
                    toast({ message: 'Please select an employee', type: 'error' })
                    return
                  }
                  if (!selectedClient) {
                    toast({ message: 'Please select a client', type: 'error' })
                    return
                  }
                  
                  toast({ message: `Task "${taskName}" successfully assigned to ${selectedEmp}!`, type: 'success' })
                  setShowAssignModal(false)
                  setTaskName('')
                  setSelectedEmp('')
                  setSelectedClient('')
                  setTaskPriority('Standard')
                }}
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
