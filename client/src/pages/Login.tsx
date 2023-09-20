import React, {useEffect} from "react";

function Login() {

	const loginWithGithub = () => {
		window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID)
	}

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const codeParam = urlParams.get('code');

		// TODO dont use local storage to make this more secure
		if(codeParam && (localStorage.getItem("accessToken") === null)){
			const getAccessToken = async () => {
				await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
					method: "GET"
				}).then((response) => {
					return response.json()
				}).then((data) => {
					console.log(data)

					if(data.access_token){
						localStorage.setItem("accessToken", data.access_token)
					}
				})
			}
			getAccessToken()
		}

	}, [])

	return (
		<div className="flex text-center flex-col items-center py-[150px]">
			<div className={'w-[200px] border-2 border-gray-500 rounded-md p-5'}>
				<h1 className={'font-bold text-lg pb-[50px]'}>
					Log in or Sign up
				</h1>

				<button onClick={loginWithGithub} className={'border-2 border-black rounded-md p-2'}>
					Login with GitHub
				</button>
			</div>

		</div>
	)
}

export default Login;