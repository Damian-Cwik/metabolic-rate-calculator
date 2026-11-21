import { createFileRoute } from "@tanstack/react-router";
import { AccountSummary } from "@/components/AccountSummary";
import { ProfileForm } from "@/components/ProfileForm";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="grid items-start gap-4 md:grid-cols-2">
      <ProfileForm />
      <AccountSummary />
    </div>
  );
}
