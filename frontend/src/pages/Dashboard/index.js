import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client';

import './styles.css';

export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    

    useEffect(() => {

        async function loadSpots() {

            const user_id = localStorage.getItem('user');

            const response = await api.get('/dashboard', {
                headers: { user_id },
            });
            
            setSpots(response.data);

        }
        loadSpots();

    }, []);

    return (
        <>
            <p>Dashboard</p>

            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$ ${spot.price},00/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Criar Sport</button>
            </Link>
        </>
    );
}