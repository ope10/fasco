import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] border border-[#e0e0e0] bg-[#f8f8f8] px-2.5 py-1 text-[11px] font-medium text-[#484848]",
        className,
      )}
    >
      {children}
    </span>
  );
}
