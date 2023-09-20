import React from 'react';
import './App.css';
import {Home} from "./pages/Home";
import Login from "./pages/Login";

import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider
} from "react-router-dom"

import RootLayout from "./layouts/RootLayout";
import {Header} from "./components/Header";
import {UserContext} from "../providers/UserProvider";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home/>}/>
			<Route path="login" element={<Login/>}/>
		</Route>
	)
)

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
