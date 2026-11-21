export class AppError extends Error {
  constructor(
    message: string,
    public readonly status: 400 | 401 | 404 | 409,
  ) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Invalid email or password", 401);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

export class EmailTakenError extends AppError {
  constructor() {
    super("Email is already registered", 409);
  }
}
