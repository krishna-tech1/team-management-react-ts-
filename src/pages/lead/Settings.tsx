import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Settings() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [saved, setSaved] = useState(false)

  // TODO integration point: PUT /api/account/profile
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h3>Profile</h3>
        <form onSubmit={handleSave}>
          <div className="settings-field">
            <label className="settings-label">Full Name</label>
            <input
              className="settings-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="settings-field">
            <label className="settings-label">Email</label>
            <input
              className="settings-input"
              value={user?.email ?? ''}
              disabled
            />
          </div>
          <div className="settings-actions">
            <button type="submit" className="settings-btn-primary">
              Save Changes
            </button>
            {saved && <span className="settings-saved">Saved successfully</span>}
          </div>
        </form>
      </div>

      <div className="settings-card">
        <h3>Notifications</h3>
        <label className="settings-toggle-row">
          <span>Email me when a task is overdue</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="settings-toggle-row">
          <span>Weekly performance summary</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="settings-toggle-row">
          <span>New client sign-up alerts</span>
          <input type="checkbox" />
        </label>
      </div>
    </div>
  )
}
