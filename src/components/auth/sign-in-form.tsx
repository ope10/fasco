"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInSchema } from "@/lib/validations/auth";
import type { SignInFormState } from "@/types/auth";
import { useAuthStore } from "@/store/use-auth-store";

// Google "G" coloured SVG inline
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

// Gmail "M" icon
function GmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" fill="#fff" stroke="#EA4335" strokeWidth="1.5"/>
      <path d="M22 6l-10 7L2 6" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function SignInFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormState>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: SignInFormState) => {
    login(data.email);
    router.push(redirectTo);
  };

  const handleOAuth = (provider: string) => {
    login(`${provider.toLowerCase()}@fasco.com`, `${provider} User`);
    router.push(redirectTo);
  };

  return (
    <div className="space-y-7">
      {/* Page title */}
      <h1 className="text-[1.5rem] font-normal text-[#222222] leading-snug">
        Sign In To FASCO
      </h1>

      {/* OAuth buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleOAuth("Google")}
          className="flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#cccccc] bg-white py-2.5 text-xs font-medium text-[#333333] transition hover:bg-[#f7f7f7]"
        >
          <GoogleIcon />
          Sign up with Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuth("Email")}
          className="flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#cccccc] bg-white py-2.5 text-xs font-medium text-[#333333] transition hover:bg-[#f7f7f7]"
        >
          <GmailIcon />
          Sign up with Email
        </button>
      </div>

      {/* OR divider */}
      <div className="flex items-center gap-3 text-xs font-medium text-[#888888]">
        <span className="h-px flex-1 bg-[#d5d5d5]" />
        OR
        <span className="h-px flex-1 bg-[#d5d5d5]" />
      </div>

      {/* Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-[11px] text-[#777777]">Email</label>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
          />
          {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] text-[#777777]">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
          />
          {errors.password && <p className="text-[11px] text-red-500">{errors.password.message}</p>}
        </div>

        {/* Sign In button */}
        <button
          type="submit"
          className="mt-2 w-full rounded-[6px] bg-[#111111] py-3.5 text-sm font-semibold text-white transition hover:bg-[#333333]"
        >
          Sign In
        </button>
      </form>

      {/* Register Now (outline) + Forgot Password */}
      <div className="space-y-3">
        <Link
          href="/sign-up"
          className="block w-full rounded-[6px] border border-[#3b7de8] py-3 text-center text-xs font-semibold text-[#3b7de8] transition hover:bg-[#f0f5ff]"
        >
          Register Now
        </Link>
        <div className="text-right">
          <Link href="/forgot-password" className="text-xs text-[#3b7de8] hover:underline">
            Forget Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SignInForm() {
  return (
    <Suspense>
      <SignInFormInner />
    </Suspense>
  );
}
