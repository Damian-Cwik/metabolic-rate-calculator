import axios from "axios";

const FALLBACK_MESSAGE = "Coś poszło nie tak. Spróbuj ponownie.";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? FALLBACK_MESSAGE;
  }
  return FALLBACK_MESSAGE;
}
