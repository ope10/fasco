import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

// Woman in red blazer photo for Sign Up page
const SIGNUP_PHOTO =
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85";

export default function SignUpPage() {
  return (
    <AuthShell photoSrc={SIGNUP_PHOTO} photoAlt="Fashion model in red blazer">
      <SignUpForm />
    </AuthShell>
  );
}
