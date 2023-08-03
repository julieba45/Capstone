import React from "react";
import ChatBot from "../ChatBot";
import "./Home.css";
import Spline from '@splinetool/react-spline';

const Home = () => {
    return (
        <div>
            <h1 className="Home">Home</h1>
            {/* <Spline scene="https://prod.spline.design/dO2sGncbnQ3-xKEL/scene.splinecode" /> */}
            <ChatBot/>
        </div>
    )
}
export default Home;
