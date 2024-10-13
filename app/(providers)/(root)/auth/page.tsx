import LoginPage from "./log-in/page";
import SignUpPage from "./sign-up/page";

function AuthPage() {
	return (
		<div className="flex flex-row gap-x-10">
			<SignUpPage />

			<LoginPage />
		</div>
	);
}

export default AuthPage;
