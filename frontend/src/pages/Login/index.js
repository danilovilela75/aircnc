import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {

    const [email, setEmail] = useState('danilovilela@teleset.com.br');

    async function hsub(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        console.log(_id);
        localStorage.setItem('user', _id);

        history.push('/dashboard');

    }

    return (
        <>

            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.</p>
            
            <form onSubmit={hsub}>

                <label htmlFor="email">EMAIL *</label>
                <input 
                    id="email"
                    type="text"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <button type="submit" className="btn">Entrar</button>

            </form>
        </>
    );
}