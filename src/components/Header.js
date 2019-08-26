import React from 'react';
import logo from '../assets/images/logo.svg';
 
function Header() {
	return (
		<header className="header">
			<img src={logo} className="header__logo" alt="logo" />
		</header>
	);
}

export default Header;
