import { Suspense } from "react";
import OrderConfirmationContent from "./order-confirmation-content";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ececec] border-t-black" />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
