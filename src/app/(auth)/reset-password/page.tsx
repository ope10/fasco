import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

const PHOTO = "/images/auth-sign-in.png";

export default function ResetPasswordPage() {
  return (
    <AuthShell photoSrc={PHOTO} photoAlt="Fashion model with colourful background">
      <ResetPasswordForm />
    </AuthShell>
  );
}
