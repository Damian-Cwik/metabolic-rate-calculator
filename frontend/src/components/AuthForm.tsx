import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/lib/errors";
import {
  loginSchema,
  registerSchema,
  validateForm,
  type FieldErrors,
} from "@/lib/validation";
import { login, register } from "@/services/authApi";

interface AuthFormProps {
  mode: "login" | "register";
}

const TEXTS = {
  login: {
    title: "Logowanie",
    description: "Zaloguj się, aby korzystać z kalkulatora.",
    submit: "Zaloguj się",
    switchText: "Nie masz konta?",
    switchLabel: "Zarejestruj się",
    switchTo: "/register",
  },
  register: {
    title: "Rejestracja",
    description: "Załóż konto, aby zapisywać swoje wyniki.",
    submit: "Zarejestruj się",
    switchText: "Masz już konto?",
    switchLabel: "Zaloguj się",
    switchTo: "/login",
  },
} as const;

export function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate();
  const signIn = useAuth((state) => state.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const texts = TEXTS[mode];

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const schema = mode === "login" ? loginSchema : registerSchema;
    const validation = validateForm(schema, { email, password });
    setErrors(validation.success ? {} : validation.errors);
    if (!validation.success) return;

    setIsSubmitting(true);
    try {
      const authenticate = mode === "login" ? login : register;
      signIn(await authenticate(validation.data));
      await navigate({ to: "/" });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">{texts.title}</CardTitle>
        <CardDescription>{texts.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField
            label="E-mail"
            name="email"
            type="email"
            value={email}
            error={errors.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormField
            label="Hasło"
            name="password"
            type="password"
            value={password}
            error={errors.password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {texts.submit}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {texts.switchText}{" "}
          <Link
            to={texts.switchTo}
            className="font-medium text-foreground underline"
          >
            {texts.switchLabel}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
