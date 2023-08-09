import React, {useEffect, useRef, useState} from "react";
import ChatBot from "../ChatBot";
import "./Home.css";
import Spline from '@splinetool/react-spline';
// import homeplants from "../../public/homeplants-2.mp4"
import homeplants from "../../public/home-plants.png"
import homeplant from "../../public/rotate_plant.mp4"
import blueplant from "../../public/blue-plant.jpg"
import greentree from "../../public/green-tree.jpg"
import girlplanting from "../../public/girl.jpg"
import { NavLink } from 'react-router-dom';



const Home = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);

    const toggleContent = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleScroll = () => {
        const imageElement = document.querySelector('.video-container');
        if (!imageElement) return;

        const imagePosition = imageElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (imagePosition < windowHeight) {
          setIsVisible(true);
        }
      };

      useEffect(() => {
        const timer = setTimeout(() => {
            setIsHeaderVisible(true);
        }, 200);

        return () => clearTimeout(timer);
        }, []);


      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

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
                if (videoRef.current.paused){
                videoRef.current.play().then(() => {
                    clearTimeout(scrollTimeout);

                    scrollTimeout = setTimeout(() => {
                        if (isMounted && videoRef.current) {
                            videoRef.current.pause();
                        }
                    }, 100);
                }).catch(error => {
                    console.error("Error playing video:", error);
                })
            }
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

                <h1 className={`home-header ${isHeaderVisible ? 'visible' : ''}`}>Bloom</h1>
                <div className="store-link-container">
                    <NavLink className="homepage-store" to="/plants">Store</NavLink>
                </div>
                {/* <div className="spline-container" style={{ backgroundColor: '#d2c4c2' }}>
                    <Spline scene="https://prod.spline.design/lS0t7QgoEabEtsjI/scene.splinecode" />
                </div> */}


                <div className="rotate-video">
                    <video ref={videoRef} className="rotate-image" loop muted>
                        <source src={homeplant} alt="Home Plant" type="video/mp4"/>
                    </video>
                </div>
                <div className="home-line"></div>
                <div className="home-price">STARTING AT $10</div>


                <div className="home-paragraphs">
                    <p className="home-paragraph-1">BUILT TO PURIFY THE AIR IN YOUR HOME</p>
                    <p className="home-paragraph">Bloom offers a variety of plants, including the infamous olive tree, a new variety of Pothos. Our collection is carefully curated to bring beauty and freshness to your home. Explore our store and find the perfect plant to brighten your living space.</p>
                </div>


            </div>
            <img className={`video-container fade-in ${isVisible ? 'visible' : ''}`} src={homeplants} alt="Description of the image"/>
            <div className="home-mid-section">
            <h1 className="transforming-title">Transforming Spaces with the Beauty of Nature</h1>
            <div className="values-section">
                <div className="values-item">
                    <i className="fa-solid fa-house-circle-check"></i>
                    <h2>Enhancing Homes with Natural Purification</h2>
                    <p>At Bloom, we believe in the power of plants to purify and rejuvenate the air in your home.</p>
                    <button onClick={() => toggleContent(0)} className="toggle-button">{activeIndex === 0 ? '-' : '+'}</button>
                    <p className={activeIndex === 0 ? 'content active' : 'content'}>Our carefully selected collection includes species known for their air-cleaning properties, helping you breathe easier and live healthier.</p>
                </div>

                <div className="values-item">
                    <i className="fa-solid fa-paper-plane"></i>
                    <h2>Empowering Gardeners of All Levels</h2>
                    <p>Whether you're a seasoned gardener or just starting your plant journey, Bloom offers detailed care guides and support to help your greenery thrive.</p>
                    <button onClick={() => toggleContent(1)} className="toggle-button">{activeIndex === 1 ? '-' : '+'}</button>
                    <p className={activeIndex === 1 ? 'content active' : 'content'}> Our passion for plants extends to educating and inspiring our community, making gardening accessible to all.</p>
                </div>

                <div className="values-item">
                 <i className="fa-solid fa-leaf"></i>
                    <h2>Commitment to Sustainability and the Environment</h2>
                    <p>We're more than just a store; we're a community dedicated to the environment. </p>
                    <button onClick={() => toggleContent(2)} className="toggle-button">{activeIndex === 2 ? '-' : '+'}</button>
                    <p className={activeIndex === 2 ? 'content active' : 'content'}>Bloom's mission goes beyond commerce, as we strive to spread awareness about the ecological importance of plants. By choosing Bloom, you're joining a movement towards a greener, more beautiful world.</p>
                </div>
            </div>

            </div>

            <div className="garden-green-section">
                <div className="green-text-content">
                    <h2>"Grow Green with Garden Wisdom</h2>
                    <p>Dive into our collection and explore detailed care guides to get you flourishing in the world of home gardening - fast.</p>
                </div>
                <div className="green-image-content">
                    <img src={girlplanting} alt="Description of the image"/>
                </div>
                  {/* <div >
                    <video loop muted>
                        <source src={planting} alt="Home Plant" type="video/mp4"/>
                    </video>
                </div> */}

            </div>
            {/* <img className="video-container" src={homeplants} alt="Description of the image"/> */}


            <div className="about-section">
                <hr className="c-line-after-image" />
                <h1>Our Mission</h1>
                <p>
                "Bloom, we are more than just an online store; we are a community passionate about plants and the environment. We offer a diverse selection of plants for sale, each accompanied by detailed care guides to help both novice and experienced gardeners thrive. Our mission extends beyond commerce, as we aim to spread awareness about the environmental significance of plants and their role in sustaining life on Earth. We believe in the power of greenery to enhance interior aesthetics, bringing a touch of nature into every space. Through our platform, we strive to inspire a love for plants, encouraging a greener, healthier, and more beautiful world. Join us on this journey, and let's grow together!"
                </p>
                <hr className="c-line-after-image" />
            </div>
            <ChatBot/>
        </div>
    )
}
export default Home;
