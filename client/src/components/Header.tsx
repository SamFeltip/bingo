import {useNavigate} from "react-router-dom";
import React from "react";

export function Header() {

	const navigate = useNavigate();

	return <div>
		<div className={"flex justify-between items-center p-2 bg-gray-100"}>

			<button className={"font-bold text-lg"} onClick={() => navigate('/')}>
				Bingo!
			</button>

			<button onClick={() => navigate('/login')}>
				Login
			</button>

		</div>
	</div>;
}