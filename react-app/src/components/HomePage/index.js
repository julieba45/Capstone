import React, {useState, useEffect} from "react"
import { getPlants } from '../../store/plant';
import { useDispatch, useSelector } from 'react-redux';



const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState(JSON.parse(sessionStorage.getItem('chatHistory')) || []);
    const [input, setInput] = useState('');
    const dispatch = useDispatch()
    const plants = useSelector(state => state.plants.allPlants);

    useEffect(() => {
        dispatch(getPlants());
    }, [dispatch])

    useEffect(() => {
        sessionStorage.setItem('chatHistory', JSON.stringify(history));
    }, [history])

    const handleSubmit = async() => {
        const newMessage = {
            role:'user',
            content: input
        };
        setHistory([...history, newMessage])

    try{
        const plantsList = plants.map(plant => `'${plant.name}'`).join(", ");
        // const systemMessageContent = `You are a helpful assistant. Current plants in inventory: ${plantsList}.`;
        console.log('---------------REQUEST BODY', JSON.stringify({
            message: `Customer question: ${input} Current plants in inventory: ${plantsList}. Please respond as the store employee with fewer than 31 words.`
        }))
        const response = await fetch('/api/chat/', {
            method: 'POST',
            // mode: 'cors',
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
            <button onClick={toggleChat}>{isOpen ? 'Close Chat' : 'Open Chat'}</button>
            {isOpen && (
                <div>
                    {history.map((message, index) => (
                        <p key={index}><strong>{message.role}:</strong> {message.content}</p>
                    ))}
                    <input value={input} onChange={handleInputChange} />
                    <button onClick={handleSubmit}>Send</button>
                </div>
            )
            }


        </div>
    )
}

export default HomePage
