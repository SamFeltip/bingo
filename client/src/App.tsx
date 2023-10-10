import React from "react";
import "./App.css";
import { Home } from "./pages/Home";
import Login from "./pages/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotificationContextProvider } from "./contexts/NotificationContext";
import { User } from "./pages/users/show";
import { Users } from "./pages/users";

import { ShowSheet } from "./pages/sheets/show";
import { Sheets } from "./pages/sheets";
import { CreateSheet } from "./pages/sheets/new";
import { EditSheet } from "./pages/sheets/edit";

function App() {
	return (
		<div className={"p-2"}>
			<BrowserRouter>
				<NotificationContextProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="users/:id" element={<User />} />
						<Route path="users" element={<Users />} />

						<Route path="sheets/:id" element={<ShowSheet />} />
						<Route path="sheets" element={<Sheets />} />
						<Route path="sheets/new" element={<CreateSheet />} />

						<Route path="sheets/:sheet_id/edit" element={<EditSheet />} />

						<Route path="login" element={<Login />} />
					</Routes>
				</NotificationContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
