import React from 'react';
import './App.css';
import {Home} from "./pages/Home";
import Login from "./pages/Login";

import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom"

import {NotificationContextProvider} from "./contexts/NotificationContext";
import {User} from "./pages/users/[id]";
import {Users} from "./pages/users";

import {Sheet} from "./pages/sheets/[id]";
import {Sheets} from "./pages/sheets";
import {CreateSheet} from "./pages/sheets/new";


function App() {

	return (
		<div className={'p-2'}>
			<BrowserRouter>
				<NotificationContextProvider>
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="users/:id" element={<User/>}/>
						<Route path="users" element={<Users/>}/>

						<Route path="sheets/:id" element={<Sheet/>}/>
						<Route path="sheets" element={<Sheets/>}/>
						<Route path="sheets/new" element={<CreateSheet/>}/>

						<Route path="login" element={<Login/>}/>
					</Routes>
				</NotificationContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
