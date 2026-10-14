"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ code: z.string().min(1, "Please enter the confirmation code") });
type FormState = z.infer<typeof schema>;

export function ConfirmationCodeForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({ resolver: zodResolver(schema), defaultValues: { code: "" } });

  const onSubmit = (_data: FormState) => {
    router.push("/reset-password");
  };

  return (
    <div className="space-y-7">
      {/* Page heading */}
      <h1 className="text-[1.5rem] font-normal text-[#222222]">Enter The Confirmation Code</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-[11px] text-[#777777]">Confirmation Code</label>
          <input
            {...register("code")}
            placeholder="Confirmation Code"
            className="w-full border-0 border-b border-[#cccccc] bg-transparent pb-2 text-sm text-[#222222] outline-none placeholder:text-[#bbbbbb] focus:border-[#222222]"
          />
          {errors.code && <p className="text-[11px] text-red-500">{errors.code.message}</p>}
        </div>

        {/* Recover Account button */}
        <button
          type="submit"
          className="w-full rounded-[6px] bg-[#111111] py-3.5 text-sm font-semibold text-white transition hover:bg-[#333333]"
        >
          Recover Account
        </button>
      </form>

      {/* Resend link */}
      <p className="text-center text-xs text-[#555555]">
        Didn&apos;t receive Confirmation Code?{" "}
        <button type="button" className="text-[#3b7de8] hover:underline">
          Resend Now
        </button>
      </p>
    </div>
  );
}
