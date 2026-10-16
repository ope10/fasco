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
    <div className="w-full">
      {/* Title */}
      <h1 className="font-display text-[22px] sm:text-[25px] font-semibold text-[#222222] mb-4 sm:mb-5 leading-snug">
        Enter The Confirmation Code
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        <div className="space-y-0.5">
          <input
            {...register("code")}
            placeholder="Confirmation Code"
            className="w-full border-0 border-b border-[#D1D5DB] bg-transparent pb-2 pt-1 text-sm sm:text-[15px] text-[#222222] outline-none placeholder:text-[#9E9E9E] placeholder:font-normal focus:border-[#222222] transition-colors"
          />
          {errors.code && <p className="text-[11px] text-red-500">{errors.code.message}</p>}
        </div>

        {/* Recover Account button */}
        <div className="pt-2 space-y-2.5">
          <button
            type="submit"
            className="w-full rounded-[8px] bg-black py-3 sm:py-3.5 text-sm sm:text-[15px] font-medium text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:bg-[#222222]"
          >
            Recover Account
          </button>

          {/* Resend link */}
          <p className="text-center text-xs sm:text-[13px] text-[#555555]">
            Didn&apos;t receive Confirmation Code?{" "}
            <button type="button" className="text-[#4285F4] font-medium hover:underline">
              Resend Now
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
