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
    <div className="space-y-7">
      {/* Page heading */}
      <h1 className="text-[1.5rem] font-normal text-[#222222]">Enter Your New Password</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-[11px] text-[#777777]">New Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="New Password"
            className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
          />
          {errors.password && <p className="text-[11px] text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] text-[#777777]">Confirmation Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirmation Password"
            className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
          />
          {errors.confirmPassword && <p className="text-[11px] text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit button — blue as in Figma */}
        <button
          type="submit"
          className="mt-2 w-full rounded-[6px] bg-[#4b7cf3] py-3.5 text-sm font-semibold text-white transition hover:bg-[#3a6be0]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
