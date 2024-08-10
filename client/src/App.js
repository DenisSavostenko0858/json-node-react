import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

const App = () => {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResults([]);

        try {
            const response = await axios.post('http://localhost:5000/search', { email, number: number.replace(/[^\d]/g, '')});
            setResults(response.data);
        } catch (err) {
          if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
        } else {
            setError('Ошибка при получении данных');
        }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='form'>
                <h2>Поиск</h2>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <InputMask 
                    mask="**-**-**" 
                    value={number} 
                    onChange={(e) => setNumber(e.target.value)} 
                    placeholder="Number (optional)" 
                />
                <button type="submit">Отправить</button>
                
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <ul>
                    {results.map((user, index) => (
                        <li style={{color: 'white', textAlign: 'center'}} key={index}>{user.email} - {user.number}</li>
                    ))}
                </ul>
                <button 
                    type="submit"
                    style={{marginBottom: '10px', marginTop: '20px'}}
                    onClick={() => {
                        window.location.reload(); 
                    }}
                    >
                        Перезагрузить форму
                </button>
            </form>
        </div>
    );
};

export default App;
