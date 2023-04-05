import React from 'react';
import DiscoverSection from '../components/DiscoverSection';
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import MainSection from '../components/MainSection';
import FAQSection from '../components/FAQSection';
import Navbar from '../components/NavBar';

/**
 * Main Page '/' component of the website
 * @return {React.Component} Component.
 */
export default function Home() {
	return (
		<>
			<Navbar></Navbar>
			<MainSection />
			<DiscoverSection />
			<InfoSection />
			<FAQSection />
			<Footer />
		</>
	);
}
