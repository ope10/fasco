import { AuthShell } from "@/components/auth/auth-shell";
import { ConfirmationCodeForm } from "@/components/auth/confirmation-code-form";

const PHOTO =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85";

export default function ConfirmationCodePage() {
  return (
    <AuthShell photoSrc={PHOTO} photoAlt="Fashion model with colourful background">
      <ConfirmationCodeForm />
    </AuthShell>
  );
}
