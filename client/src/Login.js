import React, {useState} from "react";
import {toastify} from "./popify";
import {getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {Box, Card, Typography, TextField, Button} from "@mui/material";

function Login(props){
	const auth = getAuth(props.app);

	const [loginState, setLoginState] = useState("login");

	const [username, setUsername] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	function switchState(){
		if (loginState === "login"){
			setLoginState("signup");
		}
		else{
			setLoginState("login");
		}
		setUsername("");
		setUserEmail("");
		setUserPassword("");
	}

	function handleUsername(event){
		const updatedUsername = event.target.value.slice(0, 12);

		setUsername(updatedUsername);
	}

	function handleEmail(event){
		setUserEmail(event.target.value);
	}

	function handlePassword(event){
		setUserPassword(event.target.value);
	}

	function capitalizeString(string){
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function addSpaces(string){
		let updatedString = "";

		for (let i = 0; i < string.length; ++i){
			if (string.charAt(i) === "-"){
				updatedString += " ";
			}
			else{
				updatedString += string.charAt(i);
			}
		};

		return updatedString.slice(5, string.length);
	}

	function renovateString(string){
		return capitalizeString(addSpaces(string));
	}

	function createUser(email, password){
		if (email && password){
			createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
				const user = userCredential.user;
				
				updateProfile(auth.currentUser, {
					displayName: username
				}).then(() => {
					loggedIn(user);
				}).catch((error) => {
					if (error.code){
						const errorCode = renovateString(error.code);

						toastify({
							text: errorCode,
							toastBoxColor: "#fc03b1",
							toastBoxTextColor: "#ffffff",
							toastBoxShadow: "none",
							toastBoxTextAlign: "center",
							toastWidth: "90vw",
							animationIn: "fade-down",
							animationOut: "fade-up",
							position: "bottom left",
							toastCloseTimer: "2000"
						});
					}
				});
			}).catch((error) => {
				if (error.code){
					const errorCode = renovateString(error.code);

					toastify({
						text: errorCode,
						toastBoxColor: "#fc03b1",
						toastBoxTextColor: "#ffffff",
						toastBoxShadow: "none",
						toastBoxTextAlign: "center",
						toastWidth: "90vw",
						animationIn: "fade-down",
						animationOut: "fade-up",
						position: "bottom left",
						toastCloseTimer: "2000"
					});
				}
			});
		}
		else{
			toastify({
				text: "Fill email and password",
				toastBoxColor: "#fc03b1",
				toastBoxTextColor: "#ffffff",
				toastBoxShadow: "none",
				toastBoxTextAlign: "center",
				toastWidth: "90vw",
				animationIn: "fade-down",
				animationOut: "fade-up",
				position: "bottom left",
				toastCloseTimer: "2000"
			});
		}
	}

	function loginUser(email, password){
		if (email && password){
			signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
			    const user = userCredential.user;

			    loggedIn(user);
			}).catch((error) => {
				if (error.code){
					const errorCode = renovateString(error.code);

					toastify({
						text: errorCode,
						toastBoxColor: "#fc03b1",
						toastBoxTextColor: "#ffffff",
						toastBoxShadow: "none",
						toastBoxTextAlign: "center",
						toastWidth: "90vw",
						animationIn: "fade-down",
						animationOut: "fade-up",
						position: "bottom left",
						toastCloseTimer: "2000"
					});
				}
			});
		}
		else{
			toastify({
				text: "Fill email and password",
				toastBoxColor: "#fc03b1",
				toastBoxTextColor: "#ffffff",
				toastBoxShadow: "none",
				toastBoxTextAlign: "center",
				toastWidth: "90vw",
				animationIn: "fade-down",
				animationOut: "fade-up",
				position: "bottom left",
				toastCloseTimer: "2000"
			});
		}
	}

	function loggedIn(loggedUser){
		props.setUser(loggedUser);
		props.setAppState("chat");
	}

	return (
		<>
			{loginState === "login" &&
				<Box style={{userSelect:"none"}} display="flex" marginTop={15} alignItems="center" justifyContent="center" textAlign="center">
					<Card sx={{width: "90%", maxWidth: 600, paddingBottom: 2}}>
						<Box marginTop={2} marginBottom={3}>
							<Typography variant="h6"> Login </Typography>
						</Box>
						<Box marginTop={2}>
							<Typography variant="subtitle1"> Email </Typography>
							<TextField variant="standard" onChange={handleEmail} value={userEmail}/>
						</Box>
						<Box marginTop={2}>
							<Typography variant="subtitle1"> Password </Typography>
							<TextField variant="standard" onChange={handlePassword} value={userPassword}/>
						</Box>
						<Box marginTop={4} marginBottom={2}>
							<Button variant="contained" color="primary" onClick={() => loginUser(userEmail, userPassword)}> Login </Button>
						</Box>
						<Box marginBottom={2}>
							<Button variant="contained" color="secondary" onClick={switchState}> Sign Up </Button>
						</Box>
					</Card>
				</Box>
			}
			{loginState === "signup" &&
				<Box style={{userSelect:"none"}} display="flex" marginTop={15} alignItems="center" justifyContent="center" textAlign="center">
					<Card sx={{width: "90%", maxWidth: 600, paddingBottom: 2}}>
						<Box marginTop={2} marginBottom={3}>
							<Typography variant="h6"> Sign Up </Typography>
						</Box>
						<Box marginTop={2}>
							<Typography variant="subtitle1" length={12}> Username </Typography>
							<TextField variant="standard" onChange={handleUsername} value={username}/>
						</Box>
						<Box marginTop={2}>
							<Typography variant="subtitle1"> Email </Typography>
							<TextField variant="standard" onChange={handleEmail} value={userEmail}/>
						</Box>
						<Box marginTop={2}>
							<Typography variant="subtitle1"> Password </Typography>
							<TextField variant="standard" onChange={handlePassword} value={userPassword}/>
						</Box>
						<Box marginTop={4} marginBottom={2}>
							<Button variant="contained" color="primary" onClick={() => createUser(userEmail, userPassword)}> Sign Up </Button>
						</Box>
						<Box marginBottom={2}>
							<Button variant="contained" color="secondary" onClick={switchState}> Login </Button>
						</Box>
					</Card>
				</Box>
			}
		</>
	);
}

export default Login;