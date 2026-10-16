"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordSchema } from "@/lib/validations/auth";
import type { ForgotPasswordFormState } from "@/types/auth";

export function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormState>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (_data: ForgotPasswordFormState) => {
    router.push("/confirmation-code");
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="font-display text-[22px] sm:text-[25px] font-semibold text-[#222222] mb-4 sm:mb-5 leading-snug">
        Forget Password
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        {/* Row 1: First Name / Last Name */}
        <div className="grid grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-1">
          <div className="space-y-0.5">
            <input
              placeholder="First Name"
              className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
            />
          </div>
          <div className="space-y-0.5">
            <input
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
              placeholder="Phone Number"
              className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
            />
          </div>
        </div>

        {/* Action Button & Link */}
        <div className="pt-2 space-y-2.5">
          <button
            type="submit"
            className="w-full rounded-[8px] bg-black py-3 sm:py-3.5 text-sm sm:text-[15px] font-medium text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:bg-[#222222]"
          >
            Send Confirmation Code
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
