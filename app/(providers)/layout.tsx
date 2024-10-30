import TanstackQueryProvider from "@/tanstack/query/client";
import AuthProvider from "./_providers/AuthProvider/AuthProvider";

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
