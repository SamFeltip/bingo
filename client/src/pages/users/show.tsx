import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function User() {
	const [user, setUser] = useState({ name: "" });
	const [loading, setLoading] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		setLoading(true);

		const getUser = async () => {
			return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/` + id, {
				method: "GET",
				credentials: "include",
			});
		};

		getUser()
			.then((res) => {
				return res.json();
			})
			.then((fetched_user) => {
				console.log(fetched_user);
				setUser(fetched_user);
				setLoading(false);
			});
	}, []);

	return <div className={"py-3 px-5"}>{loading ? "loading..." : user?.name}</div>;
}
