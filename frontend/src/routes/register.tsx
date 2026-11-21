import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { isSignedIn } from "@/hooks/useAuth";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    if (isSignedIn()) throw redirect({ to: "/" });
  },
  component: () => (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <AuthForm mode="register" />
    </main>
  ),
});
