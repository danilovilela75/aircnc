import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {

    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function hcad(event) {
        event.preventDefault();

        const data = new FormData();

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);

        const user_id = localStorage.getItem('user');

        const response = await api.post('/spots', data, {
            headers: {user_id},
        });

        console.log(response.data);

        history.push('/dashboard');

    }

    return (
        <>
            <form onSubmit={hcad}>

                <label 
                    id="thumbnail" 
                    className={thumbnail ? 'has-thumbnail' : ''} 
                    style={{ backgroundImage: `url(${preview})`}}
                >
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                    <img src={camera} alt="arquivos"/>
                </label>

                <label htmlFor="company">EMPRESA *</label>
                <input 
                    id="company"
                    type="text"
                    placeholder="Sua empresa incrível"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />

                <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
                <input 
                    id="price"
                    type="text"
                    placeholder="Valor da diária"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />

                <label htmlFor="techs">TECNOLOGIAS * <span>(separados por vírgula)</span></label>
                <input 
                    id="techs"
                    type="text"
                    placeholder="Qual tecnologia usa?"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                />

                <button type="submit" className="btn">Cadastrar</button>

            </form>

            <Link to="/dashboard">
                <button className="btnreturn">Voltar</button>
            </Link>

        </>
    );
}