import React, {createContext, ReactNode, useEffect, useReducer} from "react";

type User = {
	id: string;
	email: string;
	name: string;
	image: string;
};

type AuthAction = {
	type: 'LOGIN' | 'LOGOUT';
	payload?: User;
};

const authReducer = ( state: {user: User | null}, action: AuthAction): { user: User | null } => {
	switch (action.type) {
		case 'LOGIN':
			console.log('login happening via dispatch')
			return {user: action.payload || null};
		case 'LOGOUT':
			return {user: null};
		default:
			console.log('default state via dispatch')
			return state;
	}
};

const AuthContext = createContext<{user: User | null, dispatch: React.Dispatch<AuthAction>;}>({
	user: null,
	dispatch: () => {}
});

const AuthContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {user: null});

	useEffect(() => {
		const local_storage_user = localStorage.getItem('current_user')
		const user = local_storage_user && JSON.parse(local_storage_user)

		if(user){
			dispatch({type: "LOGIN", payload: user})
		}

	}, [])

	console.log(`state user: ${state?.user}`)

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };