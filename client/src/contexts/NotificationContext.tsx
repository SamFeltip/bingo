import React, { ReactNode, useEffect, useState } from "react";
import { Header } from "../components/Header";

export enum NotificationMethods {
	Error = "red",
	Warning = "orange",
	Success = "green",
	None = "gray",
}

type NotificationPackage = {
	type: NotificationMethods;
	message: string;
};

interface NotificationContextValue {
	notification: NotificationPackage | null;
	setNotification: React.Dispatch<React.SetStateAction<NotificationPackage | null>>;
}

const NotificationContext = React.createContext<NotificationContextValue | undefined>(undefined);

const NotificationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [notification, setNotification] = useState<NotificationPackage | null>(null);
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false);
		}, 3000);
	}, [notification]);

	const error_banner = (
		<div className={`relative top-0 border-t-2 border-b-2 p-3 border-red-700 text-red-700 bg-red-50`}>
			{notification?.message}
		</div>
	);

	const success_banner = (
		<div className={`border-t-2 border-b-2 p-3 border-green-700 text-green-700 bg-green-50`}>
			{notification?.message}
		</div>
	);
	const warning_banner = (
		<div className={`border-t-2 border-b-2 p-3 border-yellow-700 text-yellow-700 bg-yellow-50`}>
			{notification?.message}
		</div>
	);

	return (
		<NotificationContext.Provider value={{ notification, setNotification }}>
			<Header />
			{showNotification && notification?.type === NotificationMethods.Error && error_banner}
			{showNotification && notification?.type === NotificationMethods.Success && success_banner}
			{showNotification && notification?.type === NotificationMethods.Warning && warning_banner}

			{children}
		</NotificationContext.Provider>
	);
};

export { NotificationContext, NotificationContextProvider };
