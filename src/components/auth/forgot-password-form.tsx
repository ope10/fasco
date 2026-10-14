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
    <div className="space-y-7">
      {/* Page heading */}
      <h1 className="text-[1.5rem] font-normal text-[#222222]">Forget Password</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Row 1: First Name / Last Name */}
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="block text-[11px] text-[#777777]">First Name</label>
            <input
              placeholder="First Name"
              className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] text-[#777777]">Last Name</label>
            <input
              placeholder="Last Name"
              className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
            />
          </div>
        </div>

        {/* Row 2: Email / Phone */}
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="block text-[11px] text-[#777777]">Email Address</label>
            <input
              {...register("email")}
              placeholder="Email Address"
              className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
            />
            {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] text-[#777777]">Phone Number</label>
            <input
              placeholder="Phone Number"
              className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
            />
          </div>
        </div>

        {/* Send Confirmation Code button */}
        <button
          type="submit"
          className="mt-2 w-full rounded-[6px] bg-[#111111] py-3.5 text-sm font-semibold text-white transition hover:bg-[#333333]"
        >
          Send Confirmation Code
        </button>
      </form>

      {/* Already have account link */}
      <p className="text-center text-xs text-[#555555]">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-[#3b7de8] hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
