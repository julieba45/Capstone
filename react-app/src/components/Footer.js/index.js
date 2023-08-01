import "./Footer.css"

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-links'>
                    <span className='followus'>Follow us! We're friendly:</span>
                    <div className='social-links'>
                        <a href='https://www.facebook.com/TaskRabbit-106755671141027'>
                            <></>
                            facebook
                        </a>
                        <span>|</span>
                        <a href='https://twitter.com/i/flow/login?redirect_after_login=%2Ftaskrabbit'>
                            <></>
                            twitter
                        </a>
                        <span>|</span>
                        <a href='https://www.instagram.com/taskrabbit/'>
                            <></>
                            instagram
                        </a>
                    </div>
                </div>
                <div className='footer-grid'>
                    <div className='footer-discover'>
                    {/* <span className='footer-title'>Discover</span> */}
                        {/* <p>Become a Tasker</p>
                        <p>Services By City</p>
                        <p>Elite Taskers</p>
                        <p>Help</p> */}
                    </div>
                    <div className='footer-Company'>
                        {/* <span className='footer-title'>Company</span> */}
                        {/* <p>About Us</p>
                        <p>Careers</p>
                        <p>Press</p>
                        <p>TaskRabbit for Good</p>
                        <p>Blog</p>
                        <p>Terms & Privacy</p> */}
                    </div>
                    <div className='footer-app'>
                        {/* <span className='footer-title'>Download our app</span> */}
                        {/* <p>Tackle your to-do list wherever you are with our mobile app.</p>
                        <p>download on the appstore</p> */}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Footer;
