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


function App() {

	return (
		<BrowserRouter>
			<NotificationContextProvider>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="login" element={<Login/>}/>
				</Routes>
			</NotificationContextProvider>
		</BrowserRouter>
	);
}

export default App;
