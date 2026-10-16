import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

const SIGNIN_PHOTO = "/images/auth-sign-in.png";

export default function SignInPage() {
  return (
    <AuthShell
      photoSrc={SIGNIN_PHOTO}
      photoAlt="Fashion model with colourful background"
      objectPosition="center 10%"
    >
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
