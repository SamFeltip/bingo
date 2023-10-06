import React from 'react';
import {UserProps} from "../types/UserProps";
import {Link} from "react-router-dom";

const User: React.FC<UserProps> = ({ id, name, image}) => {
	return (

		<div>
			<Link className={'flex gap-2 py-2 items-center hover:scale-105 hover:text-black'} to={`/users/${id}`}>
				<img className={'w-[30px] rounded-full'} src={image} alt="user"/>
				<h2 className={'font-lg font-bold text-gray-500 hover:text-black'}>{name}</h2>
			</Link>
		</div>
	);
};

export default User;
