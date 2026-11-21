import { Link, useNavigate } from "@tanstack/react-router";
import {
  Calculator,
  History,
  HeartPulse,
  LogOut,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const LINKS = [
  { to: "/", label: "Kalkulator", icon: Calculator },
  { to: "/history", label: "Historia", icon: History },
  { to: "/profile", label: "Profil", icon: UserRound },
] as const;

const LINK_CLASS =
  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";
const ACTIVE_LINK_CLASS =
  "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary";

export function NavBar() {
  const navigate = useNavigate();
  const email = useAuth((state) => state.user?.email);
  const signOut = useAuth((state) => state.signOut);

  const handleSignOut = async () => {
    signOut();
    await navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <HeartPulse className="size-6" />
          <span className="hidden sm:inline">BMI Kalkulator</span>
        </div>

        <nav className="flex gap-1">
          {LINKS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={LINK_CLASS}
              activeProps={{ className: ACTIVE_LINK_CLASS }}
              activeOptions={{ exact: true }}
            >
              <Icon className="size-4" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden max-w-48 truncate rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground lg:block">
            {email}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="py-4"
            onClick={handleSignOut}
          >
            <LogOut />
            <span className="hidden sm:inline">Wyloguj</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
