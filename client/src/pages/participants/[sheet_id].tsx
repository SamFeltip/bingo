import React, {useEffect, useState} from "react";
import {Participant} from "../../components/Participant";
import {UserProps} from "../../types/UserProps";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {ParticipantProps} from "../../types/ParticipantProps";
import {useNotificationContext} from "../../hooks/useNotificationContext";
import {NotificationMethods} from "../../contexts/NotificationContext";
import {SheetProps} from "../../types/SheetProps";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons";

export function Participants() {

	const [uninvitedUsers, setUninvitedUsers] = useState<UserProps[]>([])
	const [invitedUsers, setInvitedUsers] = useState<UserProps[]>([])
	const [loading, setLoading] = useState(false)
	const [sheet, setSheet] = useState<SheetProps>()

	let {sheet_id} = useParams();
	const {setNotification} = useNotificationContext();

	useEffect(() => {

		axios({
			method: 'get',
			url: `${process.env.REACT_APP_BACKEND_URL}/sheets/${sheet_id}`,
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true

		}).then((res) => {
			if (res.data.ok) {
				setSheet(res.data.sheet)
			} else {
				setNotification({type: NotificationMethods.Error, message: res.data.message})

			}
		}).catch(error => {
			console.error(error)
			setNotification({type: NotificationMethods.Error, message: "could not retrieve sheet"})
		})
	}, [])

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

	const add_participant = (user: UserProps, sheet_id: string) => {
		axios({
			url: `${process.env.REACT_APP_BACKEND_URL}/participants`,
			method: 'post',
			data: {inviting_user_id: user.id, sheet_id},
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		}).then(response => {
			if (response.data.ok) {
				const {new_participant} = response.data

				setUninvitedUsers(prevUninvitedUsers => (
					prevUninvitedUsers.filter(uninvitedUser => uninvitedUser.id !== user.id)
				))

				user.Participants.push(new_participant)
				setInvitedUsers(prevInvitedUsers => [...prevInvitedUsers, user])

				return new_participant
			} else {
				setNotification({type: NotificationMethods.Error, message: response.data.message})
			}

		}).catch(err => {
			console.error(err)
			setNotification({type: NotificationMethods.Error, message: 'unable to create participant'})
		})
	}

	const remove_participant = (user: UserProps, sheet_id: string) => {
		axios({
			url: `${process.env.REACT_APP_BACKEND_URL}/participants`,
			method: 'delete',
			data: {inviting_user_id: user.id, sheet_id},
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		}).then((response) => {
			if (response.data.ok) {
				setInvitedUsers(prevInvitedUsers => (
					prevInvitedUsers.filter(invitedUser => invitedUser.id !== user.id)
				))

				user.Participants = []

				setUninvitedUsers(prevUninvitedUsers => [...prevUninvitedUsers, user])
			} else {
				setNotification({type: NotificationMethods.Error, message: response.data.message})
			}

		}).catch(err => {
			console.error(err)
			setNotification({type: NotificationMethods.Error, message: 'unable to remove participant'})
		})
	}

	const handle_invite = (user: UserProps) => {
		const {id} = user
		if (sheet_id) {
			if (invitedUsers.map(invited_user => invited_user.id).includes(id)) {
				if(window.confirm(
					'are you sure you want to remove this person? their board will be deleted and progress will be lost'
				)){
					remove_participant(user, sheet_id)
				}

			} else {
				add_participant(user, sheet_id)
			}
		} else {
			setNotification({type: NotificationMethods.Error, message: 'no sheet id found in URL'})
		}
	};

	return (
		<div className={"py-3 px-7"}>
			<div className={'pb-3'}>
				<h1 className={'font-bold text-xl pb-2'}>
					{sheet && sheet.name}
				</h1>
				<div className={'flex justify-end'}>
					<Link to={'/sheets/' + sheet_id}
						  className={'flex flex-row gap-2 items-center rounded-md py-1 px-3 bg-accent-default'}>
						Continue
						<FontAwesomeIcon icon={faArrowAltCircleRight}/>
					</Link>
				</div>
			</div>
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

		</div>
	);
}