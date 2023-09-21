import React, {useEffect, useState} from "react";

function Login() {
	const [bannerMessage, setBannerMessage] = useState('')

	const loginWithGithub = () => {
		window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID)
	}

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const codeParam = urlParams.get('code');

		const getAccessToken = async (codeParam: String) => {
			try {

				const accessTokenResponse = await fetch("http://localhost:4000/auth/getAccessToken?code=" + codeParam, {
					method: "POST"
				})

				const get_user_data_response = await fetch("http://localhost:4000/auth/getUserData", {
					method: "GET",
					credentials: 'include'

				}).then((response) => {
					return response.json()
				})

				if(!get_user_data_response.success){
					console.log(get_user_data_response)
				}else{
					let {current_user} = get_user_data_response.data

					if(!current_user.id){
						setBannerMessage('no user exists yet!')

						fetch("http://localhost:4000/users/", {
							method: "POST",
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({ email: current_user.email }),
						}).then(res => {
							console.log('completed createUser')
							console.log(res)

							alert(`welcome, ${current_user.name}!`)
							console.log(current_user)
						})
					}else{

						alert(`welcome back, ${current_user.name}!`)
						console.log(current_user)
						window.location.replace('/')
					}

				}

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
			<div>
				{bannerMessage}
			</div>
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