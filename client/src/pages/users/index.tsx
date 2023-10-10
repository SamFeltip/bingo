import React, { useEffect, useState } from "react";
import User from "../../components/User";
import { UserProps } from "../../types/UserProps";

export function Users() {
	const [users, setUsers] = useState<UserProps[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const getUsers = async () => {
			return fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
				method: "GET",
				credentials: "include",
			});
		};

		getUsers()
			.then((res) => {
				return res.json();
			})
			.then((fetched_users) => {
				console.log(fetched_users);
				setUsers(fetched_users);
				setLoading(false);
			});
	}, []);

	return <div className={"py-3 px-7"}>{loading ? "loading..." : users.map((user) => <User {...user} />)}</div>;
}
