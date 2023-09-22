import React from 'react';
import './App.css';
import {Home} from "./pages/Home";
import Login from "./pages/Login";

import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom"

import {Header} from "./components/Header";


function App() {

	return (
		<BrowserRouter>
			<Header/>
			<main>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="login" element={<Login/>}/>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
