"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "@/lib/validations/auth";
import type { SignUpFormState } from "@/types/auth";
import { useAuthStore } from "@/store/use-auth-store";

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

function GmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335"/>
    </svg>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormState>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormState) => {
    const displayName = [data.firstName, data.lastName].filter(Boolean).join(" ");
    login(data.email, displayName);
    router.push("/");
  };

  const handleOAuth = (provider: string) => {
    login(`${provider.toLowerCase()}@fasco.com`, `${provider} User`);
    router.push("/");
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="font-display text-[22px] sm:text-[25px] font-semibold text-[#222222] mb-4 sm:mb-5 leading-snug">
        Create Account
      </h1>

      {/* OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
        <button
          type="button"
          onClick={() => handleOAuth("Google")}
          className="flex items-center justify-center gap-2 rounded-[8px] border border-[#4285F4] bg-white py-2.5 sm:py-3 px-3 text-xs sm:text-[13px] font-medium text-[#555555] transition hover:bg-[#F5F8FF]"
        >
          <GoogleIcon />
          <span>Sign up with Google</span>
        </button>
        <button
          type="button"
          onClick={() => handleOAuth("Email")}
          className="flex items-center justify-center gap-2 rounded-[8px] border border-[#4285F4] bg-white py-2.5 sm:py-3 px-3 text-xs sm:text-[13px] font-medium text-[#555555] transition hover:bg-[#F5F8FF]"
        >
          <GmailIcon />
          <span>Sign up with Email</span>
        </button>
      </div>

      {/* Short dashes OR divider */}
      <div className="flex items-center justify-center gap-2.5 my-3 sm:my-4 text-xs font-bold text-[#757575] tracking-widest">
        <span className="h-[2px] w-6 bg-[#757575]" />
        <span>OR</span>
        <span className="h-[2px] w-6 bg-[#757575]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 sm:space-y-4">
        {/* Row 1: First Name / Last Name */}
        <div className="grid grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-1">
          <div className="space-y-0.5">
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
            />
            {errors.firstName && <p className="text-[11px] text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-0.5">
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Email / Phone */}
        <div className="grid grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-1">
          <div className="space-y-0.5">
            <input
              type="email"
              {...register("email")}
              placeholder="Email Address"
              className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
            />
            {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-0.5">
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Password / Confirm Password */}
        <div className="grid grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-1">
          <div className="space-y-0.5">
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
            />
            {errors.password && <p className="text-[11px] text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-0.5">
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
            />
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button & Switch Link */}
        <div className="pt-2 space-y-2.5">
          <button
            type="submit"
            className="w-full rounded-[8px] bg-black py-3 sm:py-3.5 text-sm sm:text-[15px] font-medium text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:bg-[#222222]"
          >
            Create Account
          </button>

          <p className="text-center text-xs sm:text-[13px] text-[#555555]">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#4285F4] font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
