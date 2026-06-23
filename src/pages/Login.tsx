import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("admin@complianceos.com")
  const [password, setPassword] = useState("password")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-sm sm:p-10">
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber">
            <ShieldCheck className="h-5 w-5 text-sidebar" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-gold-dark">ComplianceOS</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Welcome Back</h1>
        <p className="mt-1 text-sm text-ink-soft">Sign in to your Admin Console.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Email Address
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@complianceos.com"
                className="h-12 w-full rounded-lg border border-line bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 w-full rounded-lg border border-line bg-surface pl-10 pr-10 text-sm text-ink placeholder:text-ink-muted focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-soft"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-amber text-sm font-bold text-sidebar transition-colors hover:bg-gold"
          >
            Sign In to Dashboard
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-muted">
          Protected by ComplianceOS security. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
