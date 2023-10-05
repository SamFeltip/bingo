import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export function CreateSheet() {
	const [name, setName] = useState('');
	const [items, setItems] = useState([{text: ''}]);
	const navigate = useNavigate();

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newItems = [...items];
		newItems[index].text = e.target.value;
		setItems(newItems);
	};


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await axios.post(process.env.REACT_APP_BACKEND_URL + '/sheet', {name, items});
			alert('Sheet created successfully!');
			navigate('/sheets');
		} catch (error) {
			console.error('Error creating sheet:', error);
		}
	};

	const handleDelete = (index: number) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
	};

	return (
		<div className={'flex justify-center'}>
			<form onSubmit={handleSubmit} className={'flex flex-col gap-3 w-full max-w-lg'}>
				<div>
					<label>
						Name:
						<br/>
						<input
							className={'bg-background-default border-[1px] px-2 py-1 w-full border-primary-default rounded-md'}
							type="text"
							value={name}
							onChange={handleNameChange}
							required
						/>
					</label>
				</div>
				<div className={'flex gap-2 flex-col'}>
					<h2 className={'font-bold'}>
						Sheet Items
					</h2>
					<div>
						{items.map((item, index) => (
							<label key={index} className={'flex flex-col gap-1 pb-3'}>
								<div>
									Sheet Item {index + 1}:
								</div>
								<div className={'flex gap-1'}>
									<input
										className={'px-2 py-1 bg-background-default border-[1px] border-primary-default rounded-md'}
										type="text"
										value={item.text}
										onChange={(e) => handleItemChange(e, index)}
										required
									/>
									<button type="button" onClick={() => handleDelete(index)}>
										<FontAwesomeIcon icon={faTrash}/>
									</button>
								</div></label>
						))}
					</div>
					<div className={'flex justify-end'}>
						<button
							className={'border-[1px] border-primary-default rounded-md px-2 py-1'}
							type="button"
							onClick={() => setItems([...items, {text: ''}])}
						>
							Add Item
						</button>
					</div>
				</div>
				<div className={'flex justify-end'}>
					<button type="submit"
							className={'bg-accent-default text-primary-default py-1 px-3 rounded-md flex gap-1 items-center'}>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}