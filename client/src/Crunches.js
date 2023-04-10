import React, {useEffect, useRef} from "react";
import {toastify} from "./popify";
import {ref, getStorage, uploadBytes, getDownloadURL} from "firebase/storage";
import {Box, Card, Typography, Button, Input} from "@mui/material";

function Crunches(props){
	const fileReference = useRef();
	const imageReference = useRef();

	useEffect(() => {
		const storage = getStorage();

		getDownloadURL(ref(storage, "File")).then((url) => {
			imageReference.current.src = url;

			console.log(url);
		});
	}, []);

	function upload(){
		const storage = getStorage();
		const storageReference = ref(storage, "File");

		uploadBytes(storageReference, fileReference.current).then((snapshot) => {
			toastify({
				text: "Posted",
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
		});
	}

	return (
		<>
			<Box style={{userSelect:"none"}} display="flex" marginTop={15} alignItems="center" justifyContent="center" textAlign="center">
				<Card sx={{width: "90%", maxWidth: 600, paddingBottom: 2}}>
					<Box marginTop={2} marginBottom={-1}>
						<Typography variant="h6"> Today's Crunch </Typography>
					</Box>
					<Box display="flex" padding={2} alignItems="center" justifyContent="center" textAlign="center">
						<Card sx={{backgroundColor: "#eeeeee", width: "95%", minHeight: 300, maxHeight: 300}}>
							<Box paddingTop={3}></Box>
								<img style={{width: "50%"}} alt="Today's Crunch" ref={imageReference}/>
							<Box paddingBottom={2}></Box>
						</Card>
					</Box>
				</Card>
			</Box>
			<Box display="flex" marginTop={1} marginBottom={5} alignItems="center" justifyContent="center" textAlign="center">
				<Card sx={{width: "90%", maxWidth: 600, padding: 2}}>
					<Typography style={{marginBottom: 25}} variant="h6"> Upload Crunch </Typography>
					<Input style={{marginBottom: 30}} type="file" ref={fileReference}></Input>
					<Box>
						<Button variant="contained" onClick={upload}> Post </Button>
					</Box>
				</Card>
			</Box>
		</>
	);
}

export default Crunches;