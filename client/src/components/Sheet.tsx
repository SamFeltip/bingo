import React from 'react';
import {SheetProps} from "../types/SheetProps";
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'


const Sheet: React.FC<SheetProps> = ({id, name, Participants}) => {
	return (
		<div className={'pb-3'}>
			<Link className={'flex flex-col gap-2 p-3 border-[1px] border-gray-400 rounded-sm'}
				  to={`/sheets/${id}`}>
				<h2 className={'font-lg font-bold'}>{name}</h2>
				<div className={'flex gap-3'}>
					{Participants.map(participant => (
						<div key={"participant" + participant.id} className={'flex items-end'}>
							<img className={'w-[30px] rounded-full'} src={participant.User.image} alt={participant.User.name}/>
							{participant.isOwner && (
								<FontAwesomeIcon icon={faCrown} className={'w-[14px] h-[14px] text-accent-default translate-x-[-10px] translate-y-[5px] ' +
									' bg-primary-default border-2 border-primary-default rounded-full'}/>
							)}
						</div>))}
				</div>
			</Link>
		</div>
	);
};

export default Sheet;
