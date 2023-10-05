import React, {useEffect, useState} from "react";
import Sheet from "../../components/Sheet";
import {SheetProps} from "../../types/SheetProps";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import {NotificationMethods} from "../../contexts/NotificationContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilSquare} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";

export function Sheets() {

	const [sheets, setSheets] = useState<SheetProps[]>([])
	const [loading, setLoading] = useState(false)
	const {setNotification} = useNotificationContext();
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true)

		fetch(`${process.env.REACT_APP_BACKEND_URL}/sheets`, {
			method: "GET",
			credentials: 'include'
		}).then((res) => {

			if(res.status === 401){
				setLoading(false)
				navigate("/login?authenticatedUrl=" + "sheets")
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
			<div className="flex pb-2 justify-end">
				<Link to={"/sheets/new"} className={'bg-accent-default text-primary-default py-1 px-3 rounded-md flex gap-1 items-center'}>
					Create Sheet
					<FontAwesomeIcon icon={faPencilSquare}/>
				</Link>
			</div>

			{loading
				? loading_sheets
				: sheets && sheets.map(sheet => <Sheet key={"sheet" + sheet.id} {...sheet}/>)
			}
		</div>
	);
}