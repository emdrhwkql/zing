import Page from "@/components/Page";
import LoginForm from "./_components/LoginForm";

function LoginPage() {
	return (
		<Page>
			<h1 className="text-center my-10 font-bold text-2xl">로그인</h1>
			<LoginForm />
		</Page>
	);
}

export default LoginPage;
