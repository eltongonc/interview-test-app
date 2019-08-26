import React from 'react';
import logo from '../assets/images/logo.svg';
 
function Header() {
	return (
		<header className="header">
			<img src={logo} className="header__logo" alt="logo" />
			<h1>Interview test app</h1>
		</header>
	);
}

export default Header;
