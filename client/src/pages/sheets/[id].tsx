import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import {NotificationMethods} from "../../contexts/NotificationContext";


type ParticipantSheetItemProps = {
	isOwner: boolean;
	id: number;
	position: number;
	text: String;
	checked: boolean;
}

export function Sheet() {

	const [loading, setLoading] = useState(false)
	const {setNotification} = useNotificationContext();
	const navigate = useNavigate();
	const [participantSheetItems, setParticipantSheetItems] = useState<ParticipantSheetItemProps[]>([
		{isOwner: false, id: 0, position: 0, text: "", checked: false},
		{isOwner: false, id: 1, position: 1, text: "", checked: false},
		{isOwner: false, id: 2, position: 2, text: "", checked: false},
		{isOwner: false, id: 3, position: 3, text: "", checked: false},
		{isOwner: false, id: 4, position: 4, text: "", checked: false},
		{isOwner: false, id: 5, position: 5, text: "", checked: false},
		{isOwner: false, id: 6, position: 6, text: "", checked: false},
		{isOwner: false, id: 7, position: 7, text: "", checked: false},
		{isOwner: false, id: 8, position: 8, text: "", checked: false},
		{isOwner: false, id: 9, position: 9, text: "", checked: false},
		{isOwner: false, id: 10, position: 10, text: "", checked: false},
		{isOwner: false, id: 11, position: 11, text: "", checked: false},
		{isOwner: false, id: 12, position: 12, text: "", checked: false},
		{isOwner: false, id: 13, position: 13, text: "", checked: false},
		{isOwner: false, id: 14, position: 14, text: "", checked: false},
		{isOwner: false, id: 15, position: 15, text: "", checked: false},
		{isOwner: false, id: 16, position: 16, text: "", checked: false},
		{isOwner: false, id: 17, position: 17, text: "", checked: false},
		{isOwner: false, id: 18, position: 18, text: "", checked: false},
		{isOwner: false, id: 19, position: 19, text: "", checked: false},
		{isOwner: false, id: 20, position: 20, text: "", checked: false},
		{isOwner: false, id: 21, position: 21, text: "", checked: false},
		{isOwner: false, id: 22, position: 22, text: "", checked: false},
		{isOwner: false, id: 23, position: 23, text: "", checked: false},
		{isOwner: false, id: 24, position: 24, text: "", checked: false}
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
		}).then((fetched_participant_sheet_items) => {
			setParticipantSheetItems(fetched_participant_sheet_items)
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
									{pb?.text}
								</div>
							)}
						</div>
					</div>)
			}
		</div>
	);
}