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
import {User} from "./pages/users/User";
import {Users} from "./pages/users/Users";
import {Sheet} from "./pages/sheets/Sheet";
import {Sheets} from "./pages/sheets/Sheets";


function App() {

	return (
		<BrowserRouter>
			<NotificationContextProvider>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="users/:id" element={<User/>}/>
					<Route path="users" element={<Users/>}/>

					<Route path="sheets/:id" element={<Sheet/>}/>
					<Route path="sheets" element={<Sheets/>}/>

					<Route path="login" element={<Login/>}/>
				</Routes>
			</NotificationContextProvider>
		</BrowserRouter>
	);
}

export default App;
