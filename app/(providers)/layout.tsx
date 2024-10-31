import TanstackQueryProvider from "@/tanstack/query/client";
import AuthProvider from "./_providers/AuthProvider/AuthProvider";
import ModalProvider from "./_providers/AuthProvider/ModalProvider";

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
