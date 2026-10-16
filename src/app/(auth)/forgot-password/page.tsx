import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

const PHOTO = "/images/auth-sign-in.png";

export default function ForgotPasswordPage() {
  return (
    <AuthShell photoSrc={PHOTO} photoAlt="Fashion model with colourful background">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
