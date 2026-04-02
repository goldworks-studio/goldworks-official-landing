import { GoldWorksLogo } from "@/components/gold-works-logo"

export function Footer() {
  return (
    <footer className="relative py-16 px-6 md:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <GoldWorksLogo size="sm" className="text-primary" animated={false} />
            <span className="text-lg font-bold tracking-tight">Gold Works</span>
          </div>

          {/* Center - email */}
          <a 
            href="mailto:support@goldworks.net"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            support@goldworks.net
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gold Works. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
