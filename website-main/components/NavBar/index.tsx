import React, { useState } from 'react';
import Logo from '../Logo';
import NavBarContainer from './NavbarContainer';
import MenuToggle from './MenuToggle';
import MenuList from './MenuList';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<NavBarContainer>
			<Logo />
			<MenuToggle toggle={toggle} isOpen={isOpen} />
			<MenuList isOpen={isOpen} />
		</NavBarContainer>
	);
};

export default Header;
