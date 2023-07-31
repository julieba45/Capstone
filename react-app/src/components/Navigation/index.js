import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CartCount from '../CartCount';
import BloomLogo from "./images/Bloom (3).png"

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav className="navbar">
			<ul>
				<li>
					{isLoaded && (
					<div>
						<NavLink className="home-store" to="/plants">Store</NavLink>
					</div>

					)}
				 </li>
				 <li>
				<NavLink exact to="/">
					<img className='logoimg' src={BloomLogo} alt='logo' />
				</NavLink>
				</li>
				<li className='care-cart-profile'>
				{isLoaded && sessionUser &&(
					<NavLink to='/care'>Care</NavLink >
				)}
				{isLoaded && <CartCount />}
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;
