import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useSignup = () => {

	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const {dispatch} = useAuthContext()

	const signup = async (email: String) => {
		setIsLoading(true)

		const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
			method: "POST",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({ email }),
		})

		const json_res = await res.json()

		if(!json_res.ok){
			setIsLoading(false)
			setError(json_res.error)
		}else{

			localStorage.setItem("current_user", JSON.stringify(json_res.new_user))
			dispatch({
				type: 'LOGIN',
				payload: json_res.new_user
			})
			setIsLoading(false)
		}
	}

	return { signup, isLoading, error}

}