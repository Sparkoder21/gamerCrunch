import React from "react";
import {alertify, toastify} from "./popify";
import {Divider, Typography, Button, Icon, IconButton, Drawer, List, ListItem} from "@mui/material";

function Menu(props){
	function loginError(){
		toastify({
			text: "Login first",
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
		props.closeMenu();
	}

	function share(){
		alertify({
			title: "Share",
			text: "Visit the project at https://github.com/Sparkoder21/gamerCrunch",
			confirmButtonColor: props.theme.palette.primary.main
		});
		props.closeMenu();
	}

	function about(){
		alertify({
			title: "About",
			text: "Made by Sparkoder(Anuj Chowdhury)",
			confirmButtonColor: props.theme.palette.primary.main
		});
		props.closeMenu();
	}

	return (
		<Drawer anchor="right" open={props.menuState}>
			<List>
				<ListItem>
					<Typography style={{color: props.theme.palette.secondary.main, userSelect: "none"}} variant="h6"> GamerCrunch </Typography>
				</ListItem>
                <Divider/>
				<ListItem>
					<Icon className="material-icons"> person </Icon>
					<Button onClick={() => {props.setAppState("login")}}> Sign out </Button>
				</ListItem>
				<ListItem>
					<Icon className="material-icons"> videocam </Icon>
					<Button onClick={() => {props.user ? props.setAppState("crunches") : loginError()}}> Crunches </Button>
				</ListItem>
				<ListItem>
					<Icon className="material-icons"> messages </Icon>
					<Button onClick={() => {props.user ? props.setAppState("chat") : loginError()}}> Live Chat </Button>
				</ListItem>
				<ListItem>
					<Icon className="material-icons"> share </Icon>
					<Button onClick={share}> Share </Button>
				</ListItem>
				<ListItem>
					<Icon className="material-icons"> info </Icon>
					<Button onClick={about}> About </Button>
				</ListItem>
				<Divider/>
				<ListItem>
					<IconButton style={{marginLeft: 40}} onClick={props.closeMenu}>
						<Icon style={{color: props.theme.icon.secondary.main, fontSize: 35}} className="material-icons"> arrow_circle_right </Icon>
					</IconButton>
				</ListItem>
			</List>
		</Drawer>
	);
}

export default Menu;