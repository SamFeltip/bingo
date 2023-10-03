import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import {useNotificationContext} from "../hooks/useNotificationContext";
import {NotificationMethods} from "../contexts/NotificationContext";
import {useLogout} from "../hooks/useLogout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'

export function Header() {

	const navigate = useNavigate();
	const { user } = useAuthContext();
	const {setNotification} = useNotificationContext();

	const { logout } = useLogout()

	const login_button = (
		<button className={'hover:text-primary-hover'} onClick={() => navigate('/login')}>
			Login
		</button>
	)

	const handleLogOut = async () => {
		await logout()
		window.location.replace("/")
		setNotification({type: NotificationMethods.Success, message: "Successfully Logged out"})

	}

	const user_logo = (
		<div className={'flex gap-4'}>
			<button onClick={handleLogOut} className={'hover:text-primary-hover gap-2 flex items-center'}>
				<div className={'italic'}>
					Log out
				</div>
				<FontAwesomeIcon icon={faArrowRightFromBracket} className={''}/>
			</button>
			<img src={user?.image} className={'w-[40px] rounded-full'} alt={'profile'}/>
		</div>
	)

	const login_links = (
		<>
			<Link to={'/sheets'} className={'hover:text-primary-hover'}>Sheets</Link>
		</>
	)

	return <div>
		<div className={"flex justify-between items-center p-2"}>
			<div className={'flex gap-3 items-center'}>

				<button className={"font-bold text-lg me-2 hover:text-primary-hover"} onClick={() => navigate('/')}>
					Bingo!
				</button>

				{user && login_links}
			</div>
			<div>
				{user
					? user_logo
					: login_button
				}
			</div>


		</div>
	</div>;
}