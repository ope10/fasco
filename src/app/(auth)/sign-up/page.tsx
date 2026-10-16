import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

const SIGNUP_PHOTO = "/images/auth-sign-up.png";

export default function SignUpPage() {
  return (
    <AuthShell
      photoSrc={SIGNUP_PHOTO}
      photoAlt="Fashion model in red blazer"
      objectPosition="center 6%"
    >
      <SignUpForm />
    </AuthShell>
  );
}
