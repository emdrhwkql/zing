import TanstackQueryProvider from "@/tanstack/query/client";

function ProvidersLayout({ children }: { children: React.ReactNode }) {
	return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}

export default ProvidersLayout;
