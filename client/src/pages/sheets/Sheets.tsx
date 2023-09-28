import React, {useEffect, useState} from "react";
import Sheet from "../../components/Sheet";
import {SheetProps} from "../../types/SheetProps";

export function Sheets() {

	const [sheets, setSheets] = useState<SheetProps[]>([])
	const [loading, setLoading] = useState(false)


	useEffect(() => {
		setLoading(true)

		const getSheets = async () => {
			return fetch(`${process.env.REACT_APP_BACKEND_URL}/sheets`, {
				method: "GET",
				credentials: 'include'
			})
		}

		getSheets().then((res) => {
			return res.json()
		}).then((fetched_sheets) => {
			setSheets(fetched_sheets)
			setLoading(false)
		})

	}, [])

	return (
		<div className={"py-3 px-7"}>
			{loading
				? "loading..."
				: sheets.map(sheet => <Sheet key={"sheet" + sheet.id} {...sheet}/>)
			}
		</div>
	);
}