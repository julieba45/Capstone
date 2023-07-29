import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CartCount from '../CartCount';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			{isLoaded && (
				<NavLink to="/plants">Store</NavLink>
			)}
			{isLoaded && <CartCount />}
			{isLoaded && sessionUser &&(
				<NavLink to='/care'>Care</NavLink >
			)}
		</ul>
	);
}

export default Navigation;
