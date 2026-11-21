import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { isSignedIn } from "@/hooks/useAuth";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (!isSignedIn()) throw redirect({ to: "/login" });
  },
  component: () => (
    <div className="min-h-dvh bg-muted/40">
      <NavBar />
      <main className="mx-auto max-w-7xl p-4">
        <Outlet />
      </main>
    </div>
  ),
});
