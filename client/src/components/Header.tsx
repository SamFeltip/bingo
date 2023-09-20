import {useNavigate} from "react-router-dom";
import React from "react";
import login from "../pages/Login";

export function Header() {

	const navigate = useNavigate();

	const login_button = (
		<button onClick={() => navigate('/login')}>
			Login
		</button>
	)

	const user_logo = (
		<button onClick={() => {localStorage.removeItem('accessToken')}}>Log Out</button>
	)

	return <div>
		<div className={"flex justify-between items-center p-2 bg-gray-100"}>

			<button className={"font-bold text-lg"} onClick={() => navigate('/')}>
				Bingo!
			</button>

			{
				localStorage.getItem("accessToken")
				? user_logo
				: login_button
			}



		</div>
	</div>;
}