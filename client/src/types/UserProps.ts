import {ParticipantProps} from "./ParticipantProps";

export type UserProps = {
	image: string;
	id: string;
	name: string;
	email: string;
	Participants: ParticipantProps[] | null;
};