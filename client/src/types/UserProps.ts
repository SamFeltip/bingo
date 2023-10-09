import {ParticipantProps} from "./ParticipantProps";

export type UserProps = {
	image: string;
	id: string;
	name: string;
	Participants: ParticipantProps[];
};