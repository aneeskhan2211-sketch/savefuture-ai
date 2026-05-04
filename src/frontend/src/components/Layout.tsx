import { MobileBottomNav } from "@/components/MobileBottomNav";
import { PremiumBadge } from "@/components/PremiumBadge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { useSubscription } from "@/hooks/useSubscription";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, Sparkles, TrendingUp, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/career", label: "Career" },
  { to: "/business", label: "Business" },
  { to: "/life-plan", label: "Life Plan" },
  { to: "/premium", label: "Pricing" },
];

interface LayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
}

export function Layout({ children, showBottomNav = true }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated: isLoggedIn, login, clear } = useInternetIdentity();
  const { data: subscription } = useSubscription();
  const isPremium = subscription?.status === "active";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-xs">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-smooth hover:opacity-80"
            data-ocid="header.logo_link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-base">
              <span className="text-primary">SaveFuture</span>
              <span className="text-accent"> AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-smooth text-muted-foreground hover:text-foreground hover:bg-muted"
                data-ocid={`header.nav_${label.toLowerCase().replace(" ", "_")}_link`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {isPremium && <PremiumBadge />}
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clear()}
                className="hidden md:flex gap-1.5"
                data-ocid="header.logout_button"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => login()}
                className="hidden md:flex gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
                data-ocid="header.login_button"
              >
                <LogIn className="w-4 h-4" />
                Sign in
              </Button>
            )}
            {!isPremium && isLoggedIn && (
              <Link to="/premium" className="hidden md:block">
                <Button
                  size="sm"
                  className="gap-1.5 bg-accent/15 hover:bg-accent/25 text-accent border border-accent/30"
                  data-ocid="header.upgrade_button"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Upgrade
                </Button>
              </Link>
            )}

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  aria-label="Open menu"
                  data-ocid="header.mobile_menu_button"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-card">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-primary">
                    SaveFuture <span className="text-accent">AI</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileOpen(false)}
                    data-ocid="header.mobile_menu_close"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2 rounded-md text-sm font-medium transition-smooth text-foreground hover:bg-muted"
                      data-ocid={`mobile_menu.${label.toLowerCase().replace(" ", "_")}_link`}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-border">
                  {isLoggedIn ? (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                      data-ocid="mobile_menu.logout_button"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </Button>
                  ) : (
                    <Button
                      className="w-full gap-2 bg-primary text-primary-foreground"
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      data-ocid="mobile_menu.login_button"
                    >
                      <LogIn className="w-4 h-4" /> Sign in with Internet
                      Identity
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      {/* Footer */}
      <footer className="hidden md:block bg-card border-t border-border py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-foreground">
              SaveFuture AI
            </span>
            <span>— Save Money. Build Career. Secure Your Future.</span>
          </div>
          <div>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      {showBottomNav && <MobileBottomNav />}

      <Toaster position="top-right" />
    </div>
  );
}
