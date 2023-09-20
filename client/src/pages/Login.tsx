import React, {useEffect} from "react";

function Login() {

	const loginWithGithub = () => {
		window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID)
	}

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const codeParam = urlParams.get('code');

		const fetchUserData = async () => {

		}

		const getAccessToken = async (codeParam: String) => {
			try {
				await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
					method: "POST",
					credentials: 'include'
				})

				await fetch("http://localhost:4000/getUserData", {
					method: "GET",
					credentials: 'include'

				}).then((response) => {
					return response.json()
				}).then((response) => {

					console.log(response)
				})
			}catch(err){
				console.log('error!?')
				console.error(err)
			}

		}

		if(codeParam){
			console.log('code param found, getting access token cookie')
			getAccessToken(codeParam)
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