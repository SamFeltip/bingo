import {UserProps} from "./UserProps";

export type SheetProps = {
	id: string;
	name: string;
	Participants: {
		id: string;
		User: UserProps;
		isOwner: boolean
	}[];
};