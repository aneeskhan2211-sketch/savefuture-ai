import { AuthGuard } from "@/components/AuthGuard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Landing = lazy(() => import("@/pages/Landing"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Expenses = lazy(() => import("@/pages/Expenses"));
const Career = lazy(() => import("@/pages/Career"));
const Business = lazy(() => import("@/pages/Business"));
const LifePlan = lazy(() => import("@/pages/LifePlan"));
const Premium = lazy(() => import("@/pages/Premium"));
const Profile = lazy(() => import("@/pages/Profile"));
const Admin = lazy(() => import("@/pages/Admin"));
const AISuggestions = lazy(() => import("@/pages/AISuggestions"));

function PageLoader() {
  return (
    <div className="flex flex-col gap-4 p-6 min-h-[60vh]">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    </div>
  );
}

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Landing />
    </Suspense>
  ),
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Onboarding />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <Dashboard />
      </Suspense>
    </AuthGuard>
  ),
});

const expensesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/expenses",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <Expenses />
      </Suspense>
    </AuthGuard>
  ),
});

const careerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <Career />
      </Suspense>
    </AuthGuard>
  ),
});

const businessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/business",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <Business />
      </Suspense>
    </AuthGuard>
  ),
});

const lifePlanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/life-plan",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <LifePlan />
      </Suspense>
    </AuthGuard>
  ),
});

const premiumRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/premium",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Premium />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <Profile />
      </Suspense>
    </AuthGuard>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <Admin />
      </Suspense>
    </AuthGuard>
  ),
});

const aiSuggestionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-suggestions",
  component: () => (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <AISuggestions />
      </Suspense>
    </AuthGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  dashboardRoute,
  expensesRoute,
  careerRoute,
  businessRoute,
  lifePlanRoute,
  premiumRoute,
  profileRoute,
  adminRoute,
  aiSuggestionsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
