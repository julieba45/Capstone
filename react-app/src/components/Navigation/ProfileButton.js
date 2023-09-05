import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { clearCart } from "../../store/cart";
import "./ProfileButton.css";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const ulRef = useRef();

  const openMenu = () => {
    // if (showMenu) return;
    // console.log("openMenu triggered");
    setShowMenu(prevState => !prevState);
  };

  useEffect(() => {
    // console.log("showMenu value:", showMenu);
}, [showMenu]);

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (!ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearCart());
    history.push('/');
  };

  const handleSignup = () => {
    history.push('/signup');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
    {/* <div className={showMenu ? "blur-overlay active" : "blur-overlay"}></div> */}
    <div className="profile-dropdown-container"
        onMouseEnter={openMenu}
        onMouseLeave={() => setShowMenu(false)}
    >
      {/* <button className="profile-btn-bars"onClick={openMenu}> */}
       <button className="profile-btn-bars">
        <i className="fa-solid fa-bars"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Welcome {user.username}.</li>
            {/* <li>{user.username}</li> */}
            <li>{user.email}</li>
            <li>
              <NavLink className='text-link' to="/orders/current">My Orders</NavLink>
            </li>
            <li>
              <NavLink className='text-link' to="/favorites">My Gardens</NavLink>
            </li>
            <li>
              <button className="profile-logout" onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                className="login-open-modal-button"
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <button className="login-open-modal-button" onClick={handleSignup}>Sign Up</button>
            </li>

          </>
        )}
      </ul>
    </div>
  </>
  );
}

export default ProfileButton;
