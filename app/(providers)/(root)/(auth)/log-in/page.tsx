import Page from "@/components/Page";
import LogInForm from "./_components/LogInForm";

function LogInPage() {
	return (
		<Page>
			<h1 className="text-center mb-10 pt-10 font-bold text-2xl">
				로그인
			</h1>

			<LogInForm />
		</Page>
	);
}

export default LogInPage;
