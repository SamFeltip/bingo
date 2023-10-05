import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import {NotificationMethods} from "../../contexts/NotificationContext";


type ParticipantSheetItemProps = {
	id: number;
	position: number;
	SheetItem: {
		text: string;
	};
	checked: boolean;
}

export function Sheet() {

	const [loading, setLoading] = useState(false)
	const {setNotification} = useNotificationContext();
	const navigate = useNavigate();
	const [participantSheetItems, setParticipantSheetItems] = useState<ParticipantSheetItemProps[]>([
		{id: 0, position: 0, SheetItem: {text: ""}, checked: false},
		{id: 1, position: 1, SheetItem: {text: ""}, checked: false},
		{id: 2, position: 2, SheetItem: {text: ""}, checked: false},
		{id: 3, position: 3, SheetItem: {text: ""}, checked: false},
		{id: 4, position: 4, SheetItem: {text: ""}, checked: false},
		{id: 5, position: 5, SheetItem: {text: ""}, checked: false},
		{id: 6, position: 6, SheetItem: {text: ""}, checked: false},
		{id: 7, position: 7, SheetItem: {text: ""}, checked: false},
		{id: 8, position: 8, SheetItem: {text: ""}, checked: false},
		{id: 9, position: 9, SheetItem: {text: ""}, checked: false},
		{id: 10, position: 10, SheetItem: {text: ""}, checked: false},
		{id: 11, position: 11, SheetItem: {text: ""}, checked: false},
		{id: 12, position: 12, SheetItem: {text: ""}, checked: false},
		{id: 13, position: 13, SheetItem: {text: ""}, checked: false},
		{id: 14, position: 14, SheetItem: {text: ""}, checked: false},
		{id: 15, position: 15, SheetItem: {text: ""}, checked: false},
		{id: 16, position: 16, SheetItem: {text: ""}, checked: false},
		{id: 17, position: 17, SheetItem: {text: ""}, checked: false},
		{id: 18, position: 18, SheetItem: {text: ""}, checked: false},
		{id: 19, position: 19, SheetItem: {text: ""}, checked: false},
		{id: 20, position: 20, SheetItem: {text: ""}, checked: false},
		{id: 21, position: 21, SheetItem: {text: ""}, checked: false},
		{id: 22, position: 22, SheetItem: {text: ""}, checked: false},
		{id: 23, position: 23, SheetItem: {text: ""}, checked: false},
		{id: 24, position: 24, SheetItem: {text: ""}, checked: false}
	])


	const {id: sheet_id} = useParams()

	useEffect(() => {
		setLoading(true)

		fetch(`${process.env.REACT_APP_BACKEND_URL}/sheets/` + sheet_id, {
			method: "GET",
			credentials: 'include'
		}).then((res) => {
			if (!res.ok) {
				console.error(res)
				throw Error(`${res.status}: ${res.statusText}`)
			}

			if (res.status !== 200) {
				navigate("/login?authenticatedUrl=" + "sheets/" + sheet_id)
			} else {
				return res.json()
			}
		}).then((sheet) => {
			setParticipantSheetItems(sheet.Participants[0].ParticipantSheetItems)
			setLoading(false)

		}).catch(err => {
			setNotification({type: NotificationMethods.Error, message: err.message})
		})

	}, [])


	const toggleParticipantBlock = (participantSheetItem: ParticipantSheetItemProps) => {

		fetch(process.env.REACT_APP_BACKEND_URL + "/participantSheetItems/" + participantSheetItem.id, {
			method: "PATCH",
			credentials: 'include'
		}).then(res => {
			if (!res.ok) {
				throw Error(`error ${res.status} with error: ${res.statusText}`)
			}

			setParticipantSheetItems(prevParticipantSheetItems => {
				const newParticipantSheetItems = [...prevParticipantSheetItems]
				newParticipantSheetItems[participantSheetItem.position].checked = !participantSheetItem.checked
				return newParticipantSheetItems
			})
		}).catch(err => {
			console.log(err.message)
			setNotification({type: NotificationMethods.Error, message: 'could not send check to server'})

		})


	}

	return (
		<div className={"py-3 px-5 flex justify-center"}>
			{loading
				? "loading..."
				: (
					<div>
						<div className={'pb-2 flex justify-end'}>
							<button className={'bg-accent-default text-primary-default py-1 px-3 rounded-md'}>
								Submit
							</button>
						</div>

						<div className={'grid grid-cols-5 gap-[5px] min-w-[300px] max-w-[700px]'}>
							{participantSheetItems.map(pb =>
								<div
									key={'participantBlock' + pb.id}
									onClick={() => {
										toggleParticipantBlock(pb)
									}}
									className={
										'overflow-hidden cursor-pointer break-words ' +
										'rounded-md border-[1px] aspect-square text-[2vw] sm:text-[1rem]' +
										' flex justify-center items-center text-center' + (
											(pb.checked)
												? ' text-background-default bg-primary-default'
												: ' text-primary-default bg-background-default'
										)
									}>
									{pb?.SheetItem.text}
								</div>
							)}
						</div>
					</div>)
			}
		</div>
	);
}