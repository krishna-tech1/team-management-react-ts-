import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Download, SlidersHorizontal, UserPlus } from "lucide-react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/Button"
import { KpiCard } from "@/components/ui/KpiCard"
import { Card } from "@/components/ui/Card"
import { Avatar } from "@/components/ui/Avatar"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { clients, clientStats, type Client, type ServiceType } from "@/data/clients"
import RowActionsPopover from "@/components/ui/RowActionsPopover"
import EditClientModal from "@/components/ui/EditClientModal"
import { cn, downloadCsv } from "@/lib/utils"

const serviceTone: Record<ServiceType, string> = {
  "GST + MCA": "bg-info-soft text-info",
  Audit: "bg-amber-soft text-gold-dark",
  "MCA Only": "bg-info-soft text-info",
  GST: "bg-success-soft text-success",
}

export function ClientsView({
  basePath,
}: {
  basePath: string
}) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<Client[]>(() => clients.slice())
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [editing, setEditing] = useState<Client | null>(null)
  const [popoverFor, setPopoverFor] = useState<string | null>(null)
  const kebabRef = useRef<HTMLButtonElement | null>(null)

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  useEffect(() => {
    function onSearch(e: Event) {
      const d = (e as CustomEvent).detail as string
      setQuery(d || "")
    }
    window.addEventListener('app:search', onSearch as EventListener)
    return () => window.removeEventListener('app:search', onSearch as EventListener)
  }, [])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) return setItems(clients.slice())
    setItems(clients.filter((c) => {
      return (
        c.company.toLowerCase().includes(q) ||
        c.contactPerson.toLowerCase().includes(q) ||
        c.contactEmail.toLowerCase().includes(q) ||
        c.assignedTL.toLowerCase().includes(q)
      )
    }))
  }, [query])

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  useEffect(() => { if (page > totalPages) setPage(totalPages) }, [page, totalPages, setPage])

  function exportCsv() {
    const rows = items.map((c) => ({ id: c.id, company: c.company, contact: c.contactPerson, status: c.status }))
    if (rows.length === 0) return
    downloadCsv(rows, 'clients.csv')
  }

  return (
    <div>
      <PageHeader
        title="Client Management"
        subtitle="Managing 1,284 active enterprise compliance profiles"
        actions={
          <>
            <Button variant="outline" icon={<Download className="h-4 w-4" />} onClick={() => exportCsv()}>
              Export Reports
            </Button>
            <Button variant="primary" icon={<UserPlus className="h-4 w-4" />} onClick={() => navigate(`${basePath}/add`)}>
              Onboard Client
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total Clients" value={clientStats.total} meta="↗ 12%" metaTone="success" sub="Active for FY 2025-26" accent="gold" />
        <KpiCard label="Compliance Rate" value={clientStats.complianceRate} meta="Stable" metaTone="success" sub="Target benchmark: 95%" accent="success" />
        <KpiCard label="Pending Filings" value={String(clientStats.pendingFilings)} meta="High" metaTone="danger" sub="Due within 48 hours" accent="warning" />
        <KpiCard label="Audit Pipeline" value={clientStats.auditPipeline} meta="Ongoing" metaTone="neutral" sub="Total portfolio value" accent="info" />
      </div>

      <Card className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <select className="h-9 rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink-soft focus:border-amber focus:outline-none">
              <option>All Services</option>
              <option>GST + MCA</option>
              <option>Audit</option>
              <option>MCA Only</option>
              <option>GST</option>
            </select>
            <select className="h-9 rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink-soft focus:border-amber focus:outline-none">
              <option>Status: All</option>
              <option>Active</option>
              <option>On Hold</option>
              <option>Overdue</option>
            </select>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gold-dark">
              <SlidersHorizontal className="h-4 w-4" /> Advanced Filters
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-muted">Showing {(page-1)*pageSize+1}-{Math.min(page*pageSize, items.length)} of {items.length}</span>
            <div className="flex items-center gap-1">
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-ink-soft hover:bg-surface-muted" onClick={() => setPage((p) => Math.max(1, p-1))}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-ink-soft hover:bg-surface-muted" onClick={() => setPage((p) => Math.min(totalPages, p+1))}>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden px-4 pb-4 space-y-3">
          {items.slice((page-1)*pageSize, page*pageSize).map((client) => (
            <div key={client.id} className="p-4 border rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink truncate">{client.company}</div>
                  <div className="text-xs text-ink-muted truncate">{client.contactPerson} • {client.contactMobile}</div>
                  <div className="mt-2 text-xs"><span className={cn("rounded-md px-2 py-1 text-xs font-semibold", serviceTone[client.serviceType])}>{client.serviceType}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{client.assignedTL}</div>
                  <div className="text-xs text-ink-muted">{client.status}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2">
                <button onClick={() => navigate(`${basePath}/${client.id}`)} className="px-3 py-1 rounded-md bg-surface text-sm">View</button>
                <button onClick={() => setPopoverFor((p) => (p === client.id ? null : client.id))} className="px-2 py-1 rounded-md border text-sm">⋮</button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-line bg-surface-muted text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <th className="px-6 py-3 w-10"></th>
                <th className="px-6 py-3">Company Name</th>
                <th className="px-6 py-3">Service Type</th>
                <th className="px-6 py-3">Contact Person</th>
                <th className="px-6 py-3">Assigned TL</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.slice((page-1)*pageSize, page*pageSize).map((client) => (
                <tr key={client.id} className="border-b border-line-soft transition-colors last:border-0 hover:bg-surface-muted">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(client.id)}
                      onChange={() => toggle(client.id)}
                      className="h-4 w-4 rounded border-line accent-amber"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`${basePath}/${client.id}`)}
                      className="text-left text-sm font-bold text-ink hover:text-gold-dark"
                    >
                      {client.company}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("rounded-md px-2 py-1 text-xs font-semibold", serviceTone[client.serviceType])}>
                      {client.serviceType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-ink">{client.contactPerson}</p>
                    <p className="text-xs text-ink-muted">{client.contactMobile}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={client.assignedTL} size={28} />
                      <span className="text-sm text-ink-soft">{client.assignedTL}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={client.status} dot />
                  </td>
                  <td className="px-6 py-4 relative">
                    <div className="flex items-center justify-end">
                      <button
                        ref={kebabRef}
                        onClick={() => setPopoverFor((p) => (p === client.id ? null : client.id))}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-soft hover:bg-line-soft"
                        aria-label="More"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                      </button>
                      {popoverFor === client.id && (
                        <RowActionsPopover
                          open={true}
                          anchorRef={kebabRef}
                          onClose={() => setPopoverFor(null)}
                          onEdit={() => setEditing(client)}
                          onView={() => navigate(`${basePath}/${client.id}`)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <span>Rows per page:</span>
            <select className="h-8 rounded-md border border-line bg-surface px-2 text-sm focus:border-amber focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i+1)} className={cn("flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-semibold", page === i+1 ? "bg-amber text-sidebar" : "text-ink-soft hover:bg-surface-muted")}>
                {i+1}
              </button>
            ))}
          </div>
        </div>
      </Card>

        {editing && (
          <EditClientModal
            client={editing}
            open={true}
            onClose={() => setEditing(null)}
            onSave={(updated) => {
              const idx = clients.findIndex((c) => c.id === updated.id)
              if (idx !== -1) clients[idx] = { ...clients[idx], ...updated }
              setItems((it) => it.map((i) => (i.id === updated.id ? { ...i, ...updated } : i)))
            }}
          />
        )}
    </div>
  )
}
