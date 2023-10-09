import React, {useState} from "react";
import User from "./User"
import {UserProps} from "../types/UserProps";

type ParticipantComponentProps = {
	user: UserProps;
	handle_invite: (user: UserProps) => void;
}
export const Participant: React.FC<ParticipantComponentProps> = ({user, handle_invite}) => {
	const {id, name, image, Participants} = user
	const [participant] = useState(Participants[0])

	return (
		<div className={'flex flex-row justify-between pb-2'}>
			<User id={id} name={name} image={image} Participants={Participants}/>
			{
				Participants.length == 0
					? (
						<button
							onClick={() => {handle_invite({id, name, image, Participants})}}
							className={'bg-accent-default px-3 rounded-md hover:bg-accent-hover'}
						>
							Invite
						</button>
					) : (
						<button
							disabled={participant?.isOwner}
							onClick={() => {!participant.isOwner && handle_invite({id, name, image, Participants})}}
							className={'bg-background-default border-primary-default border-[1px] px-3 rounded-md'}>
							{participant.isOwner ? "Owner" : "Remove"}
						</button>
					)}

		</div>
	)
}