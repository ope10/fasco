export type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "reset-password";

export type SignInFormState = {
  email: string;
  password: string;
};

export type SignUpFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordFormState = {
  email: string;
};

export type ResetPasswordFormState = {
  password: string;
  confirmPassword: string;
};
