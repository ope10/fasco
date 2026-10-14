import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

// Colorful graffiti-wall photo used on Sign In + Confirmation + Forgot + Reset pages
const SIGNIN_PHOTO =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85";

export default function SignInPage() {
  return (
    <AuthShell photoSrc={SIGNIN_PHOTO} photoAlt="Fashion model with colourful background">
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
