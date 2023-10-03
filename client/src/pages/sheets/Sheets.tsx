import React, {useEffect, useState} from "react";
import Sheet from "../../components/Sheet";
import {SheetProps} from "../../types/SheetProps";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import {NotificationMethods} from "../../contexts/NotificationContext";

export function Sheets() {

	const [sheets, setSheets] = useState<SheetProps[]>([])
	const [loading, setLoading] = useState(false)
	const {setNotification} = useNotificationContext();


	useEffect(() => {
		setLoading(true)

		fetch(`${process.env.REACT_APP_BACKEND_URL}/sheets`, {
			method: "GET",
			credentials: 'include'
		}).then((res) => {

			if(res.status === 401){
				setLoading(false)
				window.location.replace("/login?authenticatedUrl=" + "sheets")
			}else{
				return res.json()
			}
		}).then((fetched_sheets) => {
			setSheets(fetched_sheets)
			setLoading(false)
		}).catch(err => {
			setLoading(false)
			console.error(err)
			setNotification({type: NotificationMethods.Error, message: 'error while fetching sheets'})
		})

	}, [])

	const loading_sheets = (
		<>
			<Sheet key={"dummySheet1"} id={''} name={''} Participants={[]}/>
			<Sheet key={"dummySheet2"} id={''} name={''} Participants={[]}/>
		</>
	)

	return (
		<div className={"py-3 px-7"}>
			{loading
				? loading_sheets
				: sheets && sheets.map(sheet => <Sheet key={"sheet" + sheet.id} {...sheet}/>)
			}
		</div>
	);
}