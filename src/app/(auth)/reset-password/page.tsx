import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

const PHOTO =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85";

export default function ResetPasswordPage() {
  return (
    <AuthShell photoSrc={PHOTO} photoAlt="Fashion model with colourful background">
      <ResetPasswordForm />
    </AuthShell>
  );
}
