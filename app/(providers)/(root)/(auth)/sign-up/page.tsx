import Page from "@/components/Page";
import SignUpForm from "./_components/SignUpForm";

function SignUpPage() {
	return (
		<Page>
			<h1 className="text-center my-10 font-bold text-2xl">회원가입</h1>

			<SignUpForm />
		</Page>
	);
}

export default SignUpPage;
