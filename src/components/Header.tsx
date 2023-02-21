import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
	return (
		<AppBar className="header" elevation={0}>
			<Toolbar>
				<Typography variant="h6">Post app</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
