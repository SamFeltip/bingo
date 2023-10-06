import React, {useEffect, useState} from "react";
import {Participant} from "../../components/Participant";
import {UserProps} from "../../types/UserProps";
import axios from "axios";
import {useParams} from "react-router-dom";
import {ParticipantProps} from "../../types/ParticipantProps";

export function Participants() {

	const [uninvitedUsers, setUninvitedUsers] = useState<UserProps[]>([])
	const [invitedUsers, setInvitedUsers] = useState<UserProps[]>([])
	const [loading, setLoading] = useState(false)
	let {sheet_id} = useParams();

	useEffect(() => {
		setLoading(true)

		axios({
			method: 'get',
			url: `${process.env.REACT_APP_BACKEND_URL}/users?sheet_id=${sheet_id}`,
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true

		}).then(res => {

			setInvitedUsers(
				res.data.filter((user: { Participants: ParticipantProps[] }) => user.Participants.length > 0)
			)

			setUninvitedUsers(
				res.data.filter((user: { Participants: ParticipantProps[] }) => user.Participants.length == 0)
			)

			setLoading(false)
		}).catch(err => {
			console.error('Error creating sheet:', err);

		})

	}, [])

	useEffect(() => {
		console.log(invitedUsers)
	}, [invitedUsers])

	return (
		<div className={"py-3 px-7"}>
			<>
				{invitedUsers.map(user => <Participant key={user.id} {...user}/>)}

				<hr className={'pb-2'}/>

				{loading
					? "loading users..."
					: uninvitedUsers.map(user => <Participant key={user.id} {...user}/>)
				}
			</>
		</div>
	);
}