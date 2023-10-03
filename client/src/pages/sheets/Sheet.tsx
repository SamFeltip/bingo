import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import {NotificationMethods} from "../../contexts/NotificationContext";


type ParticipantBlockProps = {
	id: number;
	text: String;
	checked: boolean;
}


// [
// 		{
// 			id: 0,
// 			text: "John spills their drink",
// 			checked: false
// 		},
// 		{
// 			id: 1,
// 			text: "unexpected karaoke performance",
// 			checked: false
// 		},
// 		{
// 			id: 2,
// 			text: "conga line",
// 			checked: false
// 		},
// 		{
// 			id: 3,
// 			text: "Emma takes a selfie",
// 			checked: false
// 		},
// 		{
// 			id: 4,
// 			text: "someone tells a bad joke",
// 			checked: false
// 		},
// 		{
// 			id: 5,
// 			text: "Mike loses their phone",
// 			checked: false
// 		},
// 		{
// 			id: 6,
// 			text: "someone requests a song from the DJ",
// 			checked: false
// 		},
// 		{
// 			id: 7,
// 			text: "Sarah starts a dance-off",
// 			checked: false
// 		},
// 		{
// 			id: 8,
// 			text: "someone sings along loudly to a song",
// 			checked: false
// 		},
// 		{
// 			id: 9,
// 			text: "David looses his drink",
// 			checked: false
// 		},
// 		{
// 			id: 10,
// 			text: "someone talks about work at a party",
// 			checked: false
// 		},
// 		{
// 			id: 11,
// 			text: "Lisa shows off a party trick",
// 			checked: false
// 		},
// 		{
// 			id: 12,
// 			text: "'I love the food'",
// 			checked: false
// 		},
// 		{
// 			id: 13,
// 			text: "Tom proposes a toast",
// 			checked: false
// 		},
// 		{
// 			id: 14,
// 			text: "someone starts talking about their pet",
// 			checked: false
// 		},
// 		{
// 			id: 15,
// 			text: "Sophie finds confetti in their drink",
// 			checked: false
// 		},
// 		{
// 			id: 16,
// 			text: "someone tries to DJ",
// 			checked: false
// 		},
// 		{
// 			id: 17, text: "James starts a hashtag",
// 			checked: false
// 		},
// 		{
// 			id: 18, text: "crazy dancing",
// 			checked: false
// 		},
// 		{
// 			id: 19,
// 			text: "Anna takes a group photo",
// 			checked: false
// 		},
// 		{
// 			id: 20,
// 			text: "'cant wait for next year!'",
// 			checked: false
// 		},
// 		{
// 			id: 21,
// 			text: "Chris finds an unexpected plus one",
// 			checked: false
// 		},
// 		{
// 			id: 22,
// 			text: "dan finds his new BFF",
// 			checked: false
// 		},
// 		{
// 			id: 23,
// 			text: "Emily talks about their favorite movie",
// 			checked: false
// 		},
// 		{
// 			id: 24,
// 			text: "someone can't stop laughing at a joke",
// 			checked: false
// 		}
// 	]

export function Sheet() {

	const [sheet, setSheet] = useState({name: ""})
	const [loading, setLoading] = useState(false)
	const {setNotification} = useNotificationContext();

	const [participantBlocks, setParticipantBlocks] = useState<ParticipantBlockProps[]>([
		{
			id: 0,
			text: "",
			checked: false
		},
		{
			id: 1,
			text: "",
			checked: false
		},
		{
			id: 2,
			text: "",
			checked: false
		},
		{
			id: 3,
			text: "",
			checked: false
		},
		{
			id: 4,
			text: "",
			checked: false
		},
		{
			id: 5,
			text: "",
			checked: false
		},
		{
			id: 6,
			text: "",
			checked: false
		},
		{
			id: 7,
			text: "",
			checked: false
		},
		{
			id: 8,
			text: "",
			checked: false
		},
		{
			id: 9,
			text: "",
			checked: false
		},
		{
			id: 10,
			text: "",
			checked: false
		},
		{
			id: 11,
			text: "",
			checked: false
		},
		{
			id: 12,
			text: "",
			checked: false
		},
		{
			id: 13,
			text: "",
			checked: false
		},
		{
			id: 14,
			text: "",
			checked: false
		},
		{
			id: 15,
			text: "",
			checked: false
		},
		{
			id: 16,
			text: "",
			checked: false
		},
		{
			id: 17,
			text: "",
			checked: false
		},
		{
			id: 18,
			text: "",
			checked: false
		},
		{
			id: 19,
			text: "",
			checked: false
		},
		{
			id: 20,
			text: "",
			checked: false
		},
		{
			id: 21,
			text: "",
			checked: false
		},
		{
			id: 22,
			text: "",
			checked: false
		},
		{
			id: 23,
			text: "",
			checked: false
		},
		{
			id: 24,
			text: "",
			checked: false
		}
	])

	const {id: sheet_id} = useParams()

	useEffect(() => {
		setLoading(true)

		const getSheet = async () => {
			return fetch(`${process.env.REACT_APP_BACKEND_URL}/sheets/` + sheet_id, {
				method: "GET",
				credentials: 'include'
			})
		}

		getSheet().then((res) => {
			if(!res.ok){
				throw Error(`${res.status}: ${res.statusText}`)
			}

			if (res.status === 401) {
				window.location.replace("/login?authenticatedUrl=" + "sheets/" + sheet_id)
			} else {
				return res.json()
			}
		}).then((fetched_sheet) => {
			setSheet(fetched_sheet)

			if(!fetched_sheet?.participant?.blocks){
				setLoading(false)
				throw Error('blocks could not be retrieved')
			}else{
				setParticipantBlocks(fetched_sheet?.participant?.blocks)
			}

			setLoading(false)
		}).catch(err => {
			console.error(err)
			setNotification({type: NotificationMethods.Error, message: err.message})
		})

	}, [])


	const toggleParticipantBlock = (participantBlock: ParticipantBlockProps) => {

		fetch(process.env.REACT_APP_BACKEND_URL + "/updateParticipantBlocks/" + participantBlock.id)
		.then(res => {
			if (!res.ok) {
				throw Error(`error ${res.status} with error: ${res.statusText}`)
			}
			setParticipantBlocks(prevParticipantBlocks => {
				const newParticipantBlocks = [...prevParticipantBlocks]
				newParticipantBlocks[participantBlock.id].checked = !participantBlock.checked
				return newParticipantBlocks
			})
		}).catch(err => {
			console.log("whoops!")
			console.log(err.message)
			setNotification({type: NotificationMethods.Error, message: 'could not send checkoff to server'})

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
							{participantBlocks.map(pb =>
								<div
									key={'participantBlock' + pb.id}
									onClick={() => {
										toggleParticipantBlock(pb)
									}}
									className={
										'overflow-hidden cursor-pointer rounded-md border-[1px] aspect-square text-[2vw] sm:text-[1rem] p-2 break-words' +
										' flex justify-center items-center text-center' + ((pb.checked) ? ' text-background-default bg-primary-default' : ' text-primary-default bg-background-default')
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