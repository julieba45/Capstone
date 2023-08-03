import React from "react";
import ChatBot from "../ChatBot";
import "./Home.css";
import Spline from '@splinetool/react-spline';
import homeplants from "../../public/homeplants-2.mp4"
const Home = () => {
    return (
        <div className="home-container">
            {/* <div className="home-content">
                <h1 className="Home">Home</h1>
            </div> */}
            {/* <Spline scene="https://prod.spline.design/dO2sGncbnQ3-xKEL/scene.splinecode" /> */}
            <video className="video-container" autoPlay muted>
                <source src={homeplants} type="video/mp4" />
            </video>
            <ChatBot/>
        </div>
    )
}
export default Home;
