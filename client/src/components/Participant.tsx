import React from "react";
import {UserProps} from "../types/UserProps";
import User from "./User"

export const Participant: React.FC<UserProps> = ({ id, name, image, Participants}) => {
	return (
		<div className={'flex flex-row justify-between pb-2'}>
			<User id={id} name={name} image={image} Participants={Participants}/>
			{
				Participants.length == 0
					? (
						<button className={'bg-accent-default px-3 rounded-md hover:bg-accent-hover'}>
							Invite
						</button>
					) : (
						<button
							className={'bg-background-default border-primary-default border-[1px] px-3 rounded-md'}>
							{Participants[0].isOwner ? "Owner" : "Invited"}
						</button>
					)}

		</div>
	)
}