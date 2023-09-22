import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useLogout = () => {

	const [isLoading, setIsLoading] = useState(false)
	const {dispatch} = useAuthContext()

	const logout = async () => {

		setIsLoading(true)
		localStorage.removeItem("current_user")
		dispatch({
			type: 'LOGOUT'
		})
		setIsLoading(false)
	}

	return { logout, isLoading}

}