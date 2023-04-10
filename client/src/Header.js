import React, {useState} from "react";
import Menu from "./Menu";
import {AppBar, Toolbar, Typography, Icon, IconButton} from "@mui/material";

function Header(props){
	const [menuState, setMenuState] = useState(false);

	function openMenu(){
		setMenuState(true);
	}

	function closeMenu(){
		setMenuState(false);
	}

	return (
		<AppBar style={{backgroundImage: "linear-gradient(to right, #792eb3, #fc03b1)", userSelect: "none"}}>
			<Toolbar>
				<Typography variant="h6"> GamerCrunch </Typography>
				<IconButton style={{position: "absolute", right: 10}} onClick={openMenu}>
					<Icon style={{color: props.theme.icon.primary.main}} className="material-icons"> menu </Icon>
				</IconButton>
				<Menu theme={props.theme} user={props.user} menuState={menuState} closeMenu={closeMenu} setAppState={props.setAppState}/>
			</Toolbar>
		</AppBar>
	);
}

export default Header;