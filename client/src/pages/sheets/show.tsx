import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import {NotificationMethods} from "../../contexts/NotificationContext";
import {ParticipantProps} from "../../types/ParticipantProps";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

type ParticipantSheetItemProps = {
	id: number;
	position: number;
	SheetItem: {
		text: string;
	};
	checked: boolean;
}

export function ShowSheet() {

	const [loading, setLoading] = useState(false)
	const {setNotification} = useNotificationContext();

	const [participantSheetItems, setParticipantSheetItems] = useState<ParticipantSheetItemProps[]>([])
	const [participant, setParticipant] = useState<ParticipantProps>()

	const {id: sheet_id} = useParams()

	const createParticipantSheetItems = (participant_id: string) => {
		axios({
			method: 'post',
			url: `${process.env.REACT_APP_BACKEND_URL}/participantSheetItems/${participant_id}`,
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		}).then((res) => {
			if(res.data.ok){
				console.log(res.data)
				setParticipantSheetItems(res.data.participant_sheet_items)
			}else{
				console.error(res.data.message)
				setNotification({type: NotificationMethods.Error, message: res.data.message})
			}
		}).catch(error => {
			console.error(error)
			setNotification({type: NotificationMethods.Error, message: 'unable to build a new sheet'})

		})
	}

	useEffect(() => {
		setLoading(true)

		axios({
			method: 'get',
			url: `${process.env.REACT_APP_BACKEND_URL}/sheets/${sheet_id}`,
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true

		}).then((res) => {
			if (res.data.ok) {
				const {sheet} = res.data
				setParticipant(sheet.Participants[0])

				if (sheet.Participants[0].ParticipantSheetItems.length == 0) {
					createParticipantSheetItems(sheet.Participants[0].id)
				} else {
					setParticipantSheetItems(sheet.Participants[0].ParticipantSheetItems)
				}

				setLoading(false)

			} else {
				setNotification({type: NotificationMethods.Error, message: res.data.message})

			}
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
		participant?.isOwner
			? (<div className={'min-w-[300px] max-w-[700px] text-center'}>
				<div>
					invite friends to start the game!
				</div>
				<div>
					<Link
						to={'/participants/' + sheet_id}
						className={'bg-accent-default text-primary-default py-1 px-3 rounded-md '}
					>
						Get started
					</Link>
				</div>
			</div>)
			: (
				<div>
					The creator of this bingo game needs to create the bingo sheets before you can begin
				</div>
			));

	return (
		<div className={"py-3 px-5 flex justify-center"}>
			{loading
				? "loading..."
				: participantSheetItems.length == 0
					? start_game_message
					: (
						<div>
							<div className={`pb-2 flex ${participant?.isOwner ? 'justify-between' : 'justify-end'}`}>
								{participant?.isOwner && (
									<Link to={'/sheets/' + sheet_id + "/edit"}>
										<FontAwesomeIcon icon={faGear}/>
									</Link>
								)}
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
										{pb?.SheetItem?.text}
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