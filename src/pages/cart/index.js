import React, { useState} from 'react';

import './styles.css';

import logo from '../../assets/logo.svg';

const Cart = () => {

    const [search, setSearch] = useState('');
    function handleSearch() {
        console.log(search)
    }
    return (
        <div id="page-create-point">
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
                        Parabéns pela Compra!
                    </div>
                </div>
            </fieldset>

        </div>
    );
}

export default Cart;