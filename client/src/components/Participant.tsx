import React, { useEffect, useState } from "react";
import User from "./User";
import { UserProps } from "../types/UserProps";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type ParticipantComponentProps = {
	user: UserProps;
	handle_invite: (user: UserProps) => void;
};
export const Participant: React.FC<ParticipantComponentProps> = ({ user, handle_invite }) => {
	const { id, name, image, Participants } = user;
	const [participant] = useState(Participants[0]);
	const [loading, setLoading] = useState(false);
	const [participantSheetItems, setParticipantSheetItems] = useState<{ checked: boolean; position: number }[]>([]);
	useEffect(() => {
		setLoading(true);
		if (participant) {
			axios({
				method: "get",
				url: `${process.env.REACT_APP_BACKEND_URL}/participants?user_id=${participant.UserId}&sheet_id=${participant.SheetId}`,
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			})
				.then((response) => {
					if (response.data.ok) {
						setParticipantSheetItems(response.data.participant?.ParticipantSheetItems);
					} else {
						console.error(response.data.message);
					}
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, []);

	const loading_board = (
		<div className={"animate-spinx flex text-accent-hover"}>
			<FontAwesomeIcon icon={faSpinner} />
		</div>
	);

	const participant_board = (
		<div className={"grid grid-cols-5 gap-[1px]"}>
			{participantSheetItems &&
				participantSheetItems.map((participant_sheet_item) => {
					return (
						<div
							key={"participantBlock" + participant_sheet_item.position}
							className={
								"overflow-hidden cursor-pointer break-words " +
								"border-[2px] aspect-square text-[2vw] sm:text-[1rem]" +
								" flex justify-center items-center text-center" +
								(participant_sheet_item.checked ? " border-accent-default" : " border-primary-default")
							}
						></div>
					);
				})}
		</div>
	);

	return (
		<div className={"pb-2 flex flex-row items-center gap-2"}>
			{participant && (
				<div
					className={
						"border-[1px] rounded-sm border-primary-default aspect-square flex items-center justify-center " +
						" h-[30px]"
					}
				>
					{loading ? loading_board : participant_board}
				</div>
			)}
			<div className={"flex flex-row justify-between w-full"}>
				<User id={id} name={name} image={image} Participants={Participants} />
				{Participants.length == 0 ? (
					<button
						onClick={() => {
							handle_invite({ id, name, image, Participants });
						}}
						className={"bg-accent-default px-3 rounded-md hover:bg-accent-hover"}
					>
						Invite
					</button>
				) : (
					<button
						disabled={participant?.isOwner}
						onClick={() => {
							!participant.isOwner &&
								handle_invite({
									id,
									name,
									image,
									Participants,
								});
						}}
						className={"bg-background-default border-primary-default border-[1px] px-3 rounded-md"}
					>
						{participant.isOwner ? "Owner" : "Remove"}
					</button>
				)}
			</div>
		</div>
	);
};
