import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
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
	const [participantSheetItems, setParticipantSheetItems] = useState<ParticipantSheetItemProps[]>([])


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

	const start_game_message = (
		<div className={'min-w-[300px] max-w-[700px] text-center'}>
			<div>
				create a game and invite friends to get started!
			</div>
			<div>
				<Link to={'/participants/' + sheet_id} className={'bg-accent-default text-primary-default py-1 px-3 rounded-md '}>
					Get started
				</Link>
			</div>
		</div>);

	return (
		<div className={"py-3 px-5 flex justify-center"}>
			{loading
				? "loading..."
				: participantSheetItems.length == 0
					? start_game_message
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
										}
									>
										{pb?.SheetItem.text}
									</div>
								)}
							</div>
						</div>
					)
			}
		</div>
	)
		;
}