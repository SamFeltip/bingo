import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

function Login() {
	const [bannerMessage, setBannerMessage] = useState("");
	const { dispatch } = useAuthContext();
	const { signup, error, isLoading } = useSignup();
	const navigate = useNavigate();

	const loginWithGithub = () => {
		window.location.assign(
			"https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID,
		);
	};

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const codeParam = urlParams.get("code");
		const redirectParam = urlParams.get("authenticatedUrl");

		const getAccessToken = async (codeParam: string) => {
			try {
				console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/getAccessToken?code=` + codeParam);
				await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/getAccessToken?code=` + codeParam, {
					method: "POST",
					credentials: "include",
				});

				const get_user_data_response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/getUserData`, {
					method: "GET",
					credentials: "include",
				}).then((response) => {
					return response.json();
				});

				if (!get_user_data_response.success) {
					setBannerMessage(get_user_data_response.data);
				} else {
					const { current_user } = get_user_data_response.data;

					if (!current_user.id) {
						setBannerMessage("creating new account...");
						signup(current_user.email).then(() => {
							const redirect = localStorage.getItem("redirectWhenAuthenticated") || "";
							localStorage.removeItem("redirectWhenAuthenticated");
							navigate("/" + redirect);
						});
					} else {
						dispatch({
							type: "LOGIN",
							payload: current_user,
						});

						localStorage.setItem("current_user", JSON.stringify(current_user));

						const redirect = localStorage.getItem("redirectWhenAuthenticated") || "";
						localStorage.removeItem("redirectWhenAuthenticated");
						navigate("/" + redirect);
					}
				}
			} catch (err) {
				console.log("error!?");
				console.error(err);
			}
		};

		if (redirectParam) {
			localStorage.setItem("redirectWhenAuthenticated", redirectParam);
		}

		if (codeParam) {
			console.log("code param found, getting access token cookie");
			getAccessToken(codeParam);
		}
	}, []);

	return (
		<div className="flex text-center flex-col items-center py-[150px]">
			<div>
				{bannerMessage}
				{error}
			</div>
			<div className={"w-[200px] border-2 border-gray-500 rounded-md p-5"}>
				<h1 className={"font-bold text-lg pb-[50px]"}>Log in or Sign up</h1>

				<button
					disabled={isLoading}
					onClick={loginWithGithub}
					className={"border-2 border-black rounded-md p-2 disabled:border-gray-200 disabled:text-gray-200"}
				>
					Login with GitHub
				</button>
			</div>
		</div>
	);
}

export default Login;
