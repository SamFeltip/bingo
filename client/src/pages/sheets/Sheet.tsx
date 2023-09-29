import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export function Sheet() {

	const [sheet, setSheet] = useState({name: ""})
	const [loading, setLoading] = useState(false)

	const { id } = useParams()

	useEffect(() => {
		setLoading(true)

		const getSheet = async () => {
			return fetch(`${process.env.REACT_APP_BACKEND_URL}/sheets/` + id, {
				method: "GET",
				credentials: 'include'
			})
		}

		getSheet().then((res) => {
			if(res.status === 401){
				// TODO this can be requested by the server
				window.location.replace("/login?authenticatedUrl=" + "sheets/" + id)
			}else{
				return res.json()
			}
		}).then((fetched_sheet) => {
			setSheet(fetched_sheet)
			setLoading(false)
		})

	}, [])

	return (
		<div className={"py-3 px-5"}>
			{loading
				? "loading..."
				: sheet?.name
			}
		</div>
	);
}