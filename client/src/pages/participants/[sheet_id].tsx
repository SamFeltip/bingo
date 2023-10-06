import React, {useEffect, useState} from "react";
import {Participant} from "../../components/Participant";
import {UserProps} from "../../types/UserProps";
import axios from "axios";
import {useParams} from "react-router-dom";
import {ParticipantProps} from "../../types/ParticipantProps";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import {NotificationMethods} from "../../contexts/NotificationContext";

export function Participants() {

	const [uninvitedUsers, setUninvitedUsers] = useState<UserProps[]>([])
	const [invitedUsers, setInvitedUsers] = useState<UserProps[]>([])
	const [loading, setLoading] = useState(false)
	let {sheet_id} = useParams();
	const {setNotification} = useNotificationContext();

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

	const handle_invite = (user: UserProps) => {
		const {id} = user

		if(invitedUsers.map(invited_user => invited_user.id).includes(id)){
			console.log('user invited already')
			setInvitedUsers(prevInvitedUsers => (
				prevInvitedUsers.filter(invitedUser => invitedUser.id !== id)
			))

			user.Participants = []

			setUninvitedUsers(prevUninvitedUsers => [...prevUninvitedUsers, user])

		}else{
			axios({
				url: `${process.env.REACT_APP_BACKEND_URL}/participants`,
				method: 'post',
				data: {inviting_user_id: user.id, sheet_id},
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: true
			}).then(response => {
				if(response.data.ok){
					const {new_participant} = response.data

					setUninvitedUsers(prevUninvitedUsers => (
						prevUninvitedUsers.filter(uninvitedUser => uninvitedUser.id !== id)
					))

					user.Participants.push(new_participant)

					setInvitedUsers(prevInvitedUsers => [...prevInvitedUsers, user])
				}

			}).catch(err => {
				console.error(err)
				setNotification({type: NotificationMethods.Error, message: 'unable to create participant'})
			})


		}
	};
	return (
		<div className={"py-3 px-7"}>
			<>
				<div>
					{loading
						? "loading invited users..."
						: invitedUsers.map(user => <Participant key={user.id} handle_invite={handle_invite} user={user}/>)
					}
					<p className={'italic'}>{invitedUsers.length} players</p>
				</div>

				<hr className={'pb-2'}/>

				{loading
					? "loading users..."
					: uninvitedUsers.map(user => <Participant key={user.id} handle_invite={handle_invite} user={user}/>)
				}
			</>
		</div>
	);
}