export function useToast() {
  return {
    toast: (message: string) => {
      if (typeof window !== "undefined") {
        window.alert(message);
      }
    },
  };
}
