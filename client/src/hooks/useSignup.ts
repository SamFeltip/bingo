import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useSignup = () => {

	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const {dispatch} = useAuthContext()

	const signup = async (email: String) => {
		setIsLoading(true)
		console.log('use signup hook is being used')

		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
			method: "POST",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({ email }),
		}).then((res) => {
			return res.json()
		}).then((json_res) => {
			localStorage.setItem("current_user", JSON.stringify(json_res.new_user))
			dispatch({
				type: 'LOGIN',
				payload: json_res.new_user
			})
			setIsLoading(false)
		}).catch(err => {
			console.log('error')
			setIsLoading(false)
			console.log(err)
			setError(err)
		})
	}

	return { signup, isLoading, error}

}