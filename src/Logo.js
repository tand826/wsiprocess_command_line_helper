import React from 'react';
import './Logo.css'
import LogoImg from './logo.png'

export default function Logo() {
	return (
		<div className="logoArea">
			<a href="https://github.com/tand826/wsiprocess">
				<img className="logoImage" src={LogoImg} alt="logo" />
			</a>
		</div>
	)
}