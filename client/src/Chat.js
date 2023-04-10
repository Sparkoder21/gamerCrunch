import React, {useState, useEffect, useRef} from "react";
import {getFirestore, collection, query, addDoc, getDocs, orderBy, serverTimestamp} from "firebase/firestore";
import {Box, Card, Typography, TextField, Button} from "@mui/material";

function Chat(props){
	const database = getFirestore(props.app);

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const containerReference = useRef();

	const messageContainer = messages.map((value, index) => {
		return (
			<Box display="flex" alignItems="center" justifyContent="center" textAlign="center" key={index}>
				<Card sx={{marginBottom: 1, paddingTop: 1, paddingBottom: 1, width: "90%", maxWidth: 300}}>
					<Typography style={{paddingTop: 10, paddingLeft: 30, paddingRight: 30, fontWeight: "bold"}} variant="body1" align="left"> {value.name} </Typography>
					<Typography style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 30, paddingRight: 30}} variant="body1" align="left"> {value.value} </Typography>
				</Card>
			</Box>
		);
	});

	useEffect(() => {
		async function getCollection(){
			const messageCollection = await getDocs(query(collection(database, "messages"), orderBy("timestamp")));

			const updatedMessages = [];

			messageCollection.forEach((doc) => {
				updatedMessages.push(doc.data());
			});
			setMessages(updatedMessages);
		}
		getCollection();
	}, []);

	useEffect(() => {
		props.socket.on("message", (data) => {
			setMessages([...messages, data]);
		});
	}, [messages]);

	function focusTextField(){
		window.scrollTo(0, document.body.scrollHeight);
	}

	function handleInput(event){
		setMessage(event.target.value);
	}

	function sendMessage(){
		if (message){
			props.socket.emit("message", {
				name: props.user.displayName,
				value: message.slice(0, 500)
			});
			addDoc(collection(database, "messages"), {
				name: props.user.displayName,
				value: message.slice(0, 500),
    			timestamp: serverTimestamp()
			});
		}
		setMessage("");
	}

	return (
		<>
			<Box style={{userSelect:"none"}} display="flex" marginTop={15} alignItems="center" justifyContent="center" textAlign="center">
				<Card sx={{width: "90%", maxWidth: 600, paddingBottom: 2}}>
					<Box marginTop={2} marginBottom={-1}>
						<Typography variant="h6"> Live Chat </Typography>
					</Box>
					<Box display="flex" padding={2} alignItems="center" justifyContent="center" textAlign="center">
						<Card sx={{backgroundColor: "#eeeeee", width: "95%", minHeight: 300, maxHeight: 300, overflowY: "scroll"}} ref={containerReference}>
							<Box paddingTop={3}></Box>
								<Box>
									{messageContainer}
								</Box>
							<Box paddingBottom={2}></Box>
						</Card>
					</Box>
				</Card>
			</Box>
			<Box display="flex" marginTop={1} marginBottom={5} alignItems="center" justifyContent="center" textAlign="center">
				<Card sx={{width: "90%", maxWidth: 600, padding: 2}}>
					<TextField style={{width: "95%", marginTop: 10, marginBottom: 10}} variant="outlined" onFocus={focusTextField} onChange={handleInput} value={message}/>
					<Button style={{marginBottom: 2}} variant="contained" onClick={sendMessage}> Send </Button>
				</Card>
			</Box>
		</>
	);
}

export default Chat;