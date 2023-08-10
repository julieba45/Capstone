import React, {useState, useEffect} from "react"
import { getPlants } from '../../store/plant';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import "./ChatBot.css"



const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState(JSON.parse(sessionStorage.getItem('chatHistory')) || []);
    const [input, setInput] = useState('');
    const dispatch = useDispatch()
    const plants = useSelector(state => state.plants.allPlants);
    const [error, setError] = useState({})
    const user = useSelector(state => state.session.user);
    const [messageCount, setMessageCount] = useState(0);
    const MAX_MESSAGES = 5;

    useEffect(() => {
        dispatch(getPlants());
    }, [dispatch])

    useEffect(() => {
        sessionStorage.setItem('chatHistory', JSON.stringify(history));
        // console.log('user', user)
    }, [history])

    const handleSubmit = async() => {
        let errors = {};
        if(input.trim() === '') {
            errors.message = 'Please enter a message.';
        }
        setError(errors);

         if (Object.keys(errors).length === 0){
            setMessageCount(messageCount + 1);
            const newMessage = {
                role:'user',
                content: input
            };
            const updatedHistory = [...history, newMessage]
            setHistory(updatedHistory)

            try{
                const plantsList = plants.reduce((obj, plant) => {
                    obj[plant.name] = plant.price;
                    return obj;
                }, {});

                // const systemMessageContent = `You are a helpful assistant. Current plants in inventory: ${plantsList}.`;
                // console.log('---------------REQUEST BODY', JSON.stringify({
                //     message: `Customer question: ${input} Current plants in inventory: ${plantsList}. Please respond as the store employee with fewer than 31 words.`
                // }))

                // const isAskingForPrice = input.toLowerCase().includes('price') || input.toLowerCase().includes('cost') || input.toLowerCase().includes('how much');

                // const messageContent = isAskingForPrice
                //     ? `Customer question: ${input} Current plants in inventory and their prices: ${JSON.stringify(plantsList)}. Please respond with fewer than 21 words and be welcoming.`
                //     : `Customer question: ${input} This is all our plant inventory: ${JSON.stringify(plants)}. Respond like a real human online assistant with fewer than 21 words.`;

                const messageContent = `Current store information on plant inventory and prices: ${JSON.stringify(plantsList)}. | Customer question: ${input}. | Respond like a real human online assistant with fewer than 21 words.`;

                // console.log('----------------HEY HERE IS THE CHAT REQUEST', JSON.stringify({
                //     history: updatedHistory,
                //     message: messageContent
                // }))
                const response = await fetch('/api/chat/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        history: updatedHistory,
                        message: messageContent
                    }),
                });

                if (!response.ok) {
                    throw new Error(`An error has occured. status: ${response.status}`);
                }

                const data = await response.json();
                const assistantMessage = {
                    role: 'assistant',
                    content: data.response
                };
                setHistory(prevHistory => [...prevHistory, assistantMessage]);
                setInput('');

            }catch(error){
                console.error('Fetch error:', error);
            }
        }
    }
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setHistory([]);
            setError({});
            setMessageCount(0);
            sessionStorage.removeItem('chatHistory');
        }
    };

    return (
        <div>
            {user && (
            <div className="chat-container">
            <button onClick={toggleChat} className="chat-button">
                {isOpen ? 'Close Chat' : 'Open Chat'}</button>
            {isOpen && (
                <div className="chat-content">
                    {history.map((message, index) => (
                        <p key={index} className={message.role === "user" ? 'user-message':'assistant-message'}>
                            <strong>{message.role}:</strong> {message.content}
                        </p>
                    ))}
                    {messageCount < MAX_MESSAGES ? (
                    <>
                    <textarea
                        className="chat-textarea"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your question here..."
                        maxLength="100"
                    />
                    <button onClick={handleSubmit} className="chat-submit" >Send</button>
                    </>
                ):(
                    <p>You have reached the maximum number of messages allowed.</p>
                    )}
                    {error.message && (
                    <p className="error-message">{error.message}</p>
                )}
                </div>
            )}
            </div>
        )}

        </div>
    )
}

export default ChatBot
