import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart2, Briefcase, Home, Lightbulb, User } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "Home", ocid: "mobile_nav.home_link" },
  {
    to: "/dashboard",
    icon: BarChart2,
    label: "Dashboard",
    ocid: "mobile_nav.dashboard_link",
  },
  {
    to: "/career",
    icon: Briefcase,
    label: "Career",
    ocid: "mobile_nav.career_link",
  },
  {
    to: "/business",
    icon: Lightbulb,
    label: "Business",
    ocid: "mobile_nav.business_link",
  },
  {
    to: "/profile",
    icon: User,
    label: "Profile",
    ocid: "mobile_nav.profile_link",
  },
];

export function MobileBottomNav() {
  const state = useRouterState();
  const currentPath = state.location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden"
      aria-label="Mobile navigation"
      data-ocid="mobile_bottom_nav"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {NAV_ITEMS.map(({ to, icon: Icon, label, ocid }) => {
          const isActive =
            to === "/" ? currentPath === "/" : currentPath.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-smooth ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={ocid}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
