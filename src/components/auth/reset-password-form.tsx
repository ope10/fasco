"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "@/lib/validations/auth";
import type { ResetPasswordFormState } from "@/types/auth";

export function ResetPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormState>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (_data: ResetPasswordFormState) => {
    // Redirect to sign-in after successful password recovery
    router.push("/sign-in");
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="font-display text-[22px] sm:text-[25px] font-semibold text-[#222222] mb-4 sm:mb-5 leading-snug">
        Enter Your New Password
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        <div className="space-y-0.5">
          <input
            type="password"
            {...register("password")}
            placeholder="New Password"
            className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
          />
          {errors.password && <p className="text-[11px] text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-0.5">
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirmation Password"
            className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
          />
          {errors.confirmPassword && (
            <p className="text-[11px] text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-[8px] bg-[#4285F4] py-3 sm:py-3.5 text-sm sm:text-[15px] font-medium text-white shadow-[0_12px_24px_rgba(66,133,244,0.25)] transition hover:bg-[#3367D6]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
