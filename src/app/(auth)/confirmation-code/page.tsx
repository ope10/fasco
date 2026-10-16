import { AuthShell } from "@/components/auth/auth-shell";
import { ConfirmationCodeForm } from "@/components/auth/confirmation-code-form";

const PHOTO = "/images/auth-sign-in.png";

export default function ConfirmationCodePage() {
  return (
    <AuthShell photoSrc={PHOTO} photoAlt="Fashion model with colourful background">
      <ConfirmationCodeForm />
    </AuthShell>
  );
}
