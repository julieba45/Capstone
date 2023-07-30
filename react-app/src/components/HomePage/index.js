import React, {useState, useEffect} from "react"
import { getPlants } from '../../store/plant';
import { useDispatch, useSelector } from 'react-redux';
import "./ChatBot.css"



const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState(JSON.parse(sessionStorage.getItem('chatHistory')) || []);
    const [input, setInput] = useState('');
    const dispatch = useDispatch()
    const plants = useSelector(state => state.plants.allPlants);
    const [error, setError] = useState({})
    useEffect(() => {
        dispatch(getPlants());
    }, [dispatch])

    useEffect(() => {
        sessionStorage.setItem('chatHistory', JSON.stringify(history));
    }, [history])

    const handleSubmit = async() => {
        let errors = {};
        if(input.trim() === '') {
            errors.message = 'Please enter a message.';
        }
        setError(errors);

         if (Object.keys(errors).length === 0){
            const newMessage = {
                role:'user',
                content: input
            };
            setHistory([...history, newMessage])

            try{
                const plantsList = plants.map(plant => `'${plant.name}'`).join(", ");
                // const systemMessageContent = `You are a helpful assistant. Current plants in inventory: ${plantsList}.`;
                // console.log('---------------REQUEST BODY', JSON.stringify({
                //     message: `Customer question: ${input} Current plants in inventory: ${plantsList}. Please respond as the store employee with fewer than 31 words.`
                // }))
                const response = await fetch('/api/chat/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `Customer question: ${input} Current plants in inventory: ${plantsList}. Please respond as the store employee with fewer than 31 words.`
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
            sessionStorage.removeItem('chatHistory');
        }
    };

    return (
        <div>
            <h1>HomePage</h1>
            <div className="chat-container">
            <button onClick={toggleChat} className="chat-button">
                {isOpen ? 'Close Chat' : 'Open Chat'}</button>
            {isOpen && (
                <div className="chat-content">
                    {history.map((message, index) => (
                        <p key={index}><strong>{message.role}:</strong> {message.content}</p>
                    ))}
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        maxLength="150"
                    />
                    <button onClick={handleSubmit} className="chat-submit" >Send</button>
                    {error.message && (
                    <p className="error-message">{error.message}</p>
                )}
                </div>
            )}
            </div>


        </div>
    )
}

export default HomePage
