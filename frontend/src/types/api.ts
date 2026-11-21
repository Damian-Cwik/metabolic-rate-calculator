import type { ActivityLevel, BodyData, CalculationResult, Sex } from "./body";

export interface User {
  id: string;
  email: string;
  sex: Sex | null;
  birthDate: string | null;
  heightCm: number | null;
  activityLevel: ActivityLevel | null;
  createdAt: string;
}

export interface Profile {
  sex: Sex;
  birthDate: string;
  heightCm: number;
  activityLevel: ActivityLevel;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}

export type Measurement = BodyData &
  CalculationResult & {
    id: string;
    createdAt: string;
  };
