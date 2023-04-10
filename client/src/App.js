import React, {useState, useEffect} from "react";
import Header from "./Header";
import Login from "./Login";
import Chat from "./Chat";
import Crunches from "./Crunches";
import {io} from "socket.io-client";
import {initializeApp} from "firebase/app";
import {createTheme, ThemeProvider, CssBaseline} from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#792eb3"
		},
		secondary: {
			main: "#fc03b1"
		},
		background: {
			default: "#431e5e"
		}
	},
	text: {
		primary: {
			main: "#ffffff"
		},
		secondary: {
			main: "#b7a3c7"
		}
	},
	icon: {
		primary: {
			main: "#ffffff"
		},
		secondary: {
			main: "#000000"
		}
	}
});

const config = {
	apiKey: "AIzaSyBub8Klv-JrFQdR6eK7TBuKwFyii58lsQ4",
	authDomain: "gamercrunchers.firebaseapp.com",
	projectId: "gamercrunchers",
	storageBucket: "gamercrunchers.appspot.com",
	messagingSenderId: "309130459657",
	appId: "1:309130459657:web:2556e198ca58eb7a7c16d8"
};

const app = initializeApp(config);

const socket = io("https://react-gamer-crunch.glitch.me");

function App(){
	const [appState, setAppState] = useState("login");
	const [user, setUser] = useState("");

	useEffect(() => {
		window.addEventListener("contextmenu", (event) => {
			event.preventDefault();
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Header theme={theme} user={user} setAppState={setAppState}/>
			{appState === "login" && <Login app={app} setAppState={setAppState} setUser={setUser}/>}
			{appState === "chat" && <Chat app={app} user={user} socket={socket}/>}
			{appState === "crunches" && <Crunches user={user} socket={socket}/>}
		</ThemeProvider>
	);
}

export default App;