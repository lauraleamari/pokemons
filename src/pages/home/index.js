import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useHistory} from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.svg'


const Home = () => {
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [pokeSelect, setPokeSelect] = useState([]);
    const [pokeValue, setPokeValue] = useState([]);

    useEffect(() => {
        api.get('/pokemon').then(response =>{
            const pokeNames = response.data.results.map(item => item.name);
            Promise.all(
                pokeNames.map(name => api.get(`/pokemon/${name}`))
            ).then((responseList) => {
                const pokeList = responseList.map(item => item.data);
                setPokemons(pokeList);
            });
        });
    }, []);


    function handleSearch() {
        console.log(search)
    }

    function handleClick(item){
        const valor = item.game_indices[1].game_index;
        setPokeSelect([ ...pokeSelect, item]);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        history.push('/');
    }

    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <div className='logo'>
                        <img src={logo} alt="Pokemon"/>
                    </div>
                    <form className="pesquisa">
                        <input
                            className="search"
                            value={search}
                            placeholder="Busca..."
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                        >
                            Pesquisar
                        </button>
                    </form>
                </header>

                <fieldset>
                    <div className="field-group">
                        <div className="field cards">
                            <ul className="pokemons">
                            {pokemons.map(item => (
                                <li
                                    key={item.name}
                                    className={item.name}
                                >
                                    <div className='name'>{item.name}</div>
                                    <span className="poke-image">
                                        <img src={item.sprites.front_shiny} alt={item.name} />
                                    </span>
                                    <div className='abilities'>Habilidade: {item.abilities[0].ability.name}</div>
                                    <div className='base_experience'>Experiencia: {item.base_experience}</div>
                                    <div className='game_index'>Índices de jogos: {item.game_indices[0].game_index}</div>
                                    <div className='movie'>Movimentos: {item.moves[0].move.name}</div>
                                    <div className='height'>Alura: {item.height*10} cm</div>
                                    <div className='weight'>Peso: {item.weight/10} kg</div>

                                    <div className='stats'>Estatísticas:
                                        <ul>
                                            {item.stats.map((statObj) => (
                                                <li
                                                    key={statObj.stat.name}
                                                    className={statObj.base_stats}
                                                >
                                                    {statObj.stat.name}: {statObj.base_stat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className='price'>Preço: R$ {item.game_indices[1].game_index}</div>

                                    <button
                                        type="btn-buy" className='btn-buy'
                                        value={item}
                                        onClick={(cardItem) => handleClick(item)}
                                    >
                                        Comprar
                                    </button>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className="field cart">
                            <h1>Carrinho</h1>
                            <ul className="buy-card">
                                {pokeSelect.map(item => (
                                    <li
                                        key={item.name}
                                        className={item.name}
                                    >
                                        <span className="poke-image">
                                            <img src={item.sprites.front_shiny} alt={item.name} />
                                        </span>
                                        <span className='name'>{item.name}</span>
                                        <span
                                            value={item.game_indices[1].game_index}
                                            className='price'
                                        >
                                            Preço: R$
                                            <span className="calcula-preco">    {item.game_indices[1].game_index}
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="totalValeu">
                                Total: XXXX
                            </div>
                            <button type="subimit" onSubmit={handleSubmit}>Finalizar</button>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Home;