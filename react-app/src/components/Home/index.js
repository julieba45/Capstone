import React, {useEffect, useRef, useState} from "react";
import ChatBot from "../ChatBot";
import "./Home.css";
// import Spline from '@splinetool/react-spline';
import homeplants from "../../public/homeplants-2.mp4"
import homeplant from "../../public/rotate_plant.mp4"
import { NavLink } from 'react-router-dom';


const Home = () => {

    const videoRef = useRef(null);
    const [isMounted, setIsMounted] = useState(true);
    let lastScrollTop = 0;
    let scrollTimeout = null;

    useEffect(() => {
        setIsMounted(true);
        videoRef.current.currentTime = 0;

        const handleScroll = () => {
            if (!videoRef.current) return;

            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollSpeed = Math.abs(currentScrollTop - lastScrollTop);

            let playbackRate = scrollSpeed / 5;

            playbackRate = Math.max(0.0625, Math.min(playbackRate, 16));

            videoRef.current.playbackRate = playbackRate;

            if (playbackRate < 0.0625) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().then(() => {
                    clearTimeout(scrollTimeout);

                    scrollTimeout = setTimeout(() => {
                        if (isMounted && videoRef.current) {
                            videoRef.current.pause();
                        }
                    }, 100);
                });
            }

            lastScrollTop = currentScrollTop;
        };



        window.addEventListener('scroll', handleScroll);

        return () => {
            setIsMounted(false);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-header">Home</h1>
                <div className="home-line"></div>
                <div className="home-price">STARTING AT $10</div>
                <div className="rotate-video">
                    <video ref={videoRef} className="rotate-image" loop muted>
                        <source src={homeplant} alt="Home Plant" type="video/mp4"/>
                    </video>
                </div>

                <div className="home-paragraphs">
                    <p className="home-paragraph-1">BUILT TO PURIFY THE AIR IN YOUR HOME</p>
                    <p className="home-paragraph">Bloom offers a variety of plants, including the infamous olive tree, a new variety of Pothos. Our collection is carefully curated to bring beauty and freshness to your home. Explore our store and find the perfect plant to brighten your living space.</p>
                </div>
                <div className="store-link-container">
                    <NavLink className="homepage-store" to="/plants">Store</NavLink>
                </div>
            </div>
            {/* <Spline scene="https://prod.spline.design/dO2sGncbnQ3-xKEL/scene.splinecode" /> */}
            <video className="video-container" autoPlay muted>
                <source src={homeplants} type="video/mp4" />
            </video>
            <ChatBot/>
        </div>
    )
}
export default Home;
