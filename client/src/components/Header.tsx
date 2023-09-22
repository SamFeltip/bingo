import {useNavigate} from "react-router-dom";
import React from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import {useNotificationContext} from "../hooks/useNotificationContext";
import {NotificationMethods} from "../contexts/NotificationContext";
import {useLogout} from "../hooks/useLogout";

export function Header() {

	const navigate = useNavigate();
	const { user } = useAuthContext();
	const {setNotification} = useNotificationContext();

	const { logout } = useLogout()

	const login_button = (
		<button onClick={() => navigate('/login')}>
			Login
		</button>
	)

	const handleLogOut = async () => {
		await logout()
		setNotification({type: NotificationMethods.Success, message: "Successfully Logged out"})
	}

	const user_logo = (
		<div className={'flex gap-4'}>
			<img src={user?.image} className={'w-[40px] rounded-full'} alt={'profile'}/>

			<button onClick={handleLogOut}>Log Out
			</button>
		</div>
	)

	return <div>
		<div className={"flex justify-between items-center p-2 bg-gray-100"}>

			<button className={"font-bold text-lg"} onClick={() => navigate('/')}>
				Bingo!
			</button>

			<div>
				{user
					? user_logo
					: login_button
				}
			</div>


		</div>
	</div>;
}