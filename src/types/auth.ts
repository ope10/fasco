export type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "reset-password";

export type SignInFormState = {
  email: string;
  password: string;
};

export type SignUpFormState = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  name?: string;
};

export type ForgotPasswordFormState = {
  email: string;
};

export type ResetPasswordFormState = {
  password: string;
  confirmPassword: string;
};
