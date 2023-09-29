import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useLogout = () => {

	const [isLoading, setIsLoading] = useState(false)
	const {dispatch} = useAuthContext()

	const logout = async () => {

		setIsLoading(true)

		dispatch({
			type: 'LOGOUT'
		})

		await localStorage.removeItem("current_user")

		// send request to the server to delete the "session_token" and "oauth_access_token" http only cookies

		try {


			await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/deleteSessionCookie`, {
				method: "POST",
				credentials: 'include'
			})

		}catch (err){
			console.error(err)
		}

		setIsLoading(false)
	}

	return { logout, isLoading }

}